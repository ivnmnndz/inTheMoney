import React from "react";
import "../../css/HomePageNull.css";
import { Link } from "react-router-dom";

function LoggedOutHome() {
  return (
    <div className="homePage-container">
      <h1 className="solgan">
        Buy & Sell <i className="fab fa-bitcoin"></i> Today!
      </h1>

      <div className="signup-login-container">
        <Link to="/signup">
          <button type="button" id="create-User-btn">
            Create Your Account
          </button>
        </Link>

        <Link id="logIn-link" to="/login">
          Already have an account? Log in here!
        </Link>
      </div>
    </div>
  );
}

export default LoggedOutHome;
