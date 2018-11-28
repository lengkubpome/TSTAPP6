import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, mergeMap, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';

import * as fromActions from '../actions';
import * as fromProductManagement from '../../product-management.state';

const BUSINESS_ID = '0406069000354';

@Injectable()
export class ProductEffect {
	constructor(
		private actions$: Actions,
		private store: Store<fromProductManagement.State>,
		private productService: ProductService,
		private router: Router
	) {}

	@Effect({})
	loadProducts$: Observable<Action> = this.actions$.pipe(
		ofType(fromActions.LOAD_PRODUCT),
		mergeMap((action: fromActions.LoadProduct) => {
			return this.productService
				.getProducts()
				.pipe(
					map((products) => new fromActions.LoadProductSuccess({ products })),
					catchError((error) => of(new fromActions.LoadProductFail({ errorMessage: error })))
				);
		})
	);

	@Effect()
	selectProduct$: Observable<Action> = this.actions$.pipe(
		ofType(fromActions.SELECT_PRODUCT),
		map((action: fromActions.SelectProduct) => action.payload),
		withLatestFrom(this.store.pipe(select(fromProductManagement.getProductManagementState))),
		map(([ payload, storeState ]) => {
			const productIds = storeState.products.ids as string[];
			if (productIds.includes(payload.productId)) {
				return new fromActions.LoadProductHistory({ productId: payload.productId });
			} else {
				this.router.navigate([ '/apps/product-management/products' ]);
				return new fromActions.ClearSelectedProduct();
			}
		})
	);

	@Effect()
	loadProductHistory$: Observable<Action> = this.actions$.pipe(
		ofType(fromActions.LOAD_PRODUCT_HISTORY),
		switchMap((action: fromActions.SelectProduct) => {
			return this.productService
				.getProductHistory(action.payload.productId)
				.pipe(
					map((histories) => new fromActions.LoadProductHistorySuccess({ histories })),
					catchError((error) => of(new fromActions.LoadProductHistoryFail({ errorMessage: error })))
				);
		})
	);

	// @Effect()
	// updateProduct$: Observable<Action> = this.actions$.pipe(
	// 	ofType(fromActions.UPDATE_PRODUCT),
	// 	map((action: fromActions.UpdateProduct) => {
	// 		const data = action.payload.update;
	// 		return new fromActions.UpdateProductSuccess({ product: { id: data.id, changes: data } });

	// 		// return this.productService
	// 		// 	.getProductHistory(action.payload.productId)
	// 		// 	.pipe(
	// 		// 		map((histories) => new fromActions.LoadProductHistorySuccess({ histories })),
	// 		// 		catchError((error) => of(new fromActions.LoadProductHistoryFail({ errorMessage: error })))
	// 		// 	);
	// 	}),
	// );
}
