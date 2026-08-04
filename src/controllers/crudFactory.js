// src/controllers/crudFactory.js
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { paginate } from "../utils/paginate.js";

export const createCRUD = (Model) => ({

  // GET /resource — public (isVisible filter)
  getAll: asyncHandler(async (req, res) => {
    const filter = {};
    if (req.query.admin !== "true") filter.isVisible = true;
    const result = await paginate(Model, filter, req.query);
    res.status(200).json(new ApiResponse(200, result, "Fetched successfully"));
  }),

  // GET /resource/:id
  getOne: asyncHandler(async (req, res) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) throw new ApiError(404, "Not found");
    res.status(200).json(new ApiResponse(200, doc, "Fetched successfully"));
  }),

  // POST /resource — protected
  create: asyncHandler(async (req, res) => {
    const doc = await Model.create(req.body);
    res.status(201).json(new ApiResponse(201, doc, "Created successfully"));
  }),

  // PUT /resource/:id — protected
  update: asyncHandler(async (req, res) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) throw new ApiError(404, "Not found");
    res.status(200).json(new ApiResponse(200, doc, "Updated successfully"));
  }),

  // DELETE /resource/:id — protected
  remove: asyncHandler(async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) throw new ApiError(404, "Not found");
    res.status(200).json(new ApiResponse(200, null, "Deleted successfully"));
  }),

  // PATCH /resource/reorder — protected
  reorder: asyncHandler(async (req, res) => {
    const { items } = req.body; // [{ id, displayOrder }]
    if (!Array.isArray(items)) throw new ApiError(400, "items must be an array");

    await Promise.all(
      items.map(({ id, displayOrder }) =>
        Model.findByIdAndUpdate(id, { displayOrder })
      )
    );
    res.status(200).json(new ApiResponse(200, null, "Reordered successfully"));
  }),
});