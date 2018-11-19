import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import { productReducer, ProductState } from './products/state/product.reducer';
import { AppState } from '@app/core';

export const FEATURE_NAME = 'productManagement';

export interface State extends AppState {
    productManagement: ProductManagementState;
}

export interface ProductManagementState {
    products: ProductState;
}

export const reducers: ActionReducerMap<ProductManagementState> = {
    products: productReducer
};

export const selectProductManagementState = createFeatureSelector<
    State,
    ProductManagementState
>(FEATURE_NAME);
