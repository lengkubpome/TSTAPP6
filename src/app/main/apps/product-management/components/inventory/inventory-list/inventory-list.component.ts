import { MatDialog } from '@angular/material';
import { Inventory, InventoryProduct } from './../../../model/inventory.model';
import { Observable } from 'rxjs';
import { InventoryService } from './../../../service/inventory.service';
import { fuseAnimations } from '@fuse/animations';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { InventoryNewComponent } from '../inventory-new/inventory-new.component';

@Component({
	selector: 'inventory-list',
	templateUrl: './inventory-list.component.html',
	styleUrls: [ './inventory-list.component.scss' ],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class InventoryListComponent implements OnInit {
	displayedColumns: string[] = [ 'name', 'stock_type', 'volume', 'amount' ];

	@Input() inventories: Inventory[];

	constructor(private inventoryService: InventoryService, public dialog: MatDialog) {}

	ngOnInit(): void {
		console.log(this.inventories);
	}

	onNewInventory(): void {
		let dialogRef = this.dialog.open(InventoryNewComponent, {
			panelClass: 'contact-form-dialog',
		});
	}
}
