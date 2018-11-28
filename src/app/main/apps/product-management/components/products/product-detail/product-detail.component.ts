import { fuseAnimations } from '@fuse/animations';
import { Component, OnInit, ViewEncapsulation, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material';

import { Product, ProductHistory } from '../../../model/product.model';

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: [ './product-detail.component.scss' ],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class ProductDetailComponent implements OnInit, OnDestroy {
	productStatus: string;
	selectedTab = 0;
	isEditMode = false;

	@Input() productInfo: Product;
	@Input() productHistory: ProductHistory[] = [];
	@Input() productPriceHistory: ProductHistory[] = [];
	@Input() isEditMode$: Observable<boolean>;
	@Output() editMode = new EventEmitter<void>();
	@Output() saveEditMode = new EventEmitter<Product>();
	@Output() cancelEditMode = new EventEmitter<void>();
	@Output() goBack = new EventEmitter<void>();

	// Private
	private unsubscribe$: Subject<void>;

	constructor() {
		this.unsubscribe$ = new Subject();
	}

	ngOnInit(): void {
		this.isEditMode$.subscribe((mode) => (this.isEditMode = mode));
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
		this.editMode.emit();
	}

	onDelectProduct(): void {
		console.log('Delete Product');
	}

	onSaveEditProduct(data: Product): void {
        // this.productInfo = data;
		this.saveEditMode.emit(data);
	}
	onCancelEditProduct(): void {
		this.cancelEditMode.emit();
	}

	onGoBack(): void {
		this.goBack.emit();
	}
}
