import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import State from "./State";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    {" "}
    <React.StrictMode>
      <App />
    </React.StrictMode>
    <React.StrictMode>
      <State />
    </React.StrictMode>
  </div>
);
