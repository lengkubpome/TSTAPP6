import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { State } from './../../../product-management.state';
import * as fromStore from '../../../store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
	selector: 'app-inventory-detail-shell',
	templateUrl: './inventory-detail-shell.component.html',
	styleUrls: [ './inventory-detail-shell.component.scss' ]
})
export class InventoryDetailShellComponent implements OnInit, OnDestroy {
	unsubscribe$ = new Subject<void>();
	constructor(private store: Store<State>, private router: Router) {}

	ngOnInit(): void {
		this.store.pipe(
            takeUntil(this.unsubscribe$), 
            select(fromStore.selectCurrentInventory)).subscribe((inventory) => {
			if (!inventory) {
				this.router.navigate([ '/apps/product-management/inventory' ]);
			}
			console.log(inventory);
		});
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}
