import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import { AppState } from '@app/core';
import * as fromProduct from './products/store/reducers/product.reducer';

export const FEATURE_NAME = 'productManagement';

export interface State extends AppState {
    productManagement: ProductManagementState;
}

export interface ProductManagementState  {
    products: fromProduct.ProductState;
}

export const reducers: ActionReducerMap<ProductManagementState> = {
    products: fromProduct.productReducer
};

export const getProductManagementState = createFeatureSelector<
    State,
    ProductManagementState
>(FEATURE_NAME);
