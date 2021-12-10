import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import "../css/Profile.css";

const Profile = () => {
  const { currentUser } = useContext(GlobalContext);

  // user exist ? if so, more conditionals based on what data is attached to it
  // otherwise show loading until we fetch user

  return currentUser ? (
    <div className="container">
      <div classname="user-data">
        <div>
        Name:
          {currentUser.displayName ? (
            <h3>{currentUser.displayName}</h3>
          ) : (
            <h1>{currentUser.email}</h1>
          )}
          <div>
          Avatar:
          {currentUser.photoURL ? (
            <img src={currentUser.photoURL} alt="avatar" />
          ) : (
            <i className="far fa-user-circle fa-lg"></i>
          )}
          </div>
          <button>Edit Profile</button>
        </div>
        <div className="user-stats">
          <h4>STATS</h4>
          <span>wins: 10</span>
          <span>losses: 10</span>
          <span>win %: 50%</span>
          <span>avg trade length: 30 days</span>
        </div>
        <button>Make a trade</button>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default Profile;
