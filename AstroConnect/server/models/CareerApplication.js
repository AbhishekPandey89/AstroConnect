
const mongoose = require("mongoose");

const careerApplicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },

    position: {
      type: String,
      required: true,
      enum: [
        "Astrologer Partners",
        "Customer Support",
        "Technology & Development",
        "Other",
      ],
    },

    skills: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    experience: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "Not specified",
    },

    coverLetter: {
      type: String,
      trim: true,
      maxlength: 3000,
      default: "",
    },

    resume: {
      data: {
        type: Buffer,
        required: true,
      },
      contentType: {
        type: String,
        required: true,
        enum: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
      },
      originalName: {
        type: String,
        required: true,
        maxlength: 255,
      },
      size: {
        type: Number,
        required: true,
        max: 5 * 1024 * 1024,
      },
    },

    status: {
      type: String,
      enum: ["New", "Reviewing", "Shortlisted", "Rejected", "Hired"],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CareerApplication",
  careerApplicationSchema
);