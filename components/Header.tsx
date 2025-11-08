import React, { useContext } from 'react';
import { Page } from '../types';
import { AuthContext } from '../context/AuthContext';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { user, userProfile, logout } = useContext(AuthContext);

  const navLinkClasses = (page: Page) =>
    `cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 font-heading ${
      currentPage === page
        ? 'bg-primary text-background'
        : 'text-text-secondary hover:bg-secondary hover:text-text'
    }`;

  const handleLogout = async () => {
    await logout();
    onNavigate('home');
  };

  return (
    <header className="bg-surface shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                onClick={() => onNavigate('home')} 
                className="h-8 w-auto cursor-pointer"
                src="https://storage.googleapis.com/aai-web-samples/project-momentum-africa/logo1.png"
                alt="Project Momentum Africa Logo"
              />
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <span onClick={() => onNavigate('home')} className={navLinkClasses('home')}>
                Home
              </span>
              <span onClick={() => onNavigate('philosophy')} className={navLinkClasses('philosophy')}>
                Our Philosophy
              </span>
              <span onClick={() => onNavigate('how-it-works')} className={navLinkClasses('how-it-works')}>
                How It Works
              </span>
              <span onClick={() => onNavigate('community')} className={navLinkClasses('community')}>
                Community
              </span>
               <span onClick={() => onNavigate('hub')} className={navLinkClasses('hub')}>
                Initiative Hub
              </span>
               <span onClick={() => onNavigate('opportunities')} className={navLinkClasses('opportunities')}>
                Opportunities
              </span>
               <span onClick={() => onNavigate('partners')} className={navLinkClasses('partners')}>
                For Partners
              </span>
            </div>
          </div>
          <div className="hidden md:block">
            {user ? (
               <div className="flex items-center gap-4">
                {userProfile?.role === 'admin' && (
                  <div className="flex items-center gap-1 text-primary font-bold text-sm">
                    <ShieldCheckIcon className="w-5 h-5" />
                    <span>Admin</span>
                  </div>
                )}
                <button onClick={() => onNavigate('profile')} className="flex items-center text-text-secondary hover:text-text transition-colors">
                  <UserCircleIcon className="w-6 h-6 mr-2" />
                  Profile
                </button>
                 <button onClick={handleLogout} className="flex items-center text-text-secondary hover:text-text transition-colors">
                   <LogoutIcon className="w-6 h-6 mr-2" />
                   Logout
                 </button>
               </div>
            ) : (
              <div className="flex items-center gap-4">
                <button onClick={() => onNavigate('signup')} className="bg-primary text-background font-bold py-2 px-4 rounded-full hover:opacity-80 transition duration-300 transform hover:scale-105">
                  Join the Hub
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;