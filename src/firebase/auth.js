import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "./firebaseConfig";

const registerWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in Success
      const user = userCredential.user;
      return user;
      // ...
    })
    .catch((error) => {
      // Sign Failure
      const errorCode = error.code;
      const errorMessage = error.message;
      return error;
    });

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

export { auth, registerWithEmail, signInWithEmail, logout };
