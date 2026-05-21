import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// For a simple clone, we'll use Vite environment variables.
// You need to create a .env file with your actual Firebase credentials.
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKey_For_Demo_Purpose",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ilovepdf-clone-demo.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ilovepdf-clone-demo",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ilovepdf-clone-demo.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
