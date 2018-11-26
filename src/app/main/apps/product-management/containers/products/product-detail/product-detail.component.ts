import { ActivatedRoute } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { MatPaginator, MatSort, MatTabChangeEvent } from '@angular/material';
import { Store, select } from '@ngrx/store';

import { State } from '../../../product-management.state';
import * as fromProductStore from '../../../store';
import { Product, ProductHistory } from '../../../model/product.model';

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: [ './product-detail.component.scss' ],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class ProductDetailComponent implements OnInit, OnDestroy {
	product: Product;
	productPricHistories: ProductHistory[];
	productStatus: string;

	selectedTab = 0;
	isEditedProduct = false;

	// Private
	private unsubscribe$: Subject<void>;

	constructor(private route: ActivatedRoute, private store: Store<State>) {
		this.unsubscribe$ = new Subject();
	}

	ngOnInit(): void {
		this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe((param) => {
			this.store.dispatch(new fromProductStore.SelectProduct({ productId: param.id }));
		});

		this.store
			.pipe(takeUntil(this.unsubscribe$), select(fromProductStore.selectCurrentProduct))
			.subscribe((product) => (this.product = product));

		// this.productPricHistory$ = this.store.pipe(
		// 	takeUntil(this.unsubscribe$),
		// 	select(fromProductStore.selectPriceHistory)
		// );

		this.store
			.pipe(takeUntil(this.unsubscribe$), select(fromProductStore.selectPriceHistory))
			.subscribe((histories) => {
                console.log(histories);
                
				// this.productPricHistories = histories.filter((history) =>
				// 	history.product_update.hasOwnProperty('price')
				// );
			});
	}

	ngOnDestroy(): void {
		// Unsubscribe from all subscriptions
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	onTabClick(event: MatTabChangeEvent): void {
		this.selectedTab = event.index;
	}

	onEditProduct(): void {
		this.isEditedProduct = true;
	}

	onDelectProduct(): void {
		console.log('Delete Product');
	}

	saveEditProduct(): void {
		this.isEditedProduct = false;
	}
	cancelEditProduct(): void {
		this.isEditedProduct = false;
	}
}
