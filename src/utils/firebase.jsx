/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyBJLj2jQwxrjtBPP0mQIYA646iZexDUkpE",
  authDomain: "streammind-ai.firebaseapp.com",
  projectId: "streammind-ai",
  storageBucket: "streammind-ai.firebasestorage.app",
  messagingSenderId: "1086242939926",
  appId: "1:1086242939926:web:19382211c2d09579b2c137",
  measurementId: "G-SG1CNXP754"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth()
export default auth;