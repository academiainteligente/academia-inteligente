import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD1vDb9zYIBJ3vRoPq8VJo5aIK5Zc-DhpE",
  authDomain: "academiainteligente-f1bbe.firebaseapp.com",
  projectId: "academiainteligente-f1bbe",
  storageBucket: "academiainteligente-f1bbe.firebasestorage.app",
  messagingSenderId: "90075387303",
  appId: "1:90075387303:web:0cd9c522c9ad1231a35282",
  measurementId: "G-GFDWRMWM69"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
