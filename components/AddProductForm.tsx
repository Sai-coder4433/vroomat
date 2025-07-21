import React, { useState } from 'react';
import { Product } from '../types';
import { ChevronDownIcon } from './Icons';

interface AddProductFormProps {
  onAddProduct: (product: Omit<Product, 'id' | 'seller'>) => void;
  onCancel: () => void;
}

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label className="text-brand-gray-500 dark:text-brand-gray-400 text-sm font-semibold mb-2 block">{label}</label>
        <input 
          {...props}
          className="w-full bg-white dark:bg-brand-gray-800 border-2 border-brand-gray-200 dark:border-brand-gray-700 text-brand-dark dark:text-white rounded-xl p-4 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-red transition placeholder:text-brand-gray-400"
        />
    </div>
);

const AddProductForm: React.FC<AddProductFormProps> = ({ onAddProduct, onCancel }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('Spare Parts');
    const [imageUrl, setImageUrl] = useState('https://picsum.photos/seed/new_prod/400/400');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddProduct({
            name,
            description,
            price,
            stock,
            brand,
            category,
            imageUrl
        });
    };

    return (
        <div className="p-6 h-full flex flex-col bg-brand-gray-50 dark:bg-brand-dark text-brand-dark dark:text-white">
            <h2 className="text-3xl font-bold mb-6">Add a New Product</h2>
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 pr-2">
                <InputField label="Product Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                <div>
                    <label className="text-brand-gray-500 dark:text-brand-gray-400 text-sm font-semibold mb-2 block">Description</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required
                        className="w-full h-24 bg-white dark:bg-brand-gray-800 border-2 border-brand-gray-200 dark:border-brand-gray-700 text-brand-dark dark:text-white rounded-xl p-4 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-red transition placeholder:text-brand-gray-400"
                    />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <InputField label="Price (₹)" type="number" value={price > 0 ? price : ''} onChange={(e) => setPrice(Number(e.target.value))} required />
                    <InputField label="Stock" type="number" value={stock > 0 ? stock : ''} onChange={(e) => setStock(Number(e.target.value))} required />
                </div>
                <InputField label="Brand" type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
                <div>
                    <label className="text-brand-gray-500 dark:text-brand-gray-400 text-sm font-semibold mb-2 block">Category</label>
                    <div className="relative">
                         <select 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-white dark:bg-brand-gray-800 border-2 border-brand-gray-200 dark:border-brand-gray-700 text-brand-dark dark:text-white rounded-xl p-4 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-red transition"
                        >
                            <option>Engine Oil</option>
                            <option>Tires</option>
                            <option>Batteries</option>
                            <option>Spare Parts</option>
                            <option>Tools</option>
                            <option>Lubricants</option>
                        </select>
                        <ChevronDownIcon className="w-6 h-6 text-brand-gray-400 absolute right-4 top-4 pointer-events-none" />
                    </div>
                </div>
                <InputField label="Image URL" type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

                <div className="pt-4 flex space-x-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="w-full bg-brand-gray-200 dark:bg-brand-gray-800 text-brand-dark dark:text-white font-bold py-4 px-6 rounded-full text-lg hover:bg-brand-gray-300 dark:hover:bg-brand-gray-700 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="w-full bg-brand-red text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg shadow-brand-red/30 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-brand-red/50 transition-transform transform hover:scale-105"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProductForm;