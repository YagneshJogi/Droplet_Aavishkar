// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBg2arGPdT95nwXfxSFBApkNWORRyD1zms",
  authDomain: "tddroplet-96223.firebaseapp.com",
  databaseURL: "https://tddroplet-96223-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tddroplet-96223",
  storageBucket: "tddroplet-96223.firebasestorage.app",
  messagingSenderId: "585223952269",
  appId: "1:585223952269:web:b803f65654e3358cb30fc4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Realtime Database instance
export const database = getDatabase(app);
