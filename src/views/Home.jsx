import React, { useContext } from "react";
import Dashboard from "../components/Dashboard";
import HomeNull from "../components/Home/HomeNull";
import { GlobalContext } from "../context/GlobalState";
import OnLoadSpinner from "../components/OnLoadSpinner"


const Home = () => {
  const { currentUser, isLoading } = useContext(GlobalContext);

  return (isLoading ?<OnLoadSpinner/> :(currentUser ? <Dashboard />  : <HomeNull />))
};

export default Home;
