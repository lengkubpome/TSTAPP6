import { ActionReducerMap, MetaReducer, createFeatureSelector, ActionReducer } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';

import { storeLogger } from 'ngrx-store-logger';

import { environment } from '@env/environment';

import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';
import { debug } from './meta-reducers/debug.reducer';
import { AuthState } from './auth/auth.models';
import { authReducer } from './auth/auth.reducer';
import { RouterStateUrl } from './router/router.state';

export const reducers: ActionReducerMap<AppState> = {
	auth: authReducer,
	router: routerReducer
};

// ngrx-store-logger
export function logger(reducer: ActionReducer<AppState>): any {
	// default, no options
	return storeLogger()(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = [ initStateFromLocalStorage ];

if (!environment.production) {
	// metaReducers.unshift(storeFreeze);
	metaReducers.unshift(logger);
	if (!environment.test) {
		// metaReducers.unshift(debug);
	}
}

export const selectAuthState = createFeatureSelector<AppState, AuthState>('auth');

export const selectRouterState = createFeatureSelector<AppState, RouterReducerState<RouterStateUrl>>('router');

export interface AppState {
	auth: AuthState;
	router: RouterReducerState<RouterStateUrl>;
}
