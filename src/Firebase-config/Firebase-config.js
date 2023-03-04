// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBp7miz2Mdfh4-4QnNgLTKbr3p43lTptPs",
  authDomain: "retech-bb41c.firebaseapp.com",
  projectId: "retech-bb41c",
  storageBucket: "retech-bb41c.appspot.com",
  messagingSenderId: "387815715502",
  appId: "1:387815715502:web:976a4022dfa154346a333f",
  measurementId: "G-SSXSXFJNWL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();