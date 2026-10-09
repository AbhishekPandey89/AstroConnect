const Kundali = require("../models/Kundali");

const JYOTISH_API_URL =
  "https://api.jyotish.today/v2/planets";


// ============================================
// RASHI / WHOLE-SIGN HOUSE CALCULATOR
// ============================================

const ZODIAC_SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

const calculateRashiHouse = (ascendantSign, planetSign) => {
  const ascendantIndex =
    ZODIAC_SIGNS.indexOf(ascendantSign);

  const planetIndex =
    ZODIAC_SIGNS.indexOf(planetSign);

  if (ascendantIndex === -1 || planetIndex === -1) {
    return null;
  }

  return (
    (planetIndex - ascendantIndex + 12) % 12
  ) + 1;
};

// ==========================================
// GET COORDINATES FROM BIRTH PLACE
// ==========================================

const getCoordinates = async (place) => {
  try {
    const url =
      `https://nominatim.openstreetmap.org/search?` +
      `format=json&limit=1&countrycodes=in&q=${encodeURIComponent(
        place
      )}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "AstroConnect/1.0 (astrology application)",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Geocoding failed with status ${response.status}`
      );
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      throw new Error(
        `Birth place not found: ${place}`
      );
    }

    return {
      lat: Number(data[0].lat),
      lon: Number(data[0].lon),
    };
  } catch (error) {
    console.error(
      "❌ Geocoding error:",
      error.message
    );

    throw error;
  }
};

// ==========================================
// GET REAL KUNDALI ASTROLOGY
// ==========================================

const getKundaliAstrology = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("\n=================================");
    console.log("🔮 ASTROLOGY CALCULATION STARTED");
    console.log("Kundali ID:", id);
    console.log("User ID:", req.user?.userId);
    console.log("=================================");

    // ========================================
    // 1. FIND USER'S KUNDALI
    // ========================================

    const kundali = await Kundali.findOne({
      _id: id,
      user: req.user.userId,
    });

    if (!kundali) {
      console.log("❌ Kundali not found");

      return res.status(404).json({
        success: false,
        message: "Kundali not found.",
      });
    }

    console.log("✅ Kundali found:", kundali.name);
    console.log("Birth date:", kundali.dateOfBirth);
    console.log("Birth time:", kundali.birthTime);
    console.log("Birth place:", kundali.birthPlace);

    // ========================================
    // 2. CHECK API KEY
    // ========================================

    if (!process.env.JYOTISH_API_KEY) {
      console.error(
        "❌ JYOTISH_API_KEY is missing"
      );

      return res.status(500).json({
        success: false,
        message:
          "Astrology API key is not configured.",
      });
    }

    console.log(
      "✅ Jyotish API key loaded"
    );

    // ========================================
    // 3. GET BIRTH PLACE COORDINATES
    // ========================================

    console.log(
      "📍 Finding birth place coordinates..."
    );

    const coordinates = await getCoordinates(
      kundali.birthPlace
    );

    console.log(
      "✅ Coordinates:",
      coordinates
    );

    // ========================================
    // 4. CONVERT DATE & TIME
    // ========================================

    const birthDate = new Date(
      kundali.dateOfBirth
    );

    if (Number.isNaN(birthDate.getTime())) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid date of birth in Kundali.",
      });
    }

    const year = birthDate.getFullYear();
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();

    const timeParts =
      String(kundali.birthTime || "00:00")
        .split(":")
        .map(Number);

    const hour = Number.isFinite(timeParts[0])
      ? timeParts[0]
      : 0;

    const minute = Number.isFinite(timeParts[1])
      ? timeParts[1]
      : 0;

    console.log(
      "📅 Birth data:",
      {
        year,
        month,
        day,
        hour,
        minute,
      }
    );

    // ========================================
    // 5. PREPARE JYOTISH API REQUEST
    // ========================================

    const requestBody = {
      year,
      month,
      day,

      hour,
      min: minute,
      sec: 0,

      lat: coordinates.lat,
      lon: coordinates.lon,

      // India Standard Time
      tzone: 5.5,

      // Vedic / Sidereal
      ayanamsha: "lahiri",
    };

    console.log(
      "📤 Sending astrology request..."
    );

    console.log(
      "Astrology request data:",
      requestBody
    );

    // ========================================
    // 6. CALL JYOTISH TODAY API
    // ========================================

    const response = await fetch(
      JYOTISH_API_URL,
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${process.env.JYOTISH_API_KEY}`,

          "Content-Type":
            "application/json",

          Accept:
            "application/json",
        },

        body: JSON.stringify(
          requestBody
        ),
      }
    );

    // ========================================
    // 7. READ API RESPONSE
    // ========================================

    const responseText =
      await response.text();

    let data;

    try {
      data = responseText
        ? JSON.parse(responseText)
        : {};
    } catch (parseError) {
      data = {
        rawResponse: responseText,
      };
    }

    console.log(
      "📥 Jyotish API status:",
      response.status
    );

    console.log(
      "📥 Jyotish API response:",
      data
    );

    // ========================================
    // 8. HANDLE API ERROR
    // ========================================

    if (!response.ok) {
      console.error(
        "================================="
      );

      console.error(
        "❌ JYOTISH API REQUEST FAILED"
      );

      console.error(
        "Status:",
        response.status
      );

      console.error(
        "Response:",
        data
      );

      console.error(
        "================================="
      );

      return res.status(502).json({
        success: false,

        message:
          "Astrology API request failed.",

        apiStatus: response.status,

        apiError: data,
      });
    }

    // ========================================
    // 9. EXTRACT ASTROLOGY DATA
    // ========================================

    const astrologyData =
      data?.data || data;

      // ============================================
// CALCULATE REAL RASHI HOUSES
// ============================================

const ascendant = astrologyData.find(
  (planet) => planet.name === "Ascendant"
);

if (!ascendant) {
  throw new Error(
    "Ascendant data not available from astrology API."
  );
}

const ascendantSign = ascendant.sign;

const astrologyWithHouses =
  astrologyData.map((planet) => {
    const calculatedHouse =
      calculateRashiHouse(
        ascendantSign,
        planet.sign
      );

    return {
      ...planet,

      // API ke incorrect/suspicious house ko
      // directly use nahi kar rahe.
      house: calculatedHouse,

      // Clear naming for frontend
      rashiHouse: calculatedHouse,

      houseCalculation: "whole_sign_rashi",
    };
  });

console.log(
  "🏠 Calculated Rashi Houses:"
);

astrologyWithHouses.forEach((planet) => {
  console.log(
    `${planet.name}: ${planet.sign} → House ${planet.house}`
  );
});

    console.log(
      "✅ Astrology calculation successful"
    );

    // ========================================
    // 10. SEND RESPONSE
    // ========================================

    return res.status(200).json({
      success: true,

      message:
        "Kundali calculated successfully.",

      kundali: {
        id: kundali._id,
        name: kundali.name,
        dateOfBirth:
          kundali.dateOfBirth,
        birthTime:
          kundali.birthTime,
        birthPlace:
          kundali.birthPlace,
      },

      location: {
        latitude:
          coordinates.lat,

        longitude:
          coordinates.lon,
      },

     astrology:
  astrologyWithHouses,
    });
  } catch (error) {
    console.error(
      "\n================================="
    );

    console.error(
      "❌ ASTROLOGY CONTROLLER ERROR"
    );

    console.error(
      "Message:",
      error.message
    );

    console.error(
      "Stack:",
      error.stack
    );

    console.error(
      "=================================\n"
    );

    return res.status(500).json({
      success: false,

      message:
        error.message ||
        "Failed to calculate Kundali.",
    });
  }
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  getKundaliAstrology,
};