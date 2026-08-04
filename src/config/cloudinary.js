import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { env } from "./env.js";

cloudinary.config({
  cloud_name: env.cloudinary.cloudName,
  api_key: env.cloudinary.apiKey,
  api_secret: env.cloudinary.apiSecret,
});

export const projectMediaStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio/projects",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "gif", "mp4"],
    resource_type: "auto",
  },
});

export const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio/avatars",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 400, height: 400, crop: "fill" }],
  },
});

export const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio/resume",
    allowed_formats: ["pdf"],
    resource_type: "raw",
  },
});

export { cloudinary };