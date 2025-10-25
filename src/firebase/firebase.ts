// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAG_k5_PxMgv9qc9QxXakDolfjBv1fKb2I",
  authDomain: "reactchallenge-3d44c.firebaseapp.com",
  databaseURL: "https://reactchallenge-3d44c-default-rtdb.firebaseio.com",
  projectId: "reactchallenge-3d44c",
  storageBucket: "reactchallenge-3d44c.firebasestorage.app",
  messagingSenderId: "156337075480",
  appId: "1:156337075480:web:c00ed76f461c9abce05a6d",
  measurementId: "G-T3WLXQHL9G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, ref, onValue, set, auth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged };