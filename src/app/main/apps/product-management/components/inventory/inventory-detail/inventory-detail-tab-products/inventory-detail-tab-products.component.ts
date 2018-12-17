import { Inventory } from './../../../../model/inventory.model';
import { fuseAnimations } from '@fuse/animations';
import { Subject, Observable } from 'rxjs';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { InventoryProduct } from '@app/main/apps/product-management/model/inventory.model';
import { MatTableDataSource } from '@angular/material';

@Component({
	selector: 'inventory-detail-tab-products',
	templateUrl: './inventory-detail-tab-products.component.html',
	styleUrls: [ './inventory-detail-tab-products.component.scss' ],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class InventoryDetailTabProductsComponent implements OnInit {
	unsubscribe$ = new Subject<void>();
	dataSource = new MatTableDataSource<InventoryProduct>();

	// @Input() product_stocks$: Observable<InventoryProduct[]>;
	@Input() product_stocks: InventoryProduct[];

	displayedColumns: string[] = [ 'name', 'storage_type', 'volume', 'amount', 'property' ];

	constructor() {
	}

	ngOnInit(): void {
		// console.log(this.product_stocks);
		!this.product_stocks
		? (this.dataSource.data = null)
		: (this.dataSource.data = this.product_stocks);
	}
}
