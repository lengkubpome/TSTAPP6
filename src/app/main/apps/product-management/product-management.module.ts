import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';

import { InventoryComponent } from './inventory/inventory.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { FuseWidgetModule } from '@fuse/components';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';

const routes: Routes = [
    {
        path: 'products',
        component: ProductListComponent,
        resolve: {
            // data: EcommerceProductsService
        }
    },
    {
        path     : 'products/:id',
        component: ProductDetailComponent,
        resolve  : {
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
        FuseWidgetModule
    ],
    declarations: [
        InventoryComponent,
        ProductListComponent,
        ProductDetailComponent
    ]
})
export class ProductManagementModule {}
