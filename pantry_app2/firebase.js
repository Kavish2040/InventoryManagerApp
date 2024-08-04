// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBGUQsDWdGARwHdIVukNAWFUa1oacBxmls",
  authDomain: "hspantryapp-d317e.firebaseapp.com",
  projectId: "hspantryapp-d317e",
  storageBucket: "hspantryapp-d317e.appspot.com",
  messagingSenderId: "200560331566",
  appId: "1:200560331566:web:1ad571732e4d99e08cc8bf"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
const firestore = getFirestore(app);
const storage = getStorage(app);
export { app, firestore, analytics, storage };