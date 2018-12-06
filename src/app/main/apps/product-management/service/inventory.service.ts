import { map, catchError } from 'rxjs/operators';
import { Inventory } from './../model/inventory.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import * as fromProductManagement from '../product-management.state';
import * as fromProductStore from '../store';

@Injectable()
export class InventoryService {
	private BUSINESS_ID: string;

	constructor(private afs: AngularFirestore, private store: Store<fromProductManagement.State>) {
		this.BUSINESS_ID = '0406069000354';
	}

	getInventory(): Observable<Inventory[]> {
		return this.afs.collection(`product_management/${this.BUSINESS_ID}/inventory`).snapshotChanges().pipe(
			map((inventory) => {
				return inventory.map((doc) => {
					const data = doc.payload.doc.data();
					return { id: doc.payload.doc.id, ...data } as Inventory;
				});
			}),
			catchError((error: any) => Observable.throw(error.json()))
		);
	}
}
