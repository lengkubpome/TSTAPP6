import { Inventory } from './../../../model/inventory.model';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

import { State } from './../../../product-management.state';
import * as fromStore from '../../../store';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
@Component({
	selector: 'app-inventory-detail-shell',
	templateUrl: './inventory-detail-shell.component.html',
	styleUrls: [ './inventory-detail-shell.component.scss' ],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class InventoryDetailShellComponent implements OnInit, OnDestroy {
	unsubscribe$ = new Subject<void>();
	_inventory: Inventory;
	inventory$: Observable<Inventory>;

	constructor(private store: Store<State>, private route: ActivatedRoute, private router: Router) {}

	ngOnInit(): void {
		// Check URL
		this.store
			.pipe(takeUntil(this.unsubscribe$), select(fromStore.selectCurrentInventory))
			.subscribe((inventory) => {
				if (!inventory) {
					this.onGoBack();
				}
		        this._inventory = inventory;

			});

		this.inventory$ = this.store.pipe(select(fromStore.selectCurrentInventory));
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	onGoBack(): void {
		this.router.navigate([ '/apps/product-management/inventory' ]);
	}
}
