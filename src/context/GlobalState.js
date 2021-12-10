import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

//create context
export const GlobalContext = createContext();

//export a provider component to wrap children components
export const GlobalProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // turn listener on
<<<<<<< HEAD
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      setCurrentUser(user)
    );
=======
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
>>>>>>> c9d5765ae2a0bf0f252424d3083399436d512b91
    // turn listener off
    return () => {
      unsubscribe();
    };
  }, []);
  console.log(currentUser);
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
