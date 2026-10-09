import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../Components/Navbar/Navbar";
import "./KundaliDetails.css";

const API_URL = "http://localhost:5000";

const planetIcons = {
  Sun: "☀️",
  Moon: "🌙",
  Mars: "♂️",
  Mercury: "☿️",
  Jupiter: "♃",
  Venus: "♀️",
  Saturn: "♄",
  Rahu: "☊",
  Ketu: "☋",
};

const planetColors = {
  Sun: "sun",
  Moon: "moon",
  Mars: "mars",
  Mercury: "mercury",
  Jupiter: "jupiter",
  Venus: "venus",
  Saturn: "saturn",
  Rahu: "rahu",
  Ketu: "ketu",
};

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

// =====================================================
// NAVAMSA / D9
// =====================================================

const NAVAMSA_START_OFFSET = {
  Aries: 0,
  Cancer: 0,
  Libra: 0,
  Capricorn: 0,

  Taurus: 8,
  Leo: 8,
  Scorpio: 8,
  Aquarius: 8,

  Gemini: 4,
  Virgo: 4,
  Sagittarius: 4,
  Pisces: 4,
};

const getNavamsaSign = (sign, degree) => {
  const normalizedDegree = Number(degree);

  if (
    !sign ||
    !Number.isFinite(normalizedDegree) ||
    !ZODIAC_SIGNS.includes(sign)
  ) {
    return "—";
  }

  const signIndex = ZODIAC_SIGNS.indexOf(sign);
  const degreeInSign = normalizedDegree % 30;

  const navamsaPart = Math.min(
    8,
    Math.floor(degreeInSign / (30 / 9))
  );

  const startOffset = NAVAMSA_START_OFFSET[sign];

  if (startOffset === undefined) {
    return "—";
  }

  return ZODIAC_SIGNS[
    (startOffset + navamsaPart) % 12
  ];
};

const getNavamsaHouse = (navamsaAscendant, planetNavamsaSign) => {
  const ascIndex = ZODIAC_SIGNS.indexOf(navamsaAscendant);
  const planetIndex = ZODIAC_SIGNS.indexOf(planetNavamsaSign);

  if (ascIndex === -1 || planetIndex === -1) {
    return null;
  }

  return (
    ((planetIndex - ascIndex + 12) % 12) + 1
  );
};

// =====================================================
// 12 BHAV ANALYSIS
// =====================================================

const HOUSE_NAMES = {
  1: "Lagna / Self",
  2: "Dhana / Family",
  3: "Sahaj / Courage",
  4: "Sukha / Home",
  5: "Putra / Intelligence",
  6: "Ripu / Health & Service",
  7: "Kalatra / Marriage",
  8: "Ayush / Transformation",
  9: "Dharma / Fortune",
  10: "Karma / Career",
  11: "Labha / Gains",
  12: "Vyaya / Foreign & Expenses",
};

const HOUSE_THEMES = {
  1: "Personality, body, confidence and overall life direction.",
  2: "Family, wealth, speech, savings and food habits.",
  3: "Courage, communication, skills, siblings and short journeys.",
  4: "Mother, home, property, emotional peace and comforts.",
  5: "Education, intelligence, creativity, romance and children.",
  6: "Competition, service, debts, health and daily work.",
  7: "Marriage, partnerships, business relationships and public dealings.",
  8: "Transformation, sudden events, inheritance and hidden matters.",
  9: "Luck, dharma, higher education, mentors and long journeys.",
  10: "Career, profession, reputation, authority and achievements.",
  11: "Income, gains, networking, fulfilment and elder siblings.",
  12: "Expenses, foreign connections, isolation, spirituality and sleep.",
};

const getHouseStrength = (
  houseNumber,
  planets,
  ascendantSign
) => {
  const planetsInHouse = getPlanetsForHouse(
    planets,
    houseNumber,
    ascendantSign
  );

  if (planetsInHouse.length === 0) {
    return "Unoccupied";
  }

  return `${planetsInHouse.length} planet${
    planetsInHouse.length > 1 ? "s" : ""
  } placed`;
};

const getHouseInterpretation = (
  houseNumber,
  planets,
  ascendantSign
) => {
  const planetsInHouse = getPlanetsForHouse(
    planets,
    houseNumber,
    ascendantSign
  );

  const houseName =
    HOUSE_NAMES[houseNumber] || "House";

  const theme =
    HOUSE_THEMES[houseNumber] || "";

  if (!planetsInHouse.length) {
    return {
      title: houseName,
      theme,
      interpretation:
        "This house has no planet placed directly in it. Its results should also be judged through its sign lord and planetary aspects.",
      planets: [],
    };
  }

  const planetNames = planetsInHouse
    .map((planet) => planet.name)
    .join(", ");

  return {
    title: houseName,
    theme,
    interpretation:
      `${planetNames} ${
        planetsInHouse.length > 1
          ? "are"
          : "is"
      } placed in this house. This makes the house an important area of life in the birth chart.`,
    planets: planetsInHouse,
  };
};

const calculateRashiHouse = (ascendantSign, planetSign) => {
  const ascendantIndex = ZODIAC_SIGNS.indexOf(ascendantSign);
  const planetIndex = ZODIAC_SIGNS.indexOf(planetSign);

  if (ascendantIndex === -1 || planetIndex === -1) {
    return null;
  }

  return ((planetIndex - ascendantIndex + 12) % 12) + 1;
};

const getPlanetHouse = (planet, ascendantSign) => {
  const apiHouse = Number(planet?.rashiHouse ?? planet?.house);

  // Prefer the backend-calculated whole-sign Rashi house.
  if (
    planet?.houseCalculation === "whole_sign_rashi" &&
    Number.isInteger(apiHouse) &&
    apiHouse >= 1 &&
    apiHouse <= 12
  ) {
    return apiHouse;
  }

  // Fallback: calculate from Ascendant + sign.
  return calculateRashiHouse(
    ascendantSign,
    planet?.sign
  );
};

const getHouseSign = (ascendantSign, houseNumber) => {
  const ascendantIndex = ZODIAC_SIGNS.indexOf(ascendantSign);

  if (ascendantIndex === -1) {
    return "—";
  }

  return ZODIAC_SIGNS[
    (ascendantIndex + houseNumber - 1) % 12
  ];
};

const getPlanetsForHouse = (planets, houseNumber, ascendantSign) => {
  return planets.filter(
    (planet) =>
      getPlanetHouse(planet, ascendantSign) === houseNumber
  );
};

// Common Vedic Manglik rule: Mars in houses 1, 2, 4, 7, 8 or 12
// from the Ascendant. Moon/Venus checks are shown separately because
// traditions differ on whether they should be used for Manglik Dosha.
const MANGAL_DOSHA_HOUSES = [1, 2, 4, 7, 8, 12];

const getMangalDoshaAnalysis = (planets, ascendantSign) => {
  const mars = planets.find((planet) => planet.name === "Mars");
  const moon = planets.find((planet) => planet.name === "Moon");
  const venus = planets.find((planet) => planet.name === "Venus");

  const marsHouse = mars
    ? getPlanetHouse(mars, ascendantSign)
    : null;

  const moonHouse = moon
    ? getPlanetHouse(moon, ascendantSign)
    : null;

  const venusHouse = venus
    ? getPlanetHouse(venus, ascendantSign)
    : null;

  const fromAscendant = MANGAL_DOSHA_HOUSES.includes(
    marsHouse
  );

  const fromMoon =
    moonHouse !== null &&
    marsHouse !== null &&
    MANGAL_DOSHA_HOUSES.includes(
      ((marsHouse - moonHouse + 12) % 12) + 1
    );

  const fromVenus =
    venusHouse !== null &&
    marsHouse !== null &&
    MANGAL_DOSHA_HOUSES.includes(
      ((marsHouse - venusHouse + 12) % 12) + 1
    );

  return {
    marsHouse,
    moonHouse,
    venusHouse,
    fromAscendant,
    fromMoon,
    fromVenus,
    primaryResult: fromAscendant
      ? "Manglik"
      : "Non-Manglik",
  };
};


// =====================================================
// KAAL SARP DOSHA
// =====================================================
// Common rule: all seven classical planets must lie on
// one side of the Rahu-Ketu axis. This is a rule-based
// indication, not a substitute for a full Jyotish reading.
const CLASSICAL_PLANETS = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];

const getKaalSarpAnalysis = (planets) => {
  const rahu = planets.find((planet) => planet.name === "Rahu");
  const ketu = planets.find((planet) => planet.name === "Ketu");

  if (!rahu || !ketu) {
    return { available: false, result: "Unable to calculate", reason: "Rahu or Ketu position is missing." };
  }

  const rahuDegree = Number(rahu.fullDegree);
  const ketuDegree = Number(ketu.fullDegree);
  if (!Number.isFinite(rahuDegree) || !Number.isFinite(ketuDegree)) {
    return { available: false, result: "Unable to calculate", reason: "Rahu/Ketu degree data is invalid." };
  }

  const positions = CLASSICAL_PLANETS.map((name) => {
    const planet = planets.find((item) => item.name === name);
    return { name, degree: Number(planet?.fullDegree) };
  });

  const missing = positions.filter((item) => !Number.isFinite(item.degree));
  if (missing.length) {
    return {
      available: false,
      result: "Unable to calculate",
      reason: `Missing position: ${missing.map((item) => item.name).join(", ")}.`,
    };
  }

  const normalize = (degree) => ((degree % 360) + 360) % 360;
  const distances = positions.map((planet) => ({
    ...planet,
    distanceFromRahu: normalize(planet.degree - rahuDegree),
  }));

  const onAxis = distances.filter(
    (planet) => planet.distanceFromRahu < 0.0001 || Math.abs(planet.distanceFromRahu - 180) < 0.0001
  );

  const allFirstHalf = distances.every(
    (planet) => planet.distanceFromRahu > 0.0001 && planet.distanceFromRahu < 179.9999
  );
  const allSecondHalf = distances.every(
    (planet) => planet.distanceFromRahu > 180.0001 && planet.distanceFromRahu < 359.9999
  );

  const doshaPresent = allFirstHalf || allSecondHalf;

  return {
    available: true,
    result: doshaPresent ? "Kaal Sarp Dosha indicated" : "Kaal Sarp Dosha not indicated",
    doshaPresent,
    rahuDegree,
    ketuDegree,
    side: allFirstHalf ? "Rahu → Ketu side" : allSecondHalf ? "Ketu → Rahu side" : "Mixed",
    onAxis: onAxis.map((planet) => planet.name),
  };
};

// =====================================================
// VIMSHOTTARI DASHA
// =====================================================
const DASHA_SEQUENCE = [
  { lord: "Ketu", years: 7 },
  { lord: "Venus", years: 20 },
  { lord: "Sun", years: 6 },
  { lord: "Moon", years: 10 },
  { lord: "Mars", years: 7 },
  { lord: "Rahu", years: 18 },
  { lord: "Jupiter", years: 16 },
  { lord: "Saturn", years: 19 },
  { lord: "Mercury", years: 17 },
];

const NAKSHATRA_SPAN = 360 / 27;
const NAKSHATRA_LORDS = [
  "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury",
  "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury",
  "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury",
];
const NAKSHATRA_NAMES = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha",
  "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
];

const getDashaStartDate = (kundali) => {
  if (!kundali?.dateOfBirth) return null;
  const dateOnly = String(kundali.dateOfBirth).slice(0, 10);
  const [hour = 0, minute = 0] = String(kundali.birthTime || "00:00").split(":").map(Number);
  const date = new Date(`${dateOnly}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00+05:30`);
  return Number.isNaN(date.getTime()) ? null : date;
};

const addYears = (date, years) => {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + Math.round(years * 365.2425));
  return result;
};

const formatTimelineDate = (date) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const getVimshottariDasha = (moon) => {
  const moonDegree = Number(moon?.fullDegree);
  if (!Number.isFinite(moonDegree)) return { available: false, message: "Moon degree is unavailable." };

  const normalizedMoon = ((moonDegree % 360) + 360) % 360;
  const nakshatraIndex = Math.min(26, Math.floor(normalizedMoon / NAKSHATRA_SPAN));
  const nakshatraLord = NAKSHATRA_LORDS[nakshatraIndex];
  const nakshatraName = NAKSHATRA_NAMES[nakshatraIndex];
  const positionInNakshatra = normalizedMoon - nakshatraIndex * NAKSHATRA_SPAN;
  const elapsedFraction = positionInNakshatra / NAKSHATRA_SPAN;
  const firstDasha = DASHA_SEQUENCE.find((item) => item.lord === nakshatraLord);
  if (!firstDasha) return { available: false, message: "Unable to determine starting Dasha." };

  return {
    available: true,
    nakshatraName,
    nakshatraLord,
    moonDegree: normalizedMoon,
    remainingYears: firstDasha.years * (1 - elapsedFraction),
  };
};

const buildDashaTimeline = (birthDate, dashaInfo) => {
  if (!birthDate || !dashaInfo?.available) return [];
  const startIndex = DASHA_SEQUENCE.findIndex((item) => item.lord === dashaInfo.nakshatraLord);
  if (startIndex === -1) return [];

  const timeline = [];
  let currentStart = new Date(birthDate);

  for (let cycle = 0; cycle < 2; cycle += 1) {
    for (let offset = 0; offset < DASHA_SEQUENCE.length; offset += 1) {
      const item = DASHA_SEQUENCE[(startIndex + offset) % DASHA_SEQUENCE.length];
      const durationYears = offset === 0 ? dashaInfo.remainingYears : item.years;
      const end = addYears(currentStart, durationYears);
      timeline.push({ lord: item.lord, durationYears, start: new Date(currentStart), end });
      currentStart = end;
    }
  }
  return timeline;
};

const buildAntardashaTimeline = (mahaDasha) => {
  if (!mahaDasha) return [];
  const mahaIndex = DASHA_SEQUENCE.findIndex((item) => item.lord === mahaDasha.lord);
  if (mahaIndex === -1) return [];

  const rows = [];
  let start = new Date(mahaDasha.start);
  for (let offset = 0; offset < DASHA_SEQUENCE.length; offset += 1) {
    const antar = DASHA_SEQUENCE[(mahaIndex + offset) % DASHA_SEQUENCE.length];
    const durationYears = mahaDasha.durationYears * (antar.years / 120);
    const end = addYears(start, durationYears);
    rows.push({ lord: antar.lord, start: new Date(start), end, durationYears });
    start = end;
  }
  return rows;
};

const formatDegree = (degree) => {
  if (degree === undefined || degree === null) {
    return "—";
  }

  return `${Number(degree).toFixed(2)}°`;
};

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const KundaliDetails = () => {
  const { id } = useParams();

  const [kundali, setKundali] = useState(null);
  const [astrology, setAstrology] = useState([]);
  const [location, setLocation] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchKundali = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem(
          "astroconnect_token"
        );

        if (!token) {
          setError(
            "Please login to view your Kundali."
          );
          return;
        }

        const response = await fetch(
          `${API_URL}/api/astrology/kundali/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Unable to load Kundali."
          );
        }

        setKundali(data.kundali || null);
        setAstrology(
          Array.isArray(data.astrology)
            ? data.astrology
            : []
        );
        setLocation(data.location || null);
      } catch (err) {
        console.error(
          "Kundali details error:",
          err
        );

        setError(
          err.message ||
            "Failed to load Kundali."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchKundali();
    }
  }, [id]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="kundali-details-loading">
          <div className="kundali-loader">
            ✦
          </div>

          <h2>
            Calculating Your Kundali
          </h2>

          <p>
            Fetching your Vedic planetary
            positions...
          </p>
        </div>
      </>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <>
        <Navbar />

        <div className="kundali-details-error">
          <div className="kundali-error-icon">
            !
          </div>

          <h2>
            Unable to Load Kundali
          </h2>

          <p>{error}</p>

          <button
            type="button"
            onClick={() =>
              (window.location.href =
                "/dashboard")
            }
          >
            ← Back to Dashboard
          </button>
        </div>
      </>
    );
  }

  // ==========================================
  // FIND PLANETS
  // ==========================================

  const ascendant = astrology.find(
    (item) => item.name === "Ascendant"
  );

  const sun = astrology.find(
    (item) => item.name === "Sun"
  );

  const moon = astrology.find(
    (item) => item.name === "Moon"
  );

  const planets = astrology.filter(
    (item) => item.name !== "Ascendant"
  );

  const ascendantSign = ascendant?.sign || "";

  const chartHouses = Array.from(
    { length: 12 },
    (_, index) => {
      const houseNumber = index + 1;

      return {
        number: houseNumber,
        sign: getHouseSign(
          ascendantSign,
          houseNumber
        ),
        planets: getPlanetsForHouse(
          planets,
          houseNumber,
          ascendantSign
        ),
      };
    }
  );

  // =====================================================
// NAVAMSA CALCULATION
// =====================================================

const navamsaAscendantSign = ascendant
  ? getNavamsaSign(
      ascendant.sign,
      ascendant.normDegree
    )
  : "—";

const navamsaPlanets = planets.map((planet) => {
  const navamsaSign = getNavamsaSign(
    planet.sign,
    planet.normDegree
  );

  return {
    ...planet,
    navamsaSign,
    navamsaHouse: getNavamsaHouse(
      navamsaAscendantSign,
      navamsaSign
    ),
  };
});

const navamsaHouses = Array.from(
  { length: 12 },
  (_, index) => {
    const houseNumber = index + 1;

    return {
      number: houseNumber,
      sign: getHouseSign(
        navamsaAscendantSign,
        houseNumber
      ),
      planets: navamsaPlanets.filter(
        (planet) =>
          planet.navamsaHouse === houseNumber
      ),
    };
  }
);

// =====================================================
// 12 BHAV ANALYSIS
// =====================================================

const bhavAnalysis = Array.from(
  { length: 12 },
  (_, index) =>
    getHouseInterpretation(
      index + 1,
      planets,
      ascendantSign
    )
);

  const mangalDosha = getMangalDoshaAnalysis(
    planets,
    ascendantSign
  );

  const kaalSarp = getKaalSarpAnalysis(planets);
  const moonPlanet = planets.find((planet) => planet.name === "Moon");
  const dashaInfo = getVimshottariDasha(moonPlanet);
  const birthDateForDasha = getDashaStartDate(kundali);
  const dashaTimeline = buildDashaTimeline(birthDateForDasha, dashaInfo);
  const currentDate = new Date();
  const currentMahadasha = dashaTimeline.find((item) => currentDate >= item.start && currentDate < item.end);
  const antardashaTimeline = buildAntardashaTimeline(currentMahadasha);

  // ==========================================
  // PLANET DATA
  // ==========================================

  return (
    <>
      <Navbar />

      <main className="kundali-details-page">

        {/* =====================================
            HERO
        ====================================== */}

        <section className="kundali-details-hero">
          <div className="kundali-hero-content">

            <div className="kundali-hero-badge">
              ✦ VEDIC ASTROLOGY
            </div>

            <h1>
              Your Janam Kundali
            </h1>

            <p>
              A personalized Vedic astrology
              profile based on your exact
              birth details.
            </p>

          </div>
        </section>

        <div className="kundali-details-container">

          {/* =====================================
              BIRTH PROFILE
          ====================================== */}

          <section className="kundali-birth-profile">

            <div className="section-heading">
              <span>
                BIRTH PROFILE
              </span>

              <h2>
                {kundali?.name}
              </h2>
            </div>

            <div className="birth-profile-grid">

              <div className="birth-profile-item">
                <span>
                  📅 Date of Birth
                </span>

                <strong>
                  {formatDate(
                    kundali?.dateOfBirth
                  )}
                </strong>
              </div>

              <div className="birth-profile-item">
                <span>
                  🕐 Birth Time
                </span>

                <strong>
                  {kundali?.birthTime}
                </strong>
              </div>

              <div className="birth-profile-item">
                <span>
                  📍 Birth Place
                </span>

                <strong>
                  {kundali?.birthPlace}
                </strong>
              </div>

              {location && (
                <div className="birth-profile-item">
                  <span>
                    🌐 Coordinates
                  </span>

                  <strong>
                    {location.latitude.toFixed(
                      4
                    )}
                    {" , "}
                    {location.longitude.toFixed(
                      4
                    )}
                  </strong>
                </div>
              )}

            </div>
          </section>

          {/* =====================================
              CORE ASTROLOGY
          ====================================== */}

          <section className="kundali-overview-section">

            <div className="section-heading">
              <span>
                ASTROLOGY OVERVIEW
              </span>

              <h2>
                Your Cosmic Profile
              </h2>
            </div>

            <div className="astrology-summary-grid">

              {/* LAGNA */}

              <div className="astrology-summary-card">
                <div className="summary-card-icon">
                  ✦
                </div>

                <div>
                  <span>
                    Ascendant / Lagna
                  </span>

                  <strong>
                    {ascendant?.sign ||
                      "—"}
                  </strong>

                  {ascendant && (
                    <small>
                      {formatDegree(
                        ascendant.normDegree
                      )}
                    </small>
                  )}
                </div>
              </div>

              {/* MOON */}

              <div className="astrology-summary-card">
                <div className="summary-card-icon">
                  🌙
                </div>

                <div>
                  <span>
                    Moon Sign
                  </span>

                  <strong>
                    {moon?.sign ||
                      "—"}
                  </strong>

                  {moon && (
                    <small>
                      {moon.nakshatra}
                    </small>
                  )}
                </div>
              </div>

              {/* NAKSHATRA */}

              <div className="astrology-summary-card">
                <div className="summary-card-icon">
                  ⭐
                </div>

                <div>
                  <span>
                    Birth Nakshatra
                  </span>

                  <strong>
                    {moon?.nakshatra ||
                      "—"}
                  </strong>

                  {moon && (
                    <small>
                      Pada{" "}
                      {moon.nakshatra_pad}
                    </small>
                  )}
                </div>
              </div>

              {/* SUN */}

              <div className="astrology-summary-card">
                <div className="summary-card-icon">
                  ☀️
                </div>

                <div>
                  <span>
                    Sun Sign
                  </span>

                  <strong>
                    {sun?.sign ||
                      "—"}
                  </strong>

                  {sun && (
                    <small>
                      {formatDegree(
                        sun.normDegree
                      )}
                    </small>
                  )}
                </div>
              </div>

            </div>
          </section>

          {/* =====================================
              BIRTH CHART
          ====================================== */}

          <section className="kundali-chart-section">

            <div className="section-heading">
              <span>
                BIRTH CHART
              </span>

              <h2>
                Janam Kundali
              </h2>

              <p>
                Vedic planetary positions at
                the time of birth.
              </p>
            </div>

            <div className="kundali-chart-wrapper">

              <div className="kundali-chart">

                <div className="chart-diamond">
                  <div className="chart-center">
                    <span>
                      LAGNA
                    </span>

                    <strong>
                      {ascendant?.sign || "—"}
                    </strong>

                    <small>
                      House 1
                    </small>
                  </div>

                  {chartHouses.map((house) => (
                    <div
                      key={house.number}
                      className={`chart-house chart-house-${house.number}`}
                    >
                      <div className="chart-house-number">
                        {house.number}
                      </div>

                      <div className="chart-house-sign">
                        {house.sign}
                      </div>

                      <div className="chart-house-planets">
                        {house.number === 1 && ascendant && (
                          <span className="chart-planet chart-ascendant">
                            {planetIcons.Ascendant || "L"} Lagna
                          </span>
                        )}

                        {house.planets.map((planet) => (
                          <span
                            key={`${planet.name}-${planet.id}`}
                            className={`chart-planet ${
                              planetColors[planet.name] || ""
                            }`}
                            title={`${planet.name} • ${planet.sign} • House ${house.number}`}
                          >
                            {planetIcons[planet.name] || "✦"}{" "}
                            {planet.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              <div className="chart-info">

                <div>
                  <span>
                    Ascendant
                  </span>

                  <strong>
                    {ascendant?.sign ||
                      "—"}
                  </strong>
                </div>

                <div>
                  <span>
                    Nakshatra
                  </span>

                  <strong>
                    {ascendant?.nakshatra ||
                      "—"}
                  </strong>
                </div>

                <div>
                  <span>
                    Pada
                  </span>

                  <strong>
                    {ascendant?.nakshatra_pad ||
                      "—"}
                  </strong>
                </div>

              </div>
            </div>
          </section>

          {/* =====================================
              NAVAGRAHA
          ====================================== */}

          <section className="kundali-planets-section">

            <div className="section-heading">
              <span>
                NAVAGRAHA
              </span>

              <h2>
                Planetary Positions
              </h2>

              <p>
                Exact sidereal positions of
                the nine Grahas at birth.
              </p>
            </div>

            <div className="planet-grid">

              {planets.map((planet) => (
                <div
                  className={`planet-card ${
                    planetColors[
                      planet.name
                    ] || ""
                  }`}
                  key={planet.id}
                >

                  <div className="planet-card-top">

                    <div className="planet-icon">
                      {
                        planetIcons[
                          planet.name
                        ] || "✦"
                      }
                    </div>

                    <div>
                      <h3>
                        {planet.name}
                      </h3>

                      <span>
                        {planet.sign}
                      </span>
                    </div>

                  </div>

                  <div className="planet-details">

                    <div>
                      <span>
                        House
                      </span>

                      <strong>
                        {getPlanetHouse(
                          planet,
                          ascendantSign
                        ) || "—"}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Degree
                      </span>

                      <strong>
                        {formatDegree(
                          planet.normDegree
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Nakshatra
                      </span>

                      <strong>
                        {planet.nakshatra}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Pada
                      </span>

                      <strong>
                        {planet.nakshatra_pad}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Status
                      </span>

                      <strong
                        className={
                          planet.isRetro ===
                          "true"
                            ? "retrograde"
                            : "direct"
                        }
                      >
                        {planet.isRetro ===
                        "true"
                          ? "Retrograde"
                          : "Direct"}
                      </strong>
                    </div>

                  </div>

                  {planet.planet_awastha && (
                    <div className="planet-awastha">
                      Awastha:{" "}
                      <strong>
                        {
                          planet.planet_awastha
                        }
                      </strong>
                    </div>
                  )}

                </div>
              ))}

            </div>
          </section>

          {/* =====================================
              DETAILED TABLE
          ====================================== */}

          <section className="kundali-table-section">

            <div className="section-heading">
              <span>
                PLANETARY DETAILS
              </span>

              <h2>
                Graha Position Table
              </h2>
            </div>

            <div className="planet-table-wrapper">

              <table className="planet-table">

                <thead>
                  <tr>
                    <th>
                      Planet
                    </th>

                    <th>
                      Sign
                    </th>

                    <th>
                      House
                    </th>

                    <th>
                      Degree
                    </th>

                    <th>
                      Nakshatra
                    </th>

                    <th>
                      Pada
                    </th>

                    <th>
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {planets.map(
                    (planet) => (
                      <tr
                        key={
                          planet.id
                        }
                      >

                        <td>
                          <div className="table-planet-name">
                            <span>
                              {
                                planetIcons[
                                  planet.name
                                ] || "✦"
                              }
                            </span>

                            <strong>
                              {
                                planet.name
                              }
                            </strong>
                          </div>
                        </td>

                        <td>
                          {planet.sign}
                        </td>

                        <td>
                          {getPlanetHouse(
                            planet,
                            ascendantSign
                          ) || "—"}
                        </td>

                        <td>
                          {formatDegree(
                            planet.normDegree
                          )}
                        </td>

                        <td>
                          {
                            planet.nakshatra
                          }
                        </td>

                        <td>
                          {
                            planet.nakshatra_pad
                          }
                        </td>

                        <td>
                          <span
                            className={
                              planet.isRetro ===
                              "true"
                                ? "table-status retrograde"
                                : "table-status direct"
                            }
                          >
                            {planet.isRetro ===
                            "true"
                              ? "Retrograde"
                              : "Direct"}
                          </span>
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          </section>

          {/* =====================================
              MANGAL DOSHA
          ====================================== */}

          <section className="kundali-analysis-section">

            <div className="section-heading">
              <span>
                DOSHA ANALYSIS
              </span>

              <h2>
                Manglik / Mangal Dosha
              </h2>
            </div>

            <div className="analysis-card">

              <div className="analysis-icon">
                🔱
              </div>

              <div className="analysis-content">

                <h3>
                  {mangalDosha.primaryResult}
                </h3>

                <p>
                  Mars is placed in house {mangalDosha.marsHouse ?? "—"}
                  from the Ascendant. Under the common Vedic
                  Lagna-based Manglik rule, Mars in houses
                  1, 2, 4, 7, 8 or 12 is considered Manglik.
                </p>

                <div className="analysis-status">
                  <strong>From Ascendant:</strong>{" "}
                  {mangalDosha.fromAscendant
                    ? "Manglik"
                    : "Not Manglik"}
                  <br />
                  <strong>From Moon:</strong>{" "}
                  {mangalDosha.fromMoon
                    ? "Dosha indicated"
                    : "Not indicated"}
                  <br />
                  <strong>From Venus:</strong>{" "}
                  {mangalDosha.fromVenus
                    ? "Dosha indicated"
                    : "Not indicated"}
                </div>

              </div>

            </div>
          </section>

          {/* =====================================
              KAAL SARP DOSHA
          ====================================== */}

          <section className="kundali-analysis-section">
            <div className="kundali-section-heading">
              <span>☊ DOSHA ANALYSIS</span>
              <h2>Kaal Sarp Dosha</h2>
            </div>

            <div className="kundali-analysis-card">
              <div className="kundali-analysis-result">
                <strong>{kaalSarp.result}</strong>
                {kaalSarp.available && (
                  <span>All 7 classical planets checked against the Rahu-Ketu axis.</span>
                )}
              </div>

              {kaalSarp.available ? (
                <div className="kundali-analysis-grid">
                  <div><span>Rahu</span><strong>{formatDegree(kaalSarp.rahuDegree)}</strong></div>
                  <div><span>Ketu</span><strong>{formatDegree(kaalSarp.ketuDegree)}</strong></div>
                  <div><span>Axis status</span><strong>{kaalSarp.side}</strong></div>
                  <div><span>Planets on axis</span><strong>{kaalSarp.onAxis.length ? kaalSarp.onAxis.join(", ") : "None"}</strong></div>
                </div>
              ) : (
                <p>{kaalSarp.reason}</p>
              )}
            </div>
          </section>

          {/* =====================================
              VIMSHOTTARI DASHA
          ====================================== */}

          <section className="kundali-analysis-section">
            <div className="kundali-section-heading">
              <span>🕉️ DASHĀ</span>
              <h2>Vimshottari Dasha</h2>
            </div>

            <div className="kundali-analysis-card">
              {dashaInfo.available ? (
                <>
                  <div className="kundali-analysis-result">
                    <strong>Starting Dasha: {dashaInfo.nakshatraLord}</strong>
                    <span>Moon Nakshatra: {dashaInfo.nakshatraName} • Moon: {formatDegree(dashaInfo.moonDegree)}</span>
                  </div>

                  <div className="kundali-analysis-grid">
                    <div><span>Nakshatra Lord</span><strong>{dashaInfo.nakshatraLord}</strong></div>
                    <div><span>Starting balance</span><strong>{dashaInfo.remainingYears.toFixed(2)} years</strong></div>
                    <div><span>Current Mahadasha</span><strong>{currentMahadasha?.lord || "Not in generated range"}</strong></div>
                    <div><span>Current period</span><strong>{currentMahadasha ? `${formatTimelineDate(currentMahadasha.start)} – ${formatTimelineDate(currentMahadasha.end)}` : "—"}</strong></div>
                  </div>

                  <div className="kundali-dasha-table-wrap">
                    <table className="kundali-dasha-table">
                      <thead><tr><th>Mahadasha</th><th>Start</th><th>End</th><th>Duration</th></tr></thead>
                      <tbody>
                        {dashaTimeline.slice(0, 9).map((item) => (
                          <tr key={`${item.lord}-${item.start.toISOString()}`}>
                            <td>{item.lord}</td><td>{formatTimelineDate(item.start)}</td><td>{formatTimelineDate(item.end)}</td><td>{item.durationYears.toFixed(2)} yrs</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {currentMahadasha && (
                    <>
                      <h3 className="kundali-dasha-subtitle">Current Antardasha Timeline</h3>
                      <div className="kundali-dasha-table-wrap">
                        <table className="kundali-dasha-table">
                          <thead><tr><th>Antardasha</th><th>Start</th><th>End</th><th>Duration</th></tr></thead>
                          <tbody>
                            {antardashaTimeline.map((item) => (
                              <tr key={`${currentMahadasha.lord}-${item.lord}-${item.start.toISOString()}`}>
                                <td>{currentMahadasha.lord} / {item.lord}</td><td>{formatTimelineDate(item.start)}</td><td>{formatTimelineDate(item.end)}</td><td>{item.durationYears.toFixed(2)} yrs</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <p>{dashaInfo.message}</p>
              )}
            </div>
          </section>

          {/* =====================================
    NAVAMSA / D9
====================================== */}

<section className="kundali-analysis-section">

  <div className="kundali-section-heading">
    <span>🔱 DIVISIONAL CHART</span>

    <h2>
      Navamsa Kundali — D9
    </h2>

    <p>
      Navamsa is commonly used in Vedic astrology
      for deeper assessment of marriage, dharma
      and planetary strength.
    </p>
  </div>

  <div className="kundali-analysis-card">

    <div className="kundali-analysis-result">

      <strong>
        D9 Ascendant: {navamsaAscendantSign}
      </strong>

      <span>
        Navamsa positions are calculated from each
        planet's sidereal sign and degree.
      </span>

    </div>

    <div className="kundali-analysis-grid">

      {navamsaPlanets.map((planet) => (

        <div
          className="kundali-analysis-result"
          key={`d9-${planet.name}`}
        >

          <strong>
            {planetIcons[planet.name] || "✦"}{" "}
            {planet.name}
          </strong>

          <small>
            D9 Sign:{" "}
            <b>
              {planet.navamsaSign}
            </b>
          </small>

          <small>
            D9 House:{" "}
            <b>
              {planet.navamsaHouse || "—"}
            </b>
          </small>

        </div>

      ))}

    </div>

    <div className="kundali-dasha-table-wrap">

      <table className="kundali-dasha-table">

        <thead>
          <tr>
            <th>Planet</th>
            <th>D1 Sign</th>
            <th>D1 House</th>
            <th>D9 Sign</th>
            <th>D9 House</th>
          </tr>
        </thead>

        <tbody>

          {navamsaPlanets.map((planet) => (

            <tr key={`d9-table-${planet.name}`}>

              <td>
                {planetIcons[planet.name] || "✦"}{" "}
                {planet.name}
              </td>

              <td>
                {planet.sign}
              </td>

              <td>
                {getPlanetHouse(
                  planet,
                  ascendantSign
                ) || "—"}
              </td>

              <td>
                {planet.navamsaSign}
              </td>

              <td>
                {planet.navamsaHouse || "—"}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>

</section>


{/* =====================================
    12 BHAV ANALYSIS
====================================== */}

<section className="kundali-analysis-section">

  <div className="kundali-section-heading">

    <span>
      🏠 HOUSE ANALYSIS
    </span>

    <h2>
      12 Bhav Analysis
    </h2>

    <p>
      Each house represents a different area
      of life in the Vedic birth chart.
    </p>

  </div>

  <div className="kundali-analysis-grid">

    {bhavAnalysis.map((bhav) => (

      <div
        className="kundali-analysis-card"
        key={`bhav-${bhav.title}`}
      >

        <div className="kundali-analysis-result">

          <strong>
            {bhav.title}
          </strong>

          <small>
            House {bhavAnalysis.indexOf(bhav) + 1}
          </small>

        </div>

        <p>
          {bhav.theme}
        </p>

        <div className="kundali-analysis-result">

          <strong>
            Planets
          </strong>

          <small>
            {bhav.planets.length
              ? bhav.planets
                  .map(
                    (planet) =>
                      `${planetIcons[planet.name] || "✦"} ${planet.name}`
                  )
                  .join(" • ")
              : "No planet directly placed"}
          </small>

        </div>

        <p>
          {bhav.interpretation}
        </p>

      </div>

    ))}

  </div>

</section>

          {/* =====================================
              AI ASTROLOGY
          ====================================== */}

          <section className="kundali-ai-section">

            <div className="ai-card">

              <div className="ai-card-icon">
                ✨
              </div>

              <div className="ai-card-content">

                <span>
                  ASTROCONNECT AI
                </span>

                <h2>
                  Personal Astrology Analysis
                </h2>

                <p>
                  AI-powered interpretation of
                  your planetary combinations,
                  personality, career, relationships
                  and life patterns is coming soon.
                </p>

              </div>

              <div className="ai-coming-soon">
                Coming Soon
              </div>

            </div>
          </section>

          {/* =====================================
              ACTIONS
          ====================================== */}

          <div className="kundali-bottom-actions">

            <button
              type="button"
              onClick={() =>
                (window.location.href =
                  "/kundali")
              }
            >
              + Create New Kundali
            </button>

            <button
              type="button"
              className="secondary"
              onClick={() =>
                (window.location.href =
                  "/dashboard")
              }
            >
              ← Dashboard
            </button>

          </div>

        </div>
      </main>
    </>
  );
};

export default KundaliDetails;