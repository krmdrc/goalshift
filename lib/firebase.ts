// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase web config'in (Firebase Project settings → Web app’ten aldığın)
const firebaseConfig = {
  apiKey: "AIzaSyB5F5zupjc0Ki2-FZiTlnyCziaD_Dy1DL1",
  authDomain: "goalshift-app.firebaseapp.com",
  projectId: "goalshift-app",
  storageBucket: "goalshift-app.firebasestorage.app",
  messagingSenderId: "10190573722",
  appId: "1:10190573722:web:93ba014a4263ce1702cf23",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
