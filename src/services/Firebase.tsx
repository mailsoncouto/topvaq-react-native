import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCphlDO5AlUJ2ohJEJWBSWKrioLFV-IKmg",
  authDomain: "login-acec0.firebaseapp.com",
  projectId: "login-acec0",
  storageBucket: "login-acec0.appspot.com",
  messagingSenderId: "639784459203",
  appId: "1:639784459203:web:986643b12795a298367b76",
  measurementId: "G-FEPGREFJCR"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);