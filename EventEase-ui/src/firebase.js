import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_ofAvWDLuBP1pmHpgUarhN2qnlqWKiRo",
  authDomain: "eventease-784af.firebaseapp.com",
  projectId: "eventease-784af",
  storageBucket: "eventease-784af.firebasestorage.app",
  messagingSenderId: "708388387522",
  appId: "1:708388387522:web:d3ef42e0b17c41cd5e595b",
  measurementId: "G-T2XQHE88JR",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
