import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthState";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
