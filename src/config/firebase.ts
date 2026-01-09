import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoKgOzLAxePMQgc95gbaifE9cVFiCNdwk",
  authDomain: "health-cart-d54d7.firebaseapp.com",
  projectId: "health-cart-d54d7",
  storageBucket: "health-cart-d54d7.firebasestorage.app",
  messagingSenderId: "291137144478",
  appId: "1:291137144478:web:26a2ac2b7adb09bc4b1cbf",
  measurementId: "G-SPG2H28KNS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export default app;
