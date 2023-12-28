import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { WS_SERVER } from "../api/API";

import { toast } from "react-toastify";

const WebSocketContext = createContext();

export function WebSocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Create a WebSocket connection when the component mounts

    const newSocket = io(WS_SERVER);
    setSocket(newSocket);

    newSocket.on("generated", (data) => {
      console.log("Received data from WebSocket:", data);
      toast.success(
        "Your requested roadmap has been generated successfully !",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        }
      );
    });

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
