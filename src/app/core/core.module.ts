import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '@env/environment';

import { LocalStorageService } from './local-storage/local-storage.service';
import { AuthEffects } from './auth/auth.effects';
import { AuthGuardService } from './auth/auth-guard.service';
import { reducers, metaReducers } from './core.state';
// import { AppErrorHandler } from './error-handler/app-error-handler.service';
// import { httpInterceptorProviders } from '@app/core/http-interceptors';
import {
    StoreRouterConnectingModule,
    RouterStateSerializer
} from '@ngrx/router-store';
import { CustomSerializer } from './router/custom-serializer';

@NgModule({
    imports: [
        // angular
        CommonModule,
        HttpClientModule,

        // firestore
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule.enablePersistence(),

        // ngrx
        StoreModule.forRoot(reducers, { metaReducers }),
        StoreRouterConnectingModule.forRoot(),
        EffectsModule.forRoot([AuthEffects]),
        
        environment.production
            ? []
            : StoreDevtoolsModule.instrument({
                  name: 'Angular NgRx Material Starter'
              }),

        !environment.production ? StoreDevtoolsModule.instrument() : []
    ],
    declarations: [],
    providers: [
        LocalStorageService,
        AuthGuardService,
        // AnimationsService,
        // httpInterceptorProviders,
        // TitleService,
        { provide: RouterStateSerializer, useClass: CustomSerializer }
    ],
    exports: []
})
export class CoreModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: CoreModule
    ) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import only in AppModule'
            );
        }
    }
}
