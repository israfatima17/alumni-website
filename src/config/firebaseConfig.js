// src/config/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD6dMPVhvR9VZwwwvYon27FRMot7gor1KM",
  authDomain: "alumni-university.web.app",
  projectId: "alumni-university",
  storageBucket: "alumni-university.appspot.com",
  messagingSenderId: "44212785965",
  appId: "1:44212785965:web:2b0d5ad7b27604fd9439a4",
  measurementId: "G-GX7LP47PF4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {firebaseConfig, auth, db };
