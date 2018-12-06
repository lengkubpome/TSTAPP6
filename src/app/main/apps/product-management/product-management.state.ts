import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import { AppState } from '@app/core';
import * as fromProduct from './store/reducers/product.reducer';
import * as fromInventory from './store/reducers/inventory.reducer';

export const FEATURE_NAME = 'productManagement';

export interface State extends AppState {
	productManagement: ProductManagementState;
}

export interface ProductManagementState {
	products: fromProduct.ProductState;
	inventory: fromInventory.InventoryState;
}

export const reducers: ActionReducerMap<ProductManagementState> = {
    products: fromProduct.productReducer,
    inventory: fromInventory.inventoryReducer
};

export const getProductManagementState = createFeatureSelector<State, ProductManagementState>(FEATURE_NAME);
