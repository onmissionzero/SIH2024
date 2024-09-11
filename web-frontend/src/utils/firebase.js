import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCsCZt-TRNm5iLQFwx5gpcr_MJyNrGqfSo",
    authDomain: "hackelite-museum.firebaseapp.com",
    databaseURL: "https://hackelite-museum-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hackelite-museum",
    storageBucket: "hackelite-museum.appspot.com",
    messagingSenderId: "663182496700",
    appId: "1:663182496700:web:d5b3de660406a6984451b9"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
