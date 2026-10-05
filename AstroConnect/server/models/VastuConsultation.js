const mongoose = require("mongoose");

const vastuConsultationSchema = new mongoose.Schema(
  {
    propertyType: {
      type: String,
      required: true,
      enum: [
        "home",
        "office",
        "shop",
        "plot",
        "factory",
      ],
    },

    propertySize: {
      type: String,
      default: "",
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    facing: {
      type: String,
      default: "",
      enum: [
        "",
        "north",
        "south",
        "east",
        "west",
        "north-east",
        "north-west",
        "south-east",
        "south-west",
      ],
    },

    concern: {
      type: String,
      default: "",
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "contacted",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "VastuConsultation",
  vastuConsultationSchema
);