import { Product, demo_products } from './../model/product.model';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, catchError } from 'rxjs/operators';

const BUSINESS_ID = '0406069000354';

@Injectable()
export class ProductService {
    demo = new BehaviorSubject(demo_products);

    constructor(private afs: AngularFirestore) {
        console.log('Start Service!!');
    }

    getProducts(): Observable<Product[]> {
        return this.afs
            .collection(`business/${BUSINESS_ID}/products`)
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
    checkProductById(id: string): Observable<boolean> {
        return this.afs
            .doc(`business/${BUSINESS_ID}/products/${id}`)
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
