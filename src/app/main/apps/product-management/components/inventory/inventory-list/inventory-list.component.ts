import { MatDialog } from '@angular/material';
import { Inventory, InventoryProduct } from './../../../model/inventory.model';
import { Observable, Subject } from 'rxjs';
import { InventoryService } from './../../../service/inventory.service';
import { fuseAnimations } from '@fuse/animations';
import { Component, OnInit, ViewEncapsulation, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormInventoryNewComponent } from './../form-inventory-new/form-inventory-new.component';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'inventory-list',
	templateUrl: './inventory-list.component.html',
	styleUrls: [ './inventory-list.component.scss' ],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class InventoryListComponent implements OnInit, OnDestroy {
	unsubscribe$ = new Subject<void>();

	@Input() inventories: Inventory[];
	@Output() createInventory = new EventEmitter<Inventory>();
	@Output() manageInventory = new EventEmitter<Inventory>();

	constructor(private inventoryService: InventoryService, public dialog: MatDialog) {}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();

		this.inventoryService.unsubscribeComponent$.next();
	}

	onNewInventory(): void {
		const dialogRef = this.dialog.open(FormInventoryNewComponent, {
			panelClass: 'contact-form-dialog'
		});

		dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe((value: Inventory) => {
			if (!value) {
				return;
			}
			this.createInventory.emit(value);
		});
	}

	onManageInventory(inventory: Inventory): void {
		this.manageInventory.emit(inventory);
	}
}
