import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";

const API_URL = "http://localhost:5000/api/kundali";

function Kundali() {
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    timeOfBirth: "",
    birthPlace: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState("");
  const [savedKundalis, setSavedKundalis] = useState([]);
  const [loadingKundalis, setLoadingKundalis] = useState(false);

  // ==========================================
  // GET TOKEN
  // ==========================================
  const getToken = () => {
    return localStorage.getItem("astroconnect_token");
  };

  // ==========================================
  // FETCH MY KUNDALIS
  // ==========================================
  const fetchMyKundalis = async () => {
    const token = getToken();

    if (!token) {
      return;
    }

    try {
      setLoadingKundalis(true);

      const response = await fetch(`${API_URL}/my`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to fetch Kundalis."
        );
      }

      setSavedKundalis(data.data || []);
    } catch (error) {
      console.error("Fetch Kundalis Error:", error);
    } finally {
      setLoadingKundalis(false);
    }
  };

  useEffect(() => {
    fetchMyKundalis();
  }, []);

  // ==========================================
  // INPUT CHANGE
  // ==========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setApiError("");
    setSubmitted(false);
  };

  // ==========================================
  // VALIDATION
  // ==========================================
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth =
        "Please select your date of birth.";
    }

    if (!formData.timeOfBirth) {
      newErrors.timeOfBirth =
        "Please select your birth time.";
    }

    if (!formData.birthPlace.trim()) {
      newErrors.birthPlace =
        "Please enter your birth place.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================================
  // SAVE KUNDALI TO MONGODB
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setApiError("");
    setSubmitted(false);

    if (!validateForm()) {
      return;
    }

    const token = getToken();

    if (!token) {
      setApiError(
        "Please login first before saving your Kundali."
      );
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          dateOfBirth: formData.dateOfBirth,
          birthTime: formData.timeOfBirth,
          birthPlace: formData.birthPlace.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to save Kundali."
        );
      }

      // Successfully saved
      setSubmitted(true);

      // Refresh saved Kundalis
      fetchMyKundalis();
    } catch (error) {
      console.error("Save Kundali Error:", error);

      setApiError(
        error.message ||
          "Something went wrong while saving Kundali."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================
  const formatDate = (date) => {
    if (!date) return "";

    const selectedDate = new Date(
      `${date}T00:00:00`
    );

    return selectedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // ==========================================
  // FORMAT SAVED DATE
  // ==========================================
  const formatSavedDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: "calc(100vh - 80px)",
          background:
            "linear-gradient(180deg, #fffaf3 0%, #fff7ec 45%, #ffffff 100%)",
          paddingBottom: "80px",
        }}
      >
        {/* HERO */}
        <section
          style={{
            padding: "75px 20px 45px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              maxWidth: "850px",
              margin: "0 auto",
            }}
          >
            <span
              style={{
                display: "inline-block",
                color: "#d98200",
                fontSize: "14px",
                fontWeight: "800",
                letterSpacing: "2px",
                marginBottom: "15px",
              }}
            >
              ✦ KUNDALI
            </span>

            <h1
              style={{
                margin: "0",
                fontSize: "clamp(36px, 6vw, 62px)",
                lineHeight: "1.1",
                color: "#24170d",
                fontWeight: "800",
              }}
            >
              Discover Your
              <span
                style={{
                  color: "#d98200",
                  display: "inline-block",
                  marginLeft: "12px",
                }}
              >
                Kundali
              </span>
            </h1>

            <p
              style={{
                maxWidth: "680px",
                margin: "22px auto 0",
                color: "#75695e",
                fontSize: "16px",
                lineHeight: "1.8",
              }}
            >
              Enter your birth details to prepare your
              Kundali profile and explore traditional Vedic
              astrology guidance.
            </p>
          </div>
        </section>

        {/* FORM + INFO */}
        <section
          style={{
            padding: "15px 20px 40px",
          }}
        >
          <div
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1.35fr 0.65fr",
              gap: "28px",
              alignItems: "start",
            }}
          >
            {/* FORM */}
            <div
              style={{
                background: "#ffffff",
                border:
                  "1px solid rgba(217, 130, 0, 0.15)",
                borderRadius: "22px",
                padding: "32px",
                boxShadow:
                  "0 15px 45px rgba(70, 40, 10, 0.08)",
              }}
            >
              <div style={{ marginBottom: "25px" }}>
                <span
                  style={{
                    color: "#d98200",
                    fontSize: "13px",
                    fontWeight: "800",
                    letterSpacing: "1.5px",
                  }}
                >
                  BIRTH DETAILS
                </span>

                <h2
                  style={{
                    margin: "8px 0 5px",
                    color: "#24170d",
                    fontSize: "28px",
                  }}
                >
                  Create Your Kundali
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "#81756b",
                    fontSize: "14px",
                  }}
                >
                  Enter accurate birth information for better
                  astrological guidance.
                </p>
              </div>

              {/* API ERROR */}
              {apiError && (
                <div
                  style={{
                    marginBottom: "20px",
                    padding: "13px 15px",
                    borderRadius: "10px",
                    background: "#fff0f0",
                    border: "1px solid #f0b5b5",
                    color: "#b52b2b",
                    fontSize: "13px",
                    lineHeight: "1.5",
                  }}
                >
                  ⚠️ {apiError}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* NAME */}
                <div style={{ marginBottom: "20px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "700",
                      color: "#352619",
                      fontSize: "14px",
                    }}
                  >
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    style={inputStyle(errors.name)}
                  />

                  {errors.name && (
                    <small style={errorStyle}>
                      {errors.name}
                    </small>
                  )}
                </div>

                {/* DATE + TIME */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    marginBottom: "20px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontWeight: "700",
                        color: "#352619",
                        fontSize: "14px",
                      }}
                    >
                      Date of Birth
                    </label>

                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      style={inputStyle(
                        errors.dateOfBirth
                      )}
                    />

                    {errors.dateOfBirth && (
                      <small style={errorStyle}>
                        {errors.dateOfBirth}
                      </small>
                    )}
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontWeight: "700",
                        color: "#352619",
                        fontSize: "14px",
                      }}
                    >
                      Birth Time
                    </label>

                    <input
                      type="time"
                      name="timeOfBirth"
                      value={formData.timeOfBirth}
                      onChange={handleChange}
                      style={inputStyle(
                        errors.timeOfBirth
                      )}
                    />

                    {errors.timeOfBirth && (
                      <small style={errorStyle}>
                        {errors.timeOfBirth}
                      </small>
                    )}
                  </div>
                </div>

                {/* PLACE */}
                <div style={{ marginBottom: "25px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "700",
                      color: "#352619",
                      fontSize: "14px",
                    }}
                  >
                    Birth Place
                  </label>

                  <input
                    type="text"
                    name="birthPlace"
                    value={formData.birthPlace}
                    onChange={handleChange}
                    placeholder="City, State, Country"
                    style={inputStyle(errors.birthPlace)}
                  />

                  {errors.birthPlace && (
                    <small style={errorStyle}>
                      {errors.birthPlace}
                    </small>
                  )}
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    width: "100%",
                    border: "none",
                    borderRadius: "12px",
                    padding: "15px 20px",
                    background: saving
                      ? "#b9874d"
                      : "linear-gradient(135deg, #d98200, #f2a21b)",
                    color: "#ffffff",
                    fontSize: "15px",
                    fontWeight: "800",
                    cursor: saving
                      ? "not-allowed"
                      : "pointer",
                    boxShadow:
                      "0 8px 20px rgba(217, 130, 0, 0.22)",
                  }}
                >
                  {saving
                    ? "⏳ Saving Kundali..."
                    : "✦ Prepare Kundali"}
                </button>
              </form>
            </div>

            {/* INFO CARD */}
            <div
              style={{
                background:
                  "linear-gradient(145deg, #2a1809 0%, #44250c 100%)",
                borderRadius: "22px",
                padding: "30px",
                color: "#ffffff",
                boxShadow:
                  "0 15px 40px rgba(50, 25, 5, 0.18)",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  marginBottom: "20px",
                }}
              >
                ✦
              </div>

              <h2
                style={{
                  margin: "0 0 12px",
                  fontSize: "25px",
                  color: "#ffb52e",
                }}
              >
                Why Birth Details Matter
              </h2>

              <p
                style={{
                  color: "#dfd2c5",
                  fontSize: "14px",
                  lineHeight: "1.75",
                  marginBottom: "25px",
                }}
              >
                In Vedic astrology, the exact date, time and
                place of birth are important for preparing an
                accurate birth chart.
              </p>

              <div
                style={{
                  display: "grid",
                  gap: "14px",
                }}
              >
                {[
                  [
                    "01",
                    "Birth Date",
                    "Determines planetary positions.",
                  ],
                  [
                    "02",
                    "Birth Time",
                    "Helps determine Lagna and houses.",
                  ],
                  [
                    "03",
                    "Birth Place",
                    "Helps calculate the local sky position.",
                  ],
                ].map(([number, title, text]) => (
                  <div
                    key={number}
                    style={{
                      display: "flex",
                      gap: "14px",
                      alignItems: "flex-start",
                      padding: "14px 0",
                      borderBottom:
                        "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <strong
                      style={{
                        color: "#ffb52e",
                        fontSize: "13px",
                      }}
                    >
                      {number}
                    </strong>

                    <div>
                      <h3
                        style={{
                          margin: "0 0 4px",
                          fontSize: "15px",
                        }}
                      >
                        {title}
                      </h3>

                      <p
                        style={{
                          margin: 0,
                          color: "#c9bbae",
                          fontSize: "12px",
                          lineHeight: "1.5",
                        }}
                      >
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SUCCESS RESULT */}
        {submitted && (
          <section
            style={{
              padding: "10px 20px 30px",
            }}
          >
            <div
              style={{
                maxWidth: "1100px",
                margin: "0 auto",
                background: "#fff",
                border:
                  "1px solid rgba(38, 150, 80, 0.2)",
                borderRadius: "20px",
                padding: "28px",
                boxShadow:
                  "0 10px 35px rgba(30, 80, 40, 0.07)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    minWidth: "42px",
                    borderRadius: "50%",
                    background: "#eaf8ee",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                  }}
                >
                  ✓
                </div>

                <div style={{ width: "100%" }}>
                  <h2
                    style={{
                      margin: "0 0 8px",
                      color: "#246b3b",
                      fontSize: "23px",
                    }}
                  >
                    Birth Details Saved
                  </h2>

                  <p
                    style={{
                      margin: "0 0 18px",
                      color: "#6c766e",
                      fontSize: "14px",
                      lineHeight: "1.6",
                    }}
                  >
                    Your birth information has been saved
                    successfully in your AstroConnect account.
                    The actual Vedic Kundali chart requires an
                    astrology calculation engine to calculate
                    planetary positions.
                  </p>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(4, minmax(0, 1fr))",
                      gap: "12px",
                    }}
                  >
                    <ResultItem
                      label="Name"
                      value={formData.name}
                    />

                    <ResultItem
                      label="Date"
                      value={formatDate(
                        formData.dateOfBirth
                      )}
                    />

                    <ResultItem
                      label="Time"
                      value={formData.timeOfBirth}
                    />

                    <ResultItem
                      label="Place"
                      value={formData.birthPlace}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SAVED KUNDALIS */}
        <section
          style={{
            padding: "10px 20px 30px",
          }}
        >
          <div
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <span
                style={{
                  color: "#d98200",
                  fontSize: "13px",
                  fontWeight: "800",
                  letterSpacing: "1.5px",
                }}
              >
                YOUR RECORDS
              </span>

              <h2
                style={{
                  margin: "7px 0 5px",
                  color: "#24170d",
                  fontSize: "28px",
                }}
              >
                Saved Kundalis
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#81756b",
                  fontSize: "14px",
                }}
              >
                Your saved birth details from MongoDB.
              </p>
            </div>

            {loadingKundalis ? (
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  padding: "25px",
                  textAlign: "center",
                  color: "#81756b",
                }}
              >
                Loading your Kundalis...
              </div>
            ) : savedKundalis.length === 0 ? (
              <div
                style={{
                  background: "#ffffff",
                  border:
                    "1px solid rgba(217, 130, 0, 0.12)",
                  borderRadius: "16px",
                  padding: "25px",
                  color: "#81756b",
                  fontSize: "14px",
                }}
              >
                No saved Kundali found yet.
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "16px",
                }}
              >
                {savedKundalis.map((kundali) => (
                  <div
                    key={kundali._id}
                    style={{
                      background: "#ffffff",
                      border:
                        "1px solid rgba(217, 130, 0, 0.14)",
                      borderRadius: "16px",
                      padding: "20px",
                      boxShadow:
                        "0 8px 25px rgba(70, 40, 10, 0.06)",
                    }}
                  >
                    <h3
                      style={{
                        margin: "0 0 15px",
                        color: "#352619",
                        fontSize: "18px",
                      }}
                    >
                      ✦ {kundali.name}
                    </h3>

                    <SavedItem
                      label="Date of Birth"
                      value={formatSavedDate(
                        kundali.dateOfBirth
                      )}
                    />

                    <SavedItem
                      label="Birth Time"
                      value={kundali.birthTime}
                    />

                    <SavedItem
                      label="Birth Place"
                      value={kundali.birthPlace}
                    />

                    <div
                      style={{
                        marginTop: "15px",
                        paddingTop: "12px",
                        borderTop:
                          "1px solid #eee4d9",
                        color: "#a09286",
                        fontSize: "11px",
                      }}
                    >
                      Saved on{" "}
                      {formatSavedDate(
                        kundali.createdAt
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

// ==========================================
// RESULT ITEM
// ==========================================
function ResultItem({ label, value }) {
  return (
    <div
      style={{
        background: "#fff9f0",
        borderRadius: "10px",
        padding: "13px",
      }}
    >
      <small
        style={{
          display: "block",
          color: "#9a8b7d",
          fontSize: "11px",
          marginBottom: "5px",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {label}
      </small>

      <strong
        style={{
          color: "#352619",
          fontSize: "13px",
          wordBreak: "break-word",
        }}
      >
        {value}
      </strong>
    </div>
  );
}

// ==========================================
// SAVED ITEM
// ==========================================
function SavedItem({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "15px",
        padding: "8px 0",
        borderBottom: "1px solid #f2ebe3",
      }}
    >
      <span
        style={{
          color: "#96877a",
          fontSize: "12px",
        }}
      >
        {label}
      </span>

      <strong
        style={{
          color: "#352619",
          fontSize: "12px",
          textAlign: "right",
        }}
      >
        {value}
      </strong>
    </div>
  );
}

// ==========================================
// INPUT STYLE
// ==========================================
function inputStyle(hasError) {
  return {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 14px",
    borderRadius: "10px",
    border: hasError
      ? "1px solid #d9534f"
      : "1px solid #e5ddd4",
    background: "#fffdf9",
    color: "#2d2118",
    fontSize: "14px",
    outline: "none",
  };
}

const errorStyle = {
  display: "block",
  marginTop: "6px",
  color: "#d9534f",
  fontSize: "12px",
};

export default Kundali;