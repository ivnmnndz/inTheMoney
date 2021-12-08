import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
//create context
export const GlobalContext = createContext();

//export a provider component to wrap children components
export const GlobalProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // turn listener on
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthenticated(true);
    });
    // turn listener off
    return () => {
      unsubscribe();
      setIsAuthenticated(false);
    };
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
