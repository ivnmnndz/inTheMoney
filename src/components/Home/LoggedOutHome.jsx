import React from "react";
import "../../css/LoggedOutHome.css"
import { Link } from "react-router-dom";

function LoggedOutHome() {
  return (
    <div className="HomePage-container">
      <h1>
        In the Money<small>₿</small>
      </h1>

      <div className="signup-login-container">
        <div>
          <Link to="/signup">
            <button id="Create-User-btn">Create Your Account</button>
          </Link>
        </div>
        <Link to="/login">
          <small>Already have an account? Log in here!</small>
        </Link>
      </div>
    </div>
  );
}

export default LoggedOutHome;
