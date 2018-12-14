import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SubscriptionService {
	public unsubscribeComponent$ = new Subject<void>();
	public unsubscribe$ = this.unsubscribeComponent$.asObservable();
}
