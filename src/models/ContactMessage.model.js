import mongoose, { Schema } from "mongoose";

const ContactMessageSchema = new Schema(
  {
    name:       { type: String, required: true, trim: true },
    email:      { type: String, required: true, lowercase: true, trim: true },
    subject:    { type: String, trim: true },
    message:    { type: String, required: true },
    phone:      { type: String },
    ipAddress:  { type: String },
    userAgent:  { type: String },
    status:     {
      type: String,
      enum: ["unread", "read", "replied", "archived"],
      default: "unread",
    },
    adminNotes: { type: String },
    repliedAt:  { type: Date },
    isSpam:     { type: Boolean, default: false },
  },
  { timestamps: true }
);

ContactMessageSchema.index({ status: 1, createdAt: -1 });

export const ContactMessage = mongoose.model("ContactMessage", ContactMessageSchema);