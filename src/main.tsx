import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom"; // 👈 import HashRouter
import MyApp from "./App";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <MyApp />
    </HashRouter>
  </React.StrictMode>
);
