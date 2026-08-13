import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { env } from "../config/env.js";

export const verifyJWT = asyncHandler(async (req, _res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.headers?.authorization?.replace("Bearer ", "");

  if (!token) throw new ApiError(401, "Unauthorized — no token provided");

  let decoded;
  try {
    decoded = jwt.verify(token, env.jwt.accessSecret);
  } catch {
    throw new ApiError(401, "Unauthorized — invalid or expired token");
  }

  const user = await User.findById(decoded._id).select("-password -refreshToken");
  if (!user || !user.isActive) throw new ApiError(401, "Unauthorized — user not found");

  req.user = user;
  next();
});

// Convenience: require admin role
export const requireAdmin = asyncHandler(async (req, _res, next) => {
  if (req.user?.role !== "admin") {
    throw new ApiError(403, "Forbidden — admin access required");
  }
  next();
});