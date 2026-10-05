import "./Muhurat.css";
import Navbar from "../Components/Navbar/Navbar";
import { useLanguage } from "../context/LanguageContext";

const occasions = [
  {
    icon: "💍",
    titleKey: "marriage",
    descriptionKey: "marriageDesc",
  },
  {
    icon: "🏠",
    titleKey: "house",
    descriptionKey: "houseDesc",
  },
  {
    icon: "🚗",
    titleKey: "vehicle",
    descriptionKey: "vehicleDesc",
  },
  {
    icon: "🏢",
    titleKey: "business",
    descriptionKey: "businessDesc",
  },
  {
    icon: "🪔",
    titleKey: "puja",
    descriptionKey: "pujaDesc",
  },
  {
    icon: "📅",
    titleKey: "importantEvents",
    descriptionKey: "importantEventsDesc",
  },
];

function Muhurat() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />

      <main className="muhurat-page">

        {/* HERO */}
        <section className="muhurat-hero">
          <div className="muhurat-hero-decoration"></div>

          <div className="muhurat-container muhurat-hero-content">

            <span className="muhurat-label">
              ✦ {t("muhurat", "label")}
            </span>

            <h1>
              {t("muhurat", "heroTitle")}
              <span> {t("muhurat", "heroHighlight")}</span>
            </h1>

            <p>
              {t("muhurat", "heroDescription")}
            </p>

            <div className="muhurat-actions">
              <a href="/booking" className="muhurat-primary-btn">
                {t("muhurat", "bookButton")} →
              </a>

              <a href="/jyotish" className="muhurat-secondary-btn">
                {t("muhurat", "jyotishButton")}
              </a>
            </div>

          </div>
        </section>

        {/* INTRO */}
        <section className="muhurat-intro">
          <div className="muhurat-container muhurat-intro-grid">

            <div>
              <span className="muhurat-small-label">
                {t("muhurat", "introLabel")}
              </span>

              <h2>
                {t("muhurat", "introTitle")}
                <span> {t("muhurat", "introHighlight")}</span>
              </h2>

              <p>
                {t("muhurat", "introText1")}
              </p>

              <p>
                {t("muhurat", "introText2")}
              </p>
            </div>

            <div className="muhurat-calendar-card">

              <div className="calendar-top">
                <span>✦</span>
                <small>
                  {t("muhurat", "calendarLabel")}
                </small>
              </div>

              <div className="calendar-main">
                <strong> शुभ </strong>
                <span>
                  {t("muhurat", "auspicious")}
                </span>
              </div>

              <div className="calendar-lines">
                <i></i>
                <i></i>
                <i></i>
              </div>

            </div>

          </div>
        </section>

        {/* OCCASIONS */}
        <section className="muhurat-occasions">
          <div className="muhurat-container">

            <div className="muhurat-section-heading">

              <span className="muhurat-small-label">
                {t("muhurat", "occasionsLabel")}
              </span>

              <h2>
                {t("muhurat", "occasionsTitle")}
                <span> {t("muhurat", "occasionsHighlight")}</span>
              </h2>

              <p>
                {t("muhurat", "occasionsDescription")}
              </p>

            </div>

            <div className="muhurat-card-grid">

              {occasions.map((item) => (
                <article
                  className="muhurat-card"
                  key={item.titleKey}
                >
                  <div className="muhurat-card-icon">
                    {item.icon}
                  </div>

                  <h3>
                    {t("muhurat", item.titleKey)}
                  </h3>

                  <p>
                    {t("muhurat", item.descriptionKey)}
                  </p>

                  <span className="muhurat-card-arrow">
                    →
                  </span>
                </article>
              ))}

            </div>

          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="muhurat-process">
          <div className="muhurat-container">

            <div className="muhurat-section-heading">
              <span className="muhurat-small-label">
                {t("muhurat", "processLabel")}
              </span>

              <h2>
                {t("muhurat", "processTitle")}
                <span> {t("muhurat", "processHighlight")}</span>
              </h2>
            </div>

            <div className="muhurat-steps">

              <div className="muhurat-step">
                <strong>01</strong>
                <div>
                  <h3>{t("muhurat", "stepOneTitle")}</h3>
                  <p>{t("muhurat", "stepOneText")}</p>
                </div>
              </div>

              <div className="muhurat-step">
                <strong>02</strong>
                <div>
                  <h3>{t("muhurat", "stepTwoTitle")}</h3>
                  <p>{t("muhurat", "stepTwoText")}</p>
                </div>
              </div>

              <div className="muhurat-step">
                <strong>03</strong>
                <div>
                  <h3>{t("muhurat", "stepThreeTitle")}</h3>
                  <p>{t("muhurat", "stepThreeText")}</p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="muhurat-cta">
          <div className="muhurat-container">

            <span>✦ {t("muhurat", "ctaLabel")}</span>

            <h2>
              {t("muhurat", "ctaTitle")}
              <span> {t("muhurat", "ctaHighlight")}</span>
            </h2>

            <p>
              {t("muhurat", "ctaDescription")}
            </p>

            <a href="/booking">
              {t("muhurat", "ctaButton")} →
            </a>

          </div>
        </section>

      </main>
    </>
  );
}

export default Muhurat;