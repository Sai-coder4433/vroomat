import React from 'react';
import { User } from '../types';
import { XIcon, UserIcon, WrenchIcon, QuestionMarkCircleIcon, BellIcon, LogOutIcon, ChevronRightIcon, PhoneIcon, ShoppingCartIcon, CarIcon, TowingIcon } from './Icons';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onProfileClick: () => void;
  onSignOut: () => void;
  onNavClick: (item: string) => void;
  onNavigateToBreakdown: () => void;
  onNavigateToBooking: () => void;
  onNavigateToEcom: () => void;
  onNavigateToTowing: () => void;
}

const MenuItem = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) => (
    <button onClick={onClick} className="w-full flex items-center text-left p-4 text-lg text-brand-dark dark:text-white hover:bg-brand-gray-200 dark:hover:bg-brand-light-dark rounded-xl transition-colors">
        {icon}
        <span className="flex-1 ml-4">{label}</span>
        <ChevronRightIcon className="w-6 h-6 text-brand-gray-400" />
    </button>
);

const MenuDivider = () => <div className="my-2 border-t border-brand-gray-200 dark:border-brand-gray-700"></div>;

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, user, onProfileClick, onSignOut, onNavClick, onNavigateToBreakdown, onNavigateToBooking, onNavigateToEcom, onNavigateToTowing }) => {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>
      <aside 
        className={`fixed top-0 right-0 h-dvh w-full max-w-sm bg-brand-gray-50/80 dark:bg-brand-dark/80 backdrop-blur-2xl shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 flex flex-col h-full text-brand-dark dark:text-white">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Menu</h2>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-brand-gray-200 dark:hover:bg-white/10">
                    <XIcon className="w-7 h-7" />
                </button>
            </div>

            {user ? (
                <div className="p-4 mb-4 bg-brand-gray-100 dark:bg-brand-light-dark rounded-2xl border border-brand-gray-200 dark:border-brand-gray-700">
                    <p className="text-lg font-bold">{user.name}</p>
                    <p className="text-sm text-brand-gray-500 dark:text-brand-gray-400">{user.email}</p>
                </div>
            ) : (
                <div className="p-4 mb-4 bg-brand-gray-100 dark:bg-brand-light-dark rounded-2xl border border-brand-gray-200 dark:border-brand-gray-700">
                    <p className="text-lg font-bold">Welcome to Vroomat</p>
                    <p className="text-sm text-brand-gray-500 dark:text-brand-gray-400">Sign in for a better experience</p>
                </div>
            )}
            
            <nav className="flex-1 space-y-2 overflow-y-auto">
                 <MenuItem icon={<WrenchIcon className="w-6 h-6 text-brand-red" />} label="Report Breakdown" onClick={onNavigateToBreakdown} />
                 <MenuItem icon={<CarIcon className="w-6 h-6 text-brand-red" />} label="Book a Service" onClick={onNavigateToBooking} />
                 <MenuItem icon={<TowingIcon className="w-6 h-6 text-brand-red" />} label="Towing Service" onClick={onNavigateToTowing} />
                 <MenuItem icon={<ShoppingCartIcon className="w-6 h-6 text-brand-red" />} label="Vroomat Ecom" onClick={onNavigateToEcom} />

                 <MenuDivider />

                 <MenuItem icon={<UserIcon className="w-6 h-6 text-brand-red" />} label={user ? "My Profile" : "Sign In / Sign Up"} onClick={onProfileClick} />
                 <MenuItem icon={<BellIcon className="w-6 h-6 text-brand-red" />} label="My Requests" onClick={() => onNavClick('My Requests')} />
                 
                 <MenuDivider />
                 
                 <MenuItem icon={<QuestionMarkCircleIcon className="w-6 h-6 text-brand-red" />} label="Support" onClick={() => onNavClick('Support')} />
                 <MenuItem icon={<PhoneIcon className="w-6 h-6 text-brand-red" />} label="Contact Us" onClick={() => onNavClick('Contact Us')} />
            </nav>

            {user && (
                <div className="pt-2">
                    <MenuDivider />
                    <MenuItem icon={<LogOutIcon className="w-6 h-6 text-brand-red" />} label="Sign Out" onClick={onSignOut} />
                </div>
            )}
        </div>
      </aside>
    </>
  );
};

export default SideMenu;