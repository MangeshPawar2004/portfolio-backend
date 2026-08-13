// src/routes/crudRoute.factory.js
import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createCRUD } from "../controllers/crudFactory.js";

export const createCRUDRouter = (Model) => {
  const router = Router();
  const ctrl = createCRUD(Model);

  router.get("/",          ctrl.getAll);
  router.get("/:id",       ctrl.getOne);
  router.use(verifyJWT);
  router.post("/",         ctrl.create);
  router.put("/:id",       ctrl.update);
  router.delete("/:id",    ctrl.remove);
  router.patch("/reorder", ctrl.reorder);

  return router;
};