import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerWithEmail, updateAuthProfile } from "../../firebase/auth";
import { addUserDoc } from "../../firebase/db";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validUserName, setValidUserName] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validConfirmation, setValidConfirmation] = useState(true);

  let navigate = useNavigate();

  const CreateUser = async (e) => {
    const user = await registerWithEmail(email, password);
    updateAuthProfile({ displayName: userName });
    const data = { displayName: userName, email: email, uid: user.uid };
    await addUserDoc(user.uid, data);
    navigate("/");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let validEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let validPassword =
      "(?=^.{8,}$)(?=.*d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$";
    if (
      email.match(validEmail) &&
      password.match(validPassword) &&
      password === confirmPassword &&
      userName.length >= 6
    ) {
      console.log("Valid email address!");
      CreateUser();
    }
    if (!email.match(validEmail)) {
      setValidEmail(false);
    }
    if (email.match(validEmail)) {
      setValidEmail(true);
    }
    if ((!password.match(confirmPassword), confirmPassword != password)) {
      setValidConfirmation(false);
    }
    if (
      password.match(confirmPassword) &&
      password.length === confirmPassword.length
    ) {
      setValidConfirmation(true);
    }
    if (!password.match(validPassword)) {
      setValidPassword(false);
    }
    if (password.match(validPassword)) {
      setValidPassword(true);
    }
    if (userName.length < 6) {
      setValidUserName(false);
    }
    if (userName.length >= 6) {
      setValidUserName(true);
    }
  };
  return (
    <>
      <div className="signup-container">
        <div className="blockchain"></div>
        <form onSubmit={handleSubmit} className="signup-form">
          <h1>Create an Account</h1>
          <input
            className="signup-input"
            name="userName"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <div className={validUserName ? "hide" : "show"}>
            Invalid Username must contain at least 6 characters.
          </div>
          <input
            className="signup-email"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className={validEmail ? "hide" : "show"}>
            Invalid Email Address
          </div>

          <input
            name="password"
            className="signup-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className={validPassword ? "hide" : "show"}>
            The password length must be greater than or equal to 8
          </div>
          <div className={validPassword ? "hide" : "show"}>
            The password must contain one or more uppercase characters
          </div>
          <div className={validPassword ? "hide" : "show"}>
            The password must contain one or more lowercase characters
          </div>
          <div className={validPassword ? "hide" : "show"}>
            The password must contain one or more numeric values
          </div>
          <div className={validPassword ? "hide" : "show"}>
            The password must contain one or more special characters.
          </div>
          <input
            name="confirmPassword"
            className="confirm-password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className={validConfirmation ? "hide" : "show"}>
            Password does not match
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
