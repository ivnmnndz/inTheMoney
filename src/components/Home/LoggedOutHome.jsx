import React from "react";
import "../../css/LoggedOutHome.css";
import { Link } from "react-router-dom";

function LoggedOutHome() {
  return (
    <div className="HomePage-container">
      <h1 className="inTheMoney-logo">In the Money</h1>

      <div className="signup-login-container">
        <Link to="/signup">
          <button type="button" id="Create-User-btn">
            Create Your Account
          </button>
        </Link>

        <Link to="/login">
          <p>Already have an account? Log in here!</p>
        </Link>
      </div>
    </div>
  );
}

export default LoggedOutHome;
