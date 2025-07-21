import React from 'react';
import { WrenchIcon, CarIcon, CarWashIcon, TowingIcon, ShoppingCartIcon, WarrantyIcon, HistoryIcon, AccessoriesIcon } from './Icons';

interface ServiceTilesProps {
  onReportBreakdown: () => void;
  onBookService: () => void;
  onNavigateToEcom: () => void;
  onNavigateToTowing: () => void;
}

const ServiceTile = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center text-center p-2 bg-white dark:bg-brand-light-dark rounded-2xl shadow-md dark:shadow-black/20 hover:shadow-lg transition-all hover:-translate-y-1 transform duration-200 ease-in-out border border-brand-gray-200 dark:border-brand-gray-800">
        <div className="flex items-center justify-center w-14 h-14 bg-brand-red/10 rounded-full mb-2">
            {icon}
        </div>
        <span className="text-xs font-semibold text-brand-dark dark:text-brand-gray-100 leading-tight">{label}</span>
    </button>
);

const ServiceTiles: React.FC<ServiceTilesProps> = ({ onReportBreakdown, onBookService, onNavigateToEcom, onNavigateToTowing }) => {

    const services = [
        { icon: <WrenchIcon className="w-7 h-7 text-brand-red" />, label: "Breakdown Help", onClick: onReportBreakdown },
        { icon: <CarIcon className="w-7 h-7 text-brand-red" />, label: "Book a Service", onClick: onBookService },
        { icon: <TowingIcon className="w-7 h-7 text-brand-red" />, label: "Towing Service", onClick: onNavigateToTowing },
        { icon: <ShoppingCartIcon className="w-7 h-7 text-brand-red" />, label: "Buy Parts (Ecom)", onClick: onNavigateToEcom },
        { icon: <CarWashIcon className="w-7 h-7 text-brand-red" />, label: "Car Spa / Wash", onClick: () => alert('Coming Soon!') },
        { icon: <AccessoriesIcon className="w-7 h-7 text-brand-red" />, label: "Accessories", onClick: () => alert('Coming Soon!') },
        { icon: <WarrantyIcon className="w-7 h-7 text-brand-red" />, label: "Warranty / AMC", onClick: () => alert('Coming Soon!') },
        { icon: <HistoryIcon className="w-7 h-7 text-brand-red" />, label: "Vehicle Inspection", onClick: () => alert('Coming Soon!') },
    ];

    return (
        <div className="h-full flex flex-col justify-center animate-fade-in-up">
            <h2 className="text-xl font-bold text-brand-dark dark:text-white mb-4 text-center">Explore Our Services</h2>
            <div className="grid grid-cols-4 gap-3">
                {services.map((service, index) => (
                    <ServiceTile key={index} {...service} />
                ))}
            </div>
        </div>
    );
};

export default ServiceTiles;