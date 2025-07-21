import React, { useState, useEffect } from 'react';
import { Garage } from '../types';
import MapComponent from './MapComponent';

interface BookingStatusProps {
  garage: Garage;
  onCancel: () => void;
  isServiceBooking: boolean;
  isTowingBooking: boolean;
  userLocation: { lat: number; lng: number };
}

const breakdownStatuses = [
    'Help is on the way!',
    'Mechanic arriving soon...',
    'Your mechanic has arrived!'
];

const serviceStatuses = [
    'Confirming your booking...',
    'Mechanic en route for pickup',
    'Vehicle picked up, heading to garage',
    'Vehicle at garage, starting service',
    'Servicing in progress...',
    'Service complete, preparing for return',
    'Your vehicle is on its way back',
    'Your vehicle has been delivered!'
];

const towingStatuses = [
    'Tow truck dispatched!',
    'Truck is en route...',
    'Arriving at your location soon.',
    'The tow truck has arrived!'
];


const BookingStatus: React.FC<BookingStatusProps> = ({ garage, onCancel, isServiceBooking, isTowingBooking, userLocation }) => {
  const [progress, setProgress] = useState(0); 
  const [mechanicLocation, setMechanicLocation] = useState<[number, number]>([garage.latitude, garage.longitude]);

  const statuses = isServiceBooking ? serviceStatuses : isTowingBooking ? towingStatuses : breakdownStatuses;
  const intervalTime = isServiceBooking ? 4000 : 3000;

  useEffect(() => {
    if (progress >= 100) {
      setMechanicLocation([userLocation.lat, userLocation.lng]);
      return;
    };

    const interval = setInterval(() => {
      setProgress(prev => {
        const nextProgress = Math.min(prev + (100 / (statuses.length -1)), 100);

        // Interpolate location for animation
        const lat = garage.latitude + (userLocation.lat - garage.latitude) * (nextProgress / 100);
        const lng = garage.longitude + (userLocation.lng - garage.longitude) * (nextProgress / 100);
        setMechanicLocation([lat, lng]);

        return nextProgress;
      }); 
    }, intervalTime);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, garage.latitude, garage.longitude, userLocation.lat, userLocation.lng]);

  const currentStatusIndex = Math.min(Math.floor(progress / (100 / (statuses.length - 1))), statuses.length - 1);
  const currentStatus = statuses[currentStatusIndex] || statuses[0];

  return (
    <div className="h-full w-full flex flex-col">
      <div className="relative h-3/5 w-full bg-brand-gray-700 dark:bg-brand-gray-900 overflow-hidden">
        <MapComponent 
            userLocation={[userLocation.lat, userLocation.lng]}
            garageLocation={[garage.latitude, garage.longitude]}
            mechanicLocation={mechanicLocation}
        />
      </div>

      <div className="relative h-2/5 w-full bg-white dark:bg-brand-light-dark rounded-t-3xl -mt-6 p-6 flex flex-col justify-between text-brand-dark dark:text-white">
        <div>
            <p className="text-center font-bold text-brand-red text-lg">{currentStatus}</p>
            <h2 className="text-center text-3xl font-bold mt-2">{garage.garageName}</h2>
            <div className="flex justify-center items-center text-brand-gray-500 dark:text-brand-gray-400 mt-2 space-x-4">
                <span>{garage.eta}</span>
                <span className="text-brand-gray-300 dark:text-brand-gray-600">•</span>
                <span>{garage.totalEstimatedPrice}</span>
            </div>
        </div>
        
        <div className="w-full bg-brand-gray-200 dark:bg-brand-gray-700 rounded-full h-2.5 my-4">
            <div className="bg-brand-red h-2.5 rounded-full transition-all duration-1000" style={{width: `${progress}%`}}></div>
        </div>

        <button
          onClick={onCancel}
          disabled={progress >= 100 && (isServiceBooking || isTowingBooking)}
          className="w-full bg-brand-gray-200 dark:bg-brand-gray-800 text-brand-dark dark:text-white font-bold py-4 px-6 rounded-full text-lg hover:bg-brand-gray-300 dark:hover:bg-brand-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {progress < 100 ? 'Cancel Service' : 'Go to Dashboard'}
        </button>
      </div>
    </div>
  );
};

export default BookingStatus;