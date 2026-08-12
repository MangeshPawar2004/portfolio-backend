import { Router } from "express";
import { getDashboardStats } from "../controllers/admin.controller.js";
import { verifyJWT, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);
router.use(requireAdmin);

router.get("/dashboard", getDashboardStats);

export default router;
