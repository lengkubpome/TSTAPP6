import { Product } from '../model/product.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

// function for adapter
export function sortByCode(ob1: Product, ob2: Product): number {
  return ob1.productCode.localeCompare(ob2.productCode);
}

// export const productAdapter: EntityAdapter<Product> = createEntityAdapter<
//   Product
// >({
//   //  sortComparer: sortByCategory
//   sortComparer: false
// });
