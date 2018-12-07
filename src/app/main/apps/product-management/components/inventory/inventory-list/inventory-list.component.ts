import { Inventory } from './../../../model/inventory.model';
import { Observable } from 'rxjs';
import { InventoryService } from './../../../service/inventory.service';
import { fuseAnimations } from '@fuse/animations';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
	selector: 'inventory-list',
	templateUrl: './inventory-list.component.html',
	styleUrls: [ './inventory-list.component.scss' ],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class InventoryListComponent implements OnInit {

	@Input() inventories: Inventory[];
    
    constructor(private inventoryService: InventoryService) {}

	ngOnInit(): void {}

	test(): void {
		this.inventoryService.getInventory();
	}
}
