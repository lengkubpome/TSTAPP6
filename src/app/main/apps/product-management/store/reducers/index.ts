export * from './product.reducer';

// import { createSelector } from '@ngrx/store';
// import {
//     getProductManagementState,
//     ProductManagementState
// } from '../../product-management.state';

// import * as fromProduct from './product.reducer';

// // From ProductManagement State
// export const getProductState = createSelector(
//     getProductManagementState,
//     (state: ProductManagementState) => state.products
// );

// export const selectProductIds = createSelector(
//     getProductState,
//     fromProduct.selectProductIds
// );

// export const selectProductEntities = createSelector(
//     getProductState,
//     fromProduct.selectProductEntities
// );

// export const selectAllProducts = createSelector(
//     getProductState,
//     fromProduct.selectAllProducts
// );

// export const selectProductsTotal = createSelector(
//     getProductState,
//     fromProduct.selectProductTotal
// );

// export const selectCurrentProductId = createSelector(
//     getProductState,
//     fromProduct.getSelectedProductId
// );

// export const selectCurrentProduct = createSelector(
//     selectProductEntities,
//     selectCurrentProductId,
//     (productEntities, productId) => {
//         return productEntities[productId];
//     }
// );

// // Get History

// export const selectProductHistory = createSelector(
//     getProductState,
//     fromProduct.getSelectedProductHistory
// );

// export const selectPriceHistory = createSelector(
//     selectProductHistory,
//     (productHistory) => {
//         let res = [];
//         productHistory.forEach( arr => {
//             if (arr.product_update.price !== undefined )
//                  res = [...res, arr ]
//         })
//         return res;
//     }
// );
