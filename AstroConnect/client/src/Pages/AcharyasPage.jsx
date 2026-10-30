import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import "./AcharyasPage.css";
import { useLanguage } from "../context/LanguageContext";

const API_URL = "http://localhost:5000/api";

const AcharyasPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const tr = (key) => t("acharyas", key);

  const [acharyas, setAcharyas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAcharyas = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/acharyas`);
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Unable to load Acharyas.");
        }

        setAcharyas(data.acharyas || []);
      } catch (err) {
        console.error("Acharya loading error:", err);
        setError(tr("loadError"));
      } finally {
        setLoading(false);
      }
    };

    loadAcharyas();
  }, []);

  const handleBooking = (acharya) => {
    navigate("/booking", {
      state: { acharya },
    });
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <>
      <Navbar />

      <main className="acharyas-page">
        {/* HERO */}
        <section className="acharyas-hero">
          <div className="acharyas-hero-glow glow-one"></div>
          <div className="acharyas-hero-glow glow-two"></div>

          <div className="acharyas-container">
            <span className="acharyas-eyebrow">
              ✦ {tr("trustedGuidance")}
            </span>

            <h1>
              {tr("meetOur")} <span>{tr("acharyasTitle")}</span>
            </h1>

            <p>{tr("heroDescription")}</p>

            <div className="acharyas-hero-stats">
              <div>
                <strong>{acharyas.length}+</strong>
                <span>{tr("expertAcharyas")}</span>
              </div>

              <div>
                <strong>10+</strong>
                <span>{tr("astrologyServices")}</span>
              </div>

              <div>
                <strong>24/7</strong>
                <span>{tr("guidance")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ACHARYA LIST */}
        <section className="acharyas-list-section">
          <div className="acharyas-container">
            {loading ? (
              <div className="acharyas-loading">
                <div className="acharya-spinner"></div>
                <h2>{tr("findingAcharyas")}</h2>
                <p>{tr("loading")}</p>
              </div>
            ) : error ? (
              <div className="acharyas-error">
                <div className="acharyas-error-icon">⚠️</div>
                <h2>{tr("loadError")}</h2>
                <p>{error}</p>
                <button type="button" onClick={handleRetry}>
                  {tr("tryAgain")}
                </button>
              </div>
            ) : (
              <>
                <div className="acharyas-section-heading">
                  <div>
                    <span>{tr("ourExperts")}</span>
                    <h2>
                      {tr("chooseYour")} <strong>{tr("acharyasTitle")}</strong>
                    </h2>
                    <p>{tr("sectionDescription")}</p>
                  </div>

                  <div className="acharya-count">
                    {acharyas.length}{" "}
                    {acharyas.length === 1
                      ? tr("acharyaSingular")
                      : tr("acharyaPlural")}
                  </div>
                </div>

                {acharyas.length === 0 ? (
                  <div className="acharyas-empty">
                    <div className="acharyas-empty-icon">🔮</div>
                    <h2>{tr("comingSoonTitle")}</h2>
                    <p>{tr("comingSoonDescription")}</p>
                    <button
                      type="button"
                      onClick={() => navigate("/")}
                    >
                      {tr("backHome")}
                    </button>
                  </div>
                ) : (
                  <div className="acharyas-grid">
                    {acharyas.map((acharya) => (
                      <article
                        className="acharya-card"
                        key={acharya._id}
                      >
                        {/* IMAGE */}
                        <div className="acharya-image-wrapper">
                          {acharya.image ? (
                            <img
                              src={acharya.image}
                              alt={acharya.name}
                              className="acharya-image"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                                e.currentTarget.parentElement
                                  .querySelector(".acharya-image-placeholder")
                                  ?.classList.add("show-placeholder");
                              }}
                            />
                          ) : null}

                          <div
                            className={`acharya-image-placeholder ${
                              acharya.image ? "" : "show-placeholder"
                            }`}
                          >
                            🔮
                          </div>

                          {acharya.active !== false && (
                            <span className="acharya-online">
                              <i></i>
                              {tr("available")}
                            </span>
                          )}
                        </div>

                        {/* CONTENT */}
                        <div className="acharya-card-content">
                          <div className="acharya-card-top">
                            <div>
                              <h3>{acharya.name}</h3>
                              <p className="acharya-specialty">
                                {acharya.specialty}
                              </p>
                            </div>

                            <div className="acharya-verified">✓</div>
                          </div>

                          {/* EXPERIENCE */}
                          <div className="acharya-info-row">
                            <div>
                              <span className="info-icon">✦</span>
                              <div>
                                <small>{tr("experience")}</small>
                                <strong>
                                  {acharya.experience || 0} {tr("years")}
                                </strong>
                              </div>
                            </div>

                            <div>
                              <span className="info-icon">₹</span>
                              <div>
                                <small>{tr("consultation")}</small>
                                <strong>₹{acharya.fee}</strong>
                              </div>
                            </div>
                          </div>

                          {/* LANGUAGES */}
                          {Array.isArray(acharya.languages) &&
                            acharya.languages.length > 0 && (
                              <div className="acharya-languages">
                                {acharya.languages.map((language, index) => (
                                  <span key={`${language}-${index}`}>
                                    {language}
                                  </span>
                                ))}
                              </div>
                            )}

                          {/* BIO */}
                          {acharya.bio && (
                            <p className="acharya-bio">{acharya.bio}</p>
                          )}

                          {/* FOOTER */}
                          <div className="acharya-card-footer">
                            <div className="acharya-price">
                              <small>{tr("consultationFrom")}</small>
                              <strong>₹{acharya.fee}</strong>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleBooking(acharya)}
                            >
                              {tr("bookConsultation")}
                              <span>→</span>
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="acharyas-cta">
          <div className="acharyas-container">
            <div className="acharyas-cta-card">
              <div>
                <span>✦ {tr("needGuidance")}</span>
                <h2>{tr("ctaTitle")}</h2>
                <p>{tr("ctaDescription")}</p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/ai-help")}
              >
                {tr("askAI")}
                <span>→</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AcharyasPage;
