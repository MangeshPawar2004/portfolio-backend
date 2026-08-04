import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const BlogPostSchema = new Schema(
  {
    title:           { type: String, required: true, trim: true },
    slug:            { type: String, unique: true },
    excerpt:         { type: String },
    content:         { type: String, required: true },
    coverImage:      { type: String },
    tags:            [{ type: String }],
    category:        { type: String },
    metaTitle:       { type: String },
    metaDescription: { type: String },
    canonicalUrl:    { type: String },
    status:          { type: String, enum: ["draft", "published", "archived"], default: "draft" },
    publishedAt:     { type: Date },
    isFeatured:      { type: Boolean, default: false },
    views:           { type: Number, default: 0 },
    readTimeMinutes: { type: Number },
    relatedProjects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  },
  { timestamps: true }
);

BlogPostSchema.pre("save", async function () {
  if (!this.isModified("title")) return;
  let slug = slugify(this.title, { lower: true, strict: true });
  const exists = await mongoose.model("BlogPost").findOne({ slug, _id: { $ne: this._id } });
  if (exists) slug = `${slug}-${Date.now()}`;
  this.slug = slug;

  // Auto-calculate read time (~200 wpm)
  if (this.isModified("content")) {
    const wordCount = this.content.split(/\s+/).length;
    this.readTimeMinutes = Math.max(1, Math.round(wordCount / 200));
  }
});

// Auto-set publishedAt when status flips to published
BlogPostSchema.pre("save", function () {
  if (this.isModified("status") && this.status === "published" && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

BlogPostSchema.index({ slug: 1 });
BlogPostSchema.index({ status: 1, publishedAt: -1 });
BlogPostSchema.index({ tags: 1 });

export const BlogPost = mongoose.model("BlogPost", BlogPostSchema);