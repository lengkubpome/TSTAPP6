import { InventoryProduct } from './../../../../model/inventory.model';
import { Inventory } from '../../../../model/inventory.model';
import { fuseAnimations } from '@fuse/animations';
import { Subject, Observable } from 'rxjs';
import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'inventory-detail-product-stocks',
	templateUrl: './inventory-detail-product-stocks.component.html',
	styleUrls: [ './inventory-detail-product-stocks.component.scss' ],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class InventoryDetailProductStocksComponent implements OnInit {
	unsubscribe$ = new Subject<void>();

	@Input() inventory$: Observable<Inventory>;
	@Output() selectProductStock = new EventEmitter<Inventory>();

	displayedColumns: string[] = [ 'name', 'storage_type', 'volume', 'amount', 'property' ];

	constructor() {}

	ngOnInit(): void {}

	onSelectProductStock(productStock: InventoryProduct): void {
        this.selectProductStock.emit(productStock);
        
	}
}
