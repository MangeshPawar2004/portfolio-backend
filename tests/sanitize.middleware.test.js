import test from "node:test";
import assert from "node:assert/strict";
import { sanitizeInput } from "../src/middleware/sanitize.middleware.js";

test("sanitizeInput removes mongo operator keys without throwing for Express-style req.query getters", () => {
  const query = {
    search: "portfolio",
    "$where": "malicious",
    nested: { "a.b": 1, safe: "ok" },
  };

  const req = {};
  Object.defineProperty(req, "query", {
    configurable: true,
    enumerable: true,
    get() {
      return query;
    },
  });

  req.body = {
    username: "alice",
    "$where": "oops",
    nested: { safe: "ok", "x.y": 1 },
  };
  req.params = {
    id: "123",
    __proto__: { isAdmin: true },
  };

  let nextCalled = false;
  assert.doesNotThrow(() => sanitizeInput(req, {}, () => {
    nextCalled = true;
  }));

  assert.equal(nextCalled, true);
  assert.deepEqual(req.body, { username: "alice", nested: { safe: "ok" } });
  assert.deepEqual(req.params, { id: "123" });
  assert.deepEqual(req.query, { search: "portfolio", nested: { safe: "ok" } });
});
