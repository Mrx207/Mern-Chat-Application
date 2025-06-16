import express from "express";
import router from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import { app,server } from "./lib/socket.js";
import path from "path";

dotenv.config();
app.use(express.json());
app.use(cookieParser()); // ✅ FIXED
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const PORT = process.env.PORT || 5001; // ✅ FIXED
const __dirname = path.resolve();

app.get("/", (req, res) => {
  console.log("Server is running...");
  res.send("Hello from server");
});

server.listen(PORT, async () => {
  // ✅ Ensure DB connects only after server starts
  console.log(`Listening on port ${PORT}`);
  await connectDB();
});

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: err.message });
});

app.use("/api/auth", router);
app.use("/api/message", messageRoutes);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}