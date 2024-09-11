// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
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
const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage };
