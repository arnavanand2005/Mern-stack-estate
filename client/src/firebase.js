// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-c0945.firebaseapp.com",
  projectId: "mern-estate-c0945",
  messagingSenderId: "41890069028",
  appId: "1:41890069028:web:23525c145772b93f4176b1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
