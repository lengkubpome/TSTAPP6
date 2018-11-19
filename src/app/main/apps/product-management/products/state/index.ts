import { createSelector } from '@ngrx/store';
import {
    selectProductManagementState,
    ProductManagementState
} from '../../product-management.state';

import * as fromProduct from './product.reducer';

export const selectProduct = createSelector(
    selectProductManagementState,
    (state: ProductManagementState) => state.products
);

export const selectProductIds = createSelector(
    selectProduct,
    fromProduct.selectProductIds
);

export const selectProductEntities = createSelector(
    selectProduct,
    fromProduct.selectProductEntities
);

export const selectAllProducts = createSelector(
    selectProduct,
    fromProduct.selectAllProducts
);
export const selectProductsTotal = createSelector(
    selectProduct,
    fromProduct.selectProductTotal
);

export const selectCurrentProductId = createSelector(
    selectProduct,
    fromProduct.getSelectedProductId
);

export const selectCurrentProduct = createSelector(
    selectProductEntities,
    selectCurrentProductId,
    (productEntities, productId) => productEntities[productId]
);
