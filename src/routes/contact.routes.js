import { Router } from "express";
import {
  submitContact, getMessages, getMessage, getUnreadCount,
  updateMessageStatus, deleteMessage
} from "../controllers/contact.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { contactRateLimiter } from "../middleware/rateLimiter.middleware.js";

const router = Router();

router.post("/", contactRateLimiter, submitContact);

router.use(verifyJWT);
router.get("/unread-count", getUnreadCount);
router.get("/",        getMessages);
router.get("/:id",     getMessage);
router.patch("/:id/status", updateMessageStatus);
router.delete("/:id",  deleteMessage);


export default router;