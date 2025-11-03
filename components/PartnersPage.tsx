import React from 'react';
import { Page } from '../types';

interface PartnersPageProps {
    onNavigate: (page: Page) => void;
}

const PartnersPage: React.FC<PartnersPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-16 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-text sm:text-4xl font-heading">
            Stop Searching for Talent. Access <span className="text-primary">Verified Initiative</span>.
          </h2>
          <p className="mt-4 text-xl text-text-secondary max-w-3xl mx-auto">
            Traditional hiring is broken. Grades and CVs don't show drive, resilience, or collaborative spirit. We provide what no one else can: verifiable data on demonstrated initiative.
          </p>
        </div>

        {/* IVS Section */}
        <div className="mt-16 bg-background rounded-lg shadow-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
                 <div className="md:w-1/2">
                    <h3 className="text-2xl font-bold text-primary font-heading">Our Solution: The Initiative Vetting Score (IVS)</h3>
                    <p className="mt-4 text-lg text-text-secondary">
                        Our IVS tracks real-world actions on the Initiative Hub: who starts projects, who collaborates effectively, who refines ideas using our AI mentor, and who stays consistent.
                    </p>
                    <p className="mt-2 text-text-secondary">
                        Partner with us to get a pre-vetted pipeline of action-oriented youth who have already proven they can take the first step.
                    </p>
                </div>
                <div className="md:w-1/2">
                    <img src="https://picsum.photos/500/300?random=7" alt="Data chart" className="rounded-lg"/>
                </div>
            </div>
        </div>

        {/* How to Partner Section */}
        <div className="mt-20">
            <h3 className="text-3xl font-extrabold text-text text-center font-heading mb-12">How to Partner With PMA</h3>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 text-center">
                <div className="bg-background p-8 rounded-lg shadow-lg">
                    <h4 className="text-xl font-bold text-primary font-heading">1. Become an Opportunity Partner</h4>
                    <p className="mt-4 text-text-secondary">
                        (Corporate/Government)<br/>
                        Create a Dedicated Opportunity Stream (DOS). Offer internships, apprenticeships, funding, or reserved jobs exclusively for high-IVS youth from the Hub.
                    </p>
                </div>
                 <div className="bg-background p-8 rounded-lg shadow-lg">
                    <h4 className="text-xl font-bold text-primary font-heading">2. Become a Talent Funnel Expert</h4>
                    <p className="mt-4 text-text-secondary">
                       (Mentors/Entrepreneurs)<br/>
                        Join our vetted network of experts. We connect you with our most committed students for deep, specialized mentorship and real-world projects.
                    </p>
                </div>
                 <div className="bg-background p-8 rounded-lg shadow-lg">
                    <h4 className="text-xl font-bold text-primary font-heading">3. Become an Activation Partner</h4>
                    <p className="mt-4 text-text-secondary">
                        (Educational Institutions)<br/>
                        Bring our mindset-shifting workshops to your students. Host an Activation Talk and become a primary source for the next wave of innovators.
                    </p>
                </div>
            </div>
             <div className="mt-12 text-center">
                <button
                    // This could link to a contact form or modal
                    className="bg-primary text-background font-bold py-4 px-8 rounded-full text-lg hover:opacity-80 transition duration-300 transform hover:scale-105 shadow-lg shadow-primary/20 font-heading"
                    >
                    Contact Our Partnership Team
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersPage;
