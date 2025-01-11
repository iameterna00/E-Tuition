// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8qJHygCpyMmF1aRwDlOOfTOYuyPn_oAU",
  authDomain: "etuitor-6f60f.firebaseapp.com",
  projectId: "etuitor-6f60f",
  storageBucket: "etuitor-6f60f.firebasestorage.app",
  messagingSenderId: "501389612416",
  appId: "1:501389612416:web:f47cd5176c0c95b174dd65",
  measurementId: "G-6TCKQLCBPC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);