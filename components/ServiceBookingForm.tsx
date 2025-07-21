
import React, { useState } from 'react';
import { VehicleDetails, ServiceType, VehicleCategory } from '../types';
import { MapPinIcon, ChevronDownIcon, SpinnerIcon } from './Icons';
import VehicleSelection from './VehicleSelection';

interface ServiceBookingFormProps {
  onFindGarages: (vehicleDetails: VehicleDetails, serviceType: ServiceType) => void;
  onCancel: () => void;
  error: string | null;
  location: { lat: number; lng: number } | null;
  locationError: string | null;
}

const ServiceBookingForm: React.FC<ServiceBookingFormProps> = ({ onFindGarages, onCancel, error, location, locationError }) => {
  const [vehicleDetails, setVehicleDetails] = useState<Partial<VehicleDetails>>({});
  const [serviceType, setServiceType] = useState<ServiceType>(ServiceType.FullService);
  const [pickupDate, setPickupDate] = useState(new Date().toISOString().split('T')[0]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!vehicleDetails.category) newErrors.vehicle = "Please select a vehicle type.";
    if (!vehicleDetails.brand) newErrors.vehicle = "Please select a brand.";
    if (!vehicleDetails.model) newErrors.vehicle = "Please select a model.";
    if (!vehicleDetails.fuelType) newErrors.vehicle = "Please select a fuel type.";
    if (!serviceType) newErrors.service = "Please select a service type.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate() && vehicleDetails.category && vehicleDetails.brand && vehicleDetails.model && vehicleDetails.fuelType) {
      onFindGarages(vehicleDetails as VehicleDetails, serviceType);
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
              <p className="text-brand-dark dark:text-white font-semibold">Pickup Location Detected</p>
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
              <p className="text-xs text-brand-gray-500 dark:text-brand-gray-400">Please grant permission for pickup.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 h-full flex flex-col bg-brand-gray-50 dark:bg-brand-dark text-brand-dark dark:text-white">
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <h2 className="text-3xl font-bold mb-4">Book a Vehicle Service</h2>
        <p className="text-brand-gray-500 dark:text-brand-gray-400 mb-6">Get your vehicle picked up, serviced, and dropped back at your doorstep.</p>

        <LocationStatus />

        <form onSubmit={handleSubmit} className="space-y-6">
          <VehicleSelection 
              onChange={handleVehicleChange} 
              initialDetails={vehicleDetails}
              error={errors.vehicle}
          />
          
          {vehicleDetails.fuelType && (
            <div className="relative animate-fade-in-up" style={{animationDelay: `400ms`}}>
              <label className="text-brand-gray-500 dark:text-brand-gray-400 text-sm font-semibold mb-2 block">2. Select Service Type</label>
              <select 
                value={serviceType} 
                onChange={(e) => setServiceType(e.target.value as ServiceType)}
                className="w-full bg-white dark:bg-brand-gray-800 border-2 border-brand-gray-200 dark:border-brand-gray-700 text-brand-dark dark:text-white rounded-xl p-4 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-red transition"
              >
                {Object.entries(ServiceType).map(([key, val]) => (
                  <option key={key} value={val}>{val}</option>
                ))}
              </select>
              <ChevronDownIcon className="w-6 h-6 text-brand-gray-400 absolute right-4 top-12 pointer-events-none" />
              {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
            </div>
          )}
          
          {vehicleDetails.fuelType && (
            <div className="animate-fade-in-up" style={{animationDelay: `500ms`}}>
              <label className="text-brand-gray-500 dark:text-brand-gray-400 text-sm font-semibold mb-2 block">3. Preferred Pickup Date</label>
              <input 
                type="date"
                value={pickupDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-white dark:bg-brand-gray-800 border-2 border-brand-gray-200 dark:border-brand-gray-700 text-brand-dark dark:text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-red transition"
              />
            </div>
          )}
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
      </div>

       <div className="pt-4 sticky bottom-0 bg-brand-gray-50 dark:bg-brand-dark py-2">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={!location}
              className="w-full bg-brand-red text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg shadow-brand-red/30 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-brand-red/50 transition-transform transform hover:scale-105 disabled:bg-brand-gray-300 dark:disabled:bg-brand-gray-600 disabled:shadow-none disabled:cursor-not-allowed"
            >
              Find Service Centers
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full mt-4 text-brand-gray-500 dark:text-brand-gray-400 font-semibold py-3 px-6 rounded-full hover:bg-brand-gray-200 dark:hover:bg-brand-gray-800 transition"
            >
              Cancel
            </button>
       </div>
    </div>
  );
};

export default ServiceBookingForm;