// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-c0945.firebaseapp.com",
  projectId: "mern-estate-c0945",
  storageBucket: "mern-estate-c0945.firebasestorage.app",
  messagingSenderId: "41890069028",
  appId: "1:41890069028:web:23525c145772b93f4176b1",
  measurementId: "G-1E0SM97V08"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);