import React, { useState, useContext} from "react";
import { signInWithEmail } from "../../firebase/auth";
import "../../css/signin.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthState";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const {setIsLoading} = useContext(AuthContext)

  let navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await signInWithEmail(email, password);
    setIsLoading(false);
    navigate("/")
  };

    return (
      <div className="signup-container">
        <div className="blockchain"></div>
        <form onSubmit={handleSignin} className="signup-form">
          <h1>Sign in</h1>

          <input
            className="signup-email"
            name="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            name="password"
            className="signup-password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="signin-btn" type="submit">
            Sign in
          </button>
          <a href="/">Forgot your password?</a>
        </form>
      </div>
    );
};

export default Signin;
