import { initializeApp } from "firebase/app";
import{ getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1-bAlpwbEWKYJWp3XJvKUy6ZOi6L7Q7A",
  authDomain: "project-blog-app-57889.firebaseapp.com",
  projectId: "project-blog-app-57889",
  storageBucket: "project-blog-app-57889.firebasestorage.app",
  messagingSenderId: "19957832256",
  appId: "1:19957832256:web:e0df45c4fa1d6e30a89da5",
  measurementId: "G-0GETF8EBKG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
