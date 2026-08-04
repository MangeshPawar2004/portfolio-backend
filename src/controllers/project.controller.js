import { Project } from "../models/Project.model.js";
import { ProjectMedia } from "../models/ProjectMedia.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { paginate } from "../utils/paginate.js";
import { deleteFromCloudinary } from "../services/upload.service.js";

// GET /projects — public
export const getProjects = asyncHandler(async (req, res) => {
  const filter = { isVisible: true };
  if (req.query.status) filter.status = req.query.status;
  if (req.query.tag) filter.tags = req.query.tag;
  if (req.query.category) filter.category = req.query.category;

  const result = await paginate(Project, filter, req.query, "media");
  res.status(200).json(new ApiResponse(200, result, "Projects fetched"));
});

// GET /projects/featured — public
export const getFeaturedProjects = asyncHandler(async (_req, res) => {
  const projects = await Project.find({ isFeatured: true, isVisible: true })
    .sort({ displayOrder: 1 })
    .populate("media");
  res.status(200).json(new ApiResponse(200, projects, "Featured projects fetched"));
});

// GET /projects/:slug — public
export const getProjectBySlug = asyncHandler(async (req, res) => {
  const project = await Project.findOne({
    slug: req.params.slug,
    isVisible: true,
  }).populate("media");

  if (!project) throw new ApiError(404, "Project not found");

  // Increment view count
  project.views += 1;
  await project.save({ validateBeforeSave: false });

  res.status(200).json(new ApiResponse(200, project, "Project fetched"));
});

// GET /projects/admin/all — protected
export const getAllProjectsAdmin = asyncHandler(async (req, res) => {
  const result = await paginate(Project, {}, req.query, "media");
  res.status(200).json(new ApiResponse(200, result, "All projects fetched"));
});

// POST /projects — protected
export const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json(new ApiResponse(201, project, "Project created"));
});

// PUT /projects/:id — protected
export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!project) throw new ApiError(404, "Project not found");
  res.status(200).json(new ApiResponse(200, project, "Project updated"));
});

// DELETE /projects/:id — protected
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) throw new ApiError(404, "Project not found");

  // Delete all associated media from Cloudinary
  const mediaItems = await ProjectMedia.find({ project: req.params.id });
  await Promise.all(
    mediaItems
      .filter((m) => m.publicId)
      .map((m) => deleteFromCloudinary(m.publicId, m.type === "video" ? "video" : "image"))
  );
  await ProjectMedia.deleteMany({ project: req.params.id });

  res.status(200).json(new ApiResponse(200, null, "Project deleted"));
});

// POST /projects/:id/media — protected
export const uploadProjectMedia = asyncHandler(async (req, res) => {
  if (!req.files?.length) throw new ApiError(400, "No files uploaded");

  const mediaItems = req.files.map((file, index) => ({
    project: req.params.id,
    type: file.mimetype.startsWith("video") ? "video" : "image",
    url: file.path,
    publicId: file.filename,
    displayOrder: index,
  }));

  const created = await ProjectMedia.insertMany(mediaItems);

  // Push refs to project
  await Project.findByIdAndUpdate(req.params.id, {
    $push: { media: { $each: created.map((m) => m._id) } },
  });

  res.status(201).json(new ApiResponse(201, created, "Media uploaded"));
});

// DELETE /projects/:id/media/:mediaId — protected
export const deleteProjectMedia = asyncHandler(async (req, res) => {
  const media = await ProjectMedia.findByIdAndDelete(req.params.mediaId);
  if (!media) throw new ApiError(404, "Media not found");

  if (media.publicId) {
    await deleteFromCloudinary(media.publicId, media.type === "video" ? "video" : "image");
  }

  await Project.findByIdAndUpdate(req.params.id, {
    $pull: { media: media._id },
  });

  res.status(200).json(new ApiResponse(200, null, "Media deleted"));
});