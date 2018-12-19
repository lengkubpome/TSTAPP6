import { InventoryDetailProductStockComponent } from './../inventory-detail-product-stock/inventory-detail-product-stock.component';
import { Inventory } from '../../../../model/inventory.model';
import { fuseAnimations } from '@fuse/animations';
import { Subject, Observable } from 'rxjs';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { InventoryProduct } from '@app/main/apps/product-management/model/inventory.model';
import { MatDialog } from '@angular/material';

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

	displayedColumns: string[] = [ 'name', 'storage_type', 'volume', 'amount', 'property' ];

	constructor(public dialog: MatDialog) {}

	ngOnInit(): void {}

	onSelectProductStock(): void {
		const dialogRef = this.dialog.open(InventoryDetailProductStockComponent, {
			panelClass: 'product-stock-form-dialog'
		});
	}
}
