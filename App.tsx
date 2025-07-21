

import React, { useState, useCallback, useEffect } from 'react';
import { AppState, BreakdownRequest, Garage, User, Product, UserRole, ServiceRequest, ServiceType, GarageProfile, VehicleDetails, VehicleCategory, TowingRequest, TowingProblem, TowTruck } from './types';
import HomePage from './components/HomePage';
import BreakdownForm from './components/BreakdownForm';
import ServiceBookingForm from './components/ServiceBookingForm';
import TowingServiceForm from './components/TowingServiceForm';
import { findGarages, findServiceGarages, findTowingServices } from './services/geminiService';
import { getProducts, addProduct as addProductService } from './services/ecomService';
import GarageList from './components/GarageList';
import BookingStatus from './components/BookingStatus';
import { SpinnerIcon } from './components/Icons';
import AuthPage from './components/AuthPage';
import ProfilePage from './components/ProfilePage';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import EcomPage from './components/EcomPage';
import SellerDashboard from './components/SellerDashboard';
import AddProductForm from './components/AddProductForm';
import GarageProfileSetup from './components/GarageProfileSetup';
import ProductDetailPage from './components/ProductDetailPage';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.HOME);
  const [breakdownRequest, setBreakdownRequest] = useState<BreakdownRequest | null>(null);
  const [serviceRequest, setServiceRequest] = useState<ServiceRequest | null>(null);
  const [towingRequest, setTowingRequest] = useState<TowingRequest | null>(null);
  const [garages, setGarages] = useState<Garage[]>([]);
  const [selectedGarage, setSelectedGarage] = useState<Garage | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
     if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    try {
        const storedUser = localStorage.getItem('vroomatUser');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setCurrentUser(user);
          if (user.role === UserRole.Garage && !user.garageProfile?.profileComplete) {
              setAppState(AppState.GARAGE_SETUP);
          } else {
              setAppState(AppState.DASHBOARD);
          }
        }
    } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        localStorage.removeItem('vroomatUser');
    }
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
                setLocationError(null);
            },
            (err) => { setLocationError(err.message); },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    } else {
        setLocationError("Geolocation is not supported by this browser.");
    }

    getProducts().then(setProducts);
  }, []);

  const handleNavigateToBreakdown = () => { setAppState(AppState.REPORTING_BREAKDOWN); setIsMenuOpen(false); };
  const handleNavigateToBooking = () => { setAppState(AppState.BOOKING_SERVICE); setIsMenuOpen(false); };
  const handleNavigateToEcom = () => { setAppState(AppState.ECOM_HOME); setIsMenuOpen(false); };
  const handleNavigateToTowing = () => { setAppState(AppState.BOOKING_TOWING); setIsMenuOpen(false); };

  const handleFindGarages = useCallback(async (vehicleDetails: VehicleDetails, problemDescription: string) => {
    if (!location) {
        setError("Your location is not available. Cannot search for garages.");
        return;
    }
    setAppState(AppState.SEARCHING);
    setError(null);
    const request: BreakdownRequest = { vehicleDetails, problemDescription, location };
    setBreakdownRequest(request);
    setServiceRequest(null);
    setTowingRequest(null);

    try {
      const foundGarages = await findGarages(request);
      setGarages(foundGarages);
      setAppState(AppState.VIEWING_GARAGES);
    } catch (err) {
      console.error(err);
      setError('Failed to find garages. Please try again later.');
      setAppState(AppState.DASHBOARD);
    }
  }, [location]);

  const handleFindServiceGarages = useCallback(async (vehicleDetails: VehicleDetails, serviceType: ServiceType) => {
    if (!location) {
        setError("Your location is not available. Cannot search for service centers.");
        return;
    }
    setAppState(AppState.SEARCHING);
    setError(null);
    const request: ServiceRequest = { vehicleDetails, serviceType, location };
    setServiceRequest(request);
    setBreakdownRequest(null);
    setTowingRequest(null);

    try {
      const foundGarages = await findServiceGarages(request);
      setGarages(foundGarages);
      setAppState(AppState.VIEWING_GARAGES);
    } catch (err) {
      console.error(err);
      setError('Failed to find service centers. Please try again later.');
      setAppState(AppState.DASHBOARD);
    }
  }, [location]);

  const handleFindTowingServices = useCallback(async (problem: TowingProblem, selectedTruck: TowTruck, customProblem?: string) => {
    if (!location) {
        setError("Your location is not available. Cannot search for towing services.");
        return;
    }
    setAppState(AppState.SEARCHING);
    setError(null);
    const request: TowingRequest = { problem, selectedTruck, location, customProblem };
    setTowingRequest(request);
    setBreakdownRequest(null);
    setServiceRequest(null);

    try {
        const foundServices = await findTowingServices(request);
        setGarages(foundServices);
        setAppState(AppState.VIEWING_GARAGES);
    } catch (err) {
        console.error(err);
        setError('Failed to find towing services. Please try again later.');
        setAppState(AppState.DASHBOARD);
    }
  }, [location]);

  const handleBookGarage = (garage: Garage) => {
    setSelectedGarage(garage);
    setAppState(AppState.BOOKING_CONFIRMED);
    setTimeout(() => { setAppState(AppState.TRACKING_GARAGE); }, 3000);
  };

  const resetToHome = () => {
    const targetState = currentUser ? AppState.DASHBOARD : AppState.HOME;
    setAppState(targetState);
    setBreakdownRequest(null);
    setServiceRequest(null);
    setTowingRequest(null);
    setGarages([]);
    setSelectedGarage(null);
    setError(null);
    setIsMenuOpen(false);
  };
  
  const handleSignIn = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('vroomatUser', JSON.stringify(user));
    if (user.role === UserRole.Garage && !user.garageProfile?.profileComplete) {
        setAppState(AppState.GARAGE_SETUP);
    } else {
        setAppState(AppState.DASHBOARD);
    }
  };

  const handleSignUp = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('vroomatUser', JSON.stringify(user));
    if (user.role === UserRole.Garage || user.role === UserRole.Distributor) {
       alert('Registration successful! Please complete your profile to get verified.');
       setAppState(AppState.GARAGE_SETUP);
    } else {
       setAppState(AppState.DASHBOARD);
       alert('Registration successful! Welcome to Vroomat.');
    }
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('vroomatUser');
    setAppState(AppState.HOME);
    setIsMenuOpen(false);
  };
  
  const handleProfileClick = () => {
    if (currentUser) {
        setAppState(AppState.PROFILE);
    } else {
        setAppState(AppState.SIGN_IN);
    }
    setIsMenuOpen(false);
  };
  
  const handleNavigateToSellerDashboard = () => setAppState(AppState.ECOM_SELLER_DASHBOARD);
  const handleNavigateToAddProduct = () => setAppState(AppState.ECOM_ADD_PRODUCT);
  
  const handleAddProduct = (product: Omit<Product, 'id' | 'seller'>) => {
    if(currentUser?.name) {
        const newProduct = addProductService(product, currentUser.name);
        setProducts(prev => [...prev, newProduct]);
    }
    setAppState(AppState.ECOM_SELLER_DASHBOARD);
  }

  const handleViewProduct = (product: Product) => {
      setSelectedProduct(product);
      setAppState(AppState.ECOM_PRODUCT_DETAIL);
  }

  const handleGarageProfileSubmit = (profileData: Partial<GarageProfile>) => {
      if (!currentUser) return;
      const updatedUser: User = {
          ...currentUser,
          name: profileData.bankAccountName || currentUser.name,
          garageProfile: {
              ...currentUser.garageProfile,
              ...profileData,
              profileComplete: true,
              isVerified: false,
          } as GarageProfile
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('vroomatUser', JSON.stringify(updatedUser));
      alert("Profile submitted for verification! You will be reviewed by our team shortly.");
      setAppState(AppState.DASHBOARD);
  };

  const handleBack = () => {
      switch(appState) {
          case AppState.PROFILE:
          case AppState.REPORTING_BREAKDOWN:
          case AppState.BOOKING_SERVICE:
          case AppState.BOOKING_TOWING:
          case AppState.ECOM_HOME:
          case AppState.VIEWING_GARAGES:
            setAppState(AppState.DASHBOARD);
            break;
          case AppState.SIGN_IN:
            resetToHome();
            break;
          case AppState.ECOM_PRODUCT_DETAIL:
          case AppState.ECOM_SELLER_DASHBOARD:
            setAppState(AppState.ECOM_HOME);
            break;
          case AppState.ECOM_ADD_PRODUCT:
            setAppState(AppState.ECOM_SELLER_DASHBOARD);
            break;
           case AppState.GARAGE_SETUP:
            handleSignOut(); // Force sign out if they go back from setup
            break;
          default:
            resetToHome();
            break;
      }
  }

  const renderContent = () => {
    switch (appState) {
      case AppState.HOME:
        return <HomePage onReportBreakdown={() => setAppState(AppState.SIGN_IN)} onBookService={() => setAppState(AppState.SIGN_IN)} onNavigateToEcom={handleNavigateToEcom} onNavigateToTowing={() => setAppState(AppState.SIGN_IN)} />;
      case AppState.SIGN_IN:
        return <AuthPage onSignIn={handleSignIn} onSignUp={handleSignUp} location={location} locationError={locationError} />;
      case AppState.DASHBOARD:
        return <HomePage onReportBreakdown={handleNavigateToBreakdown} onBookService={handleNavigateToBooking} onNavigateToEcom={handleNavigateToEcom} onNavigateToTowing={handleNavigateToTowing} />;
      case AppState.GARAGE_SETUP:
        return currentUser && <GarageProfileSetup user={currentUser} onSubmit={handleGarageProfileSubmit} />;
      case AppState.REPORTING_BREAKDOWN:
        return <BreakdownForm onFindGarages={handleFindGarages} onCancel={resetToHome} error={error} location={location} locationError={locationError} />;
      case AppState.BOOKING_SERVICE:
        return <ServiceBookingForm onFindGarages={handleFindServiceGarages} onCancel={resetToHome} error={error} location={location} locationError={locationError} />;
      case AppState.BOOKING_TOWING:
        return <TowingServiceForm onFindTowingServices={handleFindTowingServices} onCancel={resetToHome} error={error} location={location} locationError={locationError} />;
      case AppState.ECOM_HOME:
        return <EcomPage products={products} user={currentUser} onNavigateToSellerDashboard={handleNavigateToSellerDashboard} onViewProduct={handleViewProduct} />;
      case AppState.ECOM_PRODUCT_DETAIL:
        return selectedProduct && <ProductDetailPage product={selectedProduct} />;
      case AppState.SEARCHING:
        const getSearchingText = () => {
            if (serviceRequest) return 'Finding Service Centers...';
            if (towingRequest) return 'Finding Towing Services...';
            return 'Finding Garages...';
        };
        const getSearchingSubText = () => {
             if (serviceRequest) return 'Searching for the best service centers with pickup & drop.';
             if (towingRequest) return 'Locating the nearest available tow trucks for your situation.';
             return 'Scanning our network for the best help near you.';
        };
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 text-brand-gray-300">
            <SpinnerIcon className="animate-spin h-12 w-12 mb-4 text-brand-red" />
            <h2 className="text-2xl font-bold mb-2 text-white">{getSearchingText()}</h2>
            <p>{getSearchingSubText()}</p>
          </div>
        );
      case AppState.VIEWING_GARAGES:
        return <GarageList garages={garages} onBookGarage={handleBookGarage} />;
       case AppState.BOOKING_CONFIRMED:
            const getConfirmationText = () => {
                if (serviceRequest) return `${selectedGarage?.garageName} has been scheduled.`;
                if (towingRequest) return `A tow truck from ${selectedGarage?.garageName} has been dispatched.`;
                return `${selectedGarage?.garageName} is on their way.`;
            };
            const getConfirmationSubtext = () => {
                if (serviceRequest) return 'They will contact you shortly regarding the pickup.';
                if (towingRequest) return `ETA: ${selectedGarage?.eta}. Track them live on the map.`;
                return null;
            };
            return (
                 <div className="flex flex-col items-center justify-center h-full text-white text-center p-8 bg-brand-light-dark">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
                     <p className="text-brand-gray-300">{getConfirmationText()}</p>
                     {getConfirmationSubtext() && <p className="text-brand-gray-400 mt-1">{getConfirmationSubtext()}</p>}
                 </div>
            );
      case AppState.TRACKING_GARAGE:
        const userLocation = breakdownRequest?.location || serviceRequest?.location || towingRequest?.location;
        return selectedGarage && userLocation && <BookingStatus garage={selectedGarage} onCancel={resetToHome} isServiceBooking={!!serviceRequest} isTowingBooking={!!towingRequest} userLocation={userLocation} />;
      case AppState.PROFILE:
        return currentUser && <ProfilePage user={currentUser} onSignOut={handleSignOut} onNavigateToEcom={handleNavigateToEcom} onEditProfile={() => setAppState(AppState.GARAGE_SETUP)} />;
      case AppState.ECOM_SELLER_DASHBOARD:
        return <SellerDashboard products={products.filter(p => p.seller === currentUser?.name)} onNavigateToAddProduct={handleNavigateToAddProduct}/>
      case AppState.ECOM_ADD_PRODUCT:
        return <AddProductForm onAddProduct={handleAddProduct} onCancel={() => setAppState(AppState.ECOM_SELLER_DASHBOARD)} />
      default:
        return <HomePage onReportBreakdown={() => setAppState(AppState.SIGN_IN)} onBookService={() => setAppState(AppState.SIGN_IN)} onNavigateToEcom={handleNavigateToEcom} onNavigateToTowing={() => setAppState(AppState.SIGN_IN)} />;
    }
  };
  
  const showHeader = ![AppState.TRACKING_GARAGE, AppState.BOOKING_CONFIRMED].includes(appState);

  return (
    <div className="h-dvh w-screen bg-brand-gray-50 dark:bg-brand-dark font-sans flex flex-col max-w-lg mx-auto shadow-2xl">
        {showHeader && (
            <Header 
                appState={appState}
                onMenuClick={() => setIsMenuOpen(true)}
                onProfileClick={handleProfileClick}
                onBackClick={handleBack}
                theme={theme}
                setTheme={setTheme}
            />
        )}
        <SideMenu 
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onProfileClick={handleProfileClick}
            onSignOut={handleSignOut}
            onNavClick={(item) => { 
                if (item === 'Book a Service') {
                  handleNavigateToBooking();
                } else if (item === 'Report Breakdown') {
                  handleNavigateToBreakdown();
                } else if (item === 'Towing Service') {
                  handleNavigateToTowing();
                } else {
                  alert(`${item} is coming soon!`);
                  setIsMenuOpen(false);
                }
            }}
            onNavigateToBreakdown={handleNavigateToBreakdown}
            onNavigateToBooking={handleNavigateToBooking}
            onNavigateToEcom={handleNavigateToEcom}
            onNavigateToTowing={handleNavigateToTowing}
            user={currentUser}
        />
        <main className={`flex-1 overflow-y-auto hide-scrollbar ${showHeader ? 'pt-20' : ''}`}>
            {renderContent()}
        </main>
    </div>
  );
};

export default App;