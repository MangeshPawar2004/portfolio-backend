import jwt from "jsonwebtoken";
import crypto from "crypto";
import { env } from "../config/env.js";

export const generateAccessToken = (userId, role) =>
  jwt.sign({ _id: userId, role }, env.jwt.accessSecret, {
    expiresIn: env.jwt.accessExpiry,
  });

export const generateRefreshToken = (userId) =>
  jwt.sign({ _id: userId }, env.jwt.refreshSecret, {
    expiresIn: env.jwt.refreshExpiry,
  });

export const verifyRefreshToken = (token) =>
  jwt.verify(token, env.jwt.refreshSecret);

export const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};