import React, { useState, useMemo } from 'react';
import { TowingProblem, TowTruck } from '../types';
import { towTruckData, problemToTruckMapping } from '../services/towingData';
import { MapPinIcon, ChevronDownIcon, SpinnerIcon, WeightIcon, RulerIcon, WrenchIcon } from './Icons';

interface TowingServiceFormProps {
  onFindTowingServices: (problem: TowingProblem, selectedTruck: TowTruck, customProblem?: string) => void;
  onCancel: () => void;
  error: string | null;
  location: { lat: number; lng: number } | null;
  locationError: string | null;
}

const SpecItem = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
    <div className="flex items-center text-xs text-brand-gray-500 dark:text-brand-gray-400">
        {icon}
        <span className="ml-1.5">{label}</span>
    </div>
);

const TowTruckCard: React.FC<{ truck: TowTruck, isSelected: boolean, onSelect: () => void }> = ({ truck, isSelected, onSelect }) => (
    <div onClick={onSelect} className={`flex-shrink-0 w-[280px] sm:w-[320px] bg-white dark:bg-brand-light-dark/80 backdrop-blur-lg border-2 rounded-2xl overflow-hidden group transition-all duration-300 cursor-pointer flex flex-col ${isSelected ? 'border-brand-red shadow-xl shadow-brand-red/10' : 'border-brand-gray-200 dark:border-brand-gray-700/80 hover:border-brand-red/50'}`}>
        <div className="relative h-32 bg-brand-gray-200 dark:bg-brand-gray-900">
            <img src={truck.brands[0].image} alt={truck.brands[0].name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute top-0 right-0 bg-brand-dark/50 text-white text-xs font-bold px-2 py-1 m-2 rounded-full">{truck.type}</div>
            <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent w-full p-3">
                <h3 className="font-bold text-lg text-white ">{truck.brands[0].name} <span className="font-medium">{truck.brands[0].model}</span></h3>
                 <p className="text-sm text-brand-gray-300">or similar {truck.type}</p>
            </div>
        </div>
        <div className="p-4 flex flex-col flex-1">
            <p className="text-sm text-brand-dark dark:text-white mb-3 flex-1">{truck.useCase}</p>
            <div className="grid grid-cols-3 gap-2 border-t border-brand-gray-200 dark:border-brand-gray-700 pt-3">
                <SpecItem icon={<WeightIcon className="w-4 h-4 text-brand-red"/>} label={truck.specs.loadCapacity} />
                <SpecItem icon={<RulerIcon className="w-4 h-4 text-brand-red"/>} label={truck.specs.vehicleSize} />
                <SpecItem icon={<WrenchIcon className="w-4 h-4 text-brand-red"/>} label={truck.specs.equipment[0]} />
            </div>
        </div>
    </div>
);


const TowingServiceForm: React.FC<TowingServiceFormProps> = ({ onFindTowingServices, onCancel, error, location, locationError }) => {
  const [selectedProblem, setSelectedProblem] = useState<TowingProblem | ''>('');
  const [customProblem, setCustomProblem] = useState('');
  const [selectedTruck, setSelectedTruck] = useState<TowTruck | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const recommendedTruckTypes = useMemo(() => {
    if (!selectedProblem) return [];
    return problemToTruckMapping[selectedProblem] || [];
  }, [selectedProblem]);
  
  const recommendedTrucks = useMemo(() => {
    if (recommendedTruckTypes.length === 0) return [];
    return towTruckData.filter(truck => recommendedTruckTypes.includes(truck.type));
  }, [recommendedTruckTypes]);

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!selectedProblem && !customProblem.trim()) newErrors.problem = "Please select or describe the problem.";
    if (!selectedTruck) newErrors.truck = "Please select a towing vehicle.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate() && selectedProblem && selectedTruck) {
      onFindTowingServices(selectedProblem, selectedTruck, customProblem);
    }
  };

  const LocationStatus = () => (
    <div className="bg-white dark:bg-brand-light-dark rounded-xl p-4 mb-6 border border-brand-gray-200 dark:border-brand-gray-700">
      <div className="flex items-center">
        <MapPinIcon className={`w-8 h-8 mr-4 ${location ? 'text-brand-red' : 'text-brand-gray-400'}`} />
        <div>
          {location ? (
            <>
              <p className="text-brand-dark dark:text-white font-semibold">Location Detected</p>
              <p className="text-xs text-brand-gray-500 dark:text-brand-gray-400">Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}</p>
            </>
          ) : locationError ? (
            <>
              <p className="text-red-500 font-semibold">Location Error</p>
              <p className="text-xs text-brand-gray-500 dark:text-brand-gray-400">{locationError}</p>
            </>
          ) : (
            <>
              <p className="text-brand-dark dark:text-white font-semibold flex items-center">
                <SpinnerIcon className="w-4 h-4 mr-2 animate-spin" /> Fetching Location...
              </p>
              <p className="text-xs text-brand-gray-500 dark:text-brand-gray-400">Please wait or grant permission.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 h-full flex flex-col bg-brand-gray-50 dark:bg-brand-dark text-brand-dark dark:text-white">
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <h2 className="text-3xl font-bold mb-4">Request Towing Service</h2>
        <p className="text-brand-gray-500 dark:text-brand-gray-400 mb-6">Select the problem to see recommended tow vehicles.</p>
        <LocationStatus />

        <form onSubmit={handleSubmit} className="space-y-6">
           <div className="animate-fade-in-up">
                <label className="text-brand-gray-500 dark:text-brand-gray-400 text-sm font-semibold mb-3 block">1. What's the problem?</label>
                <div className="relative">
                    <select value={selectedProblem} onChange={(e) => {setSelectedProblem(e.target.value as TowingProblem); setCustomProblem(''); setSelectedTruck(null);}}
                        className="w-full bg-white dark:bg-brand-gray-800 border-2 border-brand-gray-200 dark:border-brand-gray-700 text-brand-dark dark:text-white rounded-xl p-4 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-red transition">
                        <option value="" disabled>-- Choose the reason for towing --</option>
                        {Object.values(TowingProblem).map((issue) => ( <option key={issue} value={issue}>{issue}</option>))}
                    </select>
                    <ChevronDownIcon className="w-6 h-6 text-brand-gray-400 absolute right-4 top-4 pointer-events-none" />
                </div>
                {selectedProblem === TowingProblem.Custom && (
                    <textarea value={customProblem} onChange={(e) => setCustomProblem(e.target.value)}
                        placeholder="Describe your issue in detail"
                        className="mt-4 w-full h-24 bg-white dark:bg-brand-gray-800 border-2 border-brand-gray-200 dark:border-brand-gray-700 text-brand-dark dark:text-white rounded-xl p-4 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-red transition placeholder:text-brand-gray-400"/>
                )}
                 {errors.problem && <p className="text-red-500 text-sm mt-1">{errors.problem}</p>}
            </div>

            {recommendedTrucks.length > 0 && (
                 <div className="animate-fade-in-up">
                    <label className="text-brand-gray-500 dark:text-brand-gray-400 text-sm font-semibold mb-3 block">2. Select Towing Vehicle</label>
                    <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4 hide-scrollbar">
                        {recommendedTrucks.map(truck => (
                            <TowTruckCard key={truck.type} truck={truck} isSelected={selectedTruck?.type === truck.type} onSelect={() => setSelectedTruck(truck)} />
                        ))}
                    </div>
                     {errors.truck && <p className="text-red-500 text-sm mt-1">{errors.truck}</p>}
                 </div>
            )}
            
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
      </div>

      <div className="pt-4 sticky bottom-0 bg-brand-gray-50 dark:bg-brand-dark py-2">
        <button type="submit" onClick={handleSubmit} disabled={!location || !selectedTruck}
            className="w-full bg-brand-red text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg shadow-brand-red/30 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-brand-red/50 transition-transform transform hover:scale-105 disabled:bg-brand-gray-300 dark:disabled:bg-brand-gray-600 disabled:shadow-none disabled:cursor-not-allowed">
            Request Towing Assistance
        </button>
        <button type="button" onClick={onCancel}
            className="w-full mt-3 text-brand-gray-500 dark:text-brand-gray-400 font-semibold py-3 px-6 rounded-full hover:bg-brand-gray-200 dark:hover:bg-brand-gray-800 transition">
            Cancel
        </button>
      </div>
    </div>
  );
};

export default TowingServiceForm;