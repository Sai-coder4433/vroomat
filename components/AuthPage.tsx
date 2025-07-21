
import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { MailIcon, PhoneIcon, LockClosedIcon, EyeIcon, EyeOffIcon, GoogleIcon, UserIcon as NameIcon, SpinnerIcon, CheckIcon, IdentificationIcon, MapPinIcon, DocumentIcon } from './Icons';
import { signIn, signUp, signInWithGoogle, SignUpData } from '../services/authService';

interface AuthPageProps {
  onSignIn: (user: User) => void;
  onSignUp: (user: User) => void;
  location: { lat: number; lng: number } | null;
  locationError: string | null;
}

const InputField: React.FC<{ icon: React.ReactNode; error?: string; [key: string]: any }> = ({ icon, error, ...props }) => (
    <div>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" aria-hidden="true">
                {icon}
            </div>
            <input
                {...props}
                className={`w-full bg-brand-gray-100 dark:bg-brand-gray-800 border-2 ${error ? 'border-red-400' : 'border-brand-gray-200 dark:border-brand-gray-700'} text-brand-dark dark:text-white rounded-xl p-4 pl-12 appearance-none focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-brand-red'} transition placeholder:text-brand-gray-400`}
            />
        </div>
        {error && <p className="text-red-500 text-sm mt-1 ml-1" role="alert">{error}</p>}
    </div>
);

const FileInput: React.FC<{ label: string; onFileSelect: (file: File | null) => void; selectedFile: File | null; error?: string; accept: string; isOptional?: boolean }> = ({ label, onFileSelect, selectedFile, error, accept, isOptional }) => {
    const id = `file-input-${label.replace(/\s+/g, '-')}`;
    return (
        <div>
            <label htmlFor={id} className="text-sm font-semibold text-brand-gray-600 dark:text-brand-gray-400 mb-2 block">
                {label} {isOptional && <span className="text-xs font-normal">(Optional)</span>}
            </label>
            <div className={`relative w-full bg-brand-gray-100 dark:bg-brand-gray-800 border-2 ${error ? 'border-red-400' : 'border-brand-gray-200 dark:border-brand-gray-700'} rounded-xl appearance-none focus-within:outline-none focus-within:ring-2 ${error ? 'focus-within:ring-red-500' : 'focus-within:ring-brand-red'} transition`}>
                <input type="file" id={id} onChange={e => onFileSelect(e.target.files ? e.target.files[0] : null)} className="sr-only" accept={accept} />
                <label htmlFor={id} className="cursor-pointer flex justify-between items-center p-4">
                    <span className={`truncate pr-2 ${selectedFile ? 'text-brand-dark dark:text-white' : 'text-brand-gray-400'}`}>{selectedFile ? selectedFile.name : 'Choose a file...'}</span>
                    <div className="bg-brand-gray-200 dark:bg-brand-gray-700 text-brand-gray-600 dark:text-brand-gray-300 font-semibold py-1 px-3 rounded-md text-sm">
                        Browse
                    </div>
                </label>
            </div>
            {error && <p className="text-red-500 text-sm mt-1 ml-1" role="alert">{error}</p>}
        </div>
    );
};

const AuthPage: React.FC<AuthPageProps> = ({ onSignIn, onSignUp, location, locationError }) => {
  const [mode, setMode] = useState<'signIn' | 'register'>('signIn');
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.User);
  
  // Form fields
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Role-specific fields
  const [garagePhoto, setGaragePhoto] = useState<File | null>(null);
  const [aadharNumber, setAadharNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [bankDetailsFile, setBankDetailsFile] = useState<File | null>(null);
  const [aadharFile, setAadharFile] = useState<File | null>(null);
  const [panFile, setPanFile] = useState<File | null>(null);
  const [addressProofFile, setAddressProofFile] = useState<File | null>(null);
  const [garageLocation, setGarageLocation] = useState<{ lat: number; lng: number} | null>(null);
  const [shopPhoto, setShopPhoto] = useState<File | null>(null);
  const [businessRegFile, setBusinessRegFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const resetFormFields = () => {
    setName('');
    setIdentifier('');
    setPassword('');
    setAgreeToTerms(false);
    setGaragePhoto(null);
    setAadharNumber('');
    setPanNumber('');
    setBankDetailsFile(null);
    setAadharFile(null);
    setPanFile(null);
    setAddressProofFile(null);
    setGarageLocation(null);
    setShopPhoto(null);
    setBusinessRegFile(null);
    setErrors({});
    setGeneralError('');
  }

  useEffect(() => {
    resetFormFields();
  }, [mode, selectedRole]);

  const handlePinLocation = () => {
    if (location) {
        setGarageLocation(location);
        setErrors(prev => ({...prev, location: ''}));
    } else {
        setErrors(prev => ({ ...prev, location: locationError || "Could not get location. Please enable permissions." }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (mode === 'register' && !name.trim()) {
      newErrors.name = 'Full Name is required.';
    }

    if (!identifier.trim()) {
      newErrors.identifier = 'Gmail or Mobile Number is required.';
    } else {
        const isEmail = identifier.includes('@');
        const isPhone = /^\d{10}$/.test(identifier);
        if (isEmail) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)) {
                newErrors.identifier = 'Invalid email format.';
            }
        } else if (!isPhone) {
            newErrors.identifier = 'Must be a valid email or a 10-digit mobile number.';
        }
    }
    
    if (password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters.';
    }
    
    if (mode === 'register') {
        if (!agreeToTerms) newErrors.terms = 'You must agree to the terms.';

        if (selectedRole === UserRole.Garage) {
            if (!garagePhoto) newErrors.garagePhoto = "Garage/Workshop Photo is required.";
            if (!aadharNumber.match(/^\d{12}$/)) newErrors.aadharNumber = "A valid 12-digit Aadhar number is required.";
            if (!panNumber.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)) newErrors.panNumber = "A valid PAN is required (e.g., ABCDE1234F).";
            if (!bankDetailsFile) newErrors.bankDetailsFile = "Bank Account Details upload is required.";
            if (!aadharFile) newErrors.aadharFile = "Aadhar Card Image upload is required.";
            if (!panFile) newErrors.panFile = "PAN Card Image upload is required.";
            if (!garageLocation) newErrors.location = "Garage location must be pinned.";
        } else if (selectedRole === UserRole.Distributor) {
            if (!shopPhoto) newErrors.shopPhoto = "Shop Photo is required.";
            if (!aadharNumber.match(/^\d{12}$/)) newErrors.aadharNumber = "A valid 12-digit Aadhar number is required.";
            if (!panNumber.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)) newErrors.panNumber = "A valid PAN is required (e.g., ABCDE1234F).";
        }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');
    if (!validate()) return;
    
    setIsLoading(true);
    try {
      if (mode === 'register') {
        const signUpData: SignUpData = {
          name,
          identifier,
          password,
          role: selectedRole,
          garagePhoto: garagePhoto?.name,
          aadharNumber,
          panNumber,
          bankDetailsFile: bankDetailsFile?.name,
          aadharFile: aadharFile?.name,
          panFile: panFile?.name,
          addressProofFile: addressProofFile?.name,
          location: garageLocation || undefined,
          shopPhoto: shopPhoto?.name,
          businessRegFile: businessRegFile?.name
        };
        const newUser = await signUp(signUpData);
        onSignUp(newUser);
      } else {
        const user = await signIn(identifier, password);
        onSignIn(user);
      }
    } catch (error: any) {
      setGeneralError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setGeneralError('');
    try {
      const user = await signInWithGoogle();
      onSignIn(user);
    } catch (error: any) {
      setGeneralError(error.message);
    } finally {
        setIsLoading(false);
    }
  }

  const roleOptions = [UserRole.User, UserRole.Garage, UserRole.Distributor];

  return (
    <div className="p-4 sm:p-6 min-h-full flex flex-col bg-white dark:bg-brand-dark text-brand-dark dark:text-white">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-6">
            <h1 className="text-3xl font-bold tracking-tighter">Vroom<span className="text-brand-red">at</span></h1>
            <p className="text-brand-gray-500 dark:text-brand-gray-400 mt-2">{mode === 'register' ? 'Create your Vroomat Account' : 'Welcome back! Sign in to continue.'}</p>
        </div>
        
        {mode === 'register' && (
             <div className="mb-6">
                 <label className="text-sm font-bold text-brand-gray-600 dark:text-brand-gray-400 mb-2 block">I am a:</label>
                <div className="flex bg-brand-gray-100 dark:bg-brand-gray-800 rounded-full p-1">
                    {roleOptions.map(role => (
                        <button type="button" key={role} onClick={() => setSelectedRole(role)} className={`w-full text-center text-sm font-bold p-2 rounded-full transition-colors duration-300 ${selectedRole === role ? 'bg-brand-red text-white shadow' : 'text-brand-gray-500 dark:text-brand-gray-400 hover:bg-brand-gray-200 dark:hover:bg-brand-gray-700'}`}>
                           {role === UserRole.Garage ? "Garage" : role === UserRole.Distributor ? "Distributor" : "User"}
                        </button>
                    ))}
                </div>
             </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <InputField 
              icon={<NameIcon className="w-5 h-5 text-brand-gray-400" />} type="text" placeholder="Full Name / Registered Name" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} aria-label="Full Name or Registered Name" error={errors.name} autoComplete="name"
            />
          )}

          <InputField 
            icon={identifier.includes('@') ? <MailIcon className="w-5 h-5 text-brand-gray-400" /> : <PhoneIcon className="w-5 h-5 text-brand-gray-400" />} type="text" placeholder="Gmail or Mobile Number" value={identifier} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIdentifier(e.target.value)} aria-label="Gmail or Mobile Number" error={errors.identifier} autoComplete="email"
          />

           <div className="relative">
             <InputField 
                icon={<LockClosedIcon className="w-5 h-5 text-brand-gray-400" />} type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} aria-label="Password" error={errors.password} autoComplete={mode === 'register' ? "new-password" : "current-password"}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center" aria-label={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? <EyeOffIcon className="w-5 h-5 text-brand-gray-500"/> : <EyeIcon className="w-5 h-5 text-brand-gray-500"/>}
              </button>
           </div>
          
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${mode === 'register' && selectedRole === UserRole.Garage ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="space-y-4 pt-4 border-t border-brand-gray-200 dark:border-brand-gray-700">
                    <FileInput label="Garage/Workshop Photo" onFileSelect={setGaragePhoto} selectedFile={garagePhoto} error={errors.garagePhoto} accept="image/*,.pdf"/>
                    <div>
                        <label className="text-sm font-semibold text-brand-gray-600 dark:text-brand-gray-400 mb-2 block">Garage Location</label>
                        <button type="button" onClick={handlePinLocation} className="w-full flex items-center justify-center p-4 rounded-xl bg-brand-gray-100 dark:bg-brand-gray-800 border-2 border-brand-gray-200 dark:border-brand-gray-700 hover:border-brand-red transition">
                            <MapPinIcon className="w-5 h-5 text-brand-red mr-2" />
                            <span className="font-semibold">{garageLocation ? 'Location Pinned!' : 'Pin Location on Map'}</span>
                        </button>
                        {garageLocation && <p className="text-green-500 text-sm mt-1 ml-1">Location set to: {garageLocation.lat.toFixed(4)}, {garageLocation.lng.toFixed(4)}</p>}
                        {errors.location && <p className="text-red-500 text-sm mt-1 ml-1" role="alert">{errors.location}</p>}
                    </div>
                    <InputField icon={<IdentificationIcon className="w-5 h-5 text-brand-gray-400" />} type="text" placeholder="Aadhar Card Number" value={aadharNumber} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setAadharNumber(e.target.value.replace(/\s/g, ''))} maxLength={12} error={errors.aadharNumber} />
                    <InputField icon={<IdentificationIcon className="w-5 h-5 text-brand-gray-400" />} type="text" placeholder="PAN Card Number" value={panNumber} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPanNumber(e.target.value.toUpperCase())} maxLength={10} error={errors.panNumber} />
                    <FileInput label="Upload Bank Account Details" onFileSelect={setBankDetailsFile} selectedFile={bankDetailsFile} error={errors.bankDetailsFile} accept="image/*,.pdf"/>
                    <FileInput label="Upload Aadhar Card Image" onFileSelect={setAadharFile} selectedFile={aadharFile} error={errors.aadharFile} accept="image/*,.pdf"/>
                    <FileInput label="Upload PAN Card Image" onFileSelect={setPanFile} selectedFile={panFile} error={errors.panFile} accept="image/*,.pdf"/>
                    <FileInput label="Upload Address Proof" onFileSelect={setAddressProofFile} selectedFile={addressProofFile} error={errors.addressProofFile} accept="image/*,.pdf" isOptional={true} />
                </div>
            </div>

            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${mode === 'register' && selectedRole === UserRole.Distributor ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="space-y-4 pt-4 border-t border-brand-gray-200 dark:border-brand-gray-700">
                    <FileInput label="Shop Photo" onFileSelect={setShopPhoto} selectedFile={shopPhoto} error={errors.shopPhoto} accept="image/*,.pdf"/>
                    <InputField icon={<IdentificationIcon className="w-5 h-5 text-brand-gray-400" />} type="text" placeholder="Aadhar Card Number" value={aadharNumber} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setAadharNumber(e.target.value.replace(/\s/g, ''))} maxLength={12} error={errors.aadharNumber} />
                    <InputField icon={<IdentificationIcon className="w-5 h-5 text-brand-gray-400" />} type="text" placeholder="PAN Card Number" value={panNumber} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPanNumber(e.target.value.toUpperCase())} maxLength={10} error={errors.panNumber} />
                    <FileInput label="GST/Business Reg. Certificate" onFileSelect={setBusinessRegFile} selectedFile={businessRegFile} error={errors.businessRegFile} accept="image/*,.pdf" isOptional={true} />
                </div>
            </div>
          
           {mode === 'signIn' && (
             <div className="text-right">
                <a href="#" onClick={(e) => {e.preventDefault(); alert("Forgot Password functionality is coming soon!")}} className="text-sm font-semibold text-brand-red hover:underline">
                    Forgot Password?
                </a>
             </div>
           )}

          {mode === 'register' && (
            <label htmlFor="terms" className="flex items-center space-x-3 cursor-pointer select-none pt-2">
                <div className={`w-5 h-5 rounded border-2 ${errors.terms ? 'border-red-500' : 'border-brand-gray-300 dark:border-brand-gray-600'} flex items-center justify-center transition-colors ${agreeToTerms ? 'bg-brand-red border-brand-red' : 'bg-transparent'}`}>
                   {agreeToTerms && <CheckIcon className="w-3 h-3 text-white" />}
                </div>
                <input id="terms" type="checkbox" checked={agreeToTerms} onChange={(e) => setAgreeToTerms(e.target.checked)} className="sr-only" aria-describedby="terms-error"/>
                <span className="text-sm text-brand-gray-500 dark:text-brand-gray-400">I agree to the <a href="#" className="font-semibold text-brand-red hover:underline">Terms & Conditions</a></span>
                 {errors.terms && <span id="terms-error" className="sr-only">{errors.terms}</span>}
            </label>
          )}

          {generalError && <p className="text-red-500 text-sm text-center" role="alert">{generalError}</p>}
           
          <div className="pt-2 space-y-4">
            <button type="submit" disabled={isLoading} className="w-full bg-brand-red text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg shadow-brand-red/30 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-brand-red/50 transition-all transform hover:scale-105 disabled:bg-brand-gray-300 dark:disabled:bg-brand-gray-600 disabled:shadow-none disabled:cursor-wait flex justify-center items-center">
              {isLoading ? <SpinnerIcon className="animate-spin h-6 w-6"/> : (mode === 'register' ? 'Register' : 'Sign In')}
            </button>
            
            <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-brand-gray-200 dark:border-brand-gray-700"></div>
                <span className="flex-shrink mx-4 text-brand-gray-400 dark:text-brand-gray-500 text-sm font-medium">OR</span>
                <div className="flex-grow border-t border-brand-gray-200 dark:border-brand-gray-700"></div>
            </div>

            <button type="button" onClick={handleGoogleSignIn} disabled={isLoading} className="w-full flex justify-center items-center bg-white dark:bg-brand-gray-800 text-brand-dark dark:text-white font-semibold py-3 px-6 rounded-full text-lg border-2 border-brand-gray-200 dark:border-brand-gray-700 hover:bg-brand-gray-100 dark:hover:bg-brand-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-500/50 transition disabled:opacity-70">
                <GoogleIcon className="w-6 h-6 mr-3" />
                Sign {mode === 'register' ? 'up' : 'in'} with Google
            </button>
          </div>
        </form>
        <div className="mt-8 text-center">
            <p className="text-brand-gray-500 dark:text-brand-gray-400">
                {mode === 'register' ? 'Already have an account?' : "Don't have an account?"}
                <button onClick={() => setMode(mode === 'register' ? 'signIn' : 'register')} className="font-semibold text-brand-red hover:underline ml-2">
                    {mode === 'register' ? 'Sign In' : 'Register Now'}
                </button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;