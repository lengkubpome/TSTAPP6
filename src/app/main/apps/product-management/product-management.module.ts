import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';

import { ProductShellComponent } from './products/container/product-shell/product-shell.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ProductListComponent } from './products/components/product-list/product-list.component';
import { FuseWidgetModule } from '@fuse/components';

const routes: Routes = [
    {
        path: 'products',
        component: ProductShellComponent,
        resolve: {
            // data: EcommerceProductsService
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
        ProductShellComponent,
        InventoryComponent,
        ProductListComponent
    ]
})
export class ProductManagementModule {}
