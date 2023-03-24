// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBJ2bflOifeMNiJVJ_PHkvhON6Vn31yVMA",
  authDomain: "retech-final.firebaseapp.com",
  projectId: "retech-final",
  storageBucket: "retech-final.appspot.com",
  messagingSenderId: "644746767085",
  appId: "1:644746767085:web:c88a3ff1b28f06c7eabae4",
  measurementId: "G-QKY051E096"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();
export const auth = getAuth(app);