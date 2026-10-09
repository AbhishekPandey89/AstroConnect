
const express = require("express");

const router = express.Router();

// ==========================================
// GET PANCHANG
// ==========================================

router.get("/", async (req, res) => {
  try {
    const { date, lat, lon } = req.query;

    const selectedDate = date || new Date().toISOString().split("T")[0];

    const latitude = lat || "28.6139";
    const longitude = lon || "77.2090";

    const apiKey = process.env.PANCHANG_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "PANCHANG_API_KEY is missing in server .env",
      });
    }

    const apiUrl =
      `https://shubh.live/api/v1/panchang` +
      `?lat=${encodeURIComponent(latitude)}` +
      `&lon=${encodeURIComponent(longitude)}` +
      `&date=${encodeURIComponent(selectedDate)}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-API-Key": apiKey,
        Accept: "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Shubh Panchang API error:", data);

      return res.status(response.status).json({
        success: false,
        message: "Panchang API request failed.",
        details: data,
      });
    }

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Panchang route error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch Panchang.",
      error: error.message,
    });
  }
});

module.exports = router;
