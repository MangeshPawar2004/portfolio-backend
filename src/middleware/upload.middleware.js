import multer from "multer";
import {
  projectMediaStorage,
  avatarStorage,
  resumeStorage,
} from "../config/cloudinary.js";

const fileSizeLimit = 10 * 1024 * 1024; // 10 MB

export const uploadProjectMedia = multer({
  storage: projectMediaStorage,
  limits: { fileSize: fileSizeLimit },
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "video/mp4"];
    allowed.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error("Unsupported file type"), false);
  },
}).array("media", 10);

export const uploadAvatar = multer({
  storage: avatarStorage,
  limits: { fileSize: 2 * 1024 * 1024 },
}).single("avatar");

export const uploadResume = multer({
  storage: resumeStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    file.mimetype === "application/pdf"
      ? cb(null, true)
      : cb(new Error("Only PDF files are allowed"), false);
  },
}).single("resume");