import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import { env } from "./src/config/env.js";
import router from "./src/routes/index.js";
import { errorHandler } from "./src/middleware/errorHandler.middleware.js";

const app = express();

// ── Security ────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: env.clientUrl,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));

// ── Body Parsing ────────────────────────────────────────────
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(mongoSanitize()); // prevent NoSQL injection

// ── Logging ─────────────────────────────────────────────────
if (env.nodeEnv !== "test") {
  app.use(morgan(env.nodeEnv === "development" ? "dev" : "combined"));
}

// ── Routes ───────────────────────────────────────────────────
app.use("/api/v1", router);

// ── Health Check ─────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ── 404 Handler ──────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ── Global Error Handler (must be last) ──────────────────────
app.use(errorHandler);

export default app;