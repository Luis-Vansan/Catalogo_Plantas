// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // importe o auth
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzyk_LYmW-2NRQmh71zdQ59ZxL1gfL610",
  authDomain: "catalogo-de-plantas-338cd.firebaseapp.com",
  projectId: "catalogo-de-plantas-338cd",
  storageBucket: "catalogo-de-plantas-338cd.firebasestorage.app",
  messagingSenderId: "634206289093",
  appId: "1:634206289093:web:10e9dd2d23c2bb031f84ac",
  measurementId: "G-F3PXGJYJQB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };

export const auth = getAuth(app);  // exporte o auth para usar na autenticação