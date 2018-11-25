import { ProductService } from '../../../service/product.service';
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
import { Product } from '../../../model/product.model';
import { ActivatedRoute, Router } from '@angular/router';

import { State } from '../../../product-management.state';
import * as fromProductStore from '../../../store';


@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['code', 'name', 'price', 'active'];
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

    constructor(
        private router: Router,
        private store: Store<State>,
        private productService: ProductService
    ) {}

    ngOnInit(): void {
        this.productList$ = this.store.pipe(
            select(fromProductStore.selectAllProducts)
        );
        this.store.dispatch(new fromProductStore.LoadProduct());
    }
    ngOnDestroy(): void {
        // this.unsubscribe$.next();
        // this.unsubscribe$.complete();
    }

    newProduct(): void {
    }

    selectProduct(productId: string): void {
        // this.store.dispatch(new fromProductStore.SelectProduct({ productId }));

        this.router.navigate(['/apps/product-management/products/', productId]);
    }
}
