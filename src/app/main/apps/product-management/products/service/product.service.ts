import { Product, demo_products } from './../model/product.model';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class ProductService {
    demo = new BehaviorSubject(demo_products);

    constructor() {
        console.log('Start Service!!');
    }

    getAllProduct(): Observable<Product[]> {
        return this.demo;
    }
    selectProductById(id: string): Observable<Product> {
        return;
    }
}
