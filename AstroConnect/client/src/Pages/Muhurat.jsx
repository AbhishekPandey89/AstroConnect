import { useEffect, useMemo, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import "./Muhurat.css";

const PANCHANG_API_URL = "http://localhost:5000/api/panchang";
const MUHURAT_API_URL = "http://localhost:5000/api/muhurat";

const DEFAULT_LAT = 28.6139;
const DEFAULT_LON = 77.2090;

const ACTIVITIES = [
  {
    key: "vivah",
    icon: "💍",
    title: "Vivah",
    subtitle: "Marriage",
  },
  {
    key: "griha-pravesh",
    icon: "🏠",
    title: "Griha Pravesh",
    subtitle: "New Home",
  },
  {
    key: "vehicle",
    icon: "🚗",
    title: "Vehicle",
    subtitle: "Vehicle Purchase",
  },
  {
    key: "shubh",
    icon: "🪔",
    title: "Shubh Work",
    subtitle: "General Auspicious Work",
  },
];

const SPECIAL_MUHURAT = [
  {
    key: "brahma",
    title: "Brahma Muhurta",
    icon: "✨",
    subtitle: "Auspicious window",
  },
  {
    key: "pratahSandhya",
    title: "Pratah Sandhya",
    icon: "🙏",
    subtitle: "Auspicious window",
  },
  {
    key: "vijaya",
    title: "Vijaya Muhurta",
    icon: "☀️",
    subtitle: "Auspicious window",
  },
  {
    key: "sayahnaSandhya",
    title: "Sayahna Sandhya",
    icon: "🌅",
    subtitle: "Auspicious window",
  },
  {
    key: "nishita",
    title: "Nishita",
    icon: "🌙",
    subtitle: "Auspicious window",
  },
];

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDisplayDate(dateString) {
  if (!dateString) return "";

  const [year, month, day] = dateString.split("-");

  if (!year || !month || !day) return dateString;

  return `${day} ${new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  ).toLocaleDateString("en-IN", {
    month: "short",
  })} ${year}`;
}

function formatLongDate(dateString) {
  if (!dateString) return "";

  const date = new Date(`${dateString}T12:00:00`);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatTime(value) {
  if (!value) return "--";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatRange(start, end) {
  if (!start || !end) return "--";

  return `${formatTime(start)} – ${formatTime(end)}`;
}

function getTextValue(value, language = "en") {
  if (value === null || value === undefined) {
    return "--";
  }

  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (typeof value === "object") {
    if (language === "sa") {
      return (
        value.sa ||
        value.sanskrit ||
        value.en ||
        value.name ||
        value.amanta ||
        "--"
      );
    }

    return (
      value.en ||
      value.name ||
      value.sa ||
      value.sanskrit ||
      value.amanta ||
      "--"
    );
  }

  return "--";
}

function getDateFromMuhurat(item) {
  if (!item || typeof item !== "object") {
    return null;
  }

  if (item.date) {
    return String(item.date).split("T")[0];
  }

  if (item.startDate) {
    return String(item.startDate).split("T")[0];
  }

  if (item.start) {
    return String(item.start).split("T")[0];
  }

  if (item.datetime) {
    return String(item.datetime).split("T")[0];
  }

  if (item.day) {
    return String(item.day).split("T")[0];
  }

  return null;
}

function getMuhuratTime(item) {
  if (!item || typeof item !== "object") {
    return "--";
  }

  if (item.start && item.end) {
    return formatRange(item.start, item.end);
  }

  if (item.startTime && item.endTime) {
    return `${item.startTime} – ${item.endTime}`;
  }

  if (item.from && item.to) {
    return `${formatTime(item.from)} – ${formatTime(item.to)}`;
  }

  if (item.time) {
    return item.time;
  }

  return "--";
}

function getActivityName(activity) {
  const found = ACTIVITIES.find((item) => item.key === activity);
  return found?.title || "Muhurat";
}

function Muhurat() {
  const today = getLocalDateString();

  const [selectedDate, setSelectedDate] = useState(today);
  const [language, setLanguage] = useState("en");

  const [panchang, setPanchang] = useState(null);
  const [panchangLoading, setPanchangLoading] = useState(false);
  const [panchangError, setPanchangError] = useState("");

  const [activity, setActivity] = useState("vivah");
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return getLocalDateString(date);
  });

  const [muhuratResults, setMuhuratResults] = useState([]);
  const [muhuratLoading, setMuhuratLoading] = useState(false);
  const [muhuratError, setMuhuratError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const [panchangVisible, setPanchangVisible] = useState(true);

  const loadPanchang = async (date = selectedDate) => {
    try {
      setPanchangLoading(true);
      setPanchangError("");

      const url =
        `${PANCHANG_API_URL}?date=${encodeURIComponent(date)}` +
        `&lat=${DEFAULT_LAT}` +
        `&lon=${DEFAULT_LON}`;

      const response = await fetch(url);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to fetch Panchang."
        );
      }

      setPanchang(result.data);
    } catch (error) {
      console.error("Panchang fetch error:", error);
      setPanchang(null);
      setPanchangError(
        error.message || "Unable to load Panchang."
      );
    } finally {
      setPanchangLoading(false);
    }
  };

  useEffect(() => {
    loadPanchang(selectedDate);
  }, [selectedDate]);

  const handlePreviousDay = () => {
    const date = new Date(`${selectedDate}T12:00:00`);
    date.setDate(date.getDate() - 1);

    setSelectedDate(getLocalDateString(date));
  };

  const handleNextDay = () => {
    const date = new Date(`${selectedDate}T12:00:00`);
    date.setDate(date.getDate() + 1);

    setSelectedDate(getLocalDateString(date));
  };

  const handleToday = () => {
    const currentDate = getLocalDateString();

    setSelectedDate(currentDate);
    setFromDate(currentDate);

    const date = new Date(`${currentDate}T12:00:00`);
    date.setDate(date.getDate() + 30);

    setToDate(getLocalDateString(date));
  };

  const handleFindMuhurat = async () => {
    if (!fromDate || !toDate) {
      setMuhuratError("Please select both From Date and To Date.");
      return;
    }

    if (fromDate > toDate) {
      setMuhuratError("From Date cannot be after To Date.");
      return;
    }

    try {
      setMuhuratLoading(true);
      setMuhuratError("");
      setHasSearched(true);
      setMuhuratResults([]);

      const url =
        `${MUHURAT_API_URL}?activity=${encodeURIComponent(activity)}` +
        `&from=${encodeURIComponent(fromDate)}` +
        `&to=${encodeURIComponent(toDate)}` +
        `&lat=${DEFAULT_LAT}` +
        `&lon=${DEFAULT_LON}`;

      const response = await fetch(url);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to fetch Muhurat."
        );
      }

      const results =
        Array.isArray(result?.data?.muhurats)
          ? result.data.muhurats
          : [];

      setMuhuratResults(results);
    } catch (error) {
      console.error("Muhurat fetch error:", error);

      setMuhuratResults([]);
      setMuhuratError(
        error.message || "Unable to fetch Muhurat."
      );
    } finally {
      setMuhuratLoading(false);
    }
  };

  const handleViewPanchang = (date) => {
    if (!date) return;

    setSelectedDate(date);
    setPanchangVisible(true);

    setTimeout(() => {
      document
        .getElementById("panchang-section")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  };

  const selectedActivityName = useMemo(
    () => getActivityName(activity),
    [activity]
  );

  const specialMuhurat = SPECIAL_MUHURAT.map((item) => {
    const value = panchang?.muhurat?.[item.key];

    return {
      ...item,
      value,
    };
  }).filter((item) => item.value?.start && item.value?.end);

  return (
    <>
      <Navbar />

      <main className="muhurat-page">

        {/* =========================
            MUHURAT FINDER
        ========================== */}
        <section className="muhurat-finder-section">
          <div className="muhurat-finder-container">

            <div className="muhurat-finder-heading">
              <h2>What are you planning?</h2>
            </div>

            {/* Activities */}
            <div className="muhurat-activities">
              {ACTIVITIES.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={`muhurat-activity ${
                    activity === item.key ? "active" : ""
                  }`}
                  onClick={() => {
                    setActivity(item.key);
                    setHasSearched(false);
                    setMuhuratResults([]);
                    setMuhuratError("");
                  }}
                >
                  <span className="muhurat-activity-icon">
                    {item.icon}
                  </span>

                  <strong>{item.title}</strong>

                  <small>{item.subtitle}</small>
                </button>
              ))}
            </div>

            {/* Dates */}
            <div className="muhurat-search-row">

              <div className="muhurat-date-field">
                <label htmlFor="muhurat-from">
                  From Date
                </label>

                <input
                  id="muhurat-from"
                  type="date"
                  value={fromDate}
                  onChange={(e) => {
                    setFromDate(e.target.value);
                    setHasSearched(false);
                  }}
                />
              </div>

              <div className="muhurat-date-field">
                <label htmlFor="muhurat-to">
                  To Date
                </label>

                <input
                  id="muhurat-to"
                  type="date"
                  value={toDate}
                  min={fromDate}
                  onChange={(e) => {
                    setToDate(e.target.value);
                    setHasSearched(false);
                  }}
                />
              </div>

              <button
                type="button"
                className="muhurat-find-button"
                onClick={handleFindMuhurat}
                disabled={muhuratLoading}
              >
                {muhuratLoading
                  ? "⏳ Searching..."
                  : "🔍 Find Muhurat"}
              </button>
            </div>

            {muhuratError && (
              <div className="muhurat-error">
                {muhuratError}
              </div>
            )}
          </div>
        </section>

        {/* =========================
            MUHURAT RESULTS
        ========================== */}
        {muhuratLoading && (
          <section className="muhurat-results-section">
            <div className="muhurat-loading">
              <div className="muhurat-loading-icon">
                🪔
              </div>

              <h2>Finding Auspicious Dates...</h2>

              <p>
                Checking the selected dates for{" "}
                {selectedActivityName}.
              </p>
            </div>
          </section>
        )}

        {!muhuratLoading &&
          hasSearched &&
          !muhuratError &&
          muhuratResults.length === 0 && (
            <section className="muhurat-results-section">
              <div className="muhurat-empty">
                <div className="muhurat-empty-icon">
                  📅
                </div>

                <h2>No Recommended Dates Found</h2>

                <p>
                  We couldn't find a recommended{" "}
                  {selectedActivityName.toLowerCase()} Muhurat
                  between{" "}
                  <strong>
                    {formatDisplayDate(fromDate)}
                  </strong>{" "}
                  and{" "}
                  <strong>
                    {formatDisplayDate(toDate)}
                  </strong>.
                </p>

                <span>
                  Try a different date range.
                </span>
              </div>
            </section>
          )}

        {!muhuratLoading &&
          hasSearched &&
          !muhuratError &&
          muhuratResults.length > 0 && (
            <section className="muhurat-results-section">
              <div className="muhurat-results-container">

                <div className="muhurat-results-heading">
                  <span className="section-label">
                    ✦ AUSPICIOUS DATES
                  </span>

                  <h2>
                    {selectedActivityName} Muhurat
                  </h2>

                  <p>
                    Recommended dates found between{" "}
                    {formatDisplayDate(fromDate)} and{" "}
                    {formatDisplayDate(toDate)}.
                  </p>
                </div>

                <div className="muhurat-results-grid">
                  {muhuratResults.map((item, index) => {
                    const resultDate =
                      getDateFromMuhurat(item);

                    return (
                      <article
                        className="muhurat-result-card"
                        key={`${resultDate || "result"}-${index}`}
                      >
                        <div className="muhurat-result-icon">
                          {ACTIVITIES.find(
                            (activityItem) =>
                              activityItem.key === activity
                          )?.icon || "🪔"}
                        </div>

                        <div className="muhurat-result-content">
                          <small>
                            Auspicious Date
                          </small>

                          <h3>
                            {resultDate
                              ? formatLongDate(resultDate)
                              : item.date ||
                                item.day ||
                                "Recommended Date"}
                          </h3>

                          <p>
                            {getMuhuratTime(item)}
                          </p>
                        </div>

                        {resultDate && (
                          <button
                            type="button"
                            onClick={() =>
                              handleViewPanchang(
                                resultDate
                              )
                            }
                          >
                            View Panchang →
                          </button>
                        )}
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

        {/* =========================
            PANCHANG
        ========================== */}
        <section
          className="panchang-section"
          id="panchang-section"
        >
          <div className="panchang-hero">
            <span>HINDU CALENDAR</span>

            <h1>Panchang</h1>

            <p>
              {formatLongDate(selectedDate)}
            </p>
          </div>

          {/* Date Controls */}
          <div className="panchang-date-controls">
            <button
              type="button"
              onClick={handlePreviousDay}
            >
              ← Previous
            </button>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) =>
                setSelectedDate(e.target.value)
              }
            />

            <button
              type="button"
              onClick={handleToday}
            >
              Today
            </button>

            <button
              type="button"
              onClick={handleNextDay}
            >
              Next →
            </button>

            <button
              type="button"
              onClick={() =>
                setLanguage(
                  language === "en" ? "sa" : "en"
                )
              }
            >
              {language === "en"
                ? "संस्कृत"
                : "English"}
            </button>
          </div>

          {panchangLoading && (
            <div className="panchang-loading">
              Loading Panchang...
            </div>
          )}

          {panchangError && (
            <div className="panchang-error">
              {panchangError}
            </div>
          )}

          {!panchangLoading && panchang && (
            <>
              <div className="panchang-container">

                {/* Panchang Cards */}
                <div className="panchang-grid">

                  {/* Tithi */}
                  <div className="panchang-card">
                    <div className="panchang-card-top">
                      <span className="panchang-icon">
                        🪔
                      </span>

                      <span>Tithi</span>
                    </div>

                    <strong>
                      {getTextValue(
                        panchang.tithi?.name,
                        language
                      )}
                    </strong>

                    <small>
                      {panchang.tithi?.endsAt
                        ? `Ends ${formatTime(
                            panchang.tithi.endsAt
                          )}`
                        : ""}
                    </small>
                  </div>

                  {/* Paksha */}
                  <div className="panchang-card">
                    <div className="panchang-card-top">
                      <span className="panchang-icon">
                        🌗
                      </span>

                      <span>Paksha</span>
                    </div>

                    <strong>
                      {panchang.tithi?.paksha ===
                      "Krishna"
                        ? "Krishna Paksha"
                        : panchang.tithi?.paksha ===
                          "Shukla"
                        ? "Shukla Paksha"
                        : getTextValue(
                            panchang.tithi?.paksha,
                            language
                          )}
                    </strong>
                  </div>

                  {/* Nakshatra */}
                  <div className="panchang-card">
                    <div className="panchang-card-top">
                      <span className="panchang-icon">
                        ⭐
                      </span>

                      <span>Nakshatra</span>
                    </div>

                    <strong>
                      {getTextValue(
                        panchang.nakshatra?.name,
                        language
                      )}
                    </strong>

                    <small>
                      {panchang.nakshatra?.pada
                        ? `Pada ${panchang.nakshatra.pada}`
                        : ""}

                      {panchang.nakshatra?.endsAt
                        ? ` • Ends ${formatTime(
                            panchang.nakshatra.endsAt
                          )}`
                        : ""}
                    </small>
                  </div>

                  {/* Yoga */}
                  <div className="panchang-card">
                    <div className="panchang-card-top">
                      <span className="panchang-icon">
                        🕉️
                      </span>

                      <span>Yoga</span>
                    </div>

                    <strong>
                      {getTextValue(
                        panchang.yoga?.name,
                        language
                      )}
                    </strong>

                    <small>
                      {panchang.yoga?.endsAt
                        ? `Ends ${formatTime(
                            panchang.yoga.endsAt
                          )}`
                        : ""}
                    </small>
                  </div>

                  {/* Moon Rashi */}
                  <div className="panchang-card">
                    <div className="panchang-card-top">
                      <span className="panchang-icon">
                        🌙
                      </span>

                      <span>Moon Rashi</span>
                    </div>

                    <strong>
                      {getTextValue(
                        panchang.moonRashi,
                        language
                      )}
                    </strong>
                  </div>

                  {/* Sun Rashi */}
                  <div className="panchang-card">
                    <div className="panchang-card-top">
                      <span className="panchang-icon">
                        ☀️
                      </span>

                      <span>Sun Rashi</span>
                    </div>

                    <strong>
                      {getTextValue(
                        panchang.sunRashi,
                        language
                      )}
                    </strong>
                  </div>

                  {/* Karana */}
                  <div className="panchang-card">
                    <div className="panchang-card-top">
                      <span className="panchang-icon">
                        🔱
                      </span>

                      <span>Karana</span>
                    </div>

                    <strong>
                      {getTextValue(
                        panchang.karana?.name,
                        language
                      )}
                    </strong>

                    <small>
                      {panchang.karana?.endsAt
                        ? `Ends ${formatTime(
                            panchang.karana.endsAt
                          )}`
                        : ""}
                    </small>
                  </div>

                  {/* Vara */}
                  <div className="panchang-card">
                    <div className="panchang-card-top">
                      <span className="panchang-icon">
                        🗓️
                      </span>

                      <span>Vara</span>
                    </div>

                    <strong>
                      {getTextValue(
                        panchang.vara,
                        language
                      )}
                    </strong>
                  </div>

                  {/* Lunar Month */}
                  <div className="panchang-card">
                    <div className="panchang-card-top">
                      <span className="panchang-icon">
                        🌕
                      </span>

                      <span>Lunar Month</span>
                    </div>

                    <strong>
                      {getTextValue(
                        panchang.lunarMonth?.amanta,
                        language
                      )}
                    </strong>
                  </div>
                </div>

                {/* Sunrise / Sunset */}
                <div className="sun-times-grid">

                  <div className="sun-time-card">
                    <span>🌅</span>
                    <small>Sunrise</small>
                    <strong>
                      {formatTime(panchang.sunrise)}
                    </strong>
                  </div>

                  <div className="sun-time-card">
                    <span>🌇</span>
                    <small>Sunset</small>
                    <strong>
                      {formatTime(panchang.sunset)}
                    </strong>
                  </div>

                  <div className="sun-time-card">
                    <span>🌙</span>
                    <small>Moonrise</small>
                    <strong>
                      {formatTime(panchang.moonrise)}
                    </strong>
                  </div>

                  <div className="sun-time-card">
                    <span>🌘</span>
                    <small>Moonset</small>
                    <strong>
                      {formatTime(panchang.moonset)}
                    </strong>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="panchang-extra-grid">

                  <div className="panchang-extra-card">
                    <small>Ayanamsa</small>
                    <strong>
                      {panchang.ayanamsa ?? "--"}
                    </strong>
                  </div>

                  <div className="panchang-extra-card">
                    <small>Day Duration</small>
                    <strong>
                      {panchang.dayDuration || "--"}
                    </strong>
                  </div>

                  <div className="panchang-extra-card">
                    <small>Ayana</small>
                    <strong>
                      {getTextValue(
                        panchang.ayana,
                        language
                      )}
                    </strong>
                  </div>
                </div>

                {/* Special Muhurat */}
                {specialMuhurat.length > 0 && (
                  <div className="special-muhurat-section">

                    <div className="special-muhurat-heading">
                      <span>
                        AUSPICIOUS TIME WINDOWS
                      </span>

                      <h2>Special Muhurat</h2>
                    </div>

                    <div className="special-muhurat-grid">
                      {specialMuhurat.map((item) => (
                        <div
                          className="special-muhurat-card"
                          key={item.key}
                        >
                          <div className="special-muhurat-icon">
                            {item.icon}
                          </div>

                          <div className="special-muhurat-info">
                            <h3>{item.title}</h3>
                            <p>{item.subtitle}</p>
                          </div>

                          <strong>
                            {formatRange(
                              item.value.start,
                              item.value.end
                            )}
                          </strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default Muhurat;