import { ProductEffect } from './product.effect';
import { InventoryEffect } from './inventory.effect';

export const productManagementEffects: any[] = [ ProductEffect, InventoryEffect ];
export * from './product.effect';
export * from './inventory.effect';
