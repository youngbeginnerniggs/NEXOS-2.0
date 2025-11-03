// Fix: Use modular imports for Firebase v9+ as other imports are already using it.
// FIX: Changed import to use named exports for Firebase v9 modular SDK to resolve member not found errors.
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// IMPORTANT: Replace with your actual Firebase project configuration
// It's recommended to store these values in environment variables
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSy...YOUR_API_KEY",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "your-project-id.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "your-project-id.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "your-sender-id",
  appId: process.env.FIREBASE_APP_ID || "1:your-sender-id:web:your-app-id"
};

// Initialize Firebase
// Fix: Use initializeApp and FirebaseApp from modular imports.
// FIX: Use initializeApp directly and FirebaseApp as a type from named imports.
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
