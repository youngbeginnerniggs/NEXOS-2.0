import React, { useState } from 'react';
import { Page, UserRole } from '../types';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { updateUserIvs, IVS_POINTS } from '../firebase/ivs';

interface SignUpPageProps {
  onNavigate: (page: Page) => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onNavigate }) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [activationCode, setActivationCode] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const ACTIVATION_CODE_SECRET = "PMA2025";
  const ADMIN_SECRET_CODE = "PMA_ADMIN_2025";

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user) {
        throw new Error("User creation failed.");
      }
      
      let finalRole: UserRole = role;
      if (adminCode.trim() === ADMIN_SECRET_CODE) {
          finalRole = 'admin';
      }

      // Create user profile in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        role: finalRole,
        avatarUrl: 'https://storage.googleapis.com/aai-web-samples/project-momentum-africa/logo3.png',
        ivs: 0, // Initialize IVS
        socials: {},
        resumeUrl: '',
      });

      // Grant initial IVS points
      let bonusPoints = IVS_POINTS.SIGNUP_BONUS;
      if (activationCode.trim() === ACTIVATION_CODE_SECRET) {
          bonusPoints += IVS_POINTS.ACTIVATION_CODE_BONUS;
      }
      await updateUserIvs(user.uid, bonusPoints);

      onNavigate('hub');
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
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          <div className="rounded-md shadow-sm space-y-4">
             <input name="displayName" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-secondary bg-background placeholder-gray-500 text-text-secondary rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Display Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
             <input name="email" type="email" autoComplete="email" required className="appearance-none relative block w-full px-3 py-2 border border-secondary bg-background placeholder-gray-500 text-text-secondary rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
             <input name="password" type="password" autoComplete="new-password" required className="appearance-none relative block w-full px-3 py-2 border border-secondary bg-background placeholder-gray-500 text-text-secondary rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
             <input name="activationCode" type="text" className="appearance-none relative block w-full px-3 py-2 border border-secondary bg-background placeholder-gray-500 text-text-secondary rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Activation Code (Optional)" value={activationCode} onChange={(e) => setActivationCode(e.target.value)} />
              <input name="adminCode" type="password" className="appearance-none relative block w-full px-3 py-2 border border-secondary bg-background placeholder-gray-500 text-text-secondary rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Admin Secret Code (Optional)" value={adminCode} onChange={(e) => setAdminCode(e.target.value)} />
             <select name="role" value={role} onChange={(e) => setRole(e.target.value as UserRole)} className="appearance-none relative block w-full px-3 py-2 border border-secondary bg-background text-text-secondary rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
             </select>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div>
            <button type="submit" disabled={loading} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-background bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary disabled:bg-secondary">
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;