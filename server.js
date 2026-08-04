import connectDB from "./src/config/db.js";
import { env } from "./src/config/env.js";
import app from "./app.js";

const startServer = async () => {
  await connectDB();

  const server = app.listen(env.port, () => {
    console.log(`🚀 Server running on port ${env.port} [${env.nodeEnv}]`);
    console.log(`📖 API: http://localhost:${env.port}/api/v1`);
    console.log(`❤️  Health: http://localhost:${env.port}/health`);
  });

  // Graceful shutdown
  const shutdown = (signal) => {
    console.log(`\n${signal} received — shutting down gracefully`);
    server.close(() => {
      console.log("HTTP server closed");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT",  () => shutdown("SIGINT"));

  process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err.message);
    server.close(() => process.exit(1));
  });
};

startServer();