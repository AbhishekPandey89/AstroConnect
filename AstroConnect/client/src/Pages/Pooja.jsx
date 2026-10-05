import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import { getAllPoojas } from "../services/api";
import "./Pooja.css";

function Pooja() {
  const [poojas, setPoojas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          err.message ||
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
              ✦ POOJA
            </span>

            <h1>
              Sacred Poojas
              <span> Performed by AstroConnect</span>
            </h1>

            <p>
              Explore the sacred poojas and spiritual
              ceremonies performed by our Acharyas
              across different cities.
            </p>

          </div>
        </section>


        {/* COMPLETED POOJAS */}

        <section className="pooja-records-section">
          <div className="pooja-container">

            <div className="pooja-section-heading">

              <span className="section-label">
                ✦ OUR WORK
              </span>

              <h2>
                Poojas We Have
                <span> Performed</span>
              </h2>

              <p>
                A glimpse of the spiritual ceremonies
                conducted by our experienced Acharyas.
              </p>

            </div>


            {/* LOADING */}

            {loading && (
              <div className="pooja-state">
                <div className="pooja-state-icon">
                  🕉️
                </div>

                <h3>
                  Loading Poojas...
                </h3>

                <p>
                  Please wait while we load our
                  completed pooja records.
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
                  Unable to Load Poojas
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
                    Pooja Records Coming Soon
                  </h3>

                  <p>
                    Our completed pooja ceremonies
                    will appear here.
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
                            alt={pooja.poojaName}
                          />
                        ) : (
                          <div className="pooja-image-placeholder">
                            🕉️
                          </div>
                        )}

                        <span className="pooja-card-badge">
                          ✦ Completed
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
                              City
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
                              Date
                            </small>

                            <strong>
                              {new Date(
                                pooja.date
                              ).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
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
                              Acharya
                            </small>

                            <strong>
                              {pooja.acharya}
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
                              Yajman
                            </small>

                            <strong>
                              {pooja.yajmanName}
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