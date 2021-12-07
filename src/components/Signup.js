import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import background from "../images/background.png"

import "../css/signup.css"

const Signup = () => {
  const { setState, state } = useContext(GlobalContext);

  const [values] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setState(values);
  };

  return (
    <>
      <div className="signup-container" src={background}>
        <form onSubmit={handleSubmit} className="signup-form">
        <label>
            Full Name
            <input className="signup-name" name="email" />
          </label>
          <label>
            Email
            <input className="signup-email" name="email" />
          </label>

          <label>
            Password
            <input name="password" className="signup-password" />
          </label>
        </form>
        <div>{state}</div>
      </div>
    </>
  );
};
export default Signup;
