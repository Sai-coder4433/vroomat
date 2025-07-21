import React from 'react';
import { Product } from '../types';
import { ShoppingCartIcon, StarIcon } from './Icons';

interface ProductCardProps {
    product: Product;
    onViewDetails: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
    return (
        <div 
            onClick={onViewDetails}
            className="bg-white dark:bg-brand-light-dark/60 backdrop-blur-lg border border-brand-gray-200 dark:border-brand-gray-700/80 rounded-2xl overflow-hidden group transition-all duration-300 hover:border-brand-red/50 hover:shadow-xl hover:shadow-brand-red/10 cursor-pointer flex flex-col"
        >
            <div className="relative">
                <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute top-0 right-0 bg-brand-dark/50 text-white text-xs font-bold px-2 py-1 m-2 rounded-full">{product.brand}</div>
            </div>
            <div className="p-3 flex flex-col flex-1">
                <h3 className="font-bold text-sm text-brand-dark dark:text-white flex-1 line-clamp-2">{product.name}</h3>
                {product.rating && product.reviews && (
                    <div className="flex items-center mt-1 text-xs text-brand-gray-500 dark:text-brand-gray-400">
                        <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="font-bold text-brand-gray-600 dark:text-brand-gray-300">{product.rating.toFixed(1)}</span>
                        <span className="ml-1">({product.reviews})</span>
                    </div>
                )}
                <div className="mt-2 flex justify-between items-center">
                    <p className="font-bold text-lg text-brand-dark dark:text-white">₹{product.price.toLocaleString()}</p>
                    <button onClick={(e) => { e.stopPropagation(); alert('Added to cart!'); }} className="bg-brand-red text-white p-2 rounded-full shadow-md shadow-brand-red/20 hover:bg-red-700 focus:outline-none transition-transform transform hover:scale-110">
                        <ShoppingCartIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;