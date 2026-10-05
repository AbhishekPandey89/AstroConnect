const mongoose = require("mongoose");

const acharyaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    specialty: {
      type: String,
      required: true,
      trim: true,
    },

    fee: {
      type: Number,
      required: true,
      min: 0,
    },

    experience: {
      type: Number,
      default: 0,
      min: 0,
    },

    languages: {
      type: [String],
      default: ["Hindi", "English"],
    },

    bio: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Acharya", acharyaSchema);