import React, { useState, useContext } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import PhilosophyPage from './components/PhilosophyPage';
import HowItWorksPage from './components/HowItWorksPage';
import PartnersPage from './components/PartnersPage';
import CommunityPage from './components/CommunityPage';
import InitiativeHub from './components/InitiativeHub';
import SignUpPage from './components/SignUpPage';
import ProfilePage from './components/ProfilePage';
import EditProfilePage from './components/EditProfilePage';
import OpportunitiesPage from './components/OpportunitiesPage';
import { Page } from './types';
import { AuthContext } from './context/AuthContext';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { user } = useContext(AuthContext);

  const handleNavigate = (page: Page) => {
    // No more protected pages, all are viewable in a "trial" mode.
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'philosophy':
        return <PhilosophyPage />;
      case 'how-it-works':
        return <HowItWorksPage onNavigate={handleNavigate} />;
      case 'partners':
        return <PartnersPage onNavigate={handleNavigate} />;
      case 'community':
        return <CommunityPage onNavigate={handleNavigate} />; // Always render, CTAs inside will handle signup
      case 'hub':
        return <InitiativeHub onNavigate={handleNavigate} />; // Always render, CTAs inside will handle signup
      case 'opportunities':
        return <OpportunitiesPage />; // Always render, locking logic is handled inside
      case 'signup':
        return <SignUpPage onNavigate={handleNavigate} />;
       case 'profile':
        // If user exists, show profile. If not, prompt to sign up to view/create a profile.
        return user ? <ProfilePage onNavigate={handleNavigate} /> : <SignUpPage onNavigate={handleNavigate} />;
      case 'edit-profile':
        return user ? <EditProfilePage onNavigate={handleNavigate} /> : <SignUpPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;