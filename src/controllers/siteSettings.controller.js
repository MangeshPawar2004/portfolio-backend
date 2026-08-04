import { SiteSettings } from "../models/SiteSettings.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// GET /settings — public
export const getSettings = asyncHandler(async (_req, res) => {
  let settings = await SiteSettings.findOne();
  if (!settings) settings = await SiteSettings.create({});
  res.status(200).json(new ApiResponse(200, settings, "Settings fetched"));
});

// PUT /settings — protected
export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await SiteSettings.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
  });
  res.status(200).json(new ApiResponse(200, settings, "Settings updated"));
});

// POST /settings/resume — protected
export const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, "No file uploaded");
  const settings = await SiteSettings.findOneAndUpdate(
    {},
    { resumeUrl: req.file.path, resumeUpdatedAt: new Date() },
    { new: true, upsert: true }
  );
  res.status(200).json(new ApiResponse(200, settings, "Resume uploaded"));
});