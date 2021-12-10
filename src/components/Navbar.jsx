import React, { useContext } from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { logout } from "../firebase";

const Navbar = () => {
  const { currentUser } = useContext(GlobalContext);

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">💰</Link>
        <span>In The Money</span>
      </div>
      {/* inline style here, expecting to replace with an svg? */}

      {currentUser ? (
        <div className="nav-right">
           <input type="checkbox" class="checkbox" id="chk" />
          <label class="label" for="chk">
            <i class="fas fa-moon"></i>
            <i class="fas fa-sun"></i>
            <div class="ball"></div>
          </label>
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
        <div className="nav-right">
          <input type="checkbox" class="checkbox" id="chk" />
          <label class="label" for="chk">
            <i class="fas fa-moon"></i>
            <i class="fas fa-sun"></i>
            <div class="ball"></div>
          </label>
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
