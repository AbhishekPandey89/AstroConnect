import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import "./AcharyasPage.css";

const API_URL = "http://localhost:5000/api";

const AcharyasPage = () => {
  const navigate = useNavigate();

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

        const response = await fetch(`${API_URL}/acharyas`);

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Unable to load Acharyas."
          );
        }

        setAcharyas(data.acharyas || []);
      } catch (err) {
        console.error("Acharya loading error:", err);

        setError(
          err.message ||
            "Unable to load Acharyas. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAcharyas();
  }, []);

  // =====================================================
  // BOOK CONSULTATION
  // =====================================================

  const handleBooking = (acharya) => {
    navigate("/booking", {
      state: {
        acharya: acharya,
      },
    });
  };

  // =====================================================
  // RETRY
  // =====================================================

  const handleRetry = () => {
    window.location.reload();
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
        <>
        <Navbar />
      <main className="acharyas-page">

        <section className="acharyas-hero">
          <div className="acharyas-container">

            <span className="acharyas-eyebrow">
              ✦ ASTROCONNECT
            </span>

            <h1>
              Meet Our <span>Acharyas</span>
            </h1>

            <p>
              Connect with experienced astrologers and
              receive personalized guidance for your life,
              relationships and future.
            </p>

          </div>
        </section>

        <section className="acharyas-list-section">
          <div className="acharyas-container">

            <div className="acharyas-loading">
              <div className="acharya-spinner"></div>

              <h2>Finding Our Acharyas...</h2>

              <p>
                Please wait while we load our astrologers.
              </p>
            </div>

          </div>
        </section>

      </main>
      </>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <>
       <Navbar />
      <main className="acharyas-page">

        <section className="acharyas-hero">
          <div className="acharyas-container">

            <span className="acharyas-eyebrow">
              ✦ ASTROCONNECT
            </span>

            <h1>
              Meet Our <span>Acharyas</span>
            </h1>

            <p>
              Connect with experienced astrologers for
              personalized guidance.
            </p>

          </div>
        </section>

        <section className="acharyas-list-section">

          <div className="acharyas-container">

            <div className="acharyas-error">

              <div className="acharyas-error-icon">
                ⚠️
              </div>

              <h2>
                Unable to Load Acharyas
              </h2>

              <p>{error}</p>

              <button
                type="button"
                onClick={handleRetry}
              >
                Try Again
              </button>

            </div>

          </div>

        </section>

      </main>
      </>
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <>
      <Navbar />

      <main className="acharyas-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="acharyas-hero">

        <div className="acharyas-hero-glow glow-one"></div>
        <div className="acharyas-hero-glow glow-two"></div>

        <div className="acharyas-container">

          <span className="acharyas-eyebrow">
            ✦ TRUSTED ASTROLOGY GUIDANCE
          </span>

          <h1>
            Meet Our{" "}
            <span>Acharyas</span>
          </h1>

          <p>
            Experienced astrologers dedicated to helping
            you understand your stars, make informed
            decisions and find clarity in life's journey.
          </p>

          <div className="acharyas-hero-stats">

            <div>
              <strong>
                {acharyas.length}+
              </strong>

              <span>
                Expert Acharyas
              </span>
            </div>

            <div>
              <strong>
                10+
              </strong>

              <span>
                Astrology Services
              </span>
            </div>

            <div>
              <strong>
                24/7
              </strong>

              <span>
                Guidance
              </span>
            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          ACHARYA LIST
      ================================================= */}

      <section className="acharyas-list-section">

        <div className="acharyas-container">

          <div className="acharyas-section-heading">

            <div>
              <span>
                OUR EXPERTS
              </span>

              <h2>
                Choose Your <strong>Acharya</strong>
              </h2>

              <p>
                Find the right astrology expert based on
                their experience, specialty and languages.
              </p>
            </div>

            <div className="acharya-count">
              {acharyas.length}{" "}
              {acharyas.length === 1
                ? "Acharya"
                : "Acharyas"}
            </div>

          </div>


          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {acharyas.length === 0 ? (

            <div className="acharyas-empty">

              <div className="acharyas-empty-icon">
                🔮
              </div>

              <h2>
                Our Acharyas Are Coming Soon
              </h2>

              <p>
                We are preparing our expert astrologer
                profiles. Please check back shortly.
              </p>

              <button
                type="button"
                onClick={() => navigate("/")}
              >
                Back to Home
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
                          e.currentTarget.style.display =
                            "none";

                          e.currentTarget.parentElement
                            .querySelector(
                              ".acharya-image-placeholder"
                            )
                            ?.classList.add(
                              "show-placeholder"
                            );
                        }}
                      />

                    ) : null}

                    <div
                      className={`acharya-image-placeholder ${
                        acharya.image
                          ? ""
                          : "show-placeholder"
                      }`}
                    >
                      🔮
                    </div>


                    {/* ACTIVE */}

                    {acharya.active !== false && (
                      <span className="acharya-online">
                        <i></i>
                        Available
                      </span>
                    )}

                  </div>


                  {/* CONTENT */}

                  <div className="acharya-card-content">

                    <div className="acharya-card-top">

                      <div>

                        <h3>
                          {acharya.name}
                        </h3>

                        <p className="acharya-specialty">
                          {acharya.specialty}
                        </p>

                      </div>

                      <div className="acharya-verified">
                        ✓
                      </div>

                    </div>


                    {/* EXPERIENCE */}

                    <div className="acharya-info-row">

                      <div>
                        <span className="info-icon">
                          ✦
                        </span>

                        <div>
                          <small>
                            Experience
                          </small>

                          <strong>
                            {acharya.experience || 0} Years
                          </strong>
                        </div>
                      </div>

                      <div>
                        <span className="info-icon">
                          ₹
                        </span>

                        <div>
                          <small>
                            Consultation
                          </small>

                          <strong>
                            ₹{acharya.fee}
                          </strong>
                        </div>
                      </div>

                    </div>


                    {/* LANGUAGES */}

                    {Array.isArray(
                      acharya.languages
                    ) &&
                      acharya.languages.length > 0 && (

                        <div className="acharya-languages">

                          {acharya.languages.map(
                            (language, index) => (

                              <span
                                key={`${language}-${index}`}
                              >
                                {language}
                              </span>

                            )
                          )}

                        </div>

                      )}


                    {/* BIO */}

                    {acharya.bio && (

                      <p className="acharya-bio">
                        {acharya.bio}
                      </p>

                    )}


                    {/* FOOTER */}

                    <div className="acharya-card-footer">

                      <div className="acharya-price">

                        <small>
                          Consultation from
                        </small>

                        <strong>
                          ₹{acharya.fee}
                        </strong>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleBooking(acharya)
                        }
                      >
                        Book Consultation
                        <span>→</span>
                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          )}

        </div>

      </section>


      {/* =================================================
          BOTTOM CTA
      ================================================= */}

      <section className="acharyas-cta">

        <div className="acharyas-container">

          <div className="acharyas-cta-card">

            <div>

              <span>
                ✦ NEED GUIDANCE?
              </span>

              <h2>
                Not sure which Acharya to choose?
              </h2>

              <p>
                Let AstroConnect help you find the right
                astrology service for your needs.
              </p>

            </div>

            <button
              type="button"
              onClick={() => navigate("/ai-help")}
            >
              Ask AstroConnect AI
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