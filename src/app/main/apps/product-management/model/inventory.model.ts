export interface Inventory {
	id: string | null;
	name?: string;
	description?: string;
	permission?: any;
	product_stocks?: InventoryProduct[];
	// creator?: string;
	createdAt?: Date;
	updateAt?: Date;
}

export interface InventoryProduct {
	id: string;
	name?: string;
	storage_type?: string;
	status?: {
		value: string;
		updateAt: Date;
	};
	balance_stock?: {
		volume?: number;
		amount?: number;
	};
}
