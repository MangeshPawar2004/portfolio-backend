import { Router } from "express";
import {
  getProjects, getFeaturedProjects, getProjectBySlug,
  getAllProjectsAdmin, createProject, updateProject,
  deleteProject, uploadProjectMedia, deleteProjectMedia,
} from "../controllers/project.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { uploadProjectMedia as uploadMiddleware } from "../middleware/upload.middleware.js";

const router = Router();

// Public
router.get("/",          getProjects);
router.get("/featured",  getFeaturedProjects);
router.get("/:slug",     getProjectBySlug);

// Protected
router.use(verifyJWT);
router.get("/admin/all", getAllProjectsAdmin);
router.post("/",         createProject);
router.put("/:id",       updateProject);
router.delete("/:id",    deleteProject);

router.post("/:id/media",              uploadMiddleware, uploadProjectMedia);
router.delete("/:id/media/:mediaId",   deleteProjectMedia);

export default router;