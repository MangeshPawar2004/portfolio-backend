import { Router } from "express";
import authRoutes        from "./auth.routes.js";
import projectRoutes     from "./project.routes.js";
import settingsRoutes    from "./siteSettings.routes.js";
import contactRoutes     from "./contact.routes.js";
import blogRoutes        from "./blog.routes.js";
import { createCRUDRouter } from "./crudRoute.factory.js";

import { Skill }       from "../models/Skill.model.js";
import { Experience }  from "../models/Experience.model.js";
import { Education }   from "../models/Education.model.js";
import { Certificate } from "../models/Certificate.model.js";
import { Testimonial } from "../models/Testimonial.model.js";
import { SocialLink }  from "../models/SocialLink.model.js";

import uploadRoutes      from "./upload.routes.js";

const router = Router();

router.use("/auth",          authRoutes);
router.use("/projects",      projectRoutes);
router.use("/settings",      settingsRoutes);
router.use("/contact",       contactRoutes);
router.use("/blog",          blogRoutes);
router.use("/upload",        uploadRoutes);
router.use("/skills",        createCRUDRouter(Skill));

router.use("/experience",    createCRUDRouter(Experience));
router.use("/education",     createCRUDRouter(Education));
router.use("/certificates",  createCRUDRouter(Certificate));
router.use("/testimonials",  createCRUDRouter(Testimonial));
router.use("/social-links",  createCRUDRouter(SocialLink));

export default router;