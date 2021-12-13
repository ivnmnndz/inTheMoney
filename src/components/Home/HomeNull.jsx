import React from "react";
import "../../css/HomeNull.css";
import "../../css/Navbar.css"
import { Link } from "react-router-dom";

function HomeNull() {
  return (
    <div className="homePage-container">
      <h1 className="solgan">
        Buy & Sell <i className="fab fa-bitcoin"></i> Today!
      </h1>

      <div className="signup-login-container">
        <div>
          <Link to="/signup">
            <button type="button" id="create-User-btn">
              Create Your Account
            </button>
          </Link>
        </div>
        <Link id="logIn-link" to="/login">
          Already have an account? Log in here!
        </Link>
      </div>
    </div>
  );
}

export default HomeNull;
