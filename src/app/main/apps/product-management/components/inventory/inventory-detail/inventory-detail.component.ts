import { Inventory, InventoryProduct } from '../../../model/inventory.model';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';

import { State } from '../../../product-management.state';
import * as fromStore from '../../../store';
import { takeUntil, take } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
@Component({
	selector: 'inventory-detail',
	templateUrl: './inventory-detail.component.html',
	styleUrls: [ './inventory-detail.component.scss' ],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class InventoryDetailComponent implements OnInit {
	@Input() inventory$: Observable<Inventory>;
	@Output() goBack = new EventEmitter<void>();
	@Output() selectProductStock = new EventEmitter<InventoryProduct>();

	constructor(private store: Store<State>) {}

	ngOnInit(): void {}

	onGoBack(): void {
		this.goBack.emit();
	}

	onSelectProductStock(productStock: InventoryProduct): void {
		this.selectProductStock.emit(productStock);
	}
}
