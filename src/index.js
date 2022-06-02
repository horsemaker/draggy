import React from "react";
import ReactDOM from "react-dom/client";
import "flowbite";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BoardProvider } from "./contexts";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <BoardProvider>
        <App />
      </BoardProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
