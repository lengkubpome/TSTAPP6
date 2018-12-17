import { FirestoreService } from '@app/shared/services/firestore.service';
import { map, catchError, switchMap, combineLatest, mergeMap, concatMap, mergeAll } from 'rxjs/operators';
import { Inventory, InventoryProduct } from './../model/inventory.model';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import * as fromProductManagement from '../product-management.state';
import * as fromProductStore from '../store';

@Injectable()
export class InventoryService {
	private BUSINESS_ID: string;
	public unsubscribeComponent$ = new Subject<void>();
	public unsubscribe$ = this.unsubscribeComponent$.asObservable();

	constructor(private db: FirestoreService, private afs: AngularFirestore) {
		this.BUSINESS_ID = '0406069000354';
	}

	getInventory(): Observable<Inventory[]> {
		console.log('%c Load inventory from server!! ', 'background: #fff; color: red');
		return this.db.colWithIds$(`product_management/${this.BUSINESS_ID}/inventory/`);
	}

	getInventoryProducts(id: string): Observable<InventoryProduct[]> {
		console.log('%c Load inventory product from server!! ', 'background: #fff; color: red');
		return this.db.colWithIds$(`product_management/${this.BUSINESS_ID}/inventory/${id}/product_stocks`);
     
    }

	createInventory(data: Inventory): Promise<any> {
		console.log('%c Create inventory from server!! ', 'background: #fff; color: red');
		return this.db.add<any>(`product_management/${this.BUSINESS_ID}/inventory/`, data);

		// const timestamp = this.db.timestamp;

		// Object.assign(data, {
		// 	creator: 'Tester',
		// 	updatedAt: timestamp,
		// 	createdAt: timestamp
		// });

		// const batch = this.afs.firestore.batch();
		// const local = this.afs.firestore.collection(`product_management/${this.BUSINESS_ID}/inventory/`).doc();
		// batch.set(local, data);

		// return batch.commit();
	}
}
