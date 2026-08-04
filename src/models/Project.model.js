import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const TechItemSchema = new Schema(
  {
    name:     { type: String },
    category: { type: String, enum: ["frontend", "backend", "database", "devops", "tool", "other"] },
    iconUrl:  { type: String },
  },
  { _id: false }
);

const MetricSchema = new Schema(
  {
    label: { type: String },
    value: { type: String },
  },
  { _id: false }
);

const ProjectSchema = new Schema(
  {
    title:             { type: String, required: true, trim: true },
    slug:              { type: String, unique: true },
    shortDescription:  { type: String, required: true },
    problemStatement:  { type: String },
    solution:          { type: String },
    techStack:         [TechItemSchema],
    keyFeatures:       [{ type: String }],

    // Deep-dive
    architecture:          { type: String },
    implementationDetails: { type: String },
    challenges:            { type: String },
    outcomes:              { type: String },
    metrics:               [MetricSchema],

    // Links
    liveDemoUrl:  { type: String },
    githubUrl:    { type: String },
    caseStudyUrl: { type: String },

    // Media
    thumbnailUrl: { type: String },
    media:        [{ type: Schema.Types.ObjectId, ref: "ProjectMedia" }],

    // Meta
    myRole:       { type: String },
    teamSize:     { type: Number },
    duration:     { type: String },
    status:       { type: String, enum: ["completed", "ongoing", "planned"], default: "completed" },
    category:     { type: String },
    tags:         [{ type: String }],

    // Display
    isFeatured:   { type: Boolean, default: false },
    isVisible:    { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
    views:        { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Auto-generate slug from title
ProjectSchema.pre("save", async function () {
  if (!this.isModified("title")) return;
  let slug = slugify(this.title, { lower: true, strict: true });
  // Ensure uniqueness
  const exists = await mongoose.model("Project").findOne({ slug, _id: { $ne: this._id } });
  if (exists) slug = `${slug}-${Date.now()}`;
  this.slug = slug;
});

ProjectSchema.index({ slug: 1 });
ProjectSchema.index({ isFeatured: 1, isVisible: 1 });
ProjectSchema.index({ tags: 1 });

export const Project = mongoose.model("Project", ProjectSchema);