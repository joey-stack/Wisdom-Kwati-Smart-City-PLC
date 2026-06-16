import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app;
let auth;
let db;
let storage;

let isFirestoreReady = false;

try {
  if (!firebaseConfig.apiKey) {
    throw new Error("Missing NEXT_PUBLIC_FIREBASE_API_KEY. Please verify that your environment variables are configured in your Vercel or deployment settings.");
  }
  // Initialize Firebase (safeguarding for Next.js SSR & HMR)
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  isFirestoreReady = true;
} catch (err) {
  if (typeof window !== 'undefined') {
    console.error("🔴 [Firebase Initialization Failed]:", err.message);
  } else {
    // In server/build context, log a concise warning instead of a full stack trace
    console.warn("⚠️  [Firebase] Not initialized (build-time or missing env vars):", err.message);
  }
  // Export null so callers can guard: if (!db) return [];
  app = null;
  auth = null;
  db = null;
  storage = null;
}

export { app, auth, db, storage, isFirestoreReady };



