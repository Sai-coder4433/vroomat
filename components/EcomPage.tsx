import React, { useState } from 'react';
import { Product, User, UserRole } from '../types';
import { ShoppingCartIcon } from './Icons';
import ProductCard from './ProductCard';

interface EcomPageProps {
    products: Product[];
    user: User | null;
    onNavigateToSellerDashboard: () => void;
    onViewProduct: (product: Product) => void;
}

const EcomPage: React.FC<EcomPageProps> = ({ products, user, onNavigateToSellerDashboard, onViewProduct }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const categories = ['All', 'Engine Oil', 'Tires', 'Batteries', 'Spare Parts', 'Tools', 'Lubricants'];
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProducts = products.filter(product => {
        const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              product.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    
    const featuredProducts = products.filter(p => p.rating && p.rating >= 4.8);

    return (
        <div className="h-full w-full flex flex-col bg-brand-gray-50 dark:bg-brand-dark text-brand-dark dark:text-white">
            <div className="p-4 pt-6">
                 <div className="flex justify-between items-center mb-2">
                    <h1 className="text-2xl font-bold tracking-tight">Vroomat Ecom</h1>
                    {user?.role === UserRole.Distributor && (
                        <button 
                            onClick={onNavigateToSellerDashboard}
                            className="bg-brand-red text-white font-bold py-2 px-4 rounded-full text-sm shadow-md shadow-brand-red/20 hover:bg-red-700 transition-transform transform hover:scale-105"
                        >
                            Manage Store
                        </button>
                    )}
                </div>
                 <p className="text-brand-gray-500 dark:text-brand-gray-400 mb-4">The B2B marketplace for all your automotive needs.</p>

                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search for parts, oil, brands..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white dark:bg-brand-gray-800 border-2 border-brand-gray-200 dark:border-brand-gray-700 text-brand-dark dark:text-white rounded-full p-4 pl-6 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-red transition placeholder:text-brand-gray-400"
                    />
                </div>
            </div>

            <div className="pl-4 mb-4">
                <h2 className="text-lg font-bold mb-3">Featured Products</h2>
                <div className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
                    {featuredProducts.map(product => (
                       <div key={product.id} className="w-48 flex-shrink-0">
                            <ProductCard 
                                product={product} 
                                onViewDetails={() => onViewProduct(product)}
                            />
                       </div>
                    ))}
                     {featuredProducts.length === 0 && <p className="text-sm text-brand-gray-400">No featured products yet.</p>}
                </div>
            </div>

            <div className="px-4 border-b border-brand-gray-200 dark:border-brand-gray-700">
                <div className="flex space-x-2 sm:space-x-4 overflow-x-auto hide-scrollbar">
                    {categories.map(category => (
                        <button 
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`py-3 px-2 whitespace-nowrap font-semibold transition-colors duration-200 text-sm sm:text-base ${activeCategory === category ? 'text-brand-red border-b-2 border-brand-red' : 'text-brand-gray-500 dark:text-brand-gray-400 hover:text-brand-red/70'}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                        {filteredProducts.map(product => (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                onViewDetails={() => onViewProduct(product)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center h-full py-10">
                         <ShoppingCartIcon className="w-12 h-12 text-brand-gray-300 dark:text-brand-gray-600 mb-4" />
                         <p className="text-lg text-brand-gray-500 dark:text-brand-gray-400">No products found</p>
                         <p className="text-sm text-brand-gray-400 dark:text-brand-gray-500">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EcomPage;