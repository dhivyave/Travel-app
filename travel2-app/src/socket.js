import { io } from "socket.io-client";

// Backend Socket.IO URL
const SOCKET_URL = "http://localhost:5000";

// Create a single shared socket instance
const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"], // fallback if websocket fails
  autoConnect: true, // automatically connect
});

// Optional: listen to connection errors (for debugging)
socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err);
});

socket.on("connect", () => {
  console.log("🟢 Socket connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("⚠ Socket disconnected:", reason);
});

export default socket;
