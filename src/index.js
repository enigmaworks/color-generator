import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <h1>Color Generator</h1>
    <App></App>
  </React.StrictMode>
);
