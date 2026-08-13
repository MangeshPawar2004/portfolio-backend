import { Router } from "express";
import {
  login, logout, refreshToken, getMe, changePassword
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authRateLimiter } from "../middleware/rateLimiter.middleware.js";

const router = Router();

router.post("/login", authRateLimiter, login);
router.post("/refresh", refreshToken);
router.post("/logout", verifyJWT, logout);
router.get("/me", verifyJWT, getMe);
router.put("/change-password", verifyJWT, changePassword);

export default router;