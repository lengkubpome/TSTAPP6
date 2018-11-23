import { Product } from '../model/product.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

// function for adapter
export function sortByCode(ob1: Product, ob2: Product): number {
  return ob1.code.localeCompare(ob2.code);
}

// export const productAdapter: EntityAdapter<Product> = createEntityAdapter<
//   Product
// >({
//   //  sortComparer: sortByCategory
//   sortComparer: false
// });
