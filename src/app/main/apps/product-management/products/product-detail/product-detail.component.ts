import { Router, ActivatedRoute } from '@angular/router';
import { Product, demo_products } from '../model/product.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FuseUtils } from '@fuse/utils';
import { fuseAnimations } from '@fuse/animations';
import {
    Component,
    OnInit,
    ViewEncapsulation,
    OnDestroy,
    ViewChild,
    ElementRef
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
    MatSnackBar,
    MatTableDataSource,
    MatPaginator,
    MatSort,
    MatTabChangeEvent
} from '@angular/material';
import { Store, select } from '@ngrx/store';

import { State } from '../../product-management.state';
import * as fromActions from '../store/product.actions';
import * as fromProduct from '../store';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProductDetailComponent implements OnInit, OnDestroy {
    detailProductForm: FormGroup;

    displayedColumns: string[] = ['code', 'name', 'price'];
    dataSource = new MatTableDataSource<Product>();

    product: Product;
    pageType: string;
    productForm: FormGroup;

    productStatus: string;

    selectedTab = 0;
    isEditedProduct = false;
    isChangingPrice = false;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('filter')
    filter: ElementRef;

    // Private
    private unsubscribe$: Subject<void>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private store: Store<State>,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar
    ) {
        // Set the default
        // this.product = new Product();

        // Set the private defaults
        this.unsubscribe$ = new Subject();
    }

    ngOnInit(): void {
        this.route.params
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(param => {
                this.store.dispatch(
                    new fromActions.SelectProduct({ productId: param.id })
                );
            });

        // this.store
        //     .pipe(
        //         select(fromProduct.selectProductIds),
        //         takeUntil(this.unsubscribe$)
        //     )
        //     .subscribe(p => {
        //         if (p === undefined) {
        //             this.router.navigate(['/apps/product-management/products']);
        //         } else {
        //             console.log(p);
        //         }
        //     });

        this.detailProductForm = this.createProductForm();
        this.productStatus = 'Active';
        this.dataSource.data = demo_products;
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    onTabClick(event: MatTabChangeEvent): void {
        this.selectedTab = event.index;
    }

    onEditProduct(): void {
        this.isEditedProduct = true;
    }

    onSaveEditProduct(): void {
        this.isEditedProduct = false;
    }
    onCancelEditProduct(): void {
        this.isEditedProduct = false;
    }
    onDelectProduct(): void {
        console.log('Delete Product');
    }

    onChangePrice(): void {
        this.isChangingPrice = true;
        this.detailProductForm.get('price').enable();
    }
    onSaveChangePrice(): void {
        this.isChangingPrice = false;
        this.detailProductForm.get('price').disable();
    }
    onCancelChangePrice(): void {
        this.isChangingPrice = false;
        this.detailProductForm.get('price').disable();
    }

    createProductForm(): FormGroup {
        return this._formBuilder.group({
            name: [],
            code: [],
            detail: [],
            price: []
        });
    }
}
