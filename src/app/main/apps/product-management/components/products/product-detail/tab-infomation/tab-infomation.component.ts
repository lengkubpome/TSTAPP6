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
	productInfo: Product;
	isChangingPrice = false;
	isEditMode = false;

	@Input() isEditMode$: Observable<boolean>;
	@Input() productInfo$: Observable<Product>;
	@Output() saveEditProduct = new EventEmitter<any>();
	@Output() cancelEditProduct = new EventEmitter<void>();

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.productInfo$.pipe(takeUntil(this.unsubscribe$)).subscribe((product) => {
			this.productInfo = product;
		});

		this.detailProductForm = this.createProductForm();
		this.editedProductForm();
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	// Change Price
	onChangePrice(): void {
		this.isChangingPrice = true;
		this.detailProductForm.get('price').enable();
	}

	onSaveChangePrice(): void {
		const data = this.generateEditProduct();
		this.saveEditProduct.emit(data);

		this.isChangingPrice = false;
		this.detailProductForm.get('price').disable();
	}

	onCancelChangePrice(): void {
		this.isChangingPrice = false;
		this.setValueProductForm(this.productInfo);
		this.detailProductForm.get('price').disable();
	}

	// Edit Product
	onSaveEditProduct(): void {
		const data = this.generateEditProduct();

		this.saveEditProduct.emit(data);
	}

	onCancelEditProduct(): void {
		this.setValueProductForm(this.productInfo);
		this.cancelEditProduct.emit();
	}

	onChangeStatus(value: boolean): void {
		this.productActive = value;
	}

	// -----------------------------------------------------------------------------------------------------
	// Function
	// -----------------------------------------------------------------------------------------------------

	createProductForm(): FormGroup {
		this.productActive = this.productInfo.status.active;

		return this.formBuilder.group({
			name: [ { value: this.productInfo.name, disabled: true } ],
			code: [ { value: this.productInfo.code, disabled: true } ],
			description: [ { value: this.productInfo.description, disabled: true } ],
			price: [ { value: this.productInfo.price, disabled: true } ]
		});
	}

	editedProductForm(): void {
		this.isEditMode$.pipe(takeUntil(this.unsubscribe$)).subscribe((isEdit) => {
			if (isEdit) {
				this.detailProductForm.get('name').enable();
				this.detailProductForm.get('code').enable();
				this.detailProductForm.get('description').enable();
				this.detailProductForm.get('price').enable();
				this.isEditMode = true;
			} else {
				this.detailProductForm.get('name').disable();
				this.detailProductForm.get('code').disable();
				this.detailProductForm.get('description').disable();
				this.detailProductForm.get('price').disable();
				this.isEditMode = false;
			}
		});
	}

	setValueProductForm(product: Product): void {
		this.detailProductForm.get('name').setValue(product.name);
		this.detailProductForm.get('code').setValue(product.code);
		this.detailProductForm.get('description').setValue(product.description);
		this.detailProductForm.get('price').setValue(product.price);
		this.productActive = product.status.active;
	}

	// แปลงข้อมูลเฉพาะข้อมูลที่มีการเปลี่ยนแปลง
	// เพื่อลดปริมาณข้อมูลการบันทึกและทำให้ง่ายต่อการแยกข้อมูลภายหลัง
	generateEditProduct(): Product {
		let data: Product;

		this.productActive !== this.productInfo.status.active
			? (data = {
					status: { active: this.productActive, updateAt: new Date(Date.now()) },
					...this.detailProductForm.value
				})
			: (data = {
					...this.detailProductForm.value
				});

		let newData = { id: this.productInfo.id };
		Object.keys(data).map((key, index) => {
			return data[key] !== this.productInfo[key]
				? (newData = Object.assign({ [key]: data[key], ...newData }, newData))
				: {};
		});

		return newData;
	}
}
