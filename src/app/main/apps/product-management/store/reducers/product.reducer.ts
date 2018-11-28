// import { selectProductEntities } from './product.selectors';
import { Product, ProductHistory } from '../../model/product.model';

import * as fromActions from '../actions';
import { productAdapter } from '../adapters';
import { EntityState } from '@ngrx/entity';

export interface ProductState extends EntityState<Product> {
	// selectedProduct: { productId: string; history: ProductHistory[] };
	selectedProductId: string | null;
	selectProductHistory: ProductHistory[] | null;
	editMode: boolean;
	loaded: boolean;
	loading: boolean;
	error: string | null;
}

const initialState: ProductState = productAdapter.getInitialState({
	selectedProductId: null,
	selectProductHistory: null,
	editMode: false,
	loaded: false,
	loading: false,
	error: null
});

export function productReducer(state = initialState, action: fromActions.PRODUCT_ACTIONS): ProductState {
	switch (action.type) {
		case fromActions.LOAD_PRODUCT: {
			return Object.assign({
				...state,
				loading: true,
				loaded: false,
				error: null
			});
		}
		case fromActions.LOAD_PRODUCT_SUCCESS: {
			return productAdapter.addAll(action.payload.products, {
                ...state,
                editMode: false,
				loading: false,
				loaded: true,
				error: null
			});
		}
		case fromActions.LOAD_PRODUCT_FAIL: {
			return Object.assign({
                ...state,
                editMode: false,
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
                editMode: false,
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
                editMode: false,
				loading: false,
				loaded: false,
				error: null
			});
		}

		case fromActions.EDIT_MODE: {
			return Object.assign({
				...state,
                editMode: true,
                loading: false,
				loaded: false,
				error: null
			});
		}
		case fromActions.CANCEL_EDIT_MODE: {
			return Object.assign({
				...state,
                editMode: false,
                loading: false,
				loaded: false,
				error: null
			});
		}

		case fromActions.UPDATE_PRODUCT: {
			return productAdapter.updateOne(action.payload.product, {
				...state,
				loading: true,
                loaded: false,
				error: null
			});
		}
		// case fromActions.UPDATE_PRODUCT_SUCCESS: {
		// 	return productAdapter.updateOne(action.payload.product, {
		// 		...state,
		// 		loading: false,
		// 		loaded: true,
		// 		error: null
		// 	});
		// }
		case fromActions.UPDATE_PRODUCT_FAIL: {
			return Object.assign({
				...state,
				loading: false,
				loaded: false,
				error: action.payload.errorMessage
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
				error: action.payload.errorMessage
			});
		}

		default: {
			return state;
		}
	}
}

export const getProductLoading = (state: ProductState) => state.loading;
export const getProductLoaded = (state: ProductState) => state.loaded;
export const getEditMode = (state: ProductState) => state.editMode;
export const getSelectedProductId = (state: ProductState) => state.selectedProductId;
export const getSelectedProductHistory = (state: ProductState) => state.selectProductHistory;
