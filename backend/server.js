// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";

// // Existing Routes
// import placeRoutes from "./routes/placeRoutes.js";
// import hotelRoutes from "./routes/hotelRoutes.js";
// import bookingRoutes from "./routes/bookingRoutes.js";

// // ✅ New Auth Route
// import authRoutes from "./routes/authRoutes.js";

// dotenv.config();

// // ✅ Connect to MongoDB
// connectDB();

// const app = express();

// // ✅ Middleware
// app.use(cors());
// app.use(express.json());

// // ✅ Routes
// app.use("/api/auth", authRoutes);       // 👈 New authentication route
// app.use("/api/places", placeRoutes);    // existing
// app.use("/api/hotels", hotelRoutes);    // existing
// app.use("/api/bookings", bookingRoutes);// existing

// // ✅ Server Start
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";

// // Existing Routes
// import placeRoutes from "./routes/placeRoutes.js";
// import hotelRoutes from "./routes/hotelRoutes.js";
// import bookingRoutes from "./routes/bookingRoutes.js";
// import authRoutes from "./routes/authRoutes.js";

// // ⬇ New imports for Socket.IO
// import http from "http";
// import { Server } from "socket.io";

// dotenv.config();

// // ⬇ Connect to MongoDB
// connectDB();

// const app = express();

// // ⬇ Create HTTP server (IMPORTANT for Socket.IO)
// const server = http.createServer(app);

// // ⬇ Initialize Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: "*",   // allow all frontend apps
//     methods: ["GET", "POST"]
//   }
// });

// // ⬇ Socket.IO Connection
// io.on("connection", (socket) => {
//   console.log("🔥 User connected:", socket.id);

//   // Receive message (example)
//   socket.on("message", (data) => {
//     console.log("Message from frontend:", data);

//     // Emit to everyone
//     io.emit("message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("❌ User disconnected:", socket.id);
//   });
// });

// // Make IO available in other files if needed
// export { io };

// // ⬇ Middlewares
// app.use(cors());
// app.use(express.json());

// // ⬇ Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/places", placeRoutes);
// app.use("/api/hotels", hotelRoutes);
// app.use("/api/bookings", bookingRoutes);

// // ⬇ Server Start
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });




import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import placeRoutes from "./routes/placeRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Socket.IO
import http from "http";
import { Server } from "socket.io";

dotenv.config();

console.log("EMAIL USER:", process.env.EMAIL_USER);
console.log("EMAIL PASS:", process.env.EMAIL_PASS ? "LOADED" : "MISSING");

// Connect to MongoDB
connectDB();

const app = express();

// HTTP server for Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// 🔵 Socket connection
io.on("connection", (socket) => {
  console.log("🔥 User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// 🔥 Function to emit booking updates to all clients
export const sendBookingUpdate = (bookingData) => {
  io.emit("new_booking", bookingData); // <- matches frontend
};

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running with Socket.IO on port ${PORT}`);
});
export { io };

