import { Action } from '@ngrx/store';
import { ProductHistory } from '../../model/product.model';

// load Product History
export const LOAD_PRODUCT_HISTORY = '[Product History] Load Data';
export const LOAD_PRODUCT_HISTORY_FAIL = '[Product History] Load Data Fail';
export const LOAD_PRODUCT_HISTORY_SUCCESS = '[Product History] Load Data Success';

export class LoadProductHistory implements Action {
    readonly type = LOAD_PRODUCT_HISTORY;
}
export class LoadProductHistoryFail implements Action {
    readonly type = LOAD_PRODUCT_HISTORY_FAIL;
    constructor(public payload: any) {}
}
export class LoadProductHistorySuccess implements Action {
    readonly type = LOAD_PRODUCT_HISTORY_SUCCESS;
    constructor(public payload: ProductHistory[]) {}
}

// action type
export type ProductHistoryAction =
    | LoadProductHistory
    | LoadProductHistoryFail
    | LoadProductHistorySuccess;
