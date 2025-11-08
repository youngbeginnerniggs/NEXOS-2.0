// Fix: Module '"firebase/app"' has no exported member 'initializeApp' or 'FirebaseApp'.
// Switched to a namespace import to work around a module resolution issue.
import * as firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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
// Fix: Updated to use `initializeApp` and `FirebaseApp` from the `firebase` namespace.
const app: firebase.FirebaseApp = firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };