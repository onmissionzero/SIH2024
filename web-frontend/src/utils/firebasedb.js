// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, update, remove, onValue } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsCZt-TRNm5iLQFwx5gpcr_MJyNrGqfSo",
  authDomain: "hackelite-museum.firebaseapp.com",
  databaseURL: "https://hackelite-museum-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hackelite-museum",
  storageBucket: "hackelite-museum.appspot.com",
  messagingSenderId: "663182496700",
  appId: "1:663182496700:web:d5b3de660406a6984451b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, get, update, remove, onValue };
