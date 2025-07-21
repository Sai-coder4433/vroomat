import React from 'react';
import { AppState } from '../types';
import { MenuIcon, UserIcon, SunIcon, MoonIcon } from './Icons';

interface HeaderProps {
    appState: AppState;
    onMenuClick: () => void;
    onProfileClick: () => void;
    onBackClick: () => void;
    theme: 'dark' | 'light';
    setTheme: (theme: 'dark' | 'light') => void;
}

const Header: React.FC<HeaderProps> = ({ appState, onMenuClick, onProfileClick, onBackClick, theme, setTheme }) => {

    const isDeepNavigation = ![AppState.DASHBOARD, AppState.HOME, AppState.SIGN_IN].includes(appState);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    
    const BackButton = () => (
        <button onClick={onBackClick} className="flex items-center p-2 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-semibold ml-1 text-base">Back</span>
        </button>
    );
    
    const ThemeToggleButton = () => (
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            {theme === 'dark' ? <SunIcon className="w-6 h-6 text-yellow-300" /> : <MoonIcon className="w-6 h-6" />}
        </button>
    );

    const renderHeaderContent = () => {
        if (isDeepNavigation) {
            return (
                <div className="flex items-center justify-between w-full">
                    <BackButton />
                    <ThemeToggleButton />
                </div>
            );
        }
        
        return (
            <>
                <h1 className="text-2xl font-bold tracking-tighter">Vroom<span className="text-brand-red">at</span></h1>
                <div className="flex items-center space-x-1 sm:space-x-2">
                    <ThemeToggleButton />
                    <button onClick={onProfileClick} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors relative">
                        <UserIcon className="w-7 h-7" />
                    </button>
                    <button onClick={onMenuClick} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        <MenuIcon className="w-7 h-7" />
                    </button>
                </div>
            </>
        );
    }


    return (
        <header className="fixed top-0 left-0 right-0 z-30 p-4 h-20 flex justify-between items-center text-brand-dark dark:text-white bg-white/80 dark:bg-brand-dark/80 backdrop-blur-lg border-b border-brand-gray-200 dark:border-white/10 max-w-lg mx-auto">
           {renderHeaderContent()}
        </header>
    );
};

export default Header;