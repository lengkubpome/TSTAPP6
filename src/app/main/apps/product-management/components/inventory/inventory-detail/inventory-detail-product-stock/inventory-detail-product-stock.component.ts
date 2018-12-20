import { FormGroup, FormBuilder } from '@angular/forms';
import { FormInventoryNewComponent } from './../../form-inventory-new/form-inventory-new.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Inventory, InventoryProduct } from '../../../../model/inventory.model';

@Component({
	selector: 'inventory-detail-product-stock',
	templateUrl: './inventory-detail-product-stock.component.html',
	styleUrls: [ './inventory-detail-product-stock.component.scss' ],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class InventoryDetailProductStockComponent implements OnInit {
	productStockForm: FormGroup;
	productStock: InventoryProduct;

	editMode = false;
	statusType = [
		{ value: 'active', text: 'Active', color: 'primary' },
		{ value: 'inactive', text: 'Inactive', color: 'accent' },
		{ value: 'recently_deleted', text: 'Recently Deleted', color: 'warn' }
	];
	storageType = [
		{ value: 'FIFO', text: 'First In First Out', color: 'primary' },
		{ value: 'LIFO', text: 'Last In First Out', color: 'accent' }
	];

	constructor(
		public matDialogRef: MatDialogRef<FormInventoryNewComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { productStock: InventoryProduct },
		public fb: FormBuilder
	) {}

	ngOnInit(): void {
		this.productStock = this.data.productStock;
        this.productStockForm = this.setupProductStockForm();
        this.productStockForm.disable();
	}

	onEditMode(): void {
        this.editMode = true;
        this.productStockForm.enable();
    }

	onCancelEditMode(): void {
        this.editMode = false;
        this.productStockForm.disable();
    }

	onSubmit(): void {
        const value = this.productStockForm.value;
        console.log(value);
        this.productStockForm.disable();
        
		// this.matDialogRef.close(value)
	}


	// -----------------------------------------------------------------------------------------------------
	// Function
	// -----------------------------------------------------------------------------------------------------

	setupProductStockForm(): FormGroup {
		return this.fb.group({
			status: [ this.productStock.status.value ],
			storage_type: [ this.productStock.storage_type ]
		});
	}
}
