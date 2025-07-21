import React, { useState } from 'react';
import { User, GarageProfile } from '../types';
import { SpinnerIcon, BuildingOfficeIcon, IdentificationIcon, CreditCardIcon } from './Icons';

interface GarageProfileSetupProps {
    user: User;
    onSubmit: (profileData: Partial<GarageProfile>) => void;
}

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }> = ({ label, error, ...props }) => (
    <div>
        <label className="text-sm font-semibold text-brand-gray-600 dark:text-brand-gray-400 mb-2 block">{label}</label>
        <input
            {...props}
            className={`w-full bg-white dark:bg-brand-gray-800 border-2 ${error ? 'border-red-400' : 'border-brand-gray-200 dark:border-brand-gray-700'} text-brand-dark dark:text-white rounded-xl p-4 appearance-none focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-brand-red'} transition placeholder:text-brand-gray-400`}
        />
        {error && <p className="text-red-500 text-sm mt-1 ml-1" role="alert">{error}</p>}
    </div>
);


const FormSection: React.FC<{title: string, icon: React.ReactNode, children: React.ReactNode}> = ({ title, icon, children }) => (
    <div className="bg-white dark:bg-brand-light-dark/50 border border-brand-gray-200 dark:border-brand-gray-800 p-4 sm:p-6 rounded-2xl">
        <div className="flex items-center mb-6">
            {icon}
            <h3 className="text-xl font-bold ml-3 text-brand-dark dark:text-white">{title}</h3>
        </div>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const GarageProfileSetup: React.FC<GarageProfileSetupProps> = ({ user, onSubmit }) => {
    const [profileData, setProfileData] = useState<Partial<GarageProfile>>({
        photoUrl: user.garageProfile?.photoUrl || `https://picsum.photos/seed/${user.id}/400`,
        address: user.garageProfile?.address || '',
        contactNumber: user.garageProfile?.contactNumber || '',
        aadhar: user.garageProfile?.aadhar || '',
        pan: user.garageProfile?.pan || '',
        gst: user.garageProfile?.gst || '',
        bankAccountName: user.garageProfile?.bankAccountName || user.name,
        bankAccountNumber: user.garageProfile?.bankAccountNumber || '',
        ifsc: user.garageProfile?.ifsc || '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'address' || name === 'photoUrl' || name === 'bankAccountName') {
            setProfileData(prev => ({ ...prev, [name]: value }));
        } else {
            setProfileData(prev => ({ ...prev, [name]: value.toUpperCase() }));
        }
    };

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        if (!profileData.bankAccountName?.trim()) newErrors.bankAccountName = "Account Holder Name is required.";
        if (!profileData.address?.trim()) newErrors.address = "Garage Address is required.";
        if (!profileData.contactNumber?.match(/^\d{10}$/)) newErrors.contactNumber = "A valid 10-digit contact number is required.";
        if (!profileData.aadhar?.match(/^\d{12}$/)) newErrors.aadhar = "A valid 12-digit Aadhar number is required.";
        if (!profileData.pan?.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)) newErrors.pan = "A valid PAN number is required.";
        if (profileData.gst && !profileData.gst.match(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)) newErrors.gst = "A valid GST number is required.";
        if (!profileData.bankAccountNumber?.match(/^\d{9,18}$/)) newErrors.bankAccountNumber = "A valid bank account number is required.";
        if (!profileData.ifsc?.match(/^[A-Z]{4}0[A-Z0-9]{6}$/)) newErrors.ifsc = "A valid IFSC code is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            onSubmit(profileData);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="p-4 sm:p-6 h-full flex flex-col bg-brand-gray-50 dark:bg-brand-dark text-brand-dark dark:text-white">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold">Complete Your Garage Profile</h2>
                <p className="text-brand-gray-500 dark:text-brand-gray-400 mt-2 max-w-lg mx-auto">
                    Please provide your details to get verified and start receiving service requests.
                </p>
                {user.garageProfile?.isVerified && (
                     <p className="mt-4 text-green-500 font-bold bg-green-500/10 py-1 px-3 rounded-full inline-block">✓ Verified</p>
                )}
                 {!user.garageProfile?.isVerified && user.garageProfile?.profileComplete && (
                     <p className="mt-4 text-yellow-500 font-bold bg-yellow-500/10 py-1 px-3 rounded-full inline-block">⌛ Verification Pending</p>
                )}
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-6 pr-2 hide-scrollbar">
                
                <FormSection title="Garage Details" icon={<BuildingOfficeIcon className="w-8 h-8 text-brand-red" />}>
                     <InputField
                        label="Garage Name"
                        name="bankAccountName"
                        type="text"
                        value={profileData.bankAccountName}
                        onChange={handleChange}
                        placeholder="e.g., ProMechanics Garage"
                        error={errors.bankAccountName}
                     />
                     <InputField
                        label="Garage Address"
                        name="address"
                        type="text"
                        value={profileData.address}
                        onChange={handleChange}
                        placeholder="Full Address"
                        error={errors.address}
                     />
                     <InputField
                        label="Contact Number"
                        name="contactNumber"
                        type="tel"
                        maxLength={10}
                        value={profileData.contactNumber}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        error={errors.contactNumber}
                     />
                      <InputField
                        label="Garage Photo URL (Optional)"
                        name="photoUrl"
                        type="text"
                        value={profileData.photoUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/garage.jpg"
                        error={errors.photoUrl}
                     />
                </FormSection>

                <FormSection title="ID Verification" icon={<IdentificationIcon className="w-8 h-8 text-brand-red" />}>
                     <InputField
                        label="Aadhar Card Number"
                        name="aadhar"
                        type="text"
                        maxLength={12}
                        value={profileData.aadhar}
                        onChange={handleChange}
                        placeholder="12-digit Aadhar number"
                        error={errors.aadhar}
                     />
                     <InputField
                        label="PAN Card Number"
                        name="pan"
                        type="text"
                        maxLength={10}
                        value={profileData.pan}
                        onChange={handleChange}
                        placeholder="10-character PAN"
                        error={errors.pan}
                     />
                     <InputField
                        label="GST Number (Optional)"
                        name="gst"
                        type="text"
                        maxLength={15}
                        value={profileData.gst}
                        onChange={handleChange}
                        placeholder="15-character GSTIN"
                        error={errors.gst}
                     />
                </FormSection>

                 <FormSection title="Bank Details" icon={<CreditCardIcon className="w-8 h-8 text-brand-red" />}>
                     <InputField
                        label="Account Holder Name"
                        name="bankAccountName"
                        type="text"
                        value={profileData.bankAccountName}
                        onChange={handleChange}
                        placeholder="Name as per bank records"
                        error={errors.bankAccountName}
                     />
                     <InputField
                        label="Account Number"
                        name="bankAccountNumber"
                        type="text"
                        value={profileData.bankAccountNumber}
                        onChange={handleChange}
                        placeholder="Bank account number"
                        error={errors.bankAccountNumber}
                     />
                     <InputField
                        label="IFSC Code"
                        name="ifsc"
                        type="text"
                        maxLength={11}
                        value={profileData.ifsc}
                        onChange={handleChange}
                        placeholder="11-character IFSC code"
                        error={errors.ifsc}
                     />
                </FormSection>

                <div className="pt-4 sticky bottom-0 bg-brand-gray-50 dark:bg-brand-dark py-4 -mx-4 px-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-brand-red text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg shadow-brand-red/30 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-brand-red/50 transition-all transform hover:scale-105 disabled:bg-brand-gray-400 disabled:shadow-none disabled:cursor-wait flex justify-center items-center dark:disabled:bg-brand-gray-600"
                    >
                        {isLoading ? <SpinnerIcon className="animate-spin h-6 w-6"/> : 'Submit for Verification'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default GarageProfileSetup;