import React from 'react';
import { Page } from '../types';

interface HowItWorksPageProps {
  onNavigate: (page: Page) => void;
}

const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-16 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-text sm:text-4xl font-heading">
            The PMA Ecosystem: From Inspiration to Verified Action
          </h2>
          <p className="mt-4 text-xl text-text-secondary max-w-3xl mx-auto">
            We operate a dual-component system to ensure both initial motivational impact and sustained, measurable action.
          </p>
        </div>

        {/* The Loop Diagram */}
        <div className="mt-16">
            <h3 className="text-2xl font-bold text-primary text-center font-heading">The Sustainable Loop</h3>
            <div className="mt-8 relative">
                 <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-secondary"></div>
                 <div className="relative flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center w-1/4">
                        <div className="bg-primary text-background rounded-full w-16 h-16 flex items-center justify-center mx-auto text-2xl font-bold">1</div>
                        <p className="mt-2 font-semibold text-text">Activation Talks</p>
                    </div>
                     <div className="text-center w-1/4">
                        <div className="bg-primary text-background rounded-full w-16 h-16 flex items-center justify-center mx-auto text-2xl font-bold">2</div>
                        <p className="mt-2 font-semibold text-text">Initiative Hub</p>
                    </div>
                     <div className="text-center w-1/4">
                        <div className="bg-primary text-background rounded-full w-16 h-16 flex items-center justify-center mx-auto text-2xl font-bold">3</div>
                        <p className="mt-2 font-semibold text-text">IVS Data</p>
                    </div>
                     <div className="text-center w-1/4">
                        <div className="bg-primary text-background rounded-full w-16 h-16 flex items-center justify-center mx-auto text-2xl font-bold">4</div>
                        <p className="mt-2 font-semibold text-text">Real Opportunities</p>
                    </div>
                 </div>
            </div>
             <p className="text-center mt-4 text-text-secondary italic">Success stories from opportunities fuel the next round of Activation Talks, completing the cycle.</p>
        </div>

        <div className="mt-20 space-y-16">
          {/* Pillar 1 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img src="https://picsum.photos/600/400?random=5" alt="Workshop" className="rounded-lg shadow-xl"/>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-primary font-heading">Pillar 1: The Activation Talks (On-Ground Engine)</h3>
              <p className="mt-4 text-lg text-text-secondary">
                High-energy, immersive workshops in universities and schools to serve as our primary recruitment and mindset-shifting engine. Inspired by the "Courage to Claim" story, these peer-led talks break down the fear of failure and judgment.
              </p>
              <p className="mt-2 text-text-secondary">
                Talks conclude with an immediate Call to Action, funnelling attendees who demonstrate initiative directly into the Hub.
              </p>
              <button
                // This could eventually link to a contact form or a specific 'partners' section
                onClick={() => onNavigate('partners')}
                className="mt-6 bg-secondary text-text font-bold py-3 px-6 rounded-full hover:bg-primary hover:text-background transition duration-300"
                >
                Book an Activation Talk for Your Institution
              </button>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="md:w-1/2">
              <img src="https://picsum.photos/600/400?random=6" alt="Digital collaboration" className="rounded-lg shadow-xl"/>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-primary font-heading">Pillar 2: The Initiative Hub (Digital Vetting Platform)</h3>
              <p className="mt-4 text-lg text-text-secondary">
                The Hub is a secure, youth-only digital space designed for genuine vulnerability and collaboration. Using pseudonymity and strict moderation, it's a non-judgmental platform to share raw ideas, find collaborators, and get AI mentorship without the pressure of formal authority.
              </p>
               <button
                onClick={() => onNavigate('hub')}
                className="mt-6 bg-primary text-background font-bold py-3 px-6 rounded-full hover:opacity-80 transition duration-300 transform hover:scale-105"
                >
                Explore the Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
