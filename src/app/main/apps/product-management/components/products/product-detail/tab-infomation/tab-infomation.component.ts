import { Product } from './../../../../model/product.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'tab-infomation',
	templateUrl: './tab-infomation.component.html',
	styleUrls: [ './tab-infomation.component.scss' ],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class TabInfomationComponent implements OnInit {
	detailProductForm: FormGroup;
	productStatus: string;
	isChangingPrice = false;

    @Input() editMode: boolean;
    @Input() productInfo: Product;
    @Output() saveEditProduct = new EventEmitter<any>()
    @Output() cancelEditProduct = new EventEmitter<any>()

	constructor(private _formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.detailProductForm = this.createProductForm();
		this.productStatus = 'Active';
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
		return this._formBuilder.group({
			name: [this.productInfo.name],
			code: [this.productInfo.code],
			detail: [this.productInfo.description],
			price: [this.productInfo.price]
		});
	}
}
