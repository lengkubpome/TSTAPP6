import { Inventory } from './../../model/inventory.model';
import {
	mergeMap,
	map,
	tap,
	concatMap,
	withLatestFrom,
	debounceTime
} from 'rxjs/operators';
import { InventoryService } from './../../service/inventory.service';
import { Action, Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from '../actions';
import * as fromProductManagement from '../../product-management.state';
import { Injectable } from '@angular/core';

const BUSINESS_ID = '0406069000354';

@Injectable()
export class InventoryEffect {
	constructor(
		private actions$: Actions,
		private inventoryService: InventoryService,
		private store: Store<fromProductManagement.State>
	) {}

	@Effect()
	loadInventory$: Observable<Action> = this.actions$.pipe(
		ofType(fromActions.LOAD_INVENTORY),
		withLatestFrom(this.store.pipe(select(fromProductManagement.getProductManagementState))),
		// Check Products Store
		tap(([ action, storeState ]) => {
			if (storeState.products.ids.length === 0) {
				return this.store.dispatch(new fromActions.LoadProduct());
			}
		}),
		debounceTime(1),
		mergeMap(() => {
			return this.inventoryService
				.getInventory()
				.pipe(map((inventories) => new fromActions.LoadInventorySuccess({ inventories })));
		})
	);

	@Effect()
	loadInventoryProducts$: Observable<Action> = this.actions$.pipe(
		ofType(fromActions.LOAD_INVENTORY_SUCCESS),
		map((action: fromActions.LoadInventorySuccess) => action.payload),
		concatMap((action) => {
			return action.inventories.map((inventory) => {
				return this.inventoryService.getInventoryProducts(inventory.id).pipe(
					map((stocks) => {
						return Object.assign(inventory, { product_stocks: stocks }) as Inventory;
					}),
					// Get Product Name in Product_stocks
					withLatestFrom(this.store.pipe(select(fromProductManagement.getProductManagementState))),
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
			return res.pipe(map((inventory) => new fromActions.UpdateInventorySuccess({ inventory })));
		})
	);
}
