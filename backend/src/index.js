import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

// Connect to the database
import { connectToDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();  

const PORT = process.env.PORT;
const __dirname = path.resolve();


// 🛠️ Middleware with increased size limit

app.use(express.json({ limit: "20mb" })); // Increase as needed
app.use(express.urlencoded({ limit: "20mb", extended: true })); // Increase as needed

app.use(cookieParser()); // Middleware to parse cookies
app.use(cors({
  origin: "http://localhost:5173", // Allow requests from the client URL
  credentials: true, // Allow cookies to be sent with requests
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  // Serve static files from frontend
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Handle all routes *except API and socket.io* with React
  app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});


}

server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  connectToDB();
});

