import { Injectable } from '@angular/core';
import { Inventory } from './../../model/inventory.model';
import {
	mergeMap,
	map,
	tap,
	withLatestFrom,
	debounceTime,
	switchMap,
	catchError,
    takeUntil,
    every
} from 'rxjs/operators';
import { InventoryService } from './../../service/inventory.service';
import { Action, Store, select } from '@ngrx/store';
import { Observable, of, from } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from '../actions';
import * as fromProductManagement from '../../product-management.state';
import * as fromRoute from '@ngrx/router-store';

@Injectable()
export class InventoryEffect {
	@Effect()
	loadInventory$: Observable<Action> = this.actions$.pipe(
		ofType(fromActions.LOAD_INVENTORY),
		withLatestFrom(this.store.pipe(select(fromProductManagement.selectProductManagementState))),
        every(([ action, storeState ]) => storeState.inventory.ids.length !== 0),
        // Check Products Store
        withLatestFrom(this.store.pipe(select(fromProductManagement.selectProductManagementState))),
		tap(([ action, storeState ]) => {
			if (storeState.products.ids.length === 0) {
				this.store.dispatch(new fromActions.LoadProduct());
            }
		}),
		debounceTime(1),
		mergeMap(() => {
			return this.inventoryService
				.getInventory()
				.pipe(
					takeUntil(this.inventoryService.unsubscribe$),
					map((inventories) => new fromActions.LoadInventorySuccess({ inventories }))
				);
		})
	);

	@Effect()
	loadInventoryProducts$: Observable<Action> = this.actions$.pipe(
		ofType(fromActions.LOAD_INVENTORY_SUCCESS),
		map((action: fromActions.LoadInventorySuccess) => action.payload),
		switchMap((action) => {
			return action.inventories.map((inventory) => {
				return this.inventoryService.getInventoryProducts(inventory.id).pipe(
					takeUntil(this.inventoryService.unsubscribe$),
					map((stocks) => {
						return Object.assign(inventory, { product_stocks: stocks }) as Inventory;
					}),
					// Get Product Name in Product_stocks
					withLatestFrom(this.store.pipe(select(fromProductManagement.selectProductManagementState))),
					map(([ res, storeState ]) => {
						const products = storeState.products.entities;
						const product_stocks = res.product_stocks;
						const new_product_stocks = product_stocks.map((p) => {
							if (Object.keys(p.id).length !== 0) {
								return Object.assign(p, { name: products[p.id].name });
							}
						});
						return Object.assign(res, { product_stocks: new_product_stocks });
					})
				);
			});
		}),
		mergeMap((res) => {
			return res.pipe(
				takeUntil(this.inventoryService.unsubscribe$),
				map((inventory) => new fromActions.LoadInventoryProductsSuccess({ inventory }))
			);
		})
	);

	@Effect()
	createInventory$: Observable<Action> = this.actions$.pipe(
		ofType(fromActions.CREATE_INVENTORY),
		map((action: fromActions.CreateInventory) => action.payload),
		switchMap((inventoryData) => {
			const data = inventoryData.inventory;

			return from(this.inventoryService.createInventory(data)).pipe(
				mergeMap(() => {
					return [
						{
							type: fromActions.CREATE_INVENTORY_SUCCESS
						}
					];
				})
			);
		})
	);

	constructor(
		private actions$: Actions,
		private inventoryService: InventoryService,
		private store: Store<fromProductManagement.State>
	) {}
}
