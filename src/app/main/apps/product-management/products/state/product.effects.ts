import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromActions from './product.actions';
import { switchMap, map } from 'rxjs/operators';
import { ProductService } from '../service/product.service';

@Injectable()
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) {}

    @Effect({})
    loadProducts$: Observable<Action> = this.actions$.pipe(
        ofType(fromActions.ProductActionTypes.LOAD_PRODUCT),
        switchMap(() =>
            this.productService
                .getAllProduct()
                .pipe(
                    map(
                        data =>
                            new fromActions.LoadProductSuccess({
                                products: data
                            })
                    )
                )
        )
    );
}
