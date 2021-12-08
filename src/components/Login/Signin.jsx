import React, { useState } from "react";
import { signInWithEmail } from "../../firebase"

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = (e) => {
    e.preventDefault();
    signInWithEmail( email, password );
  }

  return (
    <div className="signup-container">
      <form
        onSubmit={handleSignin}
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
        <a href="/">Forgot your password?</a>
      </form>
    </div>
  );
};

export default Signin;
