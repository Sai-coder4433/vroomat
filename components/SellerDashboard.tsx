import React from 'react';
import { Product } from '../types';

interface SellerDashboardProps {
    products: Product[];
    onNavigateToAddProduct: () => void;
}

const StatCard = ({ title, value, colorClass }: { title: string, value: string, colorClass: string }) => (
    <div className={`p-4 rounded-xl ${colorClass}`}>
        <p className="text-sm font-medium text-white/80">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
    </div>
)

const SellerDashboard: React.FC<SellerDashboardProps> = ({ products, onNavigateToAddProduct }) => {
    
    const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
    const totalValue = products.reduce((acc, p) => acc + (p.stock * p.price), 0);

    return (
        <div className="h-full w-full flex flex-col p-4 pt-6 bg-brand-gray-50 dark:bg-brand-dark text-brand-dark dark:text-white">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold tracking-tight">Seller Dashboard</h1>
                <button
                    onClick={onNavigateToAddProduct}
                    className="bg-brand-red text-white font-bold py-2 px-4 rounded-full text-sm shadow-md shadow-brand-red/20 hover:bg-red-700 transition-transform transform hover:scale-105"
                >
                    + Add Product
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <StatCard title="Products" value={products.length.toString()} colorClass="bg-blue-500" />
                <StatCard title="Total Stock" value={totalStock.toLocaleString()} colorClass="bg-green-500" />
                <StatCard title="Value" value={`₹${(totalValue/1000).toFixed(1)}k`} colorClass="bg-purple-500" />
            </div>

            <h2 className="text-lg font-bold mb-3">Your Product Listings</h2>

            <div className="flex-1 overflow-y-auto hide-scrollbar">
                {products.length > 0 ? (
                    <div className="space-y-3">
                        {products.map(product => (
                            <div key={product.id} className="bg-white dark:bg-brand-light-dark border border-brand-gray-200 dark:border-brand-gray-700 rounded-lg p-3 flex items-center space-x-4">
                                <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-md object-cover" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-brand-dark dark:text-white truncate">{product.name}</p>
                                    <p className="text-sm text-brand-gray-500 dark:text-brand-gray-400">₹{product.price.toLocaleString()} • <span className={product.stock < 10 ? 'text-red-500 font-bold' : ''}>{product.stock} in stock</span></p>
                                </div>
                                <button className="text-brand-gray-500 dark:text-brand-gray-400 hover:text-brand-dark dark:hover:text-white font-semibold text-sm">Edit</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-brand-gray-400 dark:text-brand-gray-500 py-10">
                        <p>You haven't listed any products yet.</p>
                        <p>Click '+ Add Product' to get started!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SellerDashboard;