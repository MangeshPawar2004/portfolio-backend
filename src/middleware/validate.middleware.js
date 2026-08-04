import { ApiError } from "../utils/ApiError.js";

// Joi schema validator factory
export const validate = (schema, target = "body") =>
  (req, _res, next) => {
    const { error } = schema.validate(req[target], { abortEarly: false });
    if (!error) return next();

    const messages = error.details.map((d) => d.message);
    throw new ApiError(422, "Validation failed", messages);
  };