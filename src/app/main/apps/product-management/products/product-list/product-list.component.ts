import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import {
    Component,
    OnInit,
    ViewEncapsulation,
    ViewChild,
    ElementRef
} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Product, demo_products } from '../model/product.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit {
    displayedColumns: string[] = [
        'productCode',
        'productName',
        'price',
        'active'
    ];
    dataSource = new MatTableDataSource<Product>();

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('filter')
    filter: ElementRef;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(private router: Router) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.dataSource.data = demo_products;
    }

    newProduct(): void {}

    selectProduct(productId: string): void {
        console.log(productId);
        
        this.router.navigate(['/apps/product-management/products/', productId]);
    }
}
