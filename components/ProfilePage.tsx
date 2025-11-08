import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Page } from '../types';
import { DiscordIcon } from './icons/DiscordIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';

interface ProfilePageProps {
  onNavigate: (page: Page) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { userProfile } = useContext(AuthContext);

  if (!userProfile) {
    return (
      <div className="text-center py-20">
        <p className="text-text-secondary">Loading profile...</p>
      </div>
    );
  }

  const { displayName, role, email, avatarUrl, socials, ivs } = userProfile;

  const IVS_TIERS = [
      { name: 'Bronze Signer', min: 0, max: 99, color: 'text-yellow-600' },
      { name: 'Silver Initiator', min: 100, max: 499, color: 'text-gray-400' },
      { name: 'Gold Momentum', min: 500, max: 999, color: 'text-yellow-400' },
      { name: 'Platinum Leader', min: 1000, max: Infinity, color: 'text-cyan-400' }
  ];

  const currentTier = [...IVS_TIERS].reverse().find(tier => ivs >= tier.min) || IVS_TIERS[0];
  const nextTierIndex = IVS_TIERS.findIndex(tier => tier.name === currentTier.name) + 1;
  const nextTier = nextTierIndex < IVS_TIERS.length ? IVS_TIERS[nextTierIndex] : null;
  
  const progressToNextTier = nextTier ? Math.min(((ivs - currentTier.min) / (nextTier.min - currentTier.min)) * 100, 100) : 100;

  return (
    <div className="bg-background min-h-full py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img 
                src={avatarUrl} 
                alt="Profile" 
                className="w-32 h-32 rounded-full border-4 border-primary"
              />
              <div className="flex-grow text-center sm:text-left">
                <h1 className="text-4xl font-bold text-text font-heading">{displayName}</h1>
                <p className="text-primary font-semibold capitalize mt-1 font-heading">{role}</p>
                <p className="text-text-secondary mt-2">{email}</p>
              </div>
               <button 
                  onClick={() => onNavigate('edit-profile')}
                  className="bg-secondary text-text font-bold py-2 px-4 rounded-full hover:bg-primary hover:text-background transition duration-300 transform hover:scale-105"
                >
                  Edit Profile
                </button>
            </div>
            
            {/* IVS Section */}
            <div className="mt-8 border-t border-secondary pt-8">
                <h2 className="text-2xl font-bold text-text mb-4 font-heading">Initiative Vetting Score (IVS)</h2>
                <div className="flex items-center gap-4">
                    <span className="text-5xl font-bold text-primary">{ivs}</span>
                    <div>
                        <span className={`text-xl font-bold ${currentTier.color}`}>{currentTier.name}</span>
                        {nextTier && <p className="text-sm text-text-secondary">
                            {nextTier.min - ivs} points to reach {nextTier.name}
                        </p>}
                    </div>
                </div>
                {nextTier ? (
                    <div className="mt-4">
                        <div className="w-full bg-secondary rounded-full h-4 relative">
                            <div 
                                className="bg-primary h-4 rounded-full flex items-center justify-end pr-2 text-xs font-bold text-background transition-all duration-500 ease-in-out" 
                                style={{ width: `${progressToNextTier}%` }}
                            >
                                {progressToNextTier > 15 && `${progressToNextTier.toFixed(0)}%`}
                            </div>
                        </div>
                        <div className="flex justify-between text-xs text-text-secondary mt-1">
                            <span>{currentTier.min} IVS</span>
                            <span>{nextTier.min} IVS</span>
                        </div>
                    </div>
                ) : (
                    <div className="mt-4">
                        <div className="w-full bg-primary rounded-full h-4 flex items-center justify-center">
                            <span className="text-xs font-bold text-background">Max Tier Reached!</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-8 border-t border-secondary pt-8">
                <h2 className="text-2xl font-bold text-text mb-4 font-heading">Connect</h2>
                <div className="flex items-center gap-4">
                  {socials?.discord && (
                    <a href={`https://discordapp.com/users/${socials.discord}`} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary transition-colors">
                      <DiscordIcon className="w-8 h-8" />
                    </a>
                  )}
                   {socials?.twitter && (
                    <a href={`https://twitter.com/${socials.twitter}`} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary transition-colors">
                      <TwitterIcon className="w-8 h-8" />
                    </a>
                  )}
                   {socials?.linkedin && (
                    <a href={`https://linkedin.com/in/${socials.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary transition-colors">
                      <LinkedInIcon className="w-8 h-8" />
                    </a>
                  )}
                  {!socials?.discord && !socials?.twitter && !socials?.linkedin && (
                    <p className="text-text-secondary">No social links added yet. Edit your profile to add them!</p>
                  )}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;