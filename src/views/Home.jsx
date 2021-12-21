import React, { useContext } from "react";
import Dashboard from "../components/Dashboard";
import HomeNull from "../components/Home/HomeNull";
import { AuthContext } from "../context/AuthState";
import OnLoadSpinner from "../components/OnLoadSpinner";

const Home = () => {
  const { currentUser, isLoading } = useContext(AuthContext);

  return isLoading ? (
    <OnLoadSpinner />
  ) : currentUser ? (
    <Dashboard />
  ) : (
    <HomeNull />
  );
};

export default Home;
