import { Product } from '../types';

let mockProducts: Product[] = [
    {
        id: 'prod_001',
        name: 'Synthetic Engine Oil 5W-30',
        description: 'High performance fully synthetic engine oil for modern gasoline and diesel engines. 5 Litre can.',
        price: 3499,
        imageUrl: 'https://picsum.photos/seed/oil/400/400',
        category: 'Engine Oil',
        brand: 'VrooMax',
        stock: 150,
        seller: 'Auto Parts Co.',
        rating: 4.8,
        reviews: 250,
    },
    {
        id: 'prod_002',
        name: 'Premium All-Season Tires',
        description: 'Set of 4 premium all-season tires. Size: 205/55R16. Excellent grip in all weather conditions.',
        price: 25000,
        imageUrl: 'https://picsum.photos/seed/tires/400/400',
        category: 'Tires',
        brand: 'Endurance',
        stock: 40,
        seller: 'Auto Parts Co.',
        rating: 4.6,
        reviews: 180,
    },
    {
        id: 'prod_003',
        name: 'AGM Car Battery',
        description: 'Absorbent Glass Mat (AGM) battery with 760 CCA. Reliable starting power and longer life.',
        price: 12500,
        imageUrl: 'https://picsum.photos/seed/battery/400/400',
        category: 'Batteries',
        brand: 'PowerUp',
        stock: 75,
        seller: 'Global Auto Spares',
        rating: 4.9,
        reviews: 420,
    },
    {
        id: 'prod_004',
        name: 'Ceramic Brake Pads (Front)',
        description: 'Low-dust, low-noise ceramic brake pads for superior stopping power. Fits most sedans.',
        price: 4500,
        imageUrl: 'https://picsum.photos/seed/brakes/400/400',
        category: 'Spare Parts',
        brand: 'StopSafe',
        stock: 200,
        seller: 'Auto Parts Co.',
        rating: 4.5,
        reviews: 310,
    },
    {
        id: 'prod_005',
        name: 'OBD-II Diagnostic Scanner',
        description: 'Professional OBD-II scanner tool for reading and clearing engine fault codes.',
        price: 7999,
        imageUrl: 'https://picsum.photos/seed/scanner/400/400',
        category: 'Tools',
        brand: 'DiagPro',
        stock: 50,
        seller: 'GarageTech Supplies',
        rating: 4.7,
        reviews: 95,
    },
     {
        id: 'prod_006',
        name: 'DOT 4 Brake Fluid',
        description: 'High-temperature brake fluid for hydraulic brake and clutch systems. 1 Litre bottle.',
        price: 899,
        imageUrl: 'https://picsum.photos/seed/fluid/400/400',
        category: 'Lubricants',
        brand: 'VrooMax',
        stock: 300,
        seller: 'Global Auto Spares',
        rating: 4.8,
        reviews: 150,
    },
];

export const getProducts = async (): Promise<Product[]> => {
    // Simulate API delay
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([...mockProducts]);
        }, 500);
    });
};

export const addProduct = (productData: Omit<Product, 'id' | 'seller'>, sellerName: string): Product => {
    const newProduct: Product = {
        ...productData,
        id: `prod_${new Date().getTime()}`,
        seller: sellerName,
        rating: parseFloat((Math.random() * (5 - 4) + 4).toFixed(1)), // random rating between 4 and 5
        reviews: Math.floor(Math.random() * 100),
    };
    mockProducts.unshift(newProduct); // Add to the beginning of the list
    return newProduct;
};