import { Router } from "express";
import { uploadGeneric } from "../middleware/upload.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.use(verifyJWT);

router.post("/", uploadGeneric, asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No file uploaded");
  }
  res.status(200).json(new ApiResponse(200, { url: req.file.path }, "File uploaded successfully"));
}));

export default router;
