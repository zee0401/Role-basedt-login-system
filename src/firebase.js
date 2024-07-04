// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY7jl5i7x0c758BOID0L8Q_WJ3V6w8Duk",
  authDomain: "role-based-auth-react.firebaseapp.com",
  projectId: "role-based-auth-react",
  storageBucket: "role-based-auth-react.appspot.com",
  messagingSenderId: "1040609658502",
  appId: "1:1040609658502:web:18b7331eaba52bc15d3307",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
