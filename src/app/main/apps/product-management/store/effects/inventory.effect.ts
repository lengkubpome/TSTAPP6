import { Router } from '@angular/router';
import { InventoryProduct } from '@app/main/apps/product-management/model/inventory.model';
import { ProductService } from './../../service/product.service';
import { Injectable } from '@angular/core';
import { Inventory } from './../../model/inventory.model';
import { mergeMap, map, withLatestFrom, switchMap, takeUntil, tap } from 'rxjs/operators';
import { InventoryService } from './../../service/inventory.service';
import { Action, Store, select } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from '../actions';
import * as fromProductManagement from '../../product-management.state';
import { SubscriptionService } from '@app/shared/services/subscription.service';

@Injectable()
export class InventoryEffect {
	@Effect()
	loadInventory$: Observable<Action> = this.actions$.pipe(
		ofType(fromActions.LOAD_INVENTORY),
		switchMap(() =>
			this.inventoryService
				.getInventory()
				.pipe(
					takeUntil(this.subService.unsubscribe$),
					map((inventories) => new fromActions.LoadInventorySuccess({ inventories }))
				)
		)
	);

	@Effect()
	selectInventory$: Observable<Action> = this.actions$.pipe(
		ofType(fromActions.SELECT_INVENTORY),
		map((action: fromActions.SelectInventory) => action.payload),
		switchMap((action) => {
			const inventory = action.inventory;
			return this.inventoryService.getInventoryProducts(inventory.id).pipe(
				map((stocks) => {
					return Object.assign(inventory, { product_stocks: stocks }) as Inventory;
				})
			);
		}),
		// Get Product Name in Product_stocks
		switchMap((inventory) => {
			return this.productService.getProducts().pipe(
				map((products) => {
					const product_stocks = inventory.product_stocks;
					const res = product_stocks.map((product_stock) => {
						const name = products.find((p) => p.id === product_stock.id).name;
						return Object.assign(product_stock, { name }) as InventoryProduct;
					});
					return Object.assign(inventory, { product_stocks: res }) as Inventory;
				})
			);
		}),
		tap((inventory) => this.router.navigate([ '/apps/product-management/inventory', inventory.id ])),
		map((inventory) => new fromActions.SelectedInventory({ inventory }))
	);

	// @Effect()
	// loadInventoryProducts$: Observable<Action> = this.actions$.pipe(
	// 	ofType(fromActions.LOAD_INVENTORY_SUCCESS),
	// 	map((action: fromActions.LoadInventorySuccess) => action.payload),
	// 	switchMap((action) => {
	// 		return action.inventories.map((inventory) => {
	// 			return this.inventoryService.getInventoryProducts(inventory.id).pipe(
	// 				takeUntil(this.subService.unsubscribe$),
	// 				map((stocks) => {
	// 					return Object.assign(inventory, { product_stocks: stocks }) as Inventory;
	// 				}),
	// 				// Get Product Name in Product_stocks
	// 				withLatestFrom(this.store.pipe(select(fromProductManagement.selectProductManagementState))),
	// 				map(([ res, storeState ]) => {
	// 					const products = storeState.products.entities;
	// 					const product_stocks = res.product_stocks;
	// 					const new_product_stocks = product_stocks.map((p) => {
	// 						if (Object.keys(p.id).length !== 0) {
	// 							return Object.assign(p, { name: products[p.id].name });
	// 						}
	// 					});
	// 					return Object.assign(res, { product_stocks: new_product_stocks });
	// 				})
	// 			);
	// 		});
	// 	}),
	// 	mergeMap((res) => {
	// 		return res.pipe(
	// 			takeUntil(this.subService.unsubscribe$),
	// 			map((inventory) => new fromActions.LoadInventoryProductsSuccess({ inventory }))
	// 		);
	// 	})
	// );

	@Effect()
	createInventory$: Observable<Action> = this.actions$.pipe(
		ofType(fromActions.CREATE_INVENTORY),
		map((action: fromActions.CreateInventory) => action.payload),
		mergeMap((inventoryData) => {
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
		private productService: ProductService,
		private router: Router,
		private store: Store<fromProductManagement.State>,
		private subService: SubscriptionService
	) {}
}
