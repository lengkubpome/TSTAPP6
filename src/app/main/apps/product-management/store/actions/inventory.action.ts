import { Update } from '@ngrx/entity';
import { Inventory, InventoryProduct } from './../../model/inventory.model';
import { Action } from '@ngrx/store';

export const LOAD_INVENTORY = '[Inventory] Load Inventory';
export const LOAD_INVENTORY_SUCCESS = '[Inventory] Load Inventory Success';
export const LOAD_INVENTORY_PRODUCTS_SUCCESS = '[Inventory] Load Inventory Products Success';

export const SELECT_INVENTORY = '[Inventory] Select Inventory';
export const SELECTED_INVENTORY = '[Inventory] Selected Inventory';

export const CREATE_INVENTORY = '[Inventory] Create Inventory';
export const CREATE_INVENTORY_SUCCESS = '[Inventory] Create Inventory Success';

// Action
export class LoadInventory implements Action {
	readonly type = LOAD_INVENTORY;
	constructor() {}
}
export class LoadInventorySuccess implements Action {
	readonly type = LOAD_INVENTORY_SUCCESS;
	constructor(public payload: { inventories: Inventory[] }) {}
}

export class LoadInventoryProductsSuccess implements Action {
	readonly type = LOAD_INVENTORY_PRODUCTS_SUCCESS;
	constructor(public payload: { inventory: Inventory }) {}
}

export class SelectInventory implements Action {
	readonly type = SELECT_INVENTORY;
	constructor(public payload: { inventory: Inventory }) {}
}
export class SelectedInventory implements Action {
	readonly type = SELECTED_INVENTORY;
	constructor(public payload: { inventory: Inventory }) {}
}
export class CreateInventory implements Action {
	readonly type = CREATE_INVENTORY;
	constructor(public payload: { inventory: Inventory }) {}
}

// น่าจะไม่ได้ใช้
export class CreateInventorySuccess implements Action {
	readonly type = CREATE_INVENTORY_SUCCESS;
	constructor(public payload: { inventory: Inventory }) {}
}

export type INVENTORY_ACTIONS =
	| LoadInventory
	| LoadInventorySuccess
	| LoadInventoryProductsSuccess
	| SelectInventory
	| SelectedInventory
	| CreateInventory
	| CreateInventorySuccess;
