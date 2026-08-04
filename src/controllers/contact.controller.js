import { ContactMessage } from "../models/ContactMessage.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { paginate } from "../utils/paginate.js";
import { sendContactNotification, sendContactAutoReply } from "../services/email.service.js";

// POST /contact — public
export const submitContact = asyncHandler(async (req, res) => {
  const { name, email, subject, message, phone } = req.body;

  const msg = await ContactMessage.create({
    name, email, subject, message, phone,
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
  });

  // Fire emails (non-blocking)
  sendContactNotification({ name, email, subject, message }).catch(console.error);
  sendContactAutoReply({ name, email }).catch(console.error);

  res.status(201).json(new ApiResponse(201, msg, "Message sent successfully"));
});

// GET /contact — protected
export const getMessages = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.spam) filter.isSpam = req.query.spam === "true";

  const result = await paginate(ContactMessage, filter, req.query);
  res.status(200).json(new ApiResponse(200, result, "Messages fetched"));
});

// GET /contact/:id — protected
export const getMessage = asyncHandler(async (req, res) => {
  const msg = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { $set: { status: "read" } },
    { new: true }
  );
  if (!msg) throw new ApiError(404, "Message not found");
  res.status(200).json(new ApiResponse(200, msg, "Message fetched"));
});

// PATCH /contact/:id/status — protected
export const updateMessageStatus = asyncHandler(async (req, res) => {
  const { status, adminNotes } = req.body;
  const update = { status };
  if (adminNotes) update.adminNotes = adminNotes;
  if (status === "replied") update.repliedAt = new Date();

  const msg = await ContactMessage.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!msg) throw new ApiError(404, "Message not found");
  res.status(200).json(new ApiResponse(200, msg, "Status updated"));
});

// DELETE /contact/:id — protected
export const deleteMessage = asyncHandler(async (req, res) => {
  const msg = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!msg) throw new ApiError(404, "Message not found");
  res.status(200).json(new ApiResponse(200, null, "Message deleted"));
});