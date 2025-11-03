import React, { useState } from 'react';
import { Page, UserRole } from '../types';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

interface SignUpPageProps {
  onNavigate: (page: Page) => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onNavigate }) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

      // Create user profile in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        role: role,
        avatarUrl: `https://picsum.photos/seed/${user.uid}/200/200`,
        socials: {},
        resumeUrl: '',
      });

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
          <p className="mt-2 text-center text-sm text-text-secondary">
            Already have an account?{' '}
            <span onClick={() => onNavigate('login')} className="font-medium text-primary hover:opacity-80 cursor-pointer">
              Log in
            </span>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          <div className="rounded-md shadow-sm space-y-4">
             <input name="displayName" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-secondary bg-background placeholder-gray-500 text-text-secondary rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Display Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
             <input name="email" type="email" autoComplete="email" required className="appearance-none relative block w-full px-3 py-2 border border-secondary bg-background placeholder-gray-500 text-text-secondary rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
             <input name="password" type="password" autoComplete="new-password" required className="appearance-none relative block w-full px-3 py-2 border border-secondary bg-background placeholder-gray-500 text-text-secondary rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
             <select name="role" value={role} onChange={(e) => setRole(e.target.value as UserRole)} className="appearance-none relative block w-full px-3 py-2 border border-secondary bg-background text-text-secondary rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
                <option value="admin">Admin</option>
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
