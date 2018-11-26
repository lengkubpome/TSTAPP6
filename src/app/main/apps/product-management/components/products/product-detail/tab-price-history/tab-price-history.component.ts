import { ProductHistory } from './../../../../model/product.model';
import { fuseAnimations } from '@fuse/animations';
import { Subject, Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, ViewEncapsulation, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Product, demo_products } from '../../../../model/product.model';

@Component({
	selector: 'tab-price-history',
	templateUrl: './tab-price-history.component.html',
	styleUrls: [ './tab-price-history.component.scss' ],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class TabPriceHistoryComponent implements OnInit, OnDestroy {
	displayedColumns: string[] = [ 'dateTime', 'editor' ];

	@Input() priceHistory: ProductHistory[];

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;

	private unsubscribe$: Subject<void>;
	constructor() {
		this.unsubscribe$ = new Subject();
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		// Unsubscribe from all subscriptions
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}
