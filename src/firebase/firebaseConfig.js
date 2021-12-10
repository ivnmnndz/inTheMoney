import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyAXZeXdvn0c6sBNP8oT8wNf5zbjaZUtrkA",
  authDomain: "inthemoney-ee1ee.firebaseapp.com",
  projectId: "inthemoney-ee1ee",
  storageBucket: "inthemoney-ee1ee.appspot.com",
  messagingSenderId: "117221461869",
  appId: "1:117221461869:web:6ccdc6d3e96adc1f599464",
  measurementId: "G-ZYK9HPF7MP",
};
export const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore(app);
