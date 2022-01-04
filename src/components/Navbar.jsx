import React, { useContext } from "react";
import "../css/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthState";
import { logout } from "../firebase/auth";

const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  let navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link className="nav-link" to="/">
        In the Money
      </Link>
      <input id="toggle1" type="checkbox" />
      <label className="hamburger1" htmlFor="toggle1">
        <div className="top"></div>
        <div className="meat"></div>
        <div className="bottom"></div>
      </label>

      {currentUser ? (
        <div className="nav-right">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
          <Link className="nav-link" to="/profile">
            {currentUser.displayName}
          </Link>
          <Link className="nav-link" to="/" onClick={handleLogOut}>
            Logout
          </Link>
        </div>
      ) : (
        <div className="nav-right">
          <Link className="nav-link" to="/login">
            Log In
          </Link>
          <Link className="nav-link" to="/signup">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
