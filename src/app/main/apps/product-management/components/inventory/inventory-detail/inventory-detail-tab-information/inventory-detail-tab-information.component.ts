import { fuseAnimations } from '@fuse/animations';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'inventory-detail-tab-information',
	templateUrl: './inventory-detail-tab-information.component.html',
	styleUrls: [ './inventory-detail-tab-information.component.scss' ],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class InventoryDetailTabInformationComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
