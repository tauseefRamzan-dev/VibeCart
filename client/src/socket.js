import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (token) => {
  if (!token) return null;

  if (socket?.connected) return socket;

  const url = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_apiURL || "http://localhost:8000";

  socket = io(url, {
    auth: { token },
    transports: ["websocket", "polling"],
    reconnection: true,
  });

  socket.on("connect", () => console.log("WebSocket connected:", socket.id));
  socket.on("connect_error", (error) => console.error("WebSocket error:", error.message));

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
