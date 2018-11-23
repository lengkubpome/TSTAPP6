import { ProductHistory } from '../../model/product.model';
// import { selectProductEntities } from './product.selectors';
import { Product } from '../../model/product.model';

import * as fromActions from '../actions';
import { productAdapter } from '../adapters';
import { EntityState} from '@ngrx/entity';


export interface ProductState extends EntityState<Product> {
    // selectedProduct: { productId: string; history: ProductHistory[] };
    selectedProductId: string;
    selectProductHistory: ProductHistory[];
    loaded: boolean;
    loading: boolean;
}

export const initialState: ProductState = productAdapter.getInitialState({
    selectedProductId: null,
    selectProductHistory: null,
    loaded: false,
    loading: false
});

export function productReducer(
    state = initialState,
    action: fromActions.PRODUCT_ACTIONS
): ProductState {
    switch (action.type) {
        case fromActions.ProductActionTypes.LOAD_PRODUCT_SUCCESS: {
            return productAdapter.addAll(action.payload.products, state);
        }

        case fromActions.ProductActionTypes.SELECT_PRODUCT: {
            return Object.assign({
                ...state,
                selectedProductId: action.payload.productId,
                selectProductHistory: null
            });
        }

        case fromActions.ProductActionTypes.LOAD_HISTORY_PRODUCT: {
            return Object.assign({
                ...state,
                selectProductHistory: action.payload.history
            });
        }

        default: {
            return state;
        }
    }
}

export const getProductLoading = (state: ProductState) => state.loading;
export const getProductLoaded = (state: ProductState) => state.loaded;
export const getSelectedProductId = (state: ProductState) =>
    state.selectedProductId;

// get the selectors

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = productAdapter.getSelectors();

// select the array of user ids
export const selectProductIds = selectIds;

// select the dictionary of product entities
export const selectProductEntities = selectEntities;

// select the array of products
export const selectAllProducts = selectAll;

// select the total product count
export const selectProductTotal = selectTotal;