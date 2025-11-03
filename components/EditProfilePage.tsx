import React, { useState, useContext } from 'react';
import { Page } from '../types';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

interface EditProfilePageProps {
  onNavigate: (page: Page) => void;
}

const EditProfilePage: React.FC<EditProfilePageProps> = ({ onNavigate }) => {
  const { user, userProfile, refreshUserProfile } = useContext(AuthContext);
  
  const [displayName, setDisplayName] = useState(userProfile?.displayName || '');
  const [discord, setDiscord] = useState(userProfile?.socials?.discord || '');
  const [twitter, setTwitter] = useState(userProfile?.socials?.twitter || '');
  const [linkedin, setLinkedin] = useState(userProfile?.socials?.linkedin || '');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!user) {
        setError("You must be logged in to edit your profile.");
        setLoading(false);
        return;
    }

    try {
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, {
            displayName: displayName,
            socials: {
                discord: discord,
                twitter: twitter,
                linkedin: linkedin,
            }
        });
        
        await refreshUserProfile(); // Refresh context data
        setSuccess('Profile updated successfully!');
        setTimeout(() => onNavigate('profile'), 1500);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-surface p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-text font-heading">
            Edit Your Profile
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSave}>
            <div className="rounded-md shadow-sm space-y-4">
                <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-text-secondary mb-1">Display Name</label>
                    <input id="displayName" name="displayName" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-secondary bg-background placeholder-gray-500 text-text-secondary rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Your Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="discord" className="block text-sm font-medium text-text-secondary mb-1">Discord Username</label>
                    <input id="discord" name="discord" type="text" className="appearance-none relative block w-full px-3 py-2 border border-secondary bg-background placeholder-gray-500 text-text-secondary rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="username#1234" value={discord} onChange={(e) => setDiscord(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="twitter" className="block text-sm font-medium text-text-secondary mb-1">Twitter Handle</label>
                    <input id="twitter" name="twitter" type="text" className="appearance-none relative block w-full px-3 py-2 border border-secondary bg-background placeholder-gray-500 text-text-secondary rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="@handle" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
                </div>
                 <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-text-secondary mb-1">LinkedIn Profile</label>
                    <input id="linkedin" name="linkedin" type="text" className="appearance-none relative block w-full px-3 py-2 border border-secondary bg-background placeholder-gray-500 text-text-secondary rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="linkedin-username" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                </div>
            </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          {success && <p className="text-sm text-primary text-center">{success}</p>}
          <div className="flex gap-4">
            <button
                type="button"
                onClick={() => onNavigate('profile')}
                className="group relative w-full flex justify-center py-2 px-4 border border-secondary text-sm font-medium rounded-md text-text-secondary bg-background hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-background bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary disabled:bg-secondary"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;