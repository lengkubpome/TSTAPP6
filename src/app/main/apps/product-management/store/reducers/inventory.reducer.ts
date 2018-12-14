import { inventoryAdapter } from './../adapters/inventory.adapter';
import { EntityState } from '@ngrx/entity';
import { Inventory } from '../../model/inventory.model';

import * as fromActions from '../actions';

export interface InventoryState extends EntityState<Inventory> {
	selectedInventoryId: string | null;
}

const initialState: InventoryState = inventoryAdapter.getInitialState({
	selectedInventoryId: null
});

export function inventoryReducer(state = initialState, action: fromActions.INVENTORY_ACTIONS): InventoryState {
	switch (action.type) {
		case fromActions.LOAD_INVENTORY_SUCCESS: {
			return inventoryAdapter.addAll(action.payload.inventories, state);
		}
		case fromActions.LOAD_INVENTORY_PRODUCTS_SUCCESS: {
			return inventoryAdapter.upsertOne(action.payload.inventory, state);
		}
		// case fromActions.CREATE_INVENTORY_SUCCESS: {
		// 	return inventoryAdapter.addOne(action.payload.inventory, state);
		// }

		default: {
			return state;
		}
	}
}

export const getSelectedInventoryId = (state: InventoryState) => state.selectedInventoryId;
