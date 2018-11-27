import { Product, ProductHistory } from '../../model/product.model';
/* NgRx */
import { Action } from '@ngrx/store';

export const LOAD_PRODUCT = '[Product] Load';
export const LOAD_PRODUCT_SUCCESS = '[Product] Load Success';
export const LOAD_PRODUCT_FAIL = '[Product] Load Fail';

export const SELECT_PRODUCT = '[Product] Selecte Product';
export const CLEAR_SELECTED_PRODUCT = '[Product] Clear Selected Product';

export const EDIT_MODE = '[Product] Edit Mode';
export const CANCEL_EDIT_MODE = '[Product] Cancel Edit Mode';

export const UPDATE_PRODUCT = '[Product] Update Product';
//   UPDATE_PRODUCT_SUCCESS = '[Product] Update Product Success',
//   UPDATE_PRODUCT_FAIL = '[Product] Update Product Fail',

export const CREATE_PRODUCT = '[Product] Create Product';
//   CREATE_PRODUCT_SUCCESS = '[Product] Create Product Success',
//   CREATE_PRODUCT_FAIL = '[Product] Create Product Fail',

export const DELETE_PRODUCT = '[Product] Delete Product';
//   DELETE_PRODUCT_SUCCESS = '[Product] Delete Product Success',
//   DELETE_PRODUCT_FAIL = '[Product] Delete Product Fail'

// Product History
export const LOAD_PRODUCT_HISTORY = '[Product History] Load Data';
export const LOAD_PRODUCT_HISTORY_FAIL = '[Product History] Load Data Fail';
export const LOAD_PRODUCT_HISTORY_SUCCESS = '[Product History] Load Data Success';

export const ADD_PRODUCT_HISTORY = '[Product History] Add Data';
export const ADD_PRODUCT_HISTORY_FAIL = '[Product History] Add Data Fail';
export const ADD_PRODUCT_HISTORY_SUCCESS = '[Product History] Add Data Success';

// Action
export class LoadProduct implements Action {
	readonly type = LOAD_PRODUCT;
	constructor() {}
}

export class LoadProductSuccess implements Action {
	readonly type = LOAD_PRODUCT_SUCCESS;
	constructor(public payload: { products: Product[] }) {}
}

export class LoadProductFail implements Action {
	readonly type = LOAD_PRODUCT_FAIL;
	constructor(public payload: { errorMessage: string }) {}
}

export class SelectProduct implements Action {
	readonly type = SELECT_PRODUCT;
	constructor(public payload: { productId: string }) {}
}

export class ClearSelectedProduct implements Action {
	readonly type = CLEAR_SELECTED_PRODUCT;
}

export class EditMode implements Action {
	readonly type = EDIT_MODE;
}

export class CancelEditMode implements Action {
	readonly type = CANCEL_EDIT_MODE;
}

export class LoadProductHistory implements Action {
    readonly type = LOAD_PRODUCT_HISTORY;
    constructor(public payload: { productId: string }) {}
}
export class LoadProductHistoryFail implements Action {
	readonly type = LOAD_PRODUCT_HISTORY_FAIL;
	constructor(public payload: { errorMessage: string }) {}
}
export class LoadProductHistorySuccess implements Action {
	readonly type = LOAD_PRODUCT_HISTORY_SUCCESS;
	constructor(public payload: { histories: ProductHistory[] }) {}
}

export class AddProductHistory implements Action {
    readonly type = LOAD_PRODUCT_HISTORY;
    constructor(public payload: { productId: string }) {}
}
export class AddProductHistoryFail implements Action {
	readonly type = LOAD_PRODUCT_HISTORY_FAIL;
	constructor(public payload: { errorMessage: string }) {}
}
export class AddProductHistorySuccess implements Action {
	readonly type = LOAD_PRODUCT_HISTORY_SUCCESS;
	constructor(public payload: { history: ProductHistory }) {}
}

export type PRODUCT_ACTIONS =
	| LoadProduct
	| LoadProductSuccess
	| LoadProductFail
	| SelectProduct
    | ClearSelectedProduct
    | EditMode
    | CancelEditMode
	| LoadProductHistory
	| LoadProductHistoryFail
	| LoadProductHistorySuccess;
