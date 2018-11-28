import { fuseAnimations } from '@fuse/animations';
import {
    Component,
    OnInit,
    ViewEncapsulation,
    ViewChild,
    OnDestroy,
    Input,
    Output,
    EventEmitter,
    ElementRef
} from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Product } from '../../../model/product.model';


@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['code', 'name', 'price', 'active'];

    @Input() products: Product[];

    @Output() selectProduct = new EventEmitter<string>()
    @Output() newProduct = new EventEmitter<void>()

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('filter')
    filter: ElementRef;

    constructor(
    ) {}

    ngOnInit(): void {
    }
    ngOnDestroy(): void {
    }

    onNewProduct(): void {
        this.newProduct.emit();
    }

    onSelectProduct(productId: string): void {
        this.selectProduct.emit(productId)
        // this.router.navigate(['/apps/product-management/products/', productId]);
    }
}
