import { Product } from './../../../../model/product.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'tab-infomation',
	templateUrl: './tab-infomation.component.html',
	styleUrls: [ './tab-infomation.component.scss' ],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class TabInfomationComponent implements OnInit, OnDestroy {
	unsubscribe$ = new Subject<void>();
	detailProductForm: FormGroup;
	productActive: boolean;
	isChangingPrice = false;
	isEditMode = false;

	@Input() isEditMode$: Observable<boolean>;
	@Input() productInfo: Product;
	@Output() saveEditProduct = new EventEmitter<any>();
	@Output() cancelEditProduct = new EventEmitter<any>();

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.detailProductForm = this.createProductForm();
		this.editedProductForm();
	}
	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	onChangePrice(): void {
		this.isChangingPrice = true;
		this.detailProductForm.get('price').enable();
	}
	onSaveChangePrice(): void {
		this.isChangingPrice = false;
		this.detailProductForm.get('price').disable();
	}
	onCancelChangePrice(): void {
		this.isChangingPrice = false;
		this.detailProductForm.get('price').disable();
	}

	onSaveEditProduct(): void {
		this.saveEditProduct.emit();
	}
	onCancelEditProduct(): void {
		this.cancelEditProduct.emit();
	}

	createProductForm(): FormGroup {
        this.productActive = this.productInfo.active;

		return this.formBuilder.group({
			name: [ { value: this.productInfo.name, disabled: true } ],
			code: [ { value: this.productInfo.code, disabled: true } ],
			detail: [ { value: this.productInfo.description, disabled: true } ],
			price: [ { value: this.productInfo.price, disabled: true } ]
		});
	}

	editedProductForm(): void {
		this.isEditMode$.pipe(takeUntil(this.unsubscribe$)).subscribe((isEdit) => {
			if (isEdit) {
				this.detailProductForm.get('name').enable();
				this.detailProductForm.get('code').enable();
				this.detailProductForm.get('detail').enable();
				this.detailProductForm.get('price').enable();
				this.isEditMode = true;
			} else {
				this.detailProductForm.get('name').disable();
				this.detailProductForm.get('code').disable();
				this.detailProductForm.get('detail').disable();
				this.detailProductForm.get('price').disable();
				this.isEditMode = false;
			}
		});
	}
}
