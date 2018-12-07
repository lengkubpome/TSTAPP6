import { Update } from '@ngrx/entity';
import { Inventory } from './../../model/inventory.model';
import { mergeMap, map, catchError, tap, switchMap, concatMap } from 'rxjs/operators';
import { InventoryService } from './../../service/inventory.service';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from '../actions';
import * as fromProductManagement from '../../product-management.state';
import { Injectable } from '@angular/core';

const BUSINESS_ID = '0406069000354';

@Injectable()
export class InventoryEffect {
	constructor(private actions$: Actions, private inventoryService: InventoryService) {}

	@Effect()
	loadInventory$: Observable<Action> = this.actions$.pipe(
		ofType(fromActions.LOAD_INVENTORY),
		mergeMap((action: fromActions.LoadInventory) => {
			return this.inventoryService
				.getInventory()
				.pipe(map((inventories) => new fromActions.LoadInventorySuccess({ inventories: inventories })));
		})
	);

	@Effect()
	loadInventoryProducts$: Observable<Action> = this.actions$.pipe(
		ofType(fromActions.LOAD_INVENTORY_SUCCESS),
		map((action: fromActions.LoadInventorySuccess) => action.payload),
		mergeMap((action) => {
			return action.inventories.map((inventory) => {
				return this.inventoryService.getInventoryProducts(inventory.id).pipe(
					map((stocks) => {
						return Object.assign(inventory, { product_stocks: stocks }) as Inventory;
					})
				);
			});
		}),
		mergeMap((res) => {
			return res.pipe(map((inventory) => new fromActions.UpdateInventorySuccess({ inventory })));
		})
	);
}
