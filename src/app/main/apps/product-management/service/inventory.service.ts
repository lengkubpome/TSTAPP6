import { FirestoreService } from '@app/shared/services/firestore.service';
import { map, catchError, switchMap, combineLatest, mergeMap, concatMap, mergeAll } from 'rxjs/operators';
import { Inventory, InventoryProduct } from './../model/inventory.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import * as fromProductManagement from '../product-management.state';
import * as fromProductStore from '../store';

@Injectable()
export class InventoryService {
	private BUSINESS_ID: string;

	constructor(
		private db: FirestoreService,
	) {
		this.BUSINESS_ID = '0406069000354';
	}

	getInventory(): Observable<Inventory[]> {
		return this.db.colWithIds$(`product_management/${this.BUSINESS_ID}/inventory/`);
	}

	getInventoryProducts(id: string): Observable<InventoryProduct[]> {
		return this.db.colWithIds$(`product_management/${this.BUSINESS_ID}/inventory/${id}/product_stocks`);
	}
}
