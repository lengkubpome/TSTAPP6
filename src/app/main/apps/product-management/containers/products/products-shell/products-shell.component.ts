import { Update } from '@ngrx/entity';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductHistory } from './../../../model/product.model';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Location } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { State } from '../../../product-management.state';

import { Observable, Subject } from 'rxjs';
import { Product } from '../../../model/product.model';
import * as fromProductStore from '../../../store';
import { MatDialog } from '@angular/material';
import { ProductNewComponent } from '../../../components/products/product-new/product-new.component';

@Component({
	selector: 'app-products-shell',
	templateUrl: './products-shell.component.html'
})
export class ProductsShellComponent implements OnInit, OnDestroy {
	USERNAME = 'Tester';

	products$: Observable<Product[]>;
	product$: Observable<Product>;
	productHistory$: Observable<ProductHistory[]>;
	productPriceHistory$: Observable<ProductHistory[]>;
	isEditMode$: Observable<boolean>;

	isSelectedProduct = false;
	unsubscribe$ = new Subject<void>();

	constructor(
		private store: Store<State>,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location,
		private dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.products$ = this.store.pipe(select(fromProductStore.selectAllProducts));
		this.product$ = this.store.pipe(select(fromProductStore.selectCurrentProduct));
		this.productPriceHistory$ = this.store.pipe(select(fromProductStore.selectPriceHistory));
		this.isEditMode$ = this.store.pipe(select(fromProductStore.selectEditMode));

		this.store.dispatch(new fromProductStore.LoadProduct());
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	onNewProduct(): void {
		const dialogInRef = this.dialog.open(ProductNewComponent, {
			width: '90%',
			maxWidth: '600px',
			autoFocus: true,
			// disableClose: true
		});

		// dialogInRef.afterClosed().subscribe(() => {
		// 	if (this.weightLoadingMode === 'manual') {
		// 		setTimeout(() => {
		// 			this.snackBar.open('Manual Mode');
		// 		}, 2000);
		// 	}
		// });
	}

	onSelectProduct(productId: string): void {
		const url = this.router.createUrlTree([ {} ], { relativeTo: this.route.parent }).toString();
		this.location.go(`${url}/product/${productId}`);

		this.store.dispatch(new fromProductStore.SelectProduct({ productId }));
		this.isSelectedProduct = true;
	}

	onEditMode(): void {
		console.log('Edit Mode');
		this.store.dispatch(new fromProductStore.EditMode());
	}

	onSaveEditMode(product: Update<Product>): void {
		this.store.dispatch(new fromProductStore.UpdateProduct({ product, editor: this.USERNAME }));
	}

	onCancelEditMode(): void {
		console.log('Cancel Edit Mode');
		this.store.dispatch(new fromProductStore.CancelEditMode());
	}

	onCancelSelectedProduct(): void {
		const url = this.router.createUrlTree([ {} ], { relativeTo: this.route }).toString();
		this.location.go(url);

		this.isSelectedProduct = false;
	}
}
