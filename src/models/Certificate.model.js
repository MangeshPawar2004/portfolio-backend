import mongoose, { Schema } from "mongoose";

const CertificateSchema = new Schema(
  {
    title:         { type: String, required: true },
    issuer:        { type: String, required: true },
    issuerLogo:    { type: String },
    category:      {
      type: String,
      enum: ["certification", "award", "hackathon", "publication", "recognition", "other"],
      default: "certification",
    },
    issueDate:     { type: Date },
    expiryDate:    { type: Date },
    hasExpiry:     { type: Boolean, default: false },
    credentialId:  { type: String },
    credentialUrl: { type: String },
    imageUrl:      { type: String },
    description:   { type: String },
    skills:        [{ type: String }],
    isVisible:     { type: Boolean, default: true },
    displayOrder:  { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Certificate = mongoose.model("Certificate", CertificateSchema);