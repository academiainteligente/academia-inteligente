import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD1vDe9xYt83JvRCqPqNVJo8eJ6Zc-OnpE",
  authDomain: "academiainteligente-f1bbe.firebaseapp.com",
  projectId: "academiainteligente-f1bbe",
  storageBucket: "academiainteligente-f1bbe.firebasestorage.app",
  messagingSenderId: "90075387303",
  appId: "1:90075387303:web:e3bbb6412f92bea1a35262",
  measurementId: "G-1JWZEd95x"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
