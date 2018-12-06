import { ProductService } from './product.service';
import { InventoryService } from './inventory.service';

export const allProductService: any[] = [ ProductService, InventoryService ];

export * from './product.service';
