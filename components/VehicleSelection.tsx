
import React, { useState, useMemo } from 'react';
import { VehicleDetails, VehicleCategory, VehicleBrand, Vehicle, FuelType } from '../types';
import { SearchIcon, CarIcon, TwoWheelerIcon, TruckIcon } from './Icons';
import { vehicleData } from '../services/vehicleData';

interface VehicleSelectionProps {
  onChange: (details: Partial<VehicleDetails>) => void;
  initialDetails: Partial<VehicleDetails>;
  error?: string;
}

const FormSection: React.FC<{ title: string; children: React.ReactNode; step: number }> = ({ title, children, step }) => (
    <div className="mb-6 animate-fade-in-up" style={{animationDelay: `${step * 100}ms`}}>
        <label className="text-brand-gray-500 dark:text-brand-gray-400 text-sm font-semibold mb-3 block">{title}</label>
        {children}
    </div>
);

const VehicleSelection: React.FC<VehicleSelectionProps> = ({ onChange, initialDetails, error }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<VehicleCategory | null>(initialDetails.category || null);
    const [selectedBrand, setSelectedBrand] = useState<VehicleBrand | null>(null);
    const [selectedModel, setSelectedModel] = useState<Vehicle | null>(null);
    const [selectedFuel, setSelectedFuel] = useState<FuelType | null>(initialDetails.fuelType || null);

    const filteredData = useMemo(() => {
        if (!searchQuery) return vehicleData;
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered: { [key: string]: VehicleBrand[] } = {};

        Object.entries(vehicleData).forEach(([category, brands]) => {
            const matchingBrands = brands.filter(brand =>
                brand.name.toLowerCase().includes(lowercasedQuery) ||
                brand.models.some(model => model.name.toLowerCase().includes(lowercasedQuery))
            ).map(brand => {
                const filteredModels = brand.models.filter(model => model.name.toLowerCase().includes(lowercasedQuery));
                // If brand name matches, show all its models, otherwise show only matching models
                return {
                    ...brand,
                    models: brand.name.toLowerCase().includes(lowercasedQuery) ? brand.models : filteredModels
                };
            });
            
            if (matchingBrands.length > 0) {
                filtered[category] = matchingBrands;
            } else if(category.toLowerCase().includes(lowercasedQuery)) {
                filtered[category] = brands;
            }
        });
        return filtered;
    }, [searchQuery]);
    
    const resetSelection = (level: 'category' | 'brand' | 'model') => {
        if (level === 'category') setSelectedBrand(null);
        if (level === 'category' || level === 'brand') setSelectedModel(null);
        setSelectedFuel(null);
        
        let newDetails: Partial<VehicleDetails> = { category: selectedCategory };
        if (level === 'category') newDetails = { category: selectedCategory };
        if (level === 'brand') newDetails = { ...newDetails, brand: selectedBrand?.name };
        
        onChange(newDetails);
    };
    
    const handleCategorySelect = (cat: VehicleCategory) => {
        setSelectedCategory(cat);
        resetSelection('category');
        onChange({ category: cat });
    };

    const handleBrandSelect = (brand: VehicleBrand) => {
        setSelectedBrand(brand);
        resetSelection('brand');
        onChange({ category: selectedCategory, brand: brand.name });
    };

    const handleModelSelect = (model: Vehicle) => {
        setSelectedModel(model);
        resetSelection('model');
        onChange({ category: selectedCategory, brand: selectedBrand?.name, model: model.name });
    };

    const handleFuelSelect = (fuel: FuelType) => {
        setSelectedFuel(fuel);
        onChange({ category: selectedCategory, brand: selectedBrand?.name, model: selectedModel?.name, fuelType: fuel });
    };


    const categoryIcons: { [key: string]: React.ReactNode } = {
        [VehicleCategory.Car]: <CarIcon className="w-7 h-7" />,
        [VehicleCategory.TwoWheeler]: <TwoWheelerIcon className="w-7 h-7" />,
        [VehicleCategory.LCV]: <TruckIcon className="w-7 h-7" />,
    };

    const displayedCategories = searchQuery ? Object.keys(filteredData) : Object.values(VehicleCategory);

    return (
        <div>
            <div className="relative mb-6">
                <SearchIcon className="w-5 h-5 text-brand-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                    type="text"
                    placeholder="Search by brand, model, or vehicle type"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white dark:bg-brand-gray-800 border-2 border-brand-gray-200 dark:border-brand-gray-700 text-brand-dark dark:text-white rounded-full p-4 pl-12 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-red transition"
                />
            </div>

            <FormSection title="1. Select Vehicle Details" step={1}>
                <div className="space-y-6">
                    <div>
                        <p className="text-brand-gray-600 dark:text-brand-gray-300 font-semibold mb-3">Vehicle Type</p>
                        <div className="grid grid-cols-3 gap-3">
                            {displayedCategories.map(cat => (
                                <button key={cat} type="button" onClick={() => handleCategorySelect(cat as VehicleCategory)}
                                    className={`flex flex-col items-center justify-center text-center p-3 rounded-xl border-2 transition-all ${selectedCategory === cat ? 'border-brand-red bg-brand-red/10' : 'bg-white dark:bg-brand-gray-800 border-brand-gray-200 dark:border-brand-gray-700 hover:border-brand-red/50'}`}>
                                    <div className="text-brand-red">{categoryIcons[cat]}</div>
                                    <span className="text-xs font-semibold mt-2">{cat}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {selectedCategory && (
                        <div className="animate-fade-in-up">
                            <p className="text-brand-gray-600 dark:text-brand-gray-300 font-semibold mb-3">Brand</p>
                            <div className="grid grid-cols-4 gap-2">
                                {(filteredData[selectedCategory] || vehicleData[selectedCategory] || []).map(brand => (
                                    <button key={brand.name} type="button" onClick={() => handleBrandSelect(brand)}
                                        className={`flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all h-24 ${selectedBrand?.name === brand.name ? 'border-brand-red bg-brand-red/10' : 'bg-white dark:bg-brand-gray-800 border-brand-gray-200 dark:border-brand-gray-700 hover:border-brand-red/50'}`}>
                                        <brand.logo className="h-8 w-auto text-brand-dark dark:text-white" />
                                        <span className="text-[11px] font-semibold mt-2 text-center">{brand.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {selectedBrand && (
                        <div className="animate-fade-in-up">
                            <p className="text-brand-gray-600 dark:text-brand-gray-300 font-semibold mb-3">Model ({selectedBrand.name})</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {selectedBrand.models.filter(m => searchQuery ? m.name.toLowerCase().includes(searchQuery.toLowerCase()) : true).map(model => (
                                    <button key={model.name} type="button" onClick={() => handleModelSelect(model)}
                                        className={`p-3 rounded-xl border-2 font-semibold text-sm transition-all text-left ${selectedModel?.name === model.name ? 'border-brand-red bg-brand-red/10' : 'bg-white dark:bg-brand-gray-800 border-brand-gray-200 dark:border-brand-gray-700 hover:border-brand-red/50'}`}>
                                        {model.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {selectedModel && (
                        <div className="animate-fade-in-up">
                            <p className="text-brand-gray-600 dark:text-brand-gray-300 font-semibold mb-3">Fuel Type</p>
                            <div className="grid grid-cols-3 gap-3">
                                {selectedModel.fuelTypes.map(fuel => (
                                    <button key={fuel} type="button" onClick={() => handleFuelSelect(fuel)}
                                        className={`p-3 rounded-xl border-2 font-semibold text-sm transition-all ${selectedFuel === fuel ? 'border-brand-red bg-brand-red/10' : 'bg-white dark:bg-brand-gray-800 border-brand-gray-200 dark:border-brand-gray-700 hover:border-brand-red/50'}`}>
                                        {fuel}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </FormSection>
             {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default VehicleSelection;
