import mongoose, { Schema } from "mongoose";

const TestimonialSchema = new Schema(
  {
    name:        { type: String, required: true },
    role:        { type: String },
    company:     { type: String },
    avatarUrl:   { type: String },
    content:     { type: String, required: true },
    rating:      { type: Number, min: 1, max: 5 },
    linkedinUrl: { type: String },
    relation:    { type: String, enum: ["mentor", "manager", "colleague", "client", "peer"] },
    isApproved:  { type: Boolean, default: false },
    isFeatured:  { type: Boolean, default: false },
    isVisible:   { type: Boolean, default: true },
    displayOrder:{ type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Testimonial = mongoose.model("Testimonial", TestimonialSchema);