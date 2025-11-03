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

  const { displayName, role, email, avatarUrl, socials } = userProfile;

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
              <div className="flex-grow">
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