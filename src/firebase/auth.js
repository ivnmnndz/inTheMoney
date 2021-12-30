import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
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
      console.log(errorCode, errorMessage);
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
      console.log(errorCode, errorMessage);
    });

const updateAuthProfile = (data) => {
  updateProfile(auth.currentUser, data)
    // can delete then/catch. not doing anything with promise return
    .then(() => {
      console.log("updated");
      // Profile updated!
      // ...
    })
    .catch((error) => {
      console.log(error);
      // An error occurred
      // ...
    });
};

const logout = () => {
  signOut(auth);
};

const passwordReset = (email) => {
  sendPasswordResetEmail(auth, email)
    // Reset Email sent
    .then(() => {
      alert("Password reset email sent!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export {
  auth,
  registerWithEmail,
  signInWithEmail,
  updateAuthProfile,
  logout,
  passwordReset,
};
