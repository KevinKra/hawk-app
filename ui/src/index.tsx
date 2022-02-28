import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HawkProvider } from "./context";

ReactDOM.render(
  <HawkProvider>
    <App />
  </HawkProvider>,
  document.getElementById("root")
);
