import { fuseAnimations } from '@fuse/animations';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'inventory-list',
	templateUrl: './inventory-list.component.html',
	styleUrls: [ './inventory-list.component.scss' ],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class InventoryListComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
