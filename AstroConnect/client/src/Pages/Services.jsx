import "./ServicesPage.css";
import Navbar from "../Components/Navbar/Navbar";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";

const serviceData = [
  {
    icon: "🔮",
    key: "jyotish",
    path: "/services",
  },
  {
    icon: "📜",
    key: "kundali",
    path: "/kundali",
  },
  {
    icon: "🏠",
    key: "vastu",
    path: "/vastu",
  },
  {
    icon: "🪔",
    key: "pooja",
    path: "/pooja",
  },
  {
    icon: "💍",
    key: "lagna",
    path: "/services",
  },
  {
    icon: "📅",
    key: "muhurat",
    path: "/muhurat",
  },
  {
    icon: "🔢",
    key: "numerology",
    path: "/services",
  },
  {
    icon: "🃏",
    key: "tarot",
    path: "/services",
  },
];

function ServicesPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="services-page">

      <Navbar />

      <main>

        {/* ================= HERO ================= */}

        <section className="services-page-hero">

          <div className="services-page-container">

            <span className="services-page-label">
              ✦ {t("services", "label")}
            </span>

            <h1>
              {t("services", "title")}
              <span>
                {" "}
                {t("services", "titleHighlight")}
              </span>
            </h1>

            <p>
              {t("services", "description")}
            </p>

          </div>

        </section>


        {/* ================= SERVICES ================= */}

        <section className="services-page-list">

          <div className="services-page-container">

            <div className="services-page-heading">

              <span>
                WHAT WE OFFER
              </span>

              <h2>
                Traditional guidance,
                <strong> made accessible.</strong>
              </h2>

              <p>
                Explore our range of astrology and spiritual
                guidance services and connect with an
                experienced Acharya.
              </p>

            </div>


            <div className="services-page-grid">

              {serviceData.map((service, index) => {

                const title = t(
                  "services",
                  `${service.key}.title`
                );

                const description = t(
                  "services",
                  `${service.key}.description`
                );

                return (
                  <article
                    className="services-page-card"
                    key={service.key}
                  >

                    <div className="services-page-card-top">

                      <div className="services-page-icon">
                        {service.icon}
                      </div>

                      <span>
                        {String(index + 1).padStart(2, "0")}
                      </span>

                    </div>


                    <h3>
                      {title}
                    </h3>

                    <p>
                      {description}
                    </p>


                    <button
                      type="button"
                      onClick={() =>
                        navigate(service.path)
                      }
                    >
                      Explore Service
                      <span>→</span>
                    </button>

                  </article>
                );
              })}

            </div>

          </div>

        </section>


        {/* ================= HOW IT WORKS ================= */}

        <section className="services-page-process">

          <div className="services-page-container">

            <div className="services-page-heading center">

              <span>
                HOW IT WORKS
              </span>

              <h2>
                Guidance in
                <strong> three simple steps.</strong>
              </h2>

            </div>


            <div className="services-process-grid">

              <div className="services-process-card">

                <div className="process-number">
                  01
                </div>

                <h3>
                  Choose a Service
                </h3>

                <p>
                  Select the astrology or spiritual
                  service that matches your needs.
                </p>

              </div>


              <div className="services-process-card">

                <div className="process-number">
                  02
                </div>

                <h3>
                  Choose an Acharya
                </h3>

                <p>
                  Explore experienced Acharyas and
                  select the expert you want to consult.
                </p>

              </div>


              <div className="services-process-card">

                <div className="process-number">
                  03
                </div>

                <h3>
                  Book Your Consultation
                </h3>

                <p>
                  Select your preferred date, time and
                  consultation mode.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ================= CTA ================= */}

        <section className="services-page-cta">

          <div className="services-page-container">

            <span>
              ✦ BEGIN YOUR JOURNEY
            </span>

            <h2>
              Find the guidance
              <strong> you're looking for.</strong>
            </h2>

            <p>
              Connect with an experienced Acharya
              for personalized astrology and spiritual
              guidance.
            </p>

            <button
              type="button"
              onClick={() => navigate("/acharyas")}
            >
              Explore Acharyas →
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default ServicesPage;