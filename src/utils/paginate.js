/**
 * Reusable pagination helper
 * Usage: const result = await paginate(Model, query, req.query, populate?)
 */
export const paginate = async (model, filter = {}, queryParams = {}, populate = "") => {
  const page = Math.max(1, parseInt(queryParams.page) || 1);
  const limit = Math.min(50, parseInt(queryParams.limit) || 10);
  const skip = (page - 1) * limit;

  const sortField = queryParams.sortBy || "createdAt";
  const sortOrder = queryParams.order === "asc" ? 1 : -1;

  const [data, total] = await Promise.all([
    model
      .find(filter)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit)
      .populate(populate),
    model.countDocuments(filter),
  ]);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    },
  };
};