import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import {
    Component,
    OnInit,
    ViewEncapsulation,
    ViewChild,
    ElementRef,
    OnDestroy
} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Product, demo_products } from '../model/product.model';
import { ActivatedRoute, Router } from '@angular/router';

import { State } from '../../product-management.state';
import * as fromActions from '../state/product.actions';
import * as fromProduct from '../state';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = [
        'productCode',
        'productName',
        'price',
        'active'
    ];
    // dataSource = new MatTableDataSource<Product>();

    productList$: Observable<Product[]>;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('filter')
    filter: ElementRef;

    // Private
    // private unsubscribe$: Subject<void> = new Subject<void>();

    constructor(private router: Router, private store: Store<State>) {}

    ngOnInit(): void {
        this.productList$ = this.store.pipe(
            select(fromProduct.selectAllProducts)
        );
        this.store.dispatch(new fromActions.LoadProduct());
    }
    ngOnDestroy(): void {
        // this.unsubscribe$.next();
        // this.unsubscribe$.complete();
    }

    newProduct(): void {}

    selectProduct(productId: string): void {
        this.store.dispatch(new fromActions.SelectProduct({ productId }));

        // this.router.navigate(['/apps/product-management/products/', productId]);
    }
}
