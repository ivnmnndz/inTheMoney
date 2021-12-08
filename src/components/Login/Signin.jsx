import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Signin = () => {
  const { setState, state } = useContext(GlobalContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      setState(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  return (
    <div className="signup-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="signup-form"
      >
        <h1>Welcome Back</h1>
        <label>
          Email
          <input
            className="signup-email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            className="signup-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <a href="/">Forgot your password?</a>
    </div>
  );
};

export default Signin;
