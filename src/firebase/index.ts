// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAiKJSr8BSm3i_KPAVhAOjOADWMhjW229g",
  authDomain: "anitopla.firebaseapp.com",
  projectId: "anitopla",
  storageBucket: "anitopla.firebasestorage.app",
  messagingSenderId: "803969443911",
  appId: "1:803969443911:web:672feb1959a989cae1e962",
  measurementId: "G-RK9F6P00T1"
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

