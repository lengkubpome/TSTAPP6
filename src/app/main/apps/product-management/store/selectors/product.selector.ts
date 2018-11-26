import { createSelector } from '@ngrx/store';
import { getProductManagementState, ProductManagementState } from '../../product-management.state';

import { productAdapter } from '../adapters';
import * as fromProduct from '../reducers/product.reducer';
import { ProductHistory } from '../../model/product.model';

// From ProductManagement State
export const getProductState = createSelector(
	getProductManagementState,
	(state: ProductManagementState) => state.products
);


const { selectIds, selectEntities, selectAll, selectTotal } = productAdapter.getSelectors();


// select the total product count
export const selectProductTotal = selectTotal;
export const selectProductIds = createSelector(getProductState, selectIds);

export const selectProductEntities = createSelector(getProductState, selectEntities);

export const selectAllProducts = createSelector(getProductState, selectAll);

export const selectProductsTotal = createSelector(getProductState, selectTotal);

export const selectCurrentProductId = createSelector(getProductState, fromProduct.getSelectedProductId);

export const selectCurrentProduct = createSelector(
	selectProductEntities,
	selectCurrentProductId,
	(productEntities, productId) => {
		return productEntities[productId];
	}
);

// Get History

export const selectProductHistory = createSelector(getProductState, fromProduct.getSelectedProductHistory);

export const selectPriceHistory = createSelector(selectProductHistory, (productHistory) => {
    // return productHistory.filter(p => p.product_update.price !== undefined)
    return productHistory;
});
