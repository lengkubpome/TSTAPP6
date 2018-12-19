import { FormInventoryNewComponent } from './../../form-inventory-new/form-inventory-new.component';
import { MatDialogRef } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'inventory-detail-product-stock',
	templateUrl: './inventory-detail-product-stock.component.html',
	styleUrls: [ './inventory-detail-product-stock.component.scss' ],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class InventoryDetailProductStockComponent implements OnInit {
	editMode = false;
	selectedStatus = 'active';
	statusType = [
		{ value: 'active', text: 'Active', color: 'primary' },
		{ value: 'inactive', text: 'Inactive', color: 'accent' },
		{ value: 'recently_deleted', text: 'Recently Deleted', color: 'warn' }
	];
	selectedStorage = 'fifo';
	storageType = [
		{ value: 'fifo', text: 'First In First Out', color: 'primary' },
		{ value: 'lifo', text: 'Last In First Out', color: 'accent' }
	];

	constructor(public matDialogRef: MatDialogRef<FormInventoryNewComponent>) {}

	ngOnInit(): void {}

	onSaveEdited(): void {}
}
