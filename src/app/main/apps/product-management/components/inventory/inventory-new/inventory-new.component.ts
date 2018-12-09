import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-inventory-new',
	templateUrl: './inventory-new.component.html',
	styleUrls: [ './inventory-new.component.scss' ],
	encapsulation: ViewEncapsulation.None
})
export class InventoryNewComponent implements OnInit {
	inventoryForm: FormGroup;

	constructor(public matDialogRef: MatDialogRef<InventoryNewComponent>, public fb: FormBuilder) {}

	ngOnInit(): void {
		this.inventoryForm = this.createContactForm();
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	/**
     * Create contact form
     */
	createContactForm(): FormGroup {
		return this.fb.group({
			name: [ '', Validators.compose([ Validators.required, Validators.minLength(6) ]) ],
			description: []
		});
	}
}
