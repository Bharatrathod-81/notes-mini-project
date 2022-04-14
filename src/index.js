import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { InputContectProvider } from "./contexts/input-contexts";
import { EditContextProvider } from "./contexts/editContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <EditContextProvider>
        <InputContectProvider>
          <App />
        </InputContectProvider>
      </EditContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
