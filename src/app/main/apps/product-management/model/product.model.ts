export interface Product {
	id: string | null;
	name?: string;
	code?: string;
	description?: string;
	price?: number;
	active?: boolean;
}

export interface ProductHistory {
	dateTime: any;
	editor: string;
	product_update: {
		name?: string;
		code?: string;
		description?: string;
		price?: number;
		active?: boolean;
	};
}

export const demo_products: Product[] = [
	{
		id: '1',
		code: '01',
		name: 'เหล็กหนา',
		description: 'description:',
		price: 10.2,
		active: false
	},
	{
		id: '2',
		code: '02',
        name: 'เหล็กบาง',
        description: 'description:',
		price: 10.0,
		active: true
	},
	{
		id: '3',
		code: '03',
        name: 'กระดาษกล่อง',
        description: 'description:',
		price: 5.4,
		active: false
	},
	{
		id: '4',
		code: '04',
        name: 'กระดาษสี',
        description: 'description:',
		price: 4.3,
		active: true
	}
];
