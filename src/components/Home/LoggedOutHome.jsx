import React from "react";
import "../../css/LoggedOutHome.css";
import { Link } from "react-router-dom";

function LoggedOutHome() {
  return (
    <div className="HomePage-container">
      <h1>
        In the Money<small>₿</small>
      </h1>

      <Link to="/signup">
        <button className="Create-User-btn">Create Your Account</button>
      </Link>

      <Link className="login-link" to="/login">
        <span >Already have an account? Log in here!</span>
      </Link>
    </div>
  );
}

export default LoggedOutHome;
