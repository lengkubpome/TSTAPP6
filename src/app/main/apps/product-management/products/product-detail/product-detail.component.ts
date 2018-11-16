import { Product, demo_products } from '../model/product.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FuseUtils } from '@fuse/utils';
import { fuseAnimations } from '@fuse/animations';
import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProductDetailComponent implements OnInit, OnDestroy {

    displayedColumns: string[] = [
        'productCode',
        'productName',
        'price'
    ];
    dataSource = new MatTableDataSource<Product>();

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('filter')
    filter: ElementRef;

    product: Product;
    pageType: string;
    productForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar
    ) {
        // Set the default
        // this.product = new Product();

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.pageType = 'edit';

        this.dataSource.data = demo_products;
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    createProductForm(): FormGroup {
        return this._formBuilder.group({
            id: [],
            name: [],
            handle: [],
            description: [],
            categories: [],
            tags: [],
            images: [],
            priceTaxExcl: [],
            priceTaxIncl: [],
            taxRate: [],
            comparedPrice: [],
            quantity: [],
            sku: [],
            width: [],
            height: [],
            depth: [],
            weight: [],
            extraShippingFee: [],
            active: []
        });
    }

}
