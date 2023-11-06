import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { WS_SERVER } from "../api/API";

const WebSocketContext = createContext();

export function WebSocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Create a WebSocket connection when the component mounts

    const newSocket = io(WS_SERVER);
    setSocket(newSocket);

    return () => {
      // Close the WebSocket connection when the component unmounts
      newSocket.disconnect();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  return useContext(WebSocketContext);
}
