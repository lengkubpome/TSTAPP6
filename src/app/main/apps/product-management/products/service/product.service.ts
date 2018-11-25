import { Product } from './../model/product.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromProductManagement from '../../product-management.state';
import { ProductHistory } from '../model/product-history.model';

@Injectable()
export class ProductService {
    private BUSINESS_ID: string;

    constructor(
        private afs: AngularFirestore,
        private store: Store<fromProductManagement.State>
    ) {
        this.BUSINESS_ID = '0406069000354';
    }

    getProducts(): Observable<Product[]> {
        return this.afs
            .collection(`business/${this.BUSINESS_ID}/products`)
            .snapshotChanges()
            .pipe(
                map(products => {
                    return products.map(doc => {
                        const data = doc.payload.doc.data();
                        return {
                            id: doc.payload.doc.id,
                            ...data
                        } as Product;
                    });
                }),
                catchError((error: any) => Observable.throw(error.json()))
            );
    }

    getProductHistory(id: string): Observable<any> {

        return this.afs
            .collection(`business/${this.BUSINESS_ID}/products/${id}/history`)
            .snapshotChanges()
            .pipe(
                map(histories => {
                    return histories.map(doc => {
                        const data = doc.payload.doc.data();
                        console.log(data);
                        
                        return { id: doc.payload.doc.id, ...data };
                    });
                })
            );
    }

    checkProductById(id: string): Observable<boolean> {
        console.log('xxxxxx');
        console.log(id);
        
        return this.afs
            .doc(`business/${this.BUSINESS_ID}/products/${id}`)
            .snapshotChanges()
            .pipe(
                map(product => {
                    return product.payload.exists;
                })
            );
        // .collection('history')
        // .snapshotChanges()
        // .pipe(
        //     map(historyArr => {
        //         return historyArr.map(history => {
        //             const data = history.payload.doc.data();
        //             return {
        //                 id: history.payload.doc.id,
        //                 ...data
        //             } as ProductHistory;
        //         });
        //     })
        // );
    }
}
