import React from 'react';
import { Page } from '../types';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center" 
        style={{ backgroundImage: "url('https://storage.googleapis.com/aai-web-samples/project-momentum-africa/hero-main.jpg')" }}
      >
        <div className="absolute inset-0 bg-background bg-opacity-70"></div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center z-10 text-text">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl font-heading">
            The Real Barrier is <span className="text-primary">Paper</span>, Not Potential
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-text-secondary">
            The gap between where you are and where you want to be is the distance between your finger and the "Sign Up" button.
          </p>
          <div className="mt-10">
            <button
              onClick={() => onNavigate('signup')}
              className="bg-primary text-background font-bold py-4 px-8 rounded-full text-lg hover:opacity-80 transition duration-300 transform hover:scale-105 shadow-lg shadow-primary/20 font-heading"
            >
              Claim Your Spot in the Initiative Hub
            </button>
          </div>
        </div>
      </div>

      {/* Founder's Story Section */}
      <div className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                 <div className="text-left">
                    <h2 className="text-base text-primary font-semibold tracking-wide uppercase font-heading">The Power of the Signature</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-text sm:text-4xl font-heading">
                      Your First Act of Initiative
                    </p>
                    <p className="mt-4 max-w-3xl text-xl text-text-secondary">
                     "I stared at the Maths Olympiad sign-up sheet, terrified. The names were legends. But the only thing *actually* stopping me was a blank line. I signed my name. That one signature led to the Olympiad... which led to a camp in China... which led to a global STEM network. None of it would have happened if I didn't take that first, simple step."
                    </p>
                </div>
                 <div className="flex justify-center">
                    <img src="https://storage.googleapis.com/aai-web-samples/project-momentum-africa/home-story.jpg" alt="A hand signing a document, representing taking the first step." className="rounded-lg shadow-xl w-full max-w-md"/>
                </div>
            </div>
        </div>
      </div>

       {/* Problem We Solve Section */}
      <div className="bg-background py-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center md:order-last">
                    <img src="https://storage.googleapis.com/aai-web-samples/project-momentum-africa/home-problem.jpg" alt="A group of young African students collaborating around a laptop." className="rounded-lg shadow-xl w-full max-w-md"/>
                </div>
                <div className="text-left">
                    <h2 className="text-3xl leading-8 font-extrabold tracking-tight text-text sm:text-4xl font-heading">
                        It's Not a Resource Problem. It's an <span className="text-primary">Initiative</span> Problem.
                    </h2>
                    <p className="mt-4 max-w-3xl text-xl text-text-secondary">
                        Project Momentum Africa is built on one truth: The largest obstacle facing African youth is not a lack of talent, but the fear to take the first step. We know how to study. We teach you how to <span className="font-bold text-text">act</span>.
                    </p>
                </div>
            </div>
        </div>
      </div>

       {/* Final CTA */}
        <div className="bg-surface">
            <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-text sm:text-4xl font-heading">
                    <span className="block">The Initiative Hub is the new sign-up sheet.</span>
                    <span className="block text-primary">What name will you write today?</span>
                </h2>
                <button
                    onClick={() => onNavigate('signup')}
                    className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-full text-background bg-primary hover:opacity-90 sm:w-auto"
                >
                    Start Your Journey
                </button>
            </div>
        </div>

    </div>
  );
};

export default HomePage;