import React, { useContext } from "react";
import Dashboard from "../components/Dashboard";
import HomeNull from "../components/Home/HomeNull";
import { AuthContext } from "../context/AuthState";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? <Dashboard /> : <HomeNull />;
};

export default Home;
