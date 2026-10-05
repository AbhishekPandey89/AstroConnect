const mongoose = require("mongoose");

const poojaSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: String,
      required: true,
      trim: true,
    },

    poojaName: {
      type: String,
      required: true,
      trim: true,
    },

    images: {
      type: [String],
      default: [],
    },

    acharya: {
      type: String,
      required: true,
      trim: true,
    },

    yajmanName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pooja", poojaSchema);