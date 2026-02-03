import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA4hTFax5bhVppmM7uCvJM4aWyDY8O5U9Y",
    authDomain: "foodhome-ca738.firebaseapp.com",
    projectId: "foodhome-ca738",
    storageBucket: "foodhome-ca738.firebasestorage.app",
    messagingSenderId: "1049482558854",
    appId: "1:1049482558854:web:191ced2105343c7f208007"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
