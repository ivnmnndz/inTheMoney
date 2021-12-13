import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

//create context
export const GlobalContext = createContext();

//export a provider component to wrap children components
export const GlobalProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // turn listener on
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    // turn listener off
    return () => {
      unsubscribe();
    };
  }, []);
  currentUser && console.log(currentUser.uid)
  return (
    <GlobalContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
