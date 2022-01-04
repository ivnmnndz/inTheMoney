import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerWithEmail, updateAuthProfile } from "../../firebase/auth";
import { addUserDoc } from "../../firebase/db";

const Signup = () => {
  const [values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validUserName, setValidUserName] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validConfirmation, setValidConfirmation] = useState(true);

  let navigate = useNavigate();

  const CreateUser = async (e) => {
    const user = await registerWithEmail(values.email, values.password);
    updateAuthProfile({ displayName: values.userName });
    const data = {
      displayName: values.userName,
      email: values.email,
      uid: user.uid,
    };
    await addUserDoc(user.uid, data);
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let validPassword =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).{8,}$/;
    if (
      values.email.match(validEmail) &&
      values.password.match(validPassword) &&
      values.password === values.confirmPassword &&
      values.userName.length >= 6
    ) {
      console.log("Valid email address!");
      CreateUser();
    }
    if (!values.email.match(validEmail)) {
      setValidEmail(false);
    }
    if (values.email.match(validEmail)) {
      setValidEmail(true);
    }
    if (values.confirmPassword !== values.password) {
      setValidConfirmation(false);
    }
    if (values.password === values.confirmPassword) {
      setValidConfirmation(true);
    }
    if (!values.password.match(validPassword)) {
      setValidPassword(false);
    }
    if (values.password.match(validPassword)) {
      setValidPassword(true);
    }
    if (values.userName.length < 6) {
      setValidUserName(false);
    }
    if (values.userName.length >= 6) {
      setValidUserName(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
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
            value={values.userName}
            onChange={handleInputChange}
            required
          />
          <div className={validUserName ? "hide" : "show"}>
            The username length must be at least 6 characters
          </div>
          <input
            className="signup-email"
            name="email"
            placeholder="E-mail"
            value={values.email}
            onChange={handleInputChange}
            required
          />
          <div className={validEmail ? "hide" : "show"}>
            The email you have entered is invaild
          </div>

          <input
            // type="password"
            name="password"
            className="signup-password"
            placeholder="Password"
            value={values.password}
            onChange={handleInputChange}
            required
          />
          <div className={validPassword ? "hide" : "show"}>
            The password length must be at least 8 characters, must contain at
            least 1 uppercase and lowercase characters, must contain one or more
            numeric values, and must contain one or more special characters.
          </div>
          <input
            // type="password"
            name="confirmPassword"
            className="confirm-password"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChange={handleInputChange}
          />
          <div className={validConfirmation ? "hide" : "show"}>
            Passwords do not match
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
