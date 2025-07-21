import React from 'react';
import { Garage } from '../types';
import { TireIcon, EngineIcon, BatteryIcon, FuelIcon, EVIcon, TowingIcon, WrenchIcon, CarWashIcon, CarIcon, SnowflakeIcon, BrakeIcon } from './Icons';

interface GarageListProps {
  garages: Garage[];
  onBookGarage: (garage: Garage) => void;
}

const serviceIcons: { [key: string]: React.ReactNode } = {
  'Tire': <TireIcon className="w-5 h-5" />,
  'Engine': <EngineIcon className="w-5 h-5" />,
  'Battery': <BatteryIcon className="w-5 h-5" />,
  'Fuel': <FuelIcon className="w-5 h-5" />,
  'EV': <EVIcon className="w-5 h-5" />,
  'Towing': <TowingIcon className="w-5 h-5" />,
  'AC': <SnowflakeIcon className="w-5 h-5" />,
  'Full Service': <CarIcon className="w-5 h-5" />,
  'Brakes': <BrakeIcon className="w-5 h-5" />,
  'Car Spa': <CarWashIcon className="w-5 h-5" />,
};

const GarageCard: React.FC<{ garage: Garage; onBook: () => void }> = ({ garage, onBook }) => (
    <div className="bg-white dark:bg-brand-light-dark/80 border border-brand-gray-200 dark:border-brand-gray-700/80 rounded-2xl p-4 mb-4 transition-all duration-300 hover:border-brand-red/50 hover:shadow-xl hover:shadow-brand-red/10">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="font-bold text-lg text-brand-dark dark:text-white">{garage.garageName}</h3>
                <div className="flex items-center text-sm text-brand-gray-500 dark:text-brand-gray-400 mt-1">
                    <span>{garage.eta}</span>
                    <span className="mx-2 text-brand-gray-300 dark:text-brand-gray-600">•</span>
                    <span>{garage.distance}</span>
                </div>
            </div>
            <div className="text-right">
                <p className="font-bold text-lg text-brand-dark dark:text-white">{garage.totalEstimatedPrice}</p>
                <p className="text-xs text-brand-gray-400 dark:text-brand-gray-500">Total Est.</p>
            </div>
        </div>
        <div className="h-px bg-brand-gray-200 dark:bg-brand-gray-700 my-3"></div>
        <div className="flex justify-between items-center">
            <div className="flex space-x-3 text-brand-gray-600 dark:text-brand-gray-300">
                {garage.serviceTypeIcons.slice(0, 3).map((iconKey) => (
                    <div key={iconKey} className="bg-brand-gray-100 dark:bg-brand-gray-800 p-2 rounded-full" title={iconKey}>
                        {serviceIcons[iconKey] || <WrenchIcon className="w-5 h-5"/>}
                    </div>
                ))}
            </div>
            <button onClick={onBook} className="bg-brand-red text-white font-bold py-2 px-6 rounded-full text-sm shadow-md shadow-brand-red/20 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-brand-red/50 transition-transform transform hover:scale-105">
                Book Now
            </button>
        </div>
    </div>
);

const GarageList: React.FC<GarageListProps> = ({ garages, onBookGarage }) => {
  return (
    <div className="p-4 pt-6 bg-brand-gray-50 dark:bg-brand-dark min-h-full">
       <h2 className="text-2xl font-bold text-brand-dark dark:text-white text-center mb-6">Nearby Garages</h2>
        
      {garages.map((garage, index) => (
        <GarageCard key={index} garage={garage} onBook={() => onBookGarage(garage)} />
      ))}
      {garages.length === 0 && <p className="text-center text-brand-gray-400">No garages found.</p>}
    </div>
  );
};

export default GarageList;