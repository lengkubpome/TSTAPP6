import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FuseWidgetModule } from '@fuse/components';

import { reducers, FEATURE_NAME } from './product-management.state';
import { productManagementEffects } from './store';

// Pipes
import { MomentPipe } from '@app/shared/pipes/moment.pipe';
import { RelativeTimePipe } from '@app/shared/pipes/relative-time.pipe';

// service
import { allProductService } from './service';

// container
import { InventoryListShellComponent } from './containers/inventory/inventory-list-shell/inventory-list-shell.component';
import { ProductsShellComponent } from './containers/products/products-shell/products-shell.component';
// component
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { TabPriceHistoryComponent } from './components/products/product-detail/tab-price-history/tab-price-history.component';
import { TabInfomationComponent } from './components/products/product-detail/tab-infomation/tab-infomation.component';

import { ProductNewComponent } from './components/products/product-new/product-new.component';
import { TabInventoryComponent } from './components/products/product-detail/tab-inventory/tab-inventory.component';
import { InventoryListComponent } from './components/inventory/inventory-list/inventory-list.component';
import { FormInventoryNewComponent } from './components/inventory/form-inventory-new/form-inventory-new.component';
import { InventoryDetailShellComponent } from './containers/inventory/inventory-detail.shell/inventory-detail-shell.component';
import { InventoryDetailProductStocksComponent } from './components/inventory/inventory-detail/inventory-detail-product_stocks/inventory-detail-product-stocks.component';
import { InventoryDetailInformationComponent } from './components/inventory/inventory-detail/inventory-detail-information/inventory-detail-information.component';
import { InventoryDetailProductStockComponent } from './components/inventory/inventory-detail/inventory-detail-product-stock/inventory-detail-product-stock.component';
import { InventoryDetailComponent } from './components/inventory/inventory-detail/inventory-detail.component';

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
		component: ProductsShellComponent,
		resolve: {
			// data: EcommerceProductService
		}
	},
	{
		path: 'inventory',
		component: InventoryListShellComponent,
		resolve: {
			// data: EcommerceProductsService
		}
	},
	{
		path: 'inventory/:id',
		component: InventoryDetailShellComponent,
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
		EffectsModule.forFeature(productManagementEffects)
	],
	declarations: [
		//  Pipes
		MomentPipe,
		RelativeTimePipe,

		//  Components
		InventoryListShellComponent,
		ProductListComponent,
		ProductDetailComponent,
		TabPriceHistoryComponent,
		TabInfomationComponent,
		ProductsShellComponent,
		ProductNewComponent,
		TabInventoryComponent,
		InventoryListComponent,
		FormInventoryNewComponent,
		InventoryDetailShellComponent,
		InventoryDetailProductStocksComponent,
		InventoryDetailInformationComponent,
		InventoryDetailProductStockComponent,
		InventoryDetailComponent
	],
	providers: [ allProductService ],
	entryComponents: [ ProductNewComponent, FormInventoryNewComponent, InventoryDetailProductStockComponent ]
})
export class ProductManagementModule {}
