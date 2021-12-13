import React, { useContext } from "react";
import Dashboard from "../components/Dashboard";
import HomeNull from "../components/Home/HomeNull";
import { GlobalContext } from "../context/GlobalState";
const Home = () => {
  const { currentUser } = useContext(GlobalContext);
  return currentUser ? <Dashboard /> : <HomeNull />;
};

export default Home;
