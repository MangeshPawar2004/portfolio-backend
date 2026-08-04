import mongoose, { Schema } from "mongoose";

const ExperienceSchema = new Schema(
  {
    company:          { type: String, required: true },
    companyUrl:       { type: String },
    companyLogo:      { type: String },
    role:             { type: String, required: true },
    employmentType:   {
      type: String,
      enum: ["full-time", "part-time", "internship", "freelance", "contract"],
    },
    location:         { type: String },
    locationType:     { type: String, enum: ["on-site", "remote", "hybrid"] },
    startDate:        { type: Date, required: true },
    endDate:          { type: Date },
    isCurrent:        { type: Boolean, default: false },
    description:      { type: String },
    responsibilities: [{ type: String }],
    achievements:     [{ type: String }],
    techStack:        [{ type: String }],
    isVisible:        { type: Boolean, default: true },
    displayOrder:     { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Experience = mongoose.model("Experience", ExperienceSchema);