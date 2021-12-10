import React, { useContext } from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { logout } from "../firebase";

const Navbar = () => {
  const { currentUser } = useContext(GlobalContext);

  return (
    <nav className="navbar">
      <div className="nav-spacing-left">
        <div id="nav-logo">
          <Link to="/">
            {/* inline style here, expecting to replace with an svg? */}
            <div style={{ color: "white", padding: "0 10px" }}>
              <span>
                In the Money<i className="fab fa-bitcoin"></i>
              </span>
            </div>
          </Link>
        </div>
      </div>
      {currentUser ? (
        <div className="nav-spacing-right">
          <Link className="nav-link" to="/">
            Dashboard
          </Link>

          {/* icon for a potential dropdown menu */}
          {/* <div className="nav-link">
            <i className="far fa-user-circle fa-lg"></i>
          </div> */}

          <Link className="nav-link" to="/profile">
            {currentUser.email}
          </Link>
          <Link className="nav-link" to="/" onClick={logout}>
            <span>Logout</span>
          </Link>
        </div>
      ) : (
        <div className="nav-spacing-right">
          <Link className="nav-link" to="/login">
            <span>Log In</span>
          </Link>
          <Link className="nav-link" to="/signup">
            <span>Sign Up</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
