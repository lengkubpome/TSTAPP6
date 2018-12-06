export interface Inventory {
	id: string | null;
	name?: string;
	description?: string;
	permission?: any;
	product_stocks?: [
		{
			product_id: string;
			balance_stock: {
				volume: number;
				amount: number;
			};
		}
	];
}
