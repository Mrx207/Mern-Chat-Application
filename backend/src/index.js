import express from "express";
import router from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser()); // ✅ FIXED
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const PORT = process.env.PORT || 5001; // ✅ FIXED

app.get("/", (req, res) => {
  console.log("Server is running...");
  res.send("Hello from server");
});

app.listen(PORT, async () => {
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
