const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const {
      activity,
      from,
      to,
      lat,
      lon,
    } = req.query;

    // -----------------------------
    // Validate API key
    // -----------------------------
    const apiKey = process.env.PANCHANG_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "PANCHANG_API_KEY is missing in server .env",
      });
    }

    // -----------------------------
    // Validate activity
    // -----------------------------
    const allowedActivities = [
      "vivah",
      "griha-pravesh",
      "vehicle",
      "shubh",
    ];

    if (!activity) {
      return res.status(400).json({
        success: false,
        message:
          "Activity is required. Use vivah, griha-pravesh, vehicle, or shubh.",
      });
    }

    if (!allowedActivities.includes(activity)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid activity. Allowed values: vivah, griha-pravesh, vehicle, shubh.",
      });
    }

    // -----------------------------
    // Default Delhi location
    // -----------------------------
    const latitude = lat || "28.6139";
    const longitude = lon || "77.2090";

    // -----------------------------
    // Build Shubh API URL
    // -----------------------------
    const params = new URLSearchParams();

    params.set("activity", activity);
    params.set("lat", latitude);
    params.set("lon", longitude);

    if (from) {
      params.set("from", from);
    }

    if (to) {
      params.set("to", to);
    }

    const apiUrl =
      `https://shubh.live/api/v1/muhurat?${params.toString()}`;

    console.log("Fetching Muhurat from Shubh API:", apiUrl);

    // -----------------------------
    // Call Shubh API
    // -----------------------------
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-API-Key": apiKey,
        Accept: "application/json",
      },
    });

    const data = await response.json();

    // -----------------------------
    // Handle Shubh API errors
    // -----------------------------
    if (!response.ok) {
      console.error("Shubh Muhurat API error:", data);

      return res.status(response.status).json({
        success: false,
        message: "Muhurat API request failed.",
        details: data,
      });
    }

    // -----------------------------
    // Success response
    // -----------------------------
    return res.json({
      success: true,
      activity,
      location: {
        lat: Number(latitude),
        lon: Number(longitude),
      },
      dateRange: {
        from: from || null,
        to: to || null,
      },
      data,
    });
  } catch (error) {
    console.error("Muhurat route error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch Muhurat.",
      error: error.message,
    });
  }
});

module.exports = router;