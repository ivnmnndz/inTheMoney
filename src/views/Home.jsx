import React, { useContext } from "react";
import Profile from "./Profile";
import HomeNull from "../components/Home/HomeNull";
import { AuthContext } from "../context/AuthState";
import OnLoadSpinner from "../components/OnLoadSpinner";

const Home = () => {
  const { currentUser, isLoading } = useContext(AuthContext);

  return isLoading ? (
    <OnLoadSpinner />
  ) : currentUser ? (
    <Profile />
  ) : (
    <HomeNull />
  );
};

export default Home;
