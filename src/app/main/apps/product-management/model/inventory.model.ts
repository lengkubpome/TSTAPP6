export interface Inventory {
	id: string | null;
	name?: string;
	description?: string;
	permission?: any;
	product_stocks?: InventoryProduct[];
}

export interface InventoryProduct {
	id: string;
	name?: string;
	balance_stock?: {
		volume?: number;
		amount?: number;
	};
}
