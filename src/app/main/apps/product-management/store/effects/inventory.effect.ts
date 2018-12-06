import { mergeMap, map, catchError } from 'rxjs/operators';
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
			return this.inventoryService.getInventory().pipe(
				map((inventory) => new fromActions.LoadInventorySuccess({ inventories : inventory }))
				// catchError((error) => of(new fromActions.LoadProductFail({ errorMessage: error })))
			);
		})
	);
}
