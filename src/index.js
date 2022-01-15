import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthState";
import App from "./App";
import { CoinProvider } from "./context/CoinState";

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <CoinProvider>
        <App />
      </CoinProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
