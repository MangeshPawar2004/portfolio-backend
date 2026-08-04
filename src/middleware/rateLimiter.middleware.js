import rateLimit from "express-rate-limit";
import { env } from "../config/env.js";

export const contactRateLimiter = rateLimit({
  windowMs: env.contactRateLimit.windowMs,
  max: env.contactRateLimit.max,
  message: {
    success: false,
    message: "Too many submissions from this IP. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: "Too many login attempts. Try again in 15 minutes." },
});