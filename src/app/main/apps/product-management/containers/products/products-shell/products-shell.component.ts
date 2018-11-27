import { ActivatedRoute, Router } from '@angular/router';
import { ProductHistory } from './../../../model/product.model';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { State } from '../../../product-management.state';

import { Observable, Subject } from 'rxjs';

import * as fromProductStore from '../../../store';
import { Product } from '../../../model/product.model';
import { Location } from '@angular/common';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-products-shell',
	templateUrl: './products-shell.component.html'
})
export class ProductsShellComponent implements OnInit, OnDestroy {
	products$: Observable<Product[]>;
	product$: Observable<Product>;
	productHistory$: Observable<ProductHistory[]>;
	productPriceHistory$: Observable<ProductHistory[]>;

	isSelectedProduct = false;
	unsubscribe$ = new Subject<void>();

	constructor(
		private store: Store<State>,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location
	) {}

	ngOnInit(): void {
		this.products$ = this.store.pipe(select(fromProductStore.selectAllProducts));
		this.product$ = this.store.pipe(select(fromProductStore.selectCurrentProduct));
		this.productPriceHistory$ = this.store.pipe(select(fromProductStore.selectPriceHistory));

		this.store.dispatch(new fromProductStore.LoadProduct());
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	selectProduct(productId: string): void {
		const url = this.router.createUrlTree([ {} ], { relativeTo: this.route.parent }).toString();
		this.location.go(`${url}/product/${productId}`);

		this.store.dispatch(new fromProductStore.SelectProduct({ productId }));
		this.isSelectedProduct = true;
	}

	cancelSelectedProduct(): void {
		const url = this.router.createUrlTree([ {} ], { relativeTo: this.route }).toString();
		this.location.go(url);

		this.isSelectedProduct = false;
	}
}
