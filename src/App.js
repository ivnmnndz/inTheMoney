import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./views/Layout";
import Home from "./views/Home";
import Profile from "./views/Profile";
import NotFound from "./views/NotFound";
import ForgotPassword from "./views/ForgotPassword";
import Signin from "./components/Login/Signin";
import Signup from "./components/Login/Signup";
import Dashboard from "./components/Dashboard";
import FAQ from "./views/FAQ";
import CoinPage from "./components/CoinPage";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="profile" element={<Profile />} />
        <Route path="FAQ" element={<FAQ />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path=":id" element={<CoinPage />} />
      </Route>
      <Route path="/forgot_password" element={<ForgotPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
