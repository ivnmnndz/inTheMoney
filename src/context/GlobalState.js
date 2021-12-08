import React, { createContext, useState } from "react";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// define initial state
const initialState = {
  user: {
    email: "me@me.com",
    password: "12345",
  },
};

//create context
export const GlobalContext = createContext(initialState);

//export a provider component to wrap children components
export const GlobalProvider = ({ children }) => {
  //create useReducer state

  const [state, setState] = useState(initialState);
  const [currentUser, setCurrentUser] = useState();

  const firebaseConfig = {
    apiKey: "AIzaSyAXZeXdvn0c6sBNP8oT8wNf5zbjaZUtrkA",
    authDomain: "inthemoney-ee1ee.firebaseapp.com",
    projectId: "inthemoney-ee1ee",
    storageBucket: "inthemoney-ee1ee.appspot.com",
    messagingSenderId: "117221461869",
    appId: "1:117221461869:web:6ccdc6d3e96adc1f599464",
    measurementId: "G-ZYK9HPF7MP",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      setCurrentUser(user);
      console.log("logged in");
      console.log("current user", currentUser);
    } else {
      console.log("no user");
    }
  });

  return (
    <GlobalContext.Provider
      value={{
        state,
        setState,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
