import { Router } from '@angular/router';
import { InventoryService } from '../../../service/inventory.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';

import * as fromRouter from '@ngrx/router-store';

import { State } from '../../../product-management.state';
import * as fromApp from '../../../store';
import { Inventory } from '../../../model/inventory.model';
import { SubscriptionService } from '@app/shared/services/subscription.service';

@Component({
	selector: 'app-inventory-list-shell',
	templateUrl: './inventory-list-shell.component.html'
})
export class InventoryListShellComponent implements OnInit, OnDestroy {
	inventories$: Observable<Inventory[]>;

	constructor(
		private store: Store<State>,
		private router: Router,
		private inventoryService: InventoryService,
		private subService: SubscriptionService
	) {}

	ngOnInit(): void {
		this.inventories$ = this.store.pipe(select(fromApp.selectAllInventory));
		this.store.dispatch(new fromApp.LoadInventory());
	}

	ngOnDestroy(): void {
		this.subService.unsubscribeComponent$.next();
	}

	onCreateInventory(data: Inventory): void {
		this.store.dispatch(new fromApp.CreateInventory({ inventory: data }));
	}
	onManageInventory(inventory: Inventory): void {
		this.store.dispatch(new fromApp.SelectInventory({ inventory }));
		// this.router.navigate([ '/apps/product-management/inventory', inventory.id ]);
	}
}
