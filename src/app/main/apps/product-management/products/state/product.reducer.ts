// import { Product } from '../model/product.model';

// import * as fromActions from './product.actions';
// // import { ProductState } from '../product.state'
// import { productAdapter } from './product.adapter';
// import { EntityState } from '@ngrx/entity';

// // export const FEATURE_NAME = 'products';

// export interface ProductState extends EntityState<Product> {
//   selectedProductId: string | number | null;
// }

// export const initialState: ProductState = productAdapter.getInitialState({
//   selectedProductId: null
// });

// export function productReducer(
//   state = initialState,
//   action: fromActions.ProductActions
// ): ProductState {
//   switch (action.type) {
//     case fromActions.ProductActionTypes.LOAD_PRODUCT_SUCCESS: {
//       return productAdapter.addAll(action.payload.products, state);
//     }
//     case fromActions.ProductActionTypes.LOAD_PRODUCT_FAIL: {
//       return state;
//     }

//     default: {
//       return state;
//     }
//   }
// }