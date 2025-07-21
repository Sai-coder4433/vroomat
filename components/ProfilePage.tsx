
import React from 'react';
import { User, UserRole } from '../types';
import { UserIcon, PhoneIcon, LogOutIcon, ShoppingCartIcon, ChevronRightIcon, MailIcon, BuildingOfficeIcon, IdentificationIcon, DocumentIcon, MapPinIcon } from './Icons';

interface ProfilePageProps {
  user: User;
  onSignOut: () => void;
  onNavigateToEcom: () => void;
  onEditProfile: () => void;
}

const InfoCard: React.FC<{title: string, value?: string, children?: React.ReactNode}> = ({ title, value, children }) => (
    <div className="bg-white dark:bg-brand-light-dark rounded-xl p-4 border border-brand-gray-200 dark:border-brand-gray-700">
        <p className="text-sm text-brand-gray-400">{title}</p>
        {value && <p className="font-semibold break-words">{value}</p>}
        {children}
    </div>
);

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onSignOut, onNavigateToEcom, onEditProfile }) => {
  
  const profilePhoto = user.garageProfile?.photoUrl || user.distributorProfile?.shopPhotoUrl;
  const garageProfile = user.garageProfile;
  const distributorProfile = user.distributorProfile;

  return (
    <div className="p-6 h-full flex flex-col bg-brand-gray-50 dark:bg-brand-dark text-brand-dark dark:text-white">
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 bg-brand-gray-200 dark:bg-brand-gray-700 rounded-full flex items-center justify-center mb-4 border-4 border-white dark:border-brand-gray-800 shadow-md">
            {profilePhoto ? (
                <img src={profilePhoto} alt={user.name} className="w-full h-full object-cover rounded-full" />
            ) : (
                <UserIcon className="w-16 h-16 text-brand-red" />
            )}
          </div>
          <h3 className="text-2xl font-bold">{user.name}</h3>
          <p className="text-brand-red bg-brand-red/10 font-bold py-1 px-3 rounded-full text-sm mt-2">{user.role}</p>
           {(user.role === UserRole.Garage || user.role === UserRole.Distributor) && (
              <div className="mt-2 text-xs font-semibold">
                {user.garageProfile?.isVerified || user.distributorProfile?.isVerified ? (
                    <span className="text-green-500 bg-green-500/10 py-1 px-3 rounded-full">✓ Verified</span>
                ) : (
                    <span className="text-yellow-500 bg-yellow-500/10 py-1 px-3 rounded-full">⌛ Pending Verification</span>
                )}
              </div>
           )}
        </div>
        
        <div className="mt-10 space-y-4">
          <h4 className="font-bold text-lg text-brand-gray-500 dark:text-brand-gray-400">Account Details</h4>
          <InfoCard title="Email Address">
            <div className="flex items-center">
                <MailIcon className="w-5 h-5 text-brand-gray-500 mr-3" />
                <p className="font-semibold">{user.email}</p>
            </div>
          </InfoCard>
          {user.phone && (
            <InfoCard title="Phone Number">
                 <div className="flex items-center">
                    <PhoneIcon className="w-5 h-5 text-brand-gray-500 mr-3" />
                    <p className="font-semibold">+91 {user.phone}</p>
                </div>
            </InfoCard>
          )}

          {(garageProfile || distributorProfile) && (
            <div className="mt-6 space-y-4">
                 <h4 className="font-bold text-lg text-brand-gray-500 dark:text-brand-gray-400">Verification & Profile Details</h4>
                 <InfoCard title="Aadhar Number" value={garageProfile?.aadhar || distributorProfile?.aadhar} />
                 <InfoCard title="PAN Number" value={garageProfile?.pan || distributorProfile?.pan} />
                 
                 {garageProfile?.aadharImageUrl && <InfoCard title="Aadhar Document" value={garageProfile.aadharImageUrl} />}
                 {garageProfile?.panImageUrl && <InfoCard title="PAN Document" value={garageProfile.panImageUrl} />}
                 {garageProfile?.bankDetailsUrl && <InfoCard title="Bank Details" value={garageProfile.bankDetailsUrl} />}
                 {garageProfile?.addressProofUrl && <InfoCard title="Address Proof" value={garageProfile.addressProofUrl} />}
                 {garageProfile?.location && <InfoCard title="Location" value={`Lat: ${garageProfile.location.lat.toFixed(4)}, Lng: ${garageProfile.location.lng.toFixed(4)}`} />}
                 
                 {distributorProfile?.businessRegUrl && <InfoCard title="Business Registration" value={distributorProfile.businessRegUrl} />}
            </div>
          )}

           <div className="mt-6 space-y-2">
                 <h4 className="font-bold text-lg text-brand-gray-500 dark:text-brand-gray-400">Actions</h4>
                <button onClick={onNavigateToEcom} className="w-full bg-white dark:bg-brand-light-dark rounded-xl p-4 flex items-center text-left hover:bg-brand-gray-100 dark:hover:bg-brand-gray-800 transition-colors border border-brand-gray-200 dark:border-brand-gray-700">
                    <ShoppingCartIcon className="w-6 h-6 text-brand-red mr-4" />
                    <div className="flex-1">
                        <p className="font-semibold">Vroomat Ecom</p>
                        <p className="text-sm text-brand-gray-400">Marketplace for parts & tools</p>
                    </div>
                    <ChevronRightIcon className="w-6 h-6 text-brand-gray-400" />
                </button>
                {user.role === UserRole.Garage && (
                    <button onClick={onEditProfile} className="w-full bg-white dark:bg-brand-light-dark rounded-xl p-4 flex items-center text-left hover:bg-brand-gray-100 dark:hover:bg-brand-gray-800 transition-colors border border-brand-gray-200 dark:border-brand-gray-700">
                        <BuildingOfficeIcon className="w-6 h-6 text-brand-red mr-4" />
                        <div className="flex-1">
                            <p className="font-semibold">Edit Garage Profile</p>
                            <p className="text-sm text-brand-gray-400">Update details & documents</p>
                        </div>
                        <ChevronRightIcon className="w-6 h-6 text-brand-gray-400" />
                    </button>
                )}
           </div>
        </div>
      </div>

      <div className="w-full mt-6 sticky bottom-6">
        <button
          onClick={onSignOut}
          className="w-full flex items-center justify-center bg-brand-gray-700 dark:bg-brand-gray-800 text-white font-bold py-4 px-6 rounded-full text-lg hover:bg-brand-gray-600 dark:hover:bg-brand-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-gray-500 transition"
        >
          <LogOutIcon className="w-6 h-6 mr-3 text-brand-red" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;