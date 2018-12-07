import { Update } from '@ngrx/entity';
import { Inventory, InventoryProduct } from './../../model/inventory.model';
import { Action } from '@ngrx/store';

export const LOAD_INVENTORY = '[Inventory] Load Inventory';
export const LOAD_INVENTORY_SUCCESS = '[Inventory] Load Inventory Success';

export const LOAD_INVENTORY_PRODUCTS = '[Inventory] Load Inventory Products';

export const UPDATE_INVENTORY = '[Inventory] Update Inventory Products';
export const UPDATE_INVENTORY_SUCCESS = '[Inventory] Update Inventory Products Success';

// Action
export class LoadInventory implements Action {
	readonly type = LOAD_INVENTORY;
	constructor() {}
}
export class LoadInventorySuccess implements Action {
	readonly type = LOAD_INVENTORY_SUCCESS;
	constructor(public payload: { inventories: Inventory[] }) {}
}

export class LoadInventoryProducts implements Action {
	readonly type = LOAD_INVENTORY_PRODUCTS;
	constructor(public payload: { product_stocks: InventoryProduct[] }) {}
}

export class UpdateInventorySuccess implements Action {
	readonly type = UPDATE_INVENTORY_SUCCESS;
	constructor(public payload: { inventory: Inventory }) {}
}

export class UpdateInventory implements Action {
	readonly type = UPDATE_INVENTORY;
	constructor() {}
}

export type INVENTORY_ACTIONS =
	| LoadInventory
	| LoadInventorySuccess
	| LoadInventoryProducts
	| UpdateInventory
	| UpdateInventorySuccess;
