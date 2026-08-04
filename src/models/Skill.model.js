import mongoose, { Schema } from "mongoose";

const SkillSchema = new Schema(
  {
    name:            { type: String, required: true, trim: true },
    category:        {
      type: String,
      enum: ["frontend", "backend", "database", "devops", "tools", "language", "other"],
      required: true,
    },
    iconUrl:         { type: String },
    proficiency:     { type: Number, min: 1, max: 100 },
    experienceYears: { type: Number },
    isVisible:       { type: Boolean, default: true },
    displayOrder:    { type: Number, default: 0 },
    isFeatured:      { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Skill = mongoose.model("Skill", SkillSchema);