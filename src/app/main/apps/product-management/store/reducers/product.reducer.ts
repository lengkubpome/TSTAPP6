// import { selectProductEntities } from './product.selectors';
import { Product, ProductHistory } from '../../model/product.model';

import * as fromActions from '../actions';
import { productAdapter } from '../adapters';
import { EntityState } from '@ngrx/entity';

export interface ProductState extends EntityState<Product> {
	// selectedProduct: { productId: string; history: ProductHistory[] };
	selectedProductId: string | null;
	selectProductHistory: ProductHistory[] | null;
	loaded: boolean;
	loading: boolean;
	error: string | null;
}

export const initialState: ProductState = productAdapter.getInitialState({
	selectedProductId: null,
	selectProductHistory: null,
	loaded: false,
	loading: false,
	error: null
});

export function productReducer(state = initialState, action: fromActions.PRODUCT_ACTIONS): ProductState {
	switch (action.type) {
		// case fromActions.LOAD_PRODUCT: {
		// 	return Object.assign({
		// 		...state,
		// 		loading: true,
		// 		loaded: false,
		// 		error: null
		// 	});
		// }

		case fromActions.LOAD_PRODUCT_SUCCESS: {
			return productAdapter.addAll(action.payload.products, {
				...state,
				loading: false,
				loaded: true,
				error: null
			});
		}
		case fromActions.LOAD_PRODUCT_FAIL: {
			return Object.assign({
				...state,
				loading: false,
				loaded: false,
				error: action.payload.errorMessage
			});
		}

		case fromActions.SELECT_PRODUCT: {
			return Object.assign({
				...state,
				selectedProductId: action.payload.productId,
				selectProductHistory: null,
				loading: false,
				loaded: false,
				error: null
			});
		}

		case fromActions.CLEAR_SELECTED_PRODUCT: {
			return Object.assign({
				...state,
				selectedProductId: null,
				selectProductHistory: null,
				loading: false,
				loaded: false,
				error: null
			});
		}

		case fromActions.LOAD_PRODUCT_HISTORY: {
			return Object.assign({
				...state,
				loading: true,
				loaded: false,
				error: null
			});
		}

		case fromActions.LOAD_PRODUCT_HISTORY_SUCCESS: {
			return Object.assign({
				...state,
				selectProductHistory: action.payload.histories,
				loading: false,
				loaded: true,
				error: null
			});
		}

		case fromActions.LOAD_PRODUCT_HISTORY_FAIL: {
			return Object.assign({
				...state,
				selectProductHistory: null,
				loading: false,
				loaded: false,
				error: null
			});
		}

		default: {
			return state;
		}
	}
}

export const getProductLoading = (state: ProductState) => state.loading;
export const getProductLoaded = (state: ProductState) => state.loaded;
export const getSelectedProductId = (state: ProductState) => state.selectedProductId;
export const getSelectedProductHistory = (state: ProductState) => state.selectProductHistory;

// get the selectors

// const { selectIds, selectEntities, selectAll, selectTotal } = productAdapter.getSelectors();

// // select the array of user ids
// export const selectProductIds = selectIds;

// // select the dictionary of product entities
// export const selectProductEntities = selectEntities;

// // select the array of products
// export const selectAllProducts = selectAll;

// // select the total product count
// export const selectProductTotal = selectTotal;

