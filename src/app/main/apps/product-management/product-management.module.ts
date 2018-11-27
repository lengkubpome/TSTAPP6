
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FuseWidgetModule } from '@fuse/components';

import { reducers, FEATURE_NAME } from './product-management.state';
import { ProductEffect } from './store';
// service
import { allProductService } from './service';

// container
import { InventoryComponent } from './containers/inventory/inventory.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
// component
import { TabSettingComponent } from './components/products/product-detail/tab-setting/tab-setting.component';
import { TabPriceHistoryComponent } from './components/products/product-detail/tab-price-history/tab-price-history.component';
import { TabInfomationComponent } from './components/products/product-detail/tab-infomation/tab-infomation.component';
import { ProductsShellComponent } from './containers/products/products-shell/products-shell.component';

const routes: Routes = [
    {
        path: 'products',
        component: ProductsShellComponent,
        resolve: {
            // data: EcommerceProductsService
        }
    },
    {
        path: 'products/:id',
        component: ProductDetailComponent,
        resolve: {
            // data: EcommerceProductService
        }
    },
    {
        path: 'inventory',
        component: InventoryComponent,
        resolve: {
            // data: EcommerceProductsService
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        TranslateModule,
        FuseSharedModule,
        FuseWidgetModule,
        StoreModule.forFeature(FEATURE_NAME, reducers),
        EffectsModule.forFeature([ProductEffect])
    ],
    declarations: [
        InventoryComponent,
        ProductListComponent,
        ProductDetailComponent,
        TabSettingComponent,
        TabPriceHistoryComponent,
        TabInfomationComponent,
        ProductsShellComponent
    ],
    providers: [allProductService]
})
export class ProductManagementModule {}
