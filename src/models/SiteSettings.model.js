import mongoose, { Schema } from "mongoose";

const SiteSettingsSchema = new Schema(
  {
    // Hero
    heroName:         { type: String, required: true, default: "Your Name" },
    heroTitle:        { type: String, default: "Full Stack Developer" },
    heroTagline:      { type: String },
    heroPhoto:        { type: String },
    heroCTAPrimary:   { type: String, default: "View Projects" },
    heroCTASecondary: { type: String, default: "Contact Me" },

    // About
    aboutSummary:      { type: String },
    aboutBackground:   { type: String },
    aboutSpecialities: [{ type: String }],

    // Resume
    resumeUrl:       { type: String },
    resumeUpdatedAt: { type: Date },

    // SEO
    metaTitle:       { type: String },
    metaDescription: { type: String },
    metaKeywords:    [{ type: String }],
    favicon:         { type: String },
    ogImage:         { type: String },

    // Theme
    primaryColor:    { type: String, default: "#3B82F6" },
    accentColor:     { type: String, default: "#10B981" },
    darkModeDefault: { type: Boolean, default: true },

    // Availability
    availableForWork: { type: Boolean, default: false },
    availabilityNote: { type: String },
  },
  { timestamps: true }
);

export const SiteSettings = mongoose.model("SiteSettings", SiteSettingsSchema);