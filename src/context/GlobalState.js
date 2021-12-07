import React, { createContext, useState } from "react";

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
  const [state, setState] = useState();
  const [state, setState] = useState(initialState);

  return (
    <GlobalContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
