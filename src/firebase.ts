import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// For a simple clone, we'll use a placeholder config.
// The user can replace this with their actual Firebase config if they want to deploy.
const firebaseConfig = {
    apiKey: "AIzaSyDummyKey_For_Demo_Purpose",
    authDomain: "ilovepdf-clone-demo.firebaseapp.com",
    projectId: "ilovepdf-clone-demo",
    storageBucket: "ilovepdf-clone-demo.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
