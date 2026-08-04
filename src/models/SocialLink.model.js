import mongoose, { Schema } from "mongoose";

const SocialLinkSchema = new Schema(
  {
    platform: {
      type: String,
      enum: [
        "github", "linkedin", "twitter", "instagram", "youtube",
        "hashnode", "devto", "medium", "leetcode", "codepen",
        "email", "phone", "other",
      ],
      required: true,
    },
    label:          { type: String },
    url:            { type: String, required: true },
    iconUrl:        { type: String },
    isVisible:      { type: Boolean, default: true },
    showInFooter:   { type: Boolean, default: true },
    showInContact:  { type: Boolean, default: true },
    displayOrder:   { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const SocialLink = mongoose.model("SocialLink", SocialLinkSchema);