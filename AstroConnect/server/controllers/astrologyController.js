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

const coordinatesCache = new Map();

const INDIA_CENTER_FALLBACK = { lat: 20.5937, lon: 78.9629 };

const CITY_FALLBACKS = [
  { match: ["new delhi", "delhi"], lat: 28.6139, lon: 77.209 },
  { match: ["mumbai", "bombay"], lat: 19.076, lon: 72.8777 },
  { match: ["bengaluru", "bangalore"], lat: 12.9716, lon: 77.5946 },
  { match: ["kolkata", "calcutta"], lat: 22.5726, lon: 88.3639 },
  { match: ["chennai", "madras"], lat: 13.0827, lon: 80.2707 },
  { match: ["hyderabad"], lat: 17.385, lon: 78.4867 },
  { match: ["pune"], lat: 18.5204, lon: 73.8567 },
  { match: ["ahmedabad"], lat: 23.0225, lon: 72.5714 },
  { match: ["jaipur"], lat: 26.9124, lon: 75.7873 },
  { match: ["lucknow"], lat: 26.8467, lon: 80.9462 },
  { match: ["kanpur"], lat: 26.4499, lon: 80.3319 },
  { match: ["varanasi", "banaras", "kashi"], lat: 25.3176, lon: 82.9739 },
  { match: ["prayagraj", "allahabad"], lat: 25.4358, lon: 81.8463 },
  { match: ["patna"], lat: 25.5941, lon: 85.1376 },
  { match: ["bhopal"], lat: 23.2599, lon: 77.4126 },
  { match: ["indore"], lat: 22.7196, lon: 75.8577 },
  { match: ["nagpur"], lat: 21.1458, lon: 79.0882 },
  { match: ["chandigarh"], lat: 30.7333, lon: 76.7794 },
  { match: ["surat"], lat: 21.1702, lon: 72.8311 },
  { match: ["kochi", "cochin"], lat: 9.9312, lon: 76.2673 },
];

const normalizePlaceKey = (place) =>
  String(place || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

const findCityFallback = (place) => {
  const normalized = normalizePlaceKey(place);
  if (!normalized) return null;

  for (const entry of CITY_FALLBACKS) {
    if (entry.match.some((token) => normalized.includes(token))) {
      return { lat: entry.lat, lon: entry.lon };
    }
  }
  return null;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchFromOpenMeteo = async (place) => {
  const cleanQuery = encodeURIComponent(
    String(place).split(",")[0].trim()
  );
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cleanQuery}&count=1&language=en&format=json`;

  const res = await fetch(url);
  if (!res.ok) return null;

  const json = await res.json();
  const first = json?.results?.[0];
  if (!first) return null;

  const lat = Number(first.latitude);
  const lon = Number(first.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;

  return { lat, lon };
};

const getCoordinates = async (place) => {
  const key = normalizePlaceKey(place);

  if (!key) {
    throw new Error("Birth place is required for geocoding");
  }

  // 1. In-memory cache
  if (coordinatesCache.has(key)) {
    return coordinatesCache.get(key);
  }

  // 2. Known city preset fallback
  const cityFallback = findCityFallback(place);

  const url =
    `https://nominatim.openstreetmap.org/search?` +
    `format=json&limit=1&countrycodes=in&q=${encodeURIComponent(
      String(place).trim()
    )}`;

  const headers = {
    "User-Agent": "AstroConnect/1.0 (contact@astroconnect.app)",
    "Accept-Language": "en",
  };

  try {
    let response = await fetch(url, { headers });

    if (response.status === 429) {
      await sleep(1200);
      response = await fetch(url, { headers });
    }

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        const coords = {
          lat: Number(data[0].lat),
          lon: Number(data[0].lon),
        };
        if (Number.isFinite(coords.lat) && Number.isFinite(coords.lon)) {
          coordinatesCache.set(key, coords);
          return coords;
        }
      }
    } else {
      console.warn(
        `⚠️ Nominatim returned status ${response.status} for "${place}"`
      );
    }

    // 3. Try secondary geocoding provider (Open-Meteo) before falling back
    const secondary = await fetchFromOpenMeteo(place).catch(() => null);
    if (secondary) {
      coordinatesCache.set(key, secondary);
      return secondary;
    }

    // 4. Use matching city coordinates or India center fallback so Kundali never fails on 429
    const resolvedFallback = cityFallback || INDIA_CENTER_FALLBACK;
    console.warn(
      `⚠️ Using ${cityFallback ? "city preset" : "India center"} fallback for "${place}"`
    );
    coordinatesCache.set(key, resolvedFallback);
    return resolvedFallback;
  } catch (error) {
    const secondary = await fetchFromOpenMeteo(place).catch(() => null);
    if (secondary) {
      coordinatesCache.set(key, secondary);
      return secondary;
    }

    const resolvedFallback = cityFallback || INDIA_CENTER_FALLBACK;
    console.warn(
      `⚠️ Geocoding fallback for "${place}" after error (${error.message})`
    );
    coordinatesCache.set(key, resolvedFallback);
    return resolvedFallback;
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
  }

  catch (error) {
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