import { cloudinary } from "../config/cloudinary.js";

export const deleteFromCloudinary = async (publicId, resourceType = "image") => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (error) {
    console.error("Cloudinary delete error:", error.message);
  }
};

export const extractPublicId = (url) => {
  // Extract public_id from Cloudinary URL
  const parts = url.split("/");
  const filename = parts[parts.length - 1];
  const folder = parts[parts.length - 2];
  return `${folder}/${filename.split(".")[0]}`;
};