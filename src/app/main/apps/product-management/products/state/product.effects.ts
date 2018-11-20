import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromActions from './product.actions';
import { switchMap, map, tap, mergeMap } from 'rxjs/operators';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';
import { Product } from '../model/product.model';

@Injectable()
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private productService: ProductService,
        private router: Router
    ) {}

    @Effect({})
    loadProducts$: Observable<Action> = this.actions$.pipe(
        ofType(fromActions.ProductActionTypes.LOAD_PRODUCT),
        mergeMap((action: fromActions.LoadProduct) =>
            this.productService.getAllProduct().pipe(
                map(
                    (products: Product[]) =>
                        new fromActions.LoadProductSuccess({
                            products
                        })
                )
            )
        )
    );

    // @Effect({})
    // selectProduct$: Observable<Action> = this.actions$.pipe(
    //     ofType(fromActions.ProductActionTypes.SELECT_PRODUCT),
    //     mergeMap((action: fromActions.SelectProduct) =>
    //         this.productService.selectProductById().pipe(map()=>)

    //     )
    // );
}
