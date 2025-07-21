import React from 'react';
import { Product } from '../types';
import { ShoppingCartIcon, StarIcon } from './Icons';

interface ProductDetailPageProps {
    product: Product;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product }) => {
    return (
        <div className="h-full w-full flex flex-col bg-brand-gray-50 dark:bg-brand-dark text-brand-dark dark:text-white">
            <div className="flex-1 overflow-y-auto hide-scrollbar">
                <div className="relative w-full h-64 bg-brand-light-dark">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>
                </div>

                <div className="p-6 -mt-10 relative z-10">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-sm font-bold text-brand-red bg-brand-red/10 py-1 px-3 rounded-full">{product.category}</span>
                            <h1 className="text-3xl font-bold mt-2 text-white">{product.name}</h1>
                            <p className="text-lg font-semibold text-brand-gray-300">{product.brand}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl text-center">
                            <p className="text-3xl font-bold text-white">₹{product.price.toLocaleString()}</p>
                            <p className="text-xs text-brand-gray-400">per unit</p>
                        </div>
                    </div>

                    {product.rating && (
                        <div className="mt-4 flex items-center space-x-2">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} className={`w-5 h-5 ${i < Math.round(product.rating || 0) ? 'text-yellow-400' : 'text-brand-gray-600'}`} />
                                ))}
                            </div>
                            <span className="font-semibold text-white">{product.rating.toFixed(1)}</span>
                            <span className="text-brand-gray-400">({product.reviews} reviews)</span>
                        </div>
                    )}

                    <div className="mt-6">
                        <h2 className="text-xl font-bold text-white mb-2">Description</h2>
                        <p className="text-brand-gray-300 leading-relaxed">{product.description}</p>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                        <div className="bg-white dark:bg-brand-light-dark border border-brand-gray-200 dark:border-brand-gray-700 p-4 rounded-xl">
                            <p className="text-sm text-brand-gray-500 dark:text-brand-gray-400 font-semibold">In Stock</p>
                            <p className={`text-xl font-bold ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>{product.stock > 0 ? product.stock.toLocaleString() : 'Out of Stock'}</p>
                        </div>
                         <div className="bg-white dark:bg-brand-light-dark border border-brand-gray-200 dark:border-brand-gray-700 p-4 rounded-xl">
                            <p className="text-sm text-brand-gray-500 dark:text-brand-gray-400 font-semibold">Seller</p>
                            <p className="text-xl font-bold text-brand-dark dark:text-white truncate">{product.seller}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-white/80 dark:bg-brand-dark/80 backdrop-blur-lg border-t border-brand-gray-200 dark:border-white/10 sticky bottom-0">
                <button
                    onClick={() => alert(`Added ${product.name} to cart!`)}
                    disabled={product.stock === 0}
                    className="w-full bg-brand-red text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg shadow-brand-red/30 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-brand-red/50 transition-all transform hover:scale-105 disabled:bg-brand-gray-400 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                >
                    <ShoppingCartIcon className="w-6 h-6" />
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    );
};

export default ProductDetailPage;