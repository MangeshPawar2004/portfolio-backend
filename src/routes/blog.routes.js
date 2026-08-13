import { Router } from "express";
import {
  getPosts,
  getPostBySlug,
  getAllPostsAdmin,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/blog.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getPosts);
router.get("/:slug", getPostBySlug);
router.use(verifyJWT);
router.get("/admin/all", getAllPostsAdmin);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
