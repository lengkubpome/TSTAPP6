export interface Product {
	id: string | null;
	name?: string;
	code?: string;
	description?: string;
	price?: number;
	status?: {
		active: boolean;
		date_change: Date;
	};
	inventory_access?: string[];
}

export interface ProductHistory {
	dateTime: any;
	editor: string;
	product_update: {
		name?: string;
		code?: string;
		description?: string;
		price?: number;
		status?: {
            active: boolean;
            date_change: Date;
        };
	};
}
