export interface Product {
    id: string | null;
    name: string;
    code: string;
    price: number;
    active: boolean;
}

export interface ProductHistory {
    id: string;
    detail: string;
}

export const demo_products: Product[] = [
    {
        id: '1',
        code: '01',
        name: 'เหล็กหนา',
        price: 10.2,
        active: false
    },
    {
        id: '2',
        code: '02',
        name: 'เหล็กบาง',
        price: 10.0,
        active: true
    },
    {
        id: '3',
        code: '03',
        name: 'กระดาษกล่อง',
        price: 5.4,
        active: false
    },
    {
        id: '4',
        code: '04',
        name: 'กระดาษสี',
        price: 4.3,
        active: true
    }
];
