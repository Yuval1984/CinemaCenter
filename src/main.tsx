import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom"; // 👈 import HashRouter
import MyApp from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { ThemeProvider } from "./hooks/themeContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <HashRouter>
        <MyApp />
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);
