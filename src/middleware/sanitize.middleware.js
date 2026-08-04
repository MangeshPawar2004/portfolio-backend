const SENSITIVE_KEYS = new Set(["$gt", "$gte", "$lt", "$lte", "$ne", "$nin", "$or", "$and", "$not", "$where", "__proto__", "constructor", "prototype"]);

const stripMongoOperators = (value) => {
  if (Array.isArray(value)) {
    return value.map(stripMongoOperators).filter((item) => item !== undefined);
  }

  if (value && typeof value === "object") {
    const output = {};

    for (const [key, child] of Object.entries(value)) {
      if (SENSITIVE_KEYS.has(key)) {
        continue;
      }

      if (key === "__proto__") {
        continue;
      }

      output[key] = stripMongoOperators(child);
    }

    return output;
  }

  return value;
};

export const sanitizeInput = (req, _res, next) => {
  if (req.body && typeof req.body === "object") {
    req.body = stripMongoOperators(req.body);
  }

  if (req.query && typeof req.query === "object") {
    const queryValue = req.query;
    const sanitizedQuery = stripMongoOperators(queryValue);
    Object.defineProperty(req, "query", {
      configurable: true,
      enumerable: true,
      value: sanitizedQuery,
    });
  }

  if (req.params && typeof req.params === "object") {
    req.params = stripMongoOperators(req.params);
  }

  next();
};
