// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAqzpMhxTOIVjFwCVcy7h7m1IILL-dDH4c",
  authDomain: "aavishkar-8f0b9.firebaseapp.com",
  databaseURL: "https://aavishkar-8f0b9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aavishkar-8f0b9",
  storageBucket: "aavishkar-8f0b9.firebasestorage.app",
  messagingSenderId: "651138895844",
  appId: "1:651138895844:web:f4b1aadd08383619cfc1f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Realtime Database instance
export const database = getDatabase(app);
