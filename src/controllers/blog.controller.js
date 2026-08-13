import { BlogPost } from "../models/BlogPost.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { paginate } from "../utils/paginate.js";

// GET /blog — public (published only)
export const getPosts = asyncHandler(async (req, res) => {
  const filter = { status: "published" };
  if (req.query.tag) filter.tags = req.query.tag;
  if (req.query.category) filter.category = req.query.category;

  const result = await paginate(BlogPost, filter, req.query);
  res.status(200).json(new ApiResponse(200, result, "Posts fetched"));
});

// GET /blog/:slug — public
export const getPostBySlug = asyncHandler(async (req, res) => {
  const post = await BlogPost.findOne({ slug: req.params.slug, status: "published" })
    .populate("relatedProjects", "title slug thumbnailUrl shortDescription");

  if (!post) throw new ApiError(404, "Post not found");

  post.views += 1;
  await post.save({ validateBeforeSave: false });

  res.status(200).json(new ApiResponse(200, post, "Post fetched"));
});

// GET /blog/admin/all — protected
export const getAllPostsAdmin = asyncHandler(async (req, res) => {
  const result = await paginate(BlogPost, {}, req.query);
  res.status(200).json(new ApiResponse(200, result, "All posts fetched"));
});

// POST /blog — protected
export const createPost = asyncHandler(async (req, res) => {
  const post = await BlogPost.create(req.body);
  res.status(201).json(new ApiResponse(201, post, "Post created"));
});

// PUT /blog/:id — protected
export const updatePost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  if (!post) throw new ApiError(404, "Post not found");

  Object.assign(post, req.body);
  await post.save(); // triggers pre-save hooks (slug, readTime, publishedAt)

  res.status(200).json(new ApiResponse(200, post, "Post updated"));
});

// DELETE /blog/:id — protected
export const deletePost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findByIdAndDelete(req.params.id);
  if (!post) throw new ApiError(404, "Post not found");
  res.status(200).json(new ApiResponse(200, null, "Post deleted"));
});