
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import { getAllPoojas } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import { transliterateName } from "../utils/transliterateName";
import "./Pooja.css";

function Pooja() {
  const { t } = useLanguage();

  const language =
    localStorage.getItem("astroconnect_language") || "en";

  const tr = (key) => t("pooja", key);

  const [poojas, setPoojas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const localeMap = {
    en: "en-IN",
    hi: "hi-IN",
    kn: "kn-IN",
  };

  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "—";

    return parsedDate.toLocaleDateString(
      localeMap[language] || "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  };

  useEffect(() => {
    const loadPoojas = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAllPoojas();

        if (response.success) {
          setPoojas(response.poojas || []);
        } else {
          setError(
            response.message ||
            "Unable to load pooja records."
          );
        }
      } catch (err) {
        console.error("Pooja loading error:", err);

        setError(
          "Unable to load pooja records."
        );
      } finally {
        setLoading(false);
      }
    };

    loadPoojas();
  }, []);

  return (
    <>
      <Navbar />

      <main className="pooja-page">

        {/* HERO */}

        <section className="pooja-hero">
          <div className="pooja-container">

            <span className="section-label">
              ✦ {tr("label")}
            </span>

            <h1>
              {tr("title")}
              <span> {tr("titleHighlight")}</span>
            </h1>

            <p>
              {tr("description")}
            </p>

          </div>
        </section>

        {/* COMPLETED POOJAS */}

        <section className="pooja-records-section">
          <div className="pooja-container">

            <div className="pooja-section-heading">

              <span className="section-label">
                ✦ {tr("ourWork")}
              </span>

              <h2>
                {tr("performed")}
              </h2>

              <p>
                {tr("sectionDescription")}
              </p>

            </div>

            {/* LOADING */}

            {loading && (
              <div className="pooja-state">
                <div className="pooja-state-icon">
                  🕉️
                </div>

                <h3>
                  {tr("loading")}
                </h3>

                <p>
                  {tr("loadingDescription")}
                </p>
              </div>
            )}

            {/* ERROR */}

            {!loading && error && (
              <div className="pooja-state pooja-error-state">

                <div className="pooja-state-icon">
                  ⚠️
                </div>

                <h3>
                  {tr("loadError")}
                </h3>

                <p>
                  {error}
                </p>

              </div>
            )}

            {/* EMPTY */}

            {!loading &&
              !error &&
              poojas.length === 0 && (
                <div className="pooja-state">

                  <div className="pooja-state-icon">
                    🕉️
                  </div>

                  <h3>
                    {tr("comingSoon")}
                  </h3>

                  <p>
                    {tr("comingSoonDescription")}
                  </p>

                </div>
              )}

            {/* POOJA CARDS */}

            {!loading &&
              !error &&
              poojas.length > 0 && (

                <div className="pooja-grid">

                  {poojas.map((pooja) => (

                    <article
                      className="pooja-card"
                      key={pooja._id}
                    >

                      {/* IMAGE */}

                      <div className="pooja-card-image">

                        {pooja.images &&
                          pooja.images.length > 0 ? (
                          <img
                            src={pooja.images[0]}
                            alt={pooja.poojaName || tr("title")}
                          />
                        ) : (
                          <div className="pooja-image-placeholder">
                            🕉️
                          </div>
                        )}

                        <span className="pooja-card-badge">
                          ✦ {tr("completed")}
                        </span>

                      </div>

                      {/* CONTENT */}

                      <div className="pooja-card-content">

                        <h3>
                          {pooja.poojaName}
                        </h3>

                        {/* CITY */}

                        <div className="pooja-detail">

                          <span className="pooja-detail-icon">
                            📍
                          </span>

                          <div>
                            <small>
                              {tr("city")}
                            </small>

                            <strong>
                              {pooja.city}
                            </strong>
                          </div>

                        </div>

                        {/* DATE */}

                        <div className="pooja-detail">

                          <span className="pooja-detail-icon">
                            📅
                          </span>

                          <div>
                            <small>
                              {tr("date")}
                            </small>

                            <strong>
                              {formatDate(pooja.date)}
                            </strong>
                          </div>

                        </div>

                        {/* ACHARYA */}

                        <div className="pooja-detail">

                          <span className="pooja-detail-icon">
                            👨‍🦳
                          </span>

                          <div>
                            <small>
                              {tr("acharya")}
                            </small>

                            <strong>
                              {transliterateName(
                                pooja.acharya,
                                language
                              )}
                            </strong>
                          </div>

                        </div>

                        {/* YAJMAN */}

                        <div className="pooja-detail">

                          <span className="pooja-detail-icon">
                            🙏
                          </span>

                          <div>
                            <small>
                              {tr("yajman")}
                            </small>

                            <strong>
                              {transliterateName(
                                pooja.yajmanName,
                                language
                              )}
                            </strong>
                          </div>

                        </div>

                      </div>

                    </article>

                  ))}

                </div>

              )}

          </div>
        </section>

      </main>
    </>
  );
}

export default Pooja;
