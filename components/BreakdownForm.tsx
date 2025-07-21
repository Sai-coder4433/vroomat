
import React, { useState } from 'react';
import { VehicleDetails, CommonIssue, FuelType, VehicleCategory } from '../types';
import { MapPinIcon, ChevronDownIcon, SpinnerIcon } from './Icons';
import VehicleSelection from './VehicleSelection';

interface BreakdownFormProps {
  onFindGarages: (vehicleDetails: VehicleDetails, problemDescription: string) => void;
  onCancel: () => void;
  error: string | null;
  location: { lat: number; lng: number } | null;
  locationError: string | null;
}

const BreakdownForm: React.FC<BreakdownFormProps> = ({ onFindGarages, onCancel, error, location, locationError }) => {
  const [vehicleDetails, setVehicleDetails] = useState<Partial<VehicleDetails>>({});
  const [selectedIssue, setSelectedIssue] = useState<CommonIssue | ''>('');
  const [customIssue, setCustomIssue] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!vehicleDetails.category) newErrors.vehicle = "Please select a vehicle type.";
    if (!vehicleDetails.brand) newErrors.vehicle = "Please select a brand.";
    if (!vehicleDetails.model) newErrors.vehicle = "Please select a model.";
    if (!vehicleDetails.fuelType) newErrors.vehicle = "Please select a fuel type.";
    if (!selectedIssue && !customIssue.trim()) newErrors.issue = "Please select an issue or describe the problem.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate() && vehicleDetails.category && vehicleDetails.brand && vehicleDetails.model && vehicleDetails.fuelType) {
      const problemDescription = selectedIssue ? selectedIssue : customIssue;
      onFindGarages(vehicleDetails as VehicleDetails, problemDescription);
    }
  };

  const handleVehicleChange = (details: Partial<VehicleDetails>) => {
    setVehicleDetails(details);
    if(Object.keys(details).length === 4){
      setErrors(prev => ({...prev, vehicle: ''}));
    }
  }

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
        <h2 className="text-3xl font-bold mb-4">Report a Breakdown</h2>
        <p className="text-brand-gray-500 dark:text-brand-gray-400 mb-6">Select your vehicle and tell us what's wrong.</p>
        <LocationStatus />
        
        <form onSubmit={handleSubmit} className="space-y-6">
            <VehicleSelection 
                onChange={handleVehicleChange} 
                initialDetails={vehicleDetails}
                error={errors.vehicle}
            />

            {vehicleDetails.fuelType && (
                 <div className="animate-fade-in-up" style={{animationDelay: `400ms`}}>
                    <label className="text-brand-gray-500 dark:text-brand-gray-400 text-sm font-semibold mb-3 block">2. Describe the Problem</label>
                    <div className="relative">
                        <select value={selectedIssue} onChange={(e) => {setSelectedIssue(e.target.value as CommonIssue); setCustomIssue('')}}
                            className="w-full bg-white dark:bg-brand-gray-800 border-2 border-brand-gray-200 dark:border-brand-gray-700 text-brand-dark dark:text-white rounded-xl p-4 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-red transition">
                            <option value="" disabled>-- Select a common issue --</option>
                            {Object.values(CommonIssue).map((issue) => ( <option key={issue} value={issue}>{issue}</option>))}
                        </select>
                        <ChevronDownIcon className="w-6 h-6 text-brand-gray-400 absolute right-4 top-4 pointer-events-none" />
                    </div>
                    <div className="relative flex items-center my-4">
                        <div className="flex-grow border-t border-brand-gray-300 dark:border-brand-gray-600"></div>
                        <span className="flex-shrink mx-4 text-brand-gray-400 text-sm">OR</span>
                        <div className="flex-grow border-t border-brand-gray-300 dark:border-brand-gray-600"></div>
                    </div>
                    <textarea value={customIssue} onChange={(e) => {setCustomIssue(e.target.value); setSelectedIssue('')}}
                        placeholder="Describe your issue (if not listed)"
                        className="w-full h-24 bg-white dark:bg-brand-gray-800 border-2 border-brand-gray-200 dark:border-brand-gray-700 text-brand-dark dark:text-white rounded-xl p-4 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-red transition placeholder:text-brand-gray-400"/>
                     {errors.issue && <p className="text-red-500 text-sm mt-1">{errors.issue}</p>}
                </div>
            )}

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
      </div>

      <div className="pt-4 sticky bottom-0 bg-brand-gray-50 dark:bg-brand-dark py-2">
        <button type="submit" onClick={handleSubmit} disabled={!location}
            className="w-full bg-brand-red text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg shadow-brand-red/30 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-brand-red/50 transition-transform transform hover:scale-105 disabled:bg-brand-gray-300 dark:disabled:bg-brand-gray-600 disabled:shadow-none disabled:cursor-not-allowed">
            Submit Request
        </button>
        <button type="button" onClick={onCancel}
            className="w-full mt-3 text-brand-gray-500 dark:text-brand-gray-400 font-semibold py-3 px-6 rounded-full hover:bg-brand-gray-200 dark:hover:bg-brand-gray-800 transition">
            Cancel
        </button>
      </div>
    </div>
  );
};

export default BreakdownForm;