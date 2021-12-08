import React from "react";
import ReactDOM from "react-dom";
import Layout from "./Layout";
import { GlobalProvider } from "./context/GlobalState"

ReactDOM.render(
  <GlobalProvider>
    <Layout />
  </GlobalProvider>,
  document.getElementById("root")
);
