import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import Database from "./config/dbConnect.js";
import authRoute from "./routes/authRoutes.js";
import adminRoute from "./routes/adminRoutes.js";
import userRoute from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [process.env.CORS_ORIGIN],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

//test root
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/api/auth/v1", authRoute);
app.use("/api/admin/v1", adminRoute);
app.use("/api/user/v1/request", userRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await Database.connect();
    console.log("🚀 Database connection established");

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`🌐 API available at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to DB. Server not started.");
    await Database.disconnect();
    process.exit(1);
  }
})();
