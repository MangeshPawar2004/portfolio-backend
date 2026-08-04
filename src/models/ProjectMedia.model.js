import mongoose, { Schema } from "mongoose";

const ProjectMediaSchema = new Schema(
  {
    project:      { type: Schema.Types.ObjectId, ref: "Project", required: true },
    type:         { type: String, enum: ["image", "video", "gif"], required: true },
    url:          { type: String, required: true },
    publicId:     { type: String },       // Cloudinary public_id for deletion
    thumbnailUrl: { type: String },
    caption:      { type: String },
    altText:      { type: String },
    displayOrder: { type: Number, default: 0 },
    isVisible:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

ProjectMediaSchema.index({ project: 1, displayOrder: 1 });

export const ProjectMedia = mongoose.model("ProjectMedia", ProjectMediaSchema);