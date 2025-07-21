
import React from 'react';

type IconProps = {
  className?: string;
};

export const HomeIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

export const WrenchIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
);


export const UserIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export const QuestionMarkCircleIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const MapPinIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

export const SpinnerIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export const TireIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m-4-7h8" />
  </svg>
);

export const EngineIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.25 6.75V17.25M10.75 6.75V17.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 15h16.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12H3.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 12H7.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12h-2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 12h-2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20.25h15a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5h-15a1.5 1.5 0 00-1.5 1.5v13.5a1.5 1.5 0 001.5 1.5z" />
    </svg>
);

export const BatteryIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 9v10a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h12a2 2 0 012 2zm-8-5h4M8 4h4" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 13v4" />
  </svg>
);

export const FuelIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V11a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

export const EVIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export const TowingIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18" />
  </svg>
);

export const CarIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-5h-4l-2 5h2zM5 16h2l2-5H5l-4 5h4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 16V8a2 2 0 00-2-2H7a2 2 0 00-2 2v8" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 16H9" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11h14" />
    </svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

export const LockClosedIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export const EyeIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

export const EyeOffIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a10.05 10.05 0 013.543-5.225m5.931-.81a14.998 14.998 0 011.932-.165 10.05 10.05 0 015.543 2.165 10.05 10.05 0 013.543 5.225c-.218.69-.47 1.35-.766 1.97M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
  </svg>
);

export const GoogleIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,34.546,44,29.865,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
  </svg>
);

export const LogOutIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export const ShoppingCartIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

export const StarIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const XIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const BellIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

export const CarWashIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.5 4.5l-2.5 2.5" /><path d="M10.1 8.8L7.6 6.3" /><path d="M15.4 12.1l-2.5 2.5" /><path d="M14 18H9c-1.7 0-3-1.3-3-3v-4" /><path d="M16 18h-2" /><path d="M22 18h-2" /><path d="M20 12h-2.5" /><path d="M4.9 11.1L7.4 13.6" /><path d="M2.3 17.7l2.5-2.5" /><path d="M2 12h2.5" /><path d="M19.1 6.9l-2.5 2.5" /><path d="M21.7 8.3l-2.5-2.5" /><path d="M14.2 2.3l-2.5 2.5" />
  </svg>
);

export const AccessoriesIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16h16V4H4zm8 12a4 4 0 100-8 4 4 0 000 8z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12l2.5-1.5" />
    </svg>
);

export const WarrantyIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

export const HistoryIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const SunIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 12a5 5 0 100-10 5 5 0 000 10z" />
    </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

export const BuildingOfficeIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6.375a.375.375 0 01.375.375v1.5a.375.375 0 01-.375.375H9a.375.375 0 01-.375-.375v-1.5A.375.375 0 019 6.75zM9 12.75h6.375a.375.375 0 01.375.375v1.5a.375.375 0 01-.375.375H9a.375.375 0 01-.375-.375v-1.5A.375.375 0 019 12.75z" />
    </svg>
);

export const IdentificationIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3.375M3 3h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2z" />
  </svg>
);

export const CreditCardIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3.375m-3.375 2.25h11.25m3.375-3.375h2.25m-2.25 2.25h2.25M3 3h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2z" />
    </svg>
);

export const MailIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

export const SnowflakeIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M12 12l7.07-7.07M12 12l-7.07 7.07M12 12l7.07 7.07M12 12l-7.07-7.07M2 12h20M5.03 5.03l13.94 13.94M5.03 18.97l13.94-13.94" />
  </svg>
);

export const BrakeIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 8V6a4 4 0 018 0v2M16 8V6" />
  </svg>
);

export const DocumentIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

// Generic Vehicle Category Icons
export const TwoWheelerIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 21h-4l-1-4h6l-1 4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 17v-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 13H5l-1-3h7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 13h5l1-3h-7" />
        <circle cx="6" cy="21" r="2" />
        <circle cx="18" cy="21" r="2" />
    </svg>
);

export const TruckIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 20H4a1 1 0 01-1-1V9a1 1 0 011-1h4V6a2 2 0 012-2h4a2 2 0 012 2v2h4a1 1 0 011 1v10a1 1 0 01-1 1h-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 20v-4h8v4" />
        <circle cx="7" cy="20" r="2" />
        <circle cx="17" cy="20" r="2" />
    </svg>
);

// Tow Truck Icons
export const FlatbedTowTruckIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12V8H8v4m12 0H8m12 0l-2 4H6l-2-4m16 0H4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16h18" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17"cy="18" r="2" />
    </svg>
);

export const WheelLiftTowTruckIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 8H4a2 2 0 00-2 2v4a2 2 0 002 2h2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2h4a1 1 0 011 1v2" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-4 4h-4l-4-4" />
    </svg>
);

export const HeavyDutyWreckerIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6L9 9m3-3v10m0 0l-3-3m3 3l3-3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2h4a1 1 0 011 1v6a1 1 0 01-1 1h-1" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16H3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 16h-1" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 20H4a1 1 0 01-1-1v-3" />
      <circle cx="7" cy="20" r="2" />
      <circle cx="17" cy="20" r="2" />
    </svg>
);

export const CraneMountedTowTruckIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 20H4a1 1 0 01-1-1V9a1 1 0 011-1h4V6a2 2 0 012-2h4a2 2 0 012 2v2h4a1 1 0 011 1v10a1 1 0 01-1 1h-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 20v-4h8v4" />
        <circle cx="7" cy="20" r="2" /><circle cx="17" cy="20" r="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8l6-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 4h-2" />
    </svg>
);

export const MotorcycleVanIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 20H4a1 1 0 01-1-1V7a1 1 0 011-1h16a1 1 0 011 1v12a1 1 0 01-1 1h-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 20v-4h8v4" />
        <circle cx="7" cy="20" r="2" />
        <circle cx="17" cy="20" r="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a2 2 0 100-4 2 2 0 000 4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l-1.5 3h3L12 12z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 8h4" />
    </svg>
);

// Spec Icons
export const WeightIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const RulerIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m-15 0a2.25 2.25 0 01-2.25-2.25V7.5a2.25 2.25 0 012.25-2.25h15a2.25 2.25 0 012.25 2.25v2.25a2.25 2.25 0 01-2.25 2.25M7.5 12v-3M12 12v-3m4.5 12V9" />
  </svg>
);

// Brand Icons
export const MarutiSuzukiIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 200 200" fill="#da2128">
    <path d="M100 12.5L25 56.25v87.5L100 187.5l75-43.75v-87.5L100 12.5zm0 15l62.5 36.25v70L100 170l-62.5-36.25v-70L100 27.5z M100 70l-50 28.75v57.5L100 185l50-28.75v-57.5L100 70zm0 15l37.5 21.25v40L100 167.5l-37.5-21.25v-40L100 85z"/>
  </svg>
);

export const HyundaiIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" fill="currentColor">
        <path d="M22.8,48.2c-4.4-2.8-6.9-6.3-6.9-10.1c0-7,5.5-12.6,15.6-12.6c9.8,0,14.6,5.3,14.6,11.8c0,4.4-3,8.4-8.2,11.1 c-4.6,2.4-10.2,3.3-15,1.2C25.4,50.8,24.1,49.6,22.8,48.2z M31.5,15.4c-13.3,0-23.7,8.8-23.7,19.6c0,6.6,4.6,12.7,11.5,16.5 c2.4,1.3,5.1,2,7.9,2c8.1,0,15.4-4.8,19.4-11.9c5.2-9.1,2.8-19-5.6-23.5C46,15.9,40.1,15.4,31.5,15.4z"/>
    </svg>
);

export const TataIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.13,10.33l6.87-4.4,6.87,4.4v3.34H5.13V10.33Z"/>
        <path d="M12,2,2,8.5V17a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V8.5Zm8,14H4V9.6l8-5.12,8,5.12Z"/>
    </svg>
);

export const HondaIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 7V17H15V13.5H9V17H6V7H9V10.5H15V7H18Z" />
    </svg>
);

export const ToyotaIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="12" rx="10" ry="4"/>
        <ellipse cx="12" cy="12" rx="4" ry="8" transform="rotate(90 12 12)"/>
    </svg>
);

export const FordIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 64 24" fill="currentColor">
        <path d="M0 12C0 5.373 5.373 0 12 0H52C58.627 0 64 5.373 64 12C64 18.627 58.627 24 52 24H12C5.373 24 0 18.627 0 12Z"/>
    </svg>
);

export const KiaIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" >
        <path d="M6.5,8L10,16H13.5L10,8H6.5M14,8L17.5,16H21L17.5,8H14M3,8V16H5.5L9,8H6L3,13V8H3Z" />
    </svg>
);

export const MahindraIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#da2128" stroke="#da2128" strokeWidth="1">
    <path d="M 12,3 L 6,10 L 12,17 L 18,10 Z M 12,7 l 3,4 h -6 z M 7,11 v 5 l 5,5 l 5,-5 v -5 l -5,5 z" />
  </svg>
);

export const MGIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.75 3.75h16.5v16.5h-16.5z" />
        <path d="M8.25 8.25L12 15.75l3.75-7.5" />
        <path d="M12 8.25v7.5" />
    </svg>
);

export const BYDIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 6H10C12.21 6 14 7.79 14 10V14C14 16.21 12.21 18 10 18H6V6M8 8V16H10C11.1 16 12 15.1 12 14V10C12 8.9 11.1 8 10 8H8M16 6H20V8H18V14H20V16H16V6Z" />
    </svg>
);

export const TeslaIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" >
        <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10,10-4.48,10-10S17.52,2,12,2z M12,14c-1.1,0-2-0.9-2-2s0.9-2,2-2,2,0.9,2,2 S13.1,14,12,14z M17,8h-1.5l-2.5,5l-2.5-5H9l3.5,6.5L17,8z" />
    </svg>
);

export const VolkswagenIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M4.5 9l3 6" />
        <path d="M7.5 15l4.5 -10" />
        <path d="M12 5l4.5 10" />
        <path d="M16.5 15l3 -6" />
    </svg>
);

export const MercedesBenzIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v10" />
        <path d="M12 12l-8 5" />
        <path d="M12 12l8 5" />
    </svg>
);

export const BmwIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="30" fill="#000" />
        <path d="M32 4c-15.46 0-28 12.54-28 28s12.54 28 28 28 28-12.54 28-28-12.54-28-28-28zm0 54c-14.36 0-26-11.64-26-26s11.64-26 26-26 26 11.64 26 26-11.64 26-26 26z" fill="#fff" />
        <path d="M4 32h56 M32 4v56" stroke="#fff" strokeWidth="2" />
        <path d="M32 4a28 28 0 0 1 28 28h-28z" fill="#008cff" />
        <path d="M32 4a28 28 0 0 0-28 28h28z" fill="#fff" />
        <path d="M4 32a28 28 0 0 0 28 28v-28z" fill="#008cff" />
        <path d="M32 60a28 28 0 0 1-28-28h28z" fill="#fff" />
        <path d="M48 23h-8v-6h-8v6h-8v18h8v-7h8v7h8z" fill="#fff" />
    </svg>
);

export const RoyalEnfieldIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 L2 7 L12 12 L22 7 Z" />
        <path d="M2 17 L12 22 L22 17" />
        <path d="M2 7 L2 17" />
        <path d="M22 7 L22 17" />
        <path d="M12 12 L12 22" />
    </svg>
);

export const BajajIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20ZM12,7a1,1,0,0,0-1,1v3.59L8.71,9.29a1,1,0,1,0-1.42,1.42L10.59,14H7a1,1,0,0,0,0,2h6a1,1,0,0,0,1-1V8A1,1,0,0,0,12,7Z" />
    </svg>
);

export const TvsIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" stroke="#e41e26" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round">
    <path d="M30 60 L100 140 L170 60"/>
  </svg>
);

export const AtherIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 L2 12 L12 22 L22 12 Z" />
        <path d="M12 6 l-4 4 l4 4" />
        <path d="M16 10 h-8" />
    </svg>
);

export const OlaIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-2" />
        <path d="M8 4H6a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2" />
        <path d="M12 4v16" />
    </svg>
);

export const EicherIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M4,2H20a2,2,0,0,1,2,2V20a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V4A2,2,0,0,1,4,2ZM5,7V9H19V7H5Zm0,5v2H19V12H5Zm0,5v2H15V17H5Z" />
    </svg>
);

export const SkodaIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2L9 6.5h6z" />
        <path d="M15.5 10l-2.5 4 -2.5-4" />
        <path d="M10.5 17.5l-3-4" />
        <path d="M16.5 13.5l-3 4" />
    </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);