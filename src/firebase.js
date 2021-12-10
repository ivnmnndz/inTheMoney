import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXZeXdvn0c6sBNP8oT8wNf5zbjaZUtrkA",
  authDomain: "inthemoney-ee1ee.firebaseapp.com",
  projectId: "inthemoney-ee1ee",
  storageBucket: "inthemoney-ee1ee.appspot.com",
  messagingSenderId: "117221461869",
  appId: "1:117221461869:web:6ccdc6d3e96adc1f599464",
  measurementId: "G-ZYK9HPF7MP",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const registerWithEmail = (email, password) =>
<<<<<<< HEAD
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in Success
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      // Sign Failure
      const errorCode = error.code;
      const errorMessage = error.message;
      return error;
    });
=======
	createUserWithEmailAndPassword(auth, email, password)
		.then(userCredential => {
			// Signed in Success
			const user = userCredential.user;
			return user;
			// ...
		})
		.catch(error => {
			// Sign Failure
			const errorCode = error.code;
			const errorMessage = error.message;
			return error;
		});
>>>>>>> c9d5765ae2a0bf0f252424d3083399436d512b91

const signInWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return error;
    });

const logout = () => {
  signOut(auth);
};

export { app, auth, registerWithEmail, signInWithEmail, logout };
