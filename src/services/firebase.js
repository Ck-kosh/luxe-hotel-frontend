import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAWLyKvuvLjDSlP-boppsEY9jbfEyeWBsw",
    authDomain: "luxe-frontend.firebaseapp.com",
    projectId: "luxe-frontend",
    storageBucket: "luxe-frontend.firebasestorage.app",
    messagingSenderId: "1046316050144",
    appId: "1:1046316050144:web:9b35c06b6ae0edf5c0d285",
    databaseURL: "https://luxe-frontend-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const provider = new GoogleAuthProvider();