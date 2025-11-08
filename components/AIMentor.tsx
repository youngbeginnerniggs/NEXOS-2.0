import React, { useState, useContext } from 'react';
import { refineIdeaWithAI } from '../services/geminiService';
import { AuthContext } from '../context/AuthContext';
import { updateUserIvs, IVS_POINTS } from '../firebase/ivs';
import { SparklesIcon } from './icons/SparklesIcon';
import { Page } from '../types';

interface AIMentorProps {
  communityName: string;
  aiSystemInstruction: string;
  onNavigate: (page: Page) => void;
}

const AIMentor: React.FC<AIMentorProps> = ({ communityName, aiSystemInstruction, onNavigate }) => {
  const [rawIdea, setRawIdea] = useState('');
  const [refinedPlan, setRefinedPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, refreshUserProfile } = useContext(AuthContext);

  const handleRefine = async () => {
    if (!rawIdea.trim()) {
      setError('Please enter an idea to refine.');
      return;
    }
    setError('');
    setIsLoading(true);
    setRefinedPlan('');
    try {
      const result = await refineIdeaWithAI(rawIdea, aiSystemInstruction);
      setRefinedPlan(result);
      if (user) {
        await updateUserIvs(user.uid, IVS_POINTS.REFINE_IDEA);
        await refreshUserProfile();
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-md p-6 sticky top-24 relative">
      <div className="flex items-center gap-3">
        <SparklesIcon className="w-8 h-8 text-primary" />
        <div>
            <h2 className="text-2xl font-bold text-text font-heading">AI Mentor</h2>
            <p className="text-sm font-semibold text-primary">{communityName}</p>
        </div>
      </div>
      <p className="mt-2 text-text-secondary">
        Turn your unstructured ideas into structured, actionable plans with your specialized AI thought partner.
      </p>
      
      <div className="mt-6">
        <label htmlFor="raw-idea" className="block text-sm font-medium text-text-secondary mb-1">
          Your Raw Idea
        </label>
        <textarea
          id="raw-idea"
          className="w-full p-3 bg-background text-text border border-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
          rows={5}
          placeholder="e.g., I want to start a tutoring service for kids in my village..."
          value={rawIdea}
          onChange={(e) => setRawIdea(e.target.value)}
          disabled={isLoading || !user}
        />
      </div>

      <button
        onClick={handleRefine}
        disabled={isLoading || !user}
        className="mt-4 w-full bg-primary text-background font-bold py-3 px-4 rounded-lg hover:opacity-80 transition duration-300 flex items-center justify-center disabled:bg-secondary disabled:cursor-not-allowed font-heading"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-text" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Refining...
          </>
        ) : (
          'Refine with AI Mentor'
        )}
      </button>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      {refinedPlan && (
        <div className="mt-6 bg-background p-4 rounded-lg border border-secondary max-h-96 overflow-y-auto">
          <h3 className="text-lg font-bold text-primary mb-2 font-heading">Your Actionable Plan</h3>
          <div 
            className="prose prose-sm max-w-none text-text-secondary"
            dangerouslySetInnerHTML={{ __html: refinedPlan.replace(/\n/g, '<br />') }}
          />
        </div>
      )}
      {!user && (
        <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg p-4 text-center">
            <p className="text-text font-bold text-lg">Ready to refine your idea?</p>
            <button 
                onClick={() => onNavigate('signup')}
                className="mt-4 bg-primary text-background font-bold py-2 px-6 rounded-full hover:opacity-80 transition duration-300"
            >
                Sign Up to Use the Mentor
            </button>
        </div>
      )}
    </div>
  );
};

export default AIMentor;