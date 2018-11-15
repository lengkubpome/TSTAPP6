export interface Product {
    id: string | null;
    productName: string;
    productCode: string;
    price: number;
    active: boolean;
  }
  
  export const demo_products: Product[] = [
    {
      id: '1',
      productCode: '01',
      productName: 'เหล็กหนา',
      price: 10.2,
      active: true
    },
    {
      id: '2',
      productCode: '02',
      productName: 'เหล็กบาง',
      price: 10.0,
      active: true
    },
    {
      id: '3',
      productCode: '03',
      productName: 'กระดาษกล่อง',
      price: 5.4,
      active: false
    },
    {
      id: '4',
      productCode: '04',
      productName: 'กระดาษสี',
      price: 4.3,
      active: true
    }
  ];
  