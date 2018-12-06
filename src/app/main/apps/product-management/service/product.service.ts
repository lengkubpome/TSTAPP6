import { Update } from '@ngrx/entity';
import { Product, ProductHistory } from './../model/product.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromProductManagement from '../product-management.state';
import * as fromProductStore from '../store';

@Injectable()
export class ProductService {
	private BUSINESS_ID: string;

	constructor(private afs: AngularFirestore, private store: Store<fromProductManagement.State>) {
		this.BUSINESS_ID = '0406069000354';
	}

	getProducts(): Observable<Product[]> {
		return this.afs.collection(`product_management/${this.BUSINESS_ID}/products`).snapshotChanges().pipe(
			map((products) => {
				return products.map((doc) => {
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

	getProductHistory(id: string): Observable<ProductHistory[]> {
		return this.afs.collection(`product_management/${this.BUSINESS_ID}/products/${id}/history`).snapshotChanges().pipe(
			map((histories) => {
				return histories.map((doc) => {
					const data = doc.payload.doc.data();
					return { dateTime: doc.payload.doc.id, ...data } as ProductHistory;
				});
			})
		);
	}

	updateProduct(product: Update<Product>, editor: string): Promise<any> {
		const batch = this.afs.firestore.batch();
		const productRef = this.afs.firestore.doc(`product_management/${this.BUSINESS_ID}/products/${product.id}`);
		const productHistoryRef = this.afs.firestore.doc(
			`product_management/${this.BUSINESS_ID}/products/${product.id}/history/${Date.now()}`
        );
		const product_update = product;
        delete product_update.id;        

		batch.update(productRef, { ...product_update });
		batch.set(productHistoryRef, { editor, product_update });
		return batch.commit();
	}
}
