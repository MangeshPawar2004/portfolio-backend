import { Router } from "express";
import {
  getSettings,
  updateSettings,
  uploadResume,
} from "../controllers/siteSettings.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { uploadResume as uploadResumeMiddleware } from "../middleware/upload.middleware.js";

const router = Router();

router.get("/", getSettings);
router.use(verifyJWT);
router.put("/", updateSettings);
router.post("/resume", uploadResumeMiddleware, uploadResume);

export default router;
