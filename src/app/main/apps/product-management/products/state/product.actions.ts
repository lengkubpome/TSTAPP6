import { Product } from '../model/product.model';
/* NgRx */
import { Action } from '@ngrx/store';

export enum ProductActionTypes {
  SELECT_PRODUCT = '[Product] Product Selected',
  SET_CURRENT_PRODUCT = '[Product] Set Current Product',
  CLEAR_CURRENT_PRODUCT = '[Product] Clear Current Product',
  INITIALIZE_PRODUCT = '[Product] Initialize Product',
  LOAD_PRODUCT = '[Product] Load',
  LOAD_PRODUCT_SUCCESS = '[Product] Load Success',
  LOAD_PRODUCT_FAIL = '[Product] Load Fail',
  UPDATE_PRODUCT = '[Product] Update Product',
  UPDATE_PRODUCT_SUCCESS = '[Product] Update Product Success',
  UPDATE_PRODUCT_FAIL = '[Product] Update Product Fail',
  CREATE_PRODUCT = '[Product] Create Product',
  CREATE_PRODUCT_SUCCESS = '[Product] Create Product Success',
  CREATE_PRODUCT_FAIL = '[Product] Create Product Fail',
  DELETE_PRODUCT = '[Product] Delete Product',
  DELETE_PRODUCT_SUCCESS = '[Product] Delete Product Success',
  DELETE_PRODUCT_FAIL = '[Product] Delete Product Fail'
}

export class LoadProduct implements Action {
  readonly type = ProductActionTypes.LOAD_PRODUCT;
}

export class LoadProductSuccess implements Action {
  readonly type = ProductActionTypes.LOAD_PRODUCT_SUCCESS;

  constructor(public payload: { products: Product[] }) {}
}

export class LoadProductFail implements Action {
  readonly type = ProductActionTypes.LOAD_PRODUCT_FAIL;

  constructor(public payload: { errorMessage: string }) {}
}


export class SelectProduct implements Action {
    readonly type = ProductActionTypes.SELECT_PRODUCT;
    constructor(public payload: { productId: string }) {}
  }

export type PRODUCT_ACTIONS =
  | LoadProduct
  | LoadProductSuccess
  | LoadProductFail
  | SelectProduct;
