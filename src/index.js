import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WebSocketProvider } from "./websocket/context";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WebSocketProvider>
    <App />
  </WebSocketProvider>
);
