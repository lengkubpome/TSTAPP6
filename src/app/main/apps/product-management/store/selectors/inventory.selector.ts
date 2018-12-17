import { inventoryAdapter } from './../adapters';
import { createSelector } from '@ngrx/store';
import { selectRouterState } from '@app/core';
import { selectProductManagementState, ProductManagementState } from '../../product-management.state';

import * as fromInventory from '../reducers/inventory.reducer';

export const getInventoryState = createSelector(
	selectProductManagementState,
	(state: ProductManagementState) => state.inventory
);

const { selectIds, selectEntities, selectAll, selectTotal } = inventoryAdapter.getSelectors();

export const selectInventoryEntities = createSelector(getInventoryState, selectEntities);
export const selectAllInventory = createSelector(getInventoryState, selectAll);

export const selectCurrentInventory = createSelector(getInventoryState, fromInventory.getSelectedInventory);

// export const selectCurrentInventory = createSelector(
// 	selectInventoryEntities,
// 	selectRouterState,
// 	(inventoryEntities, params) => inventoryEntities[params.state.params.id]
// );
