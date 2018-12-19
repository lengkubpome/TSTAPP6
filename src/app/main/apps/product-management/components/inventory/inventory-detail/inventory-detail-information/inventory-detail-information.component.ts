import { fuseAnimations } from '@fuse/animations';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'inventory-detail-information',
	templateUrl: './inventory-detail-information.component.html',
	styleUrls: [ './inventory-detail-information.component.scss' ],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class InventoryDetailInformationComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
