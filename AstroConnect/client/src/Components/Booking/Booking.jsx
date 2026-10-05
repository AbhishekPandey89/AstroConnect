import { useState } from "react";
import "./Booking.css";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { createBooking } from "../../services/api";

const services = [
  {
    key: "kundali",
    fallback: "Kundali Consultation",
  },
  {
    key: "jyotish",
    fallback: "Jyotish Consultation",
  },
  {
    key: "vastu",
    fallback: "Vastu Consultation",
  },
  {
    key: "pooja",
    fallback: "Pooja Service",
  },
  {
    key: "muhurat",
    fallback: "Muhurat Consultation",
  },
  {
    key: "marriage",
    fallback: "Marriage Guidance",
  },
];

const acharyas = [
  {
    key: "acharyaShiv",
    fallbackName: "Acharya Shiv",
    fallbackSpecialty: "Vedic Astrology",
    fee: 499,
  },
  {
    key: "acharyaMeera",
    fallbackName: "Acharya Meera",
    fallbackSpecialty: "Vastu & Muhurat",
    fee: 699,
  },
  {
    key: "acharyaRaghav",
    fallbackName: "Acharya Raghav",
    fallbackSpecialty: "Kundali & Marriage",
    fee: 599,
  },
];

const timeSlots = [
  "09:00 AM",
  "10:30 AM",
  "12:00 PM",
  "02:00 PM",
  "04:30 PM",
  "07:00 PM",
];

function Booking() {
  const { t } = useLanguage();

  // IMPORTANT:
  // Token AuthContext se aa raha hai.
  // localStorage.getItem("token") use nahi karna.
  const { user, token } = useAuth();

  const [service, setService] = useState("");
  const [acharya, setAcharya] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mode, setMode] = useState("Online");

  const [loading, setLoading] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [bookingId, setBookingId] = useState("");

  // ==========================================
  // SELECTED ACHARYA
  // ==========================================

  const selectedAcharya = acharyas.find(
    (item) => item.key === acharya
  );

  // ==========================================
  // SERVICE NAME
  // ==========================================

  const getServiceName = (serviceItem) => {
    if (!serviceItem) return "";

    const serviceMap = {
      kundali: "kundali",
      jyotish: "jyotish",
      vastu: "vastu",
      pooja: "pooja",
      muhurat: "muhurat",
      marriage: "lagna",
    };

    const translationKey =
      serviceMap[serviceItem.key];

    if (translationKey) {
      const translated = t(
        `services.${translationKey}.title`,
        serviceItem.fallback
      );

      return translated || serviceItem.fallback;
    }

    return serviceItem.fallback;
  };

  // ==========================================
  // ACHARYA NAME
  // ==========================================

  const getAcharyaName = (acharyaItem) => {
    if (!acharyaItem) return "";

    const translated = t(
      `acharyas.${acharyaItem.key}.name`,
      acharyaItem.fallbackName
    );

    return translated || acharyaItem.fallbackName;
  };

  // ==========================================
  // ACHARYA SPECIALTY
  // ==========================================

  const getAcharyaSpecialty = (acharyaItem) => {
    if (!acharyaItem) return "";

    const translated = t(
      `acharyas.${acharyaItem.key}.specialty`,
      acharyaItem.fallbackSpecialty
    );

    return translated || acharyaItem.fallbackSpecialty;
  };

  // ==========================================
  // MODE LABEL
  // ==========================================

  const getModeLabel = (modeValue) => {
    if (modeValue === "Online") {
      return t(
        "booking.online",
        "Online"
      );
    }

    if (modeValue === "Audio Call") {
      return t(
        "booking.audioCall",
        "Audio Call"
      );
    }

    if (modeValue === "Video Call") {
      return t(
        "booking.videoCall",
        "Video Call"
      );
    }

    return modeValue;
  };

  // ==========================================
  // CLEAR MESSAGES
  // ==========================================

  const clearBookingMessages = () => {
    setBookingError("");
    setBookingMessage("");
    setBookingId("");
  };

  // ==========================================
  // CREATE BOOKING
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    clearBookingMessages();

    // ========================================
    // LOGIN CHECK
    // ========================================

    if (!user || !token) {
      setBookingError(
        "Please login first to confirm your booking."
      );

      return;
    }

    // ========================================
    // REQUIRED FIELDS
    // ========================================

    if (
      !service ||
      !acharya ||
      !date ||
      !time
    ) {
      setBookingError(
        t(
          "booking.completeDetails",
          "Please complete all booking details."
        )
      );

      return;
    }

    // ========================================
    // FIND SELECTED SERVICE
    // ========================================

    const selectedService = services.find(
      (item) => item.key === service
    );

    if (
      !selectedService ||
      !selectedAcharya
    ) {
      setBookingError(
        "Please select a valid service and Acharya."
      );

      return;
    }

    try {
      setLoading(true);

      // ======================================
      // PREPARE BOOKING DATA
      // ======================================

      const serviceName =
        getServiceName(selectedService);

      const acharyaName =
        getAcharyaName(selectedAcharya);

      const bookingData = {
        service: serviceName,
        serviceKey: service,
        acharya: acharyaName,
        acharyaKey: acharya,
        date,
        time,
        mode,
        fee: selectedAcharya.fee,
      };

      console.log(
        "📦 Booking data:",
        bookingData
      );

      console.log(
        "🔐 Token available:",
        !!token
      );

      // ======================================
      // API CALL
      // ======================================

      const response = await createBooking(
        token,
        bookingData
      );

      console.log(
        "📥 Booking API response:",
        response
      );

      // ======================================
      // SUCCESS
      // ======================================

      if (response.success) {
        setBookingMessage(
          response.message ||
            "Your booking has been confirmed successfully."
        );

        setBookingId(
          response.booking?._id ||
            response.booking?.id ||
            ""
        );
      } else {
        setBookingError(
          response.message ||
            "Booking failed."
        );
      }
    } catch (error) {
      console.error(
        "❌ Booking error:",
        error
      );

      setBookingError(
        error.message ||
          "Unable to create booking. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <section
      className="booking-section"
      id="booking"
    >
      <div className="booking-container">

        {/* =====================================
            HEADING
        ====================================== */}

        <div className="booking-heading">

          <span className="section-label">
            ✦{" "}
            {t(
              "booking.label",
              "BOOK A CONSULTATION"
            )}
          </span>

          <h2>
            {t(
              "booking.title",
              "Begin Your Journey"
            )}

            <span>
              {" "}
              {t(
                "booking.titleHighlight",
                "With Guidance"
              )}
            </span>
          </h2>

          <p>
            {t(
              "booking.description",
              "Choose your service, Acharya and preferred time. Your consultation can be booked in just a few steps."
            )}
          </p>

        </div>

        {/* =====================================
            BOOKING LAYOUT
        ====================================== */}

        <div className="booking-layout">

          {/* ===================================
              BOOKING FORM
          ==================================== */}

          <form
            className="booking-form"
            onSubmit={handleSubmit}
          >

            {/* =================================
                STEP 01
            ================================== */}

            <div className="form-section-title">

              <span>01</span>

              <div>
                <h3>
                  {t(
                    "booking.serviceTitle",
                    "Choose Your Service"
                  )}
                </h3>

                <p>
                  {t(
                    "booking.serviceDescription",
                    "Select the guidance you are looking for."
                  )}
                </p>
              </div>

            </div>

            <div className="service-options">

              {services.map((item) => (
                <button
                  type="button"
                  key={item.key}
                  className={
                    service === item.key
                      ? "service-option active"
                      : "service-option"
                  }
                  onClick={() => {
                    setService(item.key);
                    clearBookingMessages();
                  }}
                >
                  {getServiceName(item)}
                </button>
              ))}

            </div>

            {/* =================================
                STEP 02
            ================================== */}

            <div className="form-section-title">

              <span>02</span>

              <div>
                <h3>
                  {t(
                    "booking.acharyaTitle",
                    "Choose an Acharya"
                  )}
                </h3>

                <p>
                  {t(
                    "booking.acharyaDescription",
                    "Select an expert for your consultation."
                  )}
                </p>
              </div>

            </div>

            <div className="acharya-options">

              {acharyas.map((item) => (
                <button
                  type="button"
                  key={item.key}
                  className={
                    acharya === item.key
                      ? "acharya-option active"
                      : "acharya-option"
                  }
                  onClick={() => {
                    setAcharya(item.key);
                    clearBookingMessages();
                  }}
                >

                  <span className="acharya-avatar">
                    {item.fallbackName
                      .split(" ")
                      .map(
                        (word) => word[0]
                      )
                      .join("")}
                  </span>

                  <span className="acharya-details">

                    <strong>
                      {getAcharyaName(item)}
                    </strong>

                    <small>
                      {getAcharyaSpecialty(item)}
                    </small>

                  </span>

                  <span className="acharya-fee">
                    ₹{item.fee}
                  </span>

                </button>
              ))}

            </div>

            {/* =================================
                STEP 03
            ================================== */}

            <div className="form-section-title">

              <span>03</span>

              <div>

                <h3>
                  {t(
                    "booking.dateTimeTitle",
                    "Select Date & Time"
                  )}
                </h3>

                <p>
                  {t(
                    "booking.dateTimeDescription",
                    "Choose a convenient consultation slot."
                  )}
                </p>

              </div>

            </div>

            <div className="date-time-row">

              {/* DATE */}

              <div className="booking-field">

                <label>
                  {t(
                    "booking.date",
                    "Date"
                  )}
                </label>

                <input
                  type="date"
                  value={date}
                  min={
                    new Date()
                      .toISOString()
                      .split("T")[0]
                  }
                  onChange={(e) => {
                    setDate(e.target.value);
                    clearBookingMessages();
                  }}
                />

              </div>

              {/* TIME */}

              <div className="booking-field">

                <label>
                  {t(
                    "booking.timeSlot",
                    "Time Slot"
                  )}
                </label>

                <select
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                    clearBookingMessages();
                  }}
                >

                  <option value="">
                    {t(
                      "booking.selectTime",
                      "Select time"
                    )}
                  </option>

                  {timeSlots.map((slot) => (
                    <option
                      key={slot}
                      value={slot}
                    >
                      {slot}
                    </option>
                  ))}

                </select>

              </div>

            </div>

            {/* =================================
                STEP 04
            ================================== */}

            <div className="form-section-title">

              <span>04</span>

              <div>

                <h3>
                  {t(
                    "booking.modeTitle",
                    "Consultation Mode"
                  )}
                </h3>

                <p>
                  {t(
                    "booking.modeDescription",
                    "How would you like to connect?"
                  )}
                </p>

              </div>

            </div>

            <div className="mode-options">

              {[
                "Online",
                "Audio Call",
                "Video Call",
              ].map((item) => (

                <button
                  type="button"
                  key={item}
                  className={
                    mode === item
                      ? "mode-option active"
                      : "mode-option"
                  }
                  onClick={() => {
                    setMode(item);
                    clearBookingMessages();
                  }}
                >

                  {item === "Online" && "🌐"}

                  {item === "Audio Call" && "📞"}

                  {item === "Video Call" && "📹"}

                  <span>
                    {getModeLabel(item)}
                  </span>

                </button>

              ))}

            </div>

            {/* =================================
                ERROR MESSAGE
            ================================== */}

            {bookingError && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  background: "#fff3f3",
                  border:
                    "1px solid #f0caca",
                  color: "#c0392b",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                {bookingError}
              </div>
            )}

            {/* =================================
                SUCCESS MESSAGE
            ================================== */}

            {bookingMessage && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "14px",
                  borderRadius: "10px",
                  background: "#f1fbf4",
                  border:
                    "1px solid #c8e5d1",
                  color: "#198754",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >

                <div>
                  {bookingMessage}
                </div>

                {bookingId && (
                  <div
                    style={{
                      marginTop: "5px",
                      fontSize: "12px",
                    }}
                  >
                    Booking ID: {bookingId}
                  </div>
                )}

              </div>
            )}

            {/* =================================
                CONFIRM BOOKING
            ================================== */}

            <button
              className="booking-submit"
              type="submit"
              disabled={loading}
              style={{
                opacity: loading
                  ? 0.65
                  : 1,

                cursor: loading
                  ? "not-allowed"
                  : "pointer",
              }}
            >

              {loading
                ? "Confirming Booking..."
                : t(
                    "booking.proceed",
                    "Confirm Booking →"
                  )}

            </button>

            {/* =================================
                SECURITY
            ================================== */}

            <div className="booking-security">

              {t(
                "booking.security",
                "🔒 Your booking information is protected and secure."
              )}

            </div>

          </form>

          {/* ===================================
              BOOKING SUMMARY
          ==================================== */}

          <aside className="booking-summary">

            <div className="summary-header">

              <span>
                {t(
                  "booking.summary",
                  "BOOKING SUMMARY"
                )}
              </span>

              <span className="summary-lock">
                🔒
              </span>

            </div>

            <div className="summary-content">

              {/* SERVICE */}

              <div className="summary-service">

                <span>
                  {t(
                    "booking.service",
                    "Service"
                  )}
                </span>

                <strong>
                  {service
                    ? getServiceName(
                        services.find(
                          (item) =>
                            item.key === service
                        )
                      )
                    : t(
                        "booking.notSelected",
                        "Not selected"
                      )}
                </strong>

              </div>

              {/* ACHARYA */}

              <div className="summary-service">

                <span>
                  {t(
                    "booking.acharya",
                    "Acharya"
                  )}
                </span>

                <strong>
                  {selectedAcharya
                    ? getAcharyaName(
                        selectedAcharya
                      )
                    : t(
                        "booking.notSelected",
                        "Not selected"
                      )}
                </strong>

              </div>

              {/* DATE */}

              <div className="summary-service">

                <span>
                  {t(
                    "booking.date",
                    "Date"
                  )}
                </span>

                <strong>
                  {date ||
                    t(
                      "booking.notSelected",
                      "Not selected"
                    )}
                </strong>

              </div>

              {/* TIME */}

              <div className="summary-service">

                <span>
                  {t(
                    "booking.time",
                    "Time"
                  )}
                </span>

                <strong>
                  {time ||
                    t(
                      "booking.notSelected",
                      "Not selected"
                    )}
                </strong>

              </div>

              {/* MODE */}

              <div className="summary-service">

                <span>
                  {t(
                    "booking.mode",
                    "Mode"
                  )}
                </span>

                <strong>
                  {getModeLabel(mode)}
                </strong>

              </div>

              {/* DIVIDER */}

              <div className="summary-divider"></div>

              {/* TOTAL */}

              <div className="summary-total">

                <span>
                  {t(
                    "booking.total",
                    "Total"
                  )}
                </span>

                <strong>
                  {selectedAcharya
                    ? `₹${selectedAcharya.fee}`
                    : "₹0"}
                </strong>

              </div>

            </div>

            {/* =================================
                PAYMENT NOTICE
            ================================== */}

            <div className="summary-note">

              <span>✨</span>

              <p>
                {t(
                  "booking.paymentDisabled",
                  "Payment gateway is currently unavailable. You can still book your consultation. Payment will be enabled in a future update."
                )}
              </p>

            </div>

          </aside>

        </div>

      </div>
    </section>
  );
}

export default Booking;