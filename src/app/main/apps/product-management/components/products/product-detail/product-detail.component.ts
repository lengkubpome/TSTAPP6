import { fuseAnimations } from '@fuse/animations';
import {
	Component,
	OnInit,
	ViewEncapsulation,
	OnDestroy,
	Input,
	Output,
	EventEmitter
} from '@angular/core';
import { Subject } from 'rxjs';
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
	isEditedProduct = false;

	@Input() product: Product;
	@Input() productHistory: ProductHistory[] = [];
	@Input() productPriceHistory: ProductHistory[] = [];
	@Output() goBack = new EventEmitter<void>();

	// Private
	private unsubscribe$: Subject<void>;

	constructor() {
		this.unsubscribe$ = new Subject();
	}

	ngOnInit(): void {}

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

	onGoBack(): void {
		this.goBack.emit();
	}
}
