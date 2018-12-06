import { Inventory } from './../../model/inventory.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';


// Adapter
export const inventoryAdapter: EntityAdapter<Inventory> = 
    createEntityAdapter<Inventory>({
    //  sortComparer: sortByCategory
    sortComparer: false
});

