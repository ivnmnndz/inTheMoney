import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
//create context
export const GlobalContext = createContext();

//export a provider component to wrap children components
export const GlobalProvider = ({ children }) => {

  const [currentUser, setUser] = useState({});
  
  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []);

  console.log(currentUser);
  
  return (
    <GlobalContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
};
