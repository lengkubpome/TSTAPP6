import { Inventory } from '../../../model/inventory.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'form-inventory-new',
	templateUrl: './form-inventory-new.component.html',
	styleUrls: [ './form-inventory-new.component.scss' ],
	encapsulation: ViewEncapsulation.None
})
export class FormInventoryNewComponent implements OnInit {
	inventoryForm: FormGroup;

	constructor(public matDialogRef: MatDialogRef<FormInventoryNewComponent>, public fb: FormBuilder) {}

	ngOnInit(): void {
		this.inventoryForm = this.createContactForm();
	}

	onSubmit(): void {
		const value: Inventory = this.inventoryForm.value;
		this.matDialogRef.close(value);
	}

	// -----------------------------------------------------------------------------------------------------
	// Function
	// -----------------------------------------------------------------------------------------------------

	createContactForm(): FormGroup {
		return this.fb.group({
			name: [ '', Validators.compose([ Validators.required, Validators.minLength(6) ]) ],
			description: []
		});
	}
}
