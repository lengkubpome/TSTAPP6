import { Router} from '@angular/router';
import { InventoryService } from './../../../service/inventory.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromRouter from '@ngrx/router-store';

import { State } from '../../../product-management.state';
import * as fromApp from '../../../store';
import { Inventory } from '../../../model/inventory.model';

@Component({
	selector: 'app-inventory-shell',
	templateUrl: './inventory-shell.component.html'
})
export class InventoryShellComponent implements OnInit {
	inventories$: Observable<Inventory[]>;

	constructor(
		private store: Store<State>,
		private inventoryService: InventoryService,
		private router: Router
	) {}

	ngOnInit(): void {

		this.inventories$ = this.store.pipe(select(fromApp.selectAllInventory));
		this.store.dispatch(new fromApp.LoadInventory());
	}

	onCreateInventory(data: Inventory): void {
		this.store.dispatch(new fromApp.CreateInventory({ inventory: data }));
	}
	onManageInventory(inventory: Inventory): void {
		this.router.navigate([ '/apps/product-management/inventory', inventory.id ]);
	}
}
