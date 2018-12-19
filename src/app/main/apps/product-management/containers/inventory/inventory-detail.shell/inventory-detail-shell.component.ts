import { Inventory } from '../../../model/inventory.model';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

import { State } from '../../../product-management.state';
import * as fromStore from '../../../store';
import { takeUntil, take } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
@Component({
	selector: 'app-inventory-shell',
	templateUrl: './inventory-detail-shell.component.html',
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class InventoryDetailShellComponent implements OnInit, OnDestroy {
	unsubscribe$ = new Subject<void>();
	inventory$: Observable<Inventory>;

	constructor(private store: Store<State>, private route: ActivatedRoute, private router: Router) {
		// Check URL
		this.store.pipe(take(1), select(fromStore.selectCurrentInventory)).subscribe((inventory) => {
			if (!inventory) this.onGoBack();
		});
	}

	ngOnInit(): void {
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
