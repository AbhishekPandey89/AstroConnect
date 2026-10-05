import "./LagnaPage.css";
import Navbar from "../Components/Navbar/Navbar";
import { useLanguage } from "../context/LanguageContext";

const guidanceCards = [
  {
    icon: "💍",
    titleKey: "compatibility",
    descriptionKey: "compatibilityDesc",
  },
  {
    icon: "❤️",
    titleKey: "marriageTiming",
    descriptionKey: "marriageTimingDesc",
  },
  {
    icon: "🔮",
    titleKey: "kundaliMatching",
    descriptionKey: "kundaliMatchingDesc",
  },
  {
    icon: "🪔",
    titleKey: "doshaGuidance",
    descriptionKey: "doshaGuidanceDesc",
  },
];

function LagnaPage() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />

      <main className="lagna-page">

        {/* HERO */}
        <section className="lagna-hero">
          <div className="lagna-hero-glow"></div>

          <div className="lagna-container lagna-hero-content">

            <span className="lagna-label">
              ✦ {t("lagna", "label")}
            </span>

            <h1>
              {t("lagna", "heroTitle")}
              <span> {t("lagna", "heroHighlight")}</span>
            </h1>

            <p>
              {t("lagna", "heroDescription")}
            </p>

            <div className="lagna-hero-actions">
              <a href="/booking" className="lagna-primary-btn">
                {t("lagna", "bookButton")} →
              </a>

              <a href="/kundali" className="lagna-secondary-btn">
                {t("lagna", "kundaliButton")}
              </a>
            </div>

          </div>
        </section>

        {/* INTRO */}
        <section className="lagna-intro">
          <div className="lagna-container lagna-intro-grid">

            <div className="lagna-intro-content">

              <span className="lagna-small-label">
                {t("lagna", "introLabel")}
              </span>

              <h2>
                {t("lagna", "introTitle")}
                <span> {t("lagna", "introHighlight")}</span>
              </h2>

              <p>
                {t("lagna", "introText1")}
              </p>

              <p>
                {t("lagna", "introText2")}
              </p>

            </div>

            <div className="lagna-kundali-card">

              <div className="kundali-symbol">
                ✦
              </div>

              <div className="kundali-orbit orbit-one"></div>
              <div className="kundali-orbit orbit-two"></div>

              <span>
                {t("lagna", "chartLabel")}
              </span>

              <strong>
                {t("lagna", "chartTitle")}
              </strong>

              <small>
                {t("lagna", "chartDescription")}
              </small>

            </div>

          </div>
        </section>

        {/* GUIDANCE */}
        <section className="lagna-guidance">
          <div className="lagna-container">

            <div className="lagna-section-heading">

              <span className="lagna-small-label">
                {t("lagna", "guidanceLabel")}
              </span>

              <h2>
                {t("lagna", "guidanceTitle")}
                <span> {t("lagna", "guidanceHighlight")}</span>
              </h2>

              <p>
                {t("lagna", "guidanceDescription")}
              </p>

            </div>

            <div className="lagna-card-grid">

              {guidanceCards.map((card) => (
                <article
                  className="lagna-card"
                  key={card.titleKey}
                >
                  <div className="lagna-card-icon">
                    {card.icon}
                  </div>

                  <h3>
                    {t("lagna", card.titleKey)}
                  </h3>

                  <p>
                    {t("lagna", card.descriptionKey)}
                  </p>
                </article>
              ))}

            </div>

          </div>
        </section>

        {/* PROCESS */}
        <section className="lagna-process">
          <div className="lagna-container">

            <div className="lagna-section-heading">
              <span className="lagna-small-label">
                {t("lagna", "processLabel")}
              </span>

              <h2>
                {t("lagna", "processTitle")}
                <span> {t("lagna", "processHighlight")}</span>
              </h2>
            </div>

            <div className="lagna-steps">

              <div className="lagna-step">
                <span>01</span>
                <div>
                  <h3>{t("lagna", "stepOneTitle")}</h3>
                  <p>{t("lagna", "stepOneText")}</p>
                </div>
              </div>

              <div className="lagna-step">
                <span>02</span>
                <div>
                  <h3>{t("lagna", "stepTwoTitle")}</h3>
                  <p>{t("lagna", "stepTwoText")}</p>
                </div>
              </div>

              <div className="lagna-step">
                <span>03</span>
                <div>
                  <h3>{t("lagna", "stepThreeTitle")}</h3>
                  <p>{t("lagna", "stepThreeText")}</p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="lagna-cta">
          <div className="lagna-container">

            <span>✦ {t("lagna", "ctaLabel")}</span>

            <h2>
              {t("lagna", "ctaTitle")}
              <span> {t("lagna", "ctaHighlight")}</span>
            </h2>

            <p>
              {t("lagna", "ctaDescription")}
            </p>

            <a href="/booking">
              {t("lagna", "ctaButton")} →
            </a>

          </div>
        </section>

      </main>
    </>
  );
}

export default LagnaPage;