import { Inventory } from './../../model/inventory.model';
import { Action } from '@ngrx/store';

export const LOAD_INVENTORY = '[Inventory] Load';
export const LOAD_INVENTORY_SUCCESS = '[Inventory] Load Success';

// Action
export class LoadInventory implements Action {
	readonly type = LOAD_INVENTORY;
	constructor() {}
}
export class LoadInventorySuccess implements Action {
	readonly type = LOAD_INVENTORY_SUCCESS;
	constructor(public payload: { inventories: Inventory[] }) {}
}

export type INVENTORY_ACTIONS = LoadInventory 
    | LoadInventorySuccess;
