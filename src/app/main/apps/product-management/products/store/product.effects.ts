import { ProductHistory } from './../model/product.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromActions from './product.actions';
import * as fromReducer from '../../product-management.state';
import * as fromProduct from './index';
import {
    switchMap,
    map,
    tap,
    mergeMap,
    catchError,
    withLatestFrom
} from 'rxjs/operators';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';
import { Product } from '../model/product.model';

const BUSINESS_ID = '0406069000354';

@Injectable()
export class ProductEffects {
    constructor(
        private afs: AngularFirestore,
        private actions$: Actions,
        private store: Store<fromReducer.State>,
        private productService: ProductService,
        private router: Router
    ) {}

    @Effect({})
    loadProducts$: Observable<Action> = this.actions$.pipe(
        ofType(fromActions.ProductActionTypes.LOAD_PRODUCT),
        mergeMap((action: fromActions.LoadProduct) => {
            return this.productService.getProducts().pipe(
                map(
                    products => new fromActions.LoadProductSuccess({ products })
                )
                // catchError(error => of(new fromActions.LoadProductFail({error})))
            );
        })
    );

    @Effect()
    selectProduct$: Observable<Action> = this.actions$.pipe(
        ofType(fromActions.ProductActionTypes.SELECT_PRODUCT),
        map((action: fromActions.SelectProduct) => action.payload),
        withLatestFrom(
            this.store.pipe(select(fromReducer.selectProductManagementState))
        ),
        map(([payload, storeState]) => {
            const productIds = storeState.products.ids as string[];
            productIds.includes(payload.productId)
                ? console.log('Load History next')
                : this.router.navigate(['/apps/product-management/products']);

            return new fromActions.LoadHistoryProduct({ history: null });
        })
        // switchMap(
        //     ([action, storeState]: [fromActions.SelectProduct, any[]]) => {
        //         console.log('xxxxxx');
        //         console.log(action.payload.productId);
        //         console.log(storeState.);
        //         return new fromActions.LoadHistoryProduct({ history: [] });
        //     }
        // )
        // map(() => new fromActions.LoadHistoryProduct({ history: [] }))
    );

    // @Effect({})
    // selectProduct$: Observable<Action> = this.actions$.pipe(
    //     ofType(fromActions.ProductActionTypes.SELECT_PRODUCT),
    //     switchMap((action: fromActions.SelectProduct) => {
    //         return this.afs
    //             .collection('business')
    //             .doc(BUSINESS_ID)
    //             .collection('products')
    //             .doc(action.payload.productId)
    //             .collection('history')
    //             .snapshotChanges()
    //             .pipe(
    //                 map(historyArr => {
    //                     return historyArr.map(history => {
    //                         const data = history.payload.doc.data();
    //                         return {
    //                             id: history.payload.doc.id,
    //                             ...data
    //                         } as ProductHistory;
    //                     });
    //                 })
    //             );
    //     }),
    //     map(arr => {
    //         // console.log(arr);
    //         return new fromActions.LoadHistoryProduct({ history: arr });
    //     })
    // );
}
