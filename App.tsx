import React, { useState, useContext } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import PhilosophyPage from './components/PhilosophyPage';
import HowItWorksPage from './components/HowItWorksPage';
import PartnersPage from './components/PartnersPage';
import BlogPage from './components/BlogPage';
import InitiativeHub from './components/InitiativeHub';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ProfilePage from './components/ProfilePage';
import EditProfilePage from './components/EditProfilePage';
import { Page } from './types';
import { AuthContext } from './context/AuthContext';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { user } = useContext(AuthContext);

  const handleNavigate = (page: Page) => {
    // Prevent access to certain pages if not logged in
    if (!user && (page === 'hub' || page === 'profile' || page === 'edit-profile')) {
      setCurrentPage('login');
      return;
    }
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
      case 'blog':
        return <BlogPage />;
      case 'hub':
        return user ? <InitiativeHub /> : <LoginPage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'signup':
        return <SignUpPage onNavigate={handleNavigate} />;
       case 'profile':
        return user ? <ProfilePage onNavigate={handleNavigate} /> : <LoginPage onNavigate={handleNavigate} />;
      case 'edit-profile':
        return user ? <EditProfilePage onNavigate={handleNavigate} /> : <LoginPage onNavigate={handleNavigate} />;
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