//import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyD6dMPVhvR9VZwwwvYon27FRMot7gor1KM",
  authDomain: "alumni-university.firebaseapp.com",
  projectId: "alumni-university",
  storageBucket: "alumni-university.appspot.com",
  messagingSenderId: "44212785965",
  appId: "1:44212785965:web:2b0d5ad7b27604fd9439a4",
  measurementId: "G-GX7LP47PF4"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
const app = firebase.initializeApp(firebaseConfig)

export default firebaseConfig;
