import React, { useContext} from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { logout } from "../firebase";


const Navbar = () => {
  const { currentUser } = useContext(GlobalContext);
<<<<<<< HEAD


  



  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <Link className="nav-logo" to="/">
            💰
          </Link>
        </div>

        <div className="login-signup">
          <input  type="checkbox" class="checkbox" id="chk" />
          <label class="label" for="chk">
            <i class="fas fa-moon"></i>
            <i class="fas fa-sun"></i>
            <div class="ball"></div>
          </label>
          <Link className="nav-link" to="/login">
            Log In
          </Link>
          <Link className="nav-link" to="/signup">
            Sign Up
          </Link>
        </div>

        {currentUser ? (
          <>
            <div>{currentUser.email}</div>
            <button onClick={logout}>LOGOUT</button>
          </>
        ) : null}
      </nav>
    </div>
=======
  
  return (
    <nav className="navbar">
      <div className="nav-spacing-left">
        <div id="nav-logo">
          <Link to="/">💰</Link>
        </div>
        {/* inline style here, expecting to replace with an svg? */}
        <div style={{ color: "white", padding: "0 10px" }}>
          <span>In The Money</span>
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
>>>>>>> c9d5765ae2a0bf0f252424d3083399436d512b91
  );
};

export default Navbar;
