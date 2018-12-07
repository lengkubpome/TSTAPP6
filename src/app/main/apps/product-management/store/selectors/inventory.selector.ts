import { inventoryAdapter } from './../adapters';
import { createSelector } from '@ngrx/store';
import { getProductManagementState, ProductManagementState } from '../../product-management.state';


export const getInventoryState = createSelector(
    getProductManagementState,
    (state: ProductManagementState) => state.inventory
)


const { selectIds, selectEntities, selectAll, selectTotal } = inventoryAdapter.getSelectors();


export const selectAllInventory = createSelector(getInventoryState, selectAll);
