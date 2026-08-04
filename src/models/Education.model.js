import mongoose, { Schema } from "mongoose";

const EducationSchema = new Schema(
  {
    institution:     { type: String, required: true },
    institutionUrl:  { type: String },
    institutionLogo: { type: String },
    degree:          { type: String, required: true },
    fieldOfStudy:    { type: String },
    startYear:       { type: Number, required: true },
    endYear:         { type: Number },
    isOngoing:       { type: Boolean, default: false },
    grade:           { type: String },
    gradeScale:      { type: String },
    description:     { type: String },
    relevantCourses: [{ type: String }],
    activities:      [{ type: String }],
    isVisible:       { type: Boolean, default: true },
    displayOrder:    { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Education = mongoose.model("Education", EducationSchema);