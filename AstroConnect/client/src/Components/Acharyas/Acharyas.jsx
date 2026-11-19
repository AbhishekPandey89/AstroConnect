import { transliterateName } from "../../utils/transliterateName";
import { useEffect, useState } from "react";
import "./Acharyas.css";

import { useLanguage } from "../../context/LanguageContext";
import { getAcharyas } from "../../services/api";
import { useNavigate } from "react-router-dom";

function Acharyas() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [acharyas, setAcharyas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD ACHARYAS
  // =====================================================

  useEffect(() => {
    const loadAcharyas = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAcharyas();

        if (response.success) {
          setAcharyas(response.acharyas || []);
        } else {
          setError(
            response.message ||
            t("acharyas", "loadError")
          );
        }
      } catch (err) {
        console.error("Acharya fetch error:", err);

        setError(
          err.message ||
          t("acharyas", "loadError")
        );
      } finally {
        setLoading(false);
      }
    };

    loadAcharyas();
  }, [t]);

  // =====================================================
  // BOOK NOW
  // =====================================================

 const handleBookNow = (acharya) => {
  navigate("/booking", {
    state: { acharya },
  });
};
  // =====================================================
  // VIEW ALL
  // =====================================================

  const handleViewAll = () => {
    navigate("/acharyas");
  };
  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <section
        className="acharyas-section"
        id="acharyas"
      >
        <div className="acharyas-container">

          <div className="section-heading acharya-heading">
            <span className="section-label">
              ✦ {t("acharyas", "label")}
            </span>

            <h2>
              {t("acharyas", "title")}
              <span>
                {" "}
                {t(
                  "acharyas",
                  "titleHighlight"
                )}
              </span>
            </h2>

            <p>
              {t("acharyas", "description")}
            </p>
          </div>

          <div className="acharyas-grid">
            <p>{t("acharyas", "loading")}</p>
          </div>

        </div>
      </section>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <section
        className="acharyas-section"
        id="acharyas"
      >
        <div className="acharyas-container">

          <div className="section-heading acharya-heading">
            <span className="section-label">
              ✦ {t("acharyas", "label")}
            </span>

            <h2>
              {t("acharyas", "title")}
              <span>
                {" "}
                {t(
                  "acharyas",
                  "titleHighlight"
                )}
              </span>
            </h2>

            <p>
              {t("acharyas", "description")}
            </p>
          </div>

          <div className="acharyas-error">
            ⚠️ {error}
          </div>

        </div>
      </section>
    );
  }

  return (
    <section
      className="acharyas-section"
      id="acharyas"
    >
      <div className="acharyas-container">

        {/* =====================================================
            HEADING
        ===================================================== */}

        <div className="section-heading acharya-heading">

          <span className="section-label">
            ✦ {t("acharyas", "label")}
          </span>

          <h2>
            {t("acharyas", "title")}
            <span>
              {" "}
              {t(
                "acharyas",
                "titleHighlight"
              )}
            </span>
          </h2>

          <p>
            {t("acharyas", "description")}
          </p>

        </div>


        {/* =====================================================
            ACHARYA CARDS
        ===================================================== */}

        {acharyas.length === 0 ? (

          <div className="acharyas-error">
            {t("acharyas", "noAvailable")}
          </div>

        ) : (

          <div className="acharyas-grid">

            {acharyas.map((acharya) => (

              <article
                className="acharya-card"
                key={acharya._id}
              >

                {/* TOP */}

                <div className="acharya-top">

                  <div className="acharya-avatar">

                    {acharya.image ? (
                      <img
                        src={acharya.image}
                        alt={transliterateName(
                          acharya.name,
                          localStorage.getItem("astroconnect_language") || "en"
                        )}
                      />
                    ) : (
                      acharya.name
                        ?.split(" ")
                        .map(
                          (word) =>
                            word[0]
                        )
                        .slice(0, 2)
                        .join("")
                    )}

                  </div>

                  <div className="online-status">

                    <span></span>

                    {t(
                      "acharyas",
                      "online"
                    )}

                  </div>

                </div>


                {/* INFO */}

                <div className="acharya-info">

                  <h3>
                    {transliterateName(
                      acharya.name,
                      localStorage.getItem("astroconnect_language") || "en"
                    )}
                  </h3>

                  <p className="acharya-specialty">
                    {acharya.specialty}
                  </p>

                  <p className="acharya-experience">
                    {acharya.experience}{" "}
                    {t("acharyas", "years")}
                  </p>

                </div>


                {/* RATING */}

                <div className="acharya-rating">

                  <span>★</span>

                  <strong>
                    {acharya.rating ||
                      "5.0"}
                  </strong>

                  <small>
                    (
                    {acharya.reviews ||
                      0}{" "}
                    {t(
                      "acharyas",
                      "reviews"
                    )}
                    )
                  </small>

                </div>


                {/* LANGUAGES */}

                <div className="acharya-meta">

                  <span>
                    🌐{" "}
                    {Array.isArray(
                      acharya.languages
                    )
                      ? acharya.languages.join(
                        ", "
                      )
                      : acharya.languages ||
                      t("acharyas", "languages.hindiEnglish")}
                  </span>

                </div>


                {/* FOOTER */}

                <div className="acharya-footer">

                  <div className="acharya-fee">

                    <small>
                      {t(
                        "acharyas",
                        "startingFrom"
                      )}
                    </small>

                    <strong>
                      ₹{acharya.fee}
                    </strong>

                    <small>
                      {t(
                        "acharyas",
                        "session"
                      )}
                    </small>

                  </div>


                  <button
                    className="book-acharya-btn"
                    type="button"
                    onClick={() =>
                      handleBookNow(
                        acharya
                      )
                    }
                  >
                    {t(
                      "acharyas",
                      "bookNow"
                    )}{" "}
                    →
                  </button>

                </div>

              </article>

            ))}

          </div>

        )}


        {/* =====================================================
            CTA
        ===================================================== */}

        <div className="acharyas-cta">

          <button
            type="button"
            onClick={handleViewAll}
          >
            {t(
              "acharyas",
              "viewAll"
            )}{" "}
            →
          </button>

        </div>

      </div>
    </section>
  );
}

export default Acharyas;