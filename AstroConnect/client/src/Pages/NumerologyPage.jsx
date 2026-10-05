import "./NumerologyPage.css";
import Navbar from "../Components/Navbar/Navbar";
import { useLanguage } from "../context/LanguageContext";

const numbers = [
  { number: "1", icon: "☀️", key: "one" },
  { number: "2", icon: "🌙", key: "two" },
  { number: "3", icon: "✨", key: "three" },
  { number: "4", icon: "🏛️", key: "four" },
  { number: "5", icon: "🌪️", key: "five" },
  { number: "6", icon: "💗", key: "six" },
  { number: "7", icon: "🔮", key: "seven" },
  { number: "8", icon: "👑", key: "eight" },
  { number: "9", icon: "🔥", key: "nine" },
];

const guidanceItems = [
  { icon: "💼", key: "career" },
  { icon: "❤️", key: "relationships" },
  { icon: "💰", key: "finance" },
  { icon: "🌱", key: "personal" },
];

function NumerologyPage() {
  const { t } = useLanguage();

  const handleConsultation = () => {
    window.location.href = "/booking";
  };

  return (
    <>
      <Navbar />

      <main className="numerology-page">

        {/* HERO */}
        <section className="numerology-hero">
          <div className="numerology-hero-glow glow-one"></div>
          <div className="numerology-hero-glow glow-two"></div>

          <div className="numerology-container numerology-hero-grid">

            <div className="numerology-hero-content">
              <span className="numerology-label">
                ✦ {t("numerology", "label")}
              </span>

              <h1>
                {t("numerology", "heroTitle")}
                <span>
                  {" "}
                  {t("numerology", "heroTitleHighlight")}
                </span>
              </h1>

              <p>
                {t("numerology", "heroDescription")}
              </p>

              <div className="numerology-hero-actions">
                <button
                  type="button"
                  onClick={handleConsultation}
                >
                  {t("numerology", "consultButton")} →
                </button>

                <a href="#numbers">
                  {t("numerology", "exploreButton")}
                </a>
              </div>

              <div className="numerology-trust">
                <span>✦</span>
                <div>
                  <strong>
                    {t("numerology", "trustedTitle")}
                  </strong>
                  <small>
                    {t("numerology", "trustedText")}
                  </small>
                </div>
              </div>
            </div>

            {/* NUMBER VISUAL */}
            <div className="numerology-visual">
              <div className="numerology-orbit orbit-one"></div>
              <div className="numerology-orbit orbit-two"></div>

              <div className="numerology-center">
                <span>✦</span>
                <strong>9</strong>
                <small>
                  {t("numerology", "coreNumber")}
                </small>
              </div>

              <div className="floating-number number-one">1</div>
              <div className="floating-number number-three">3</div>
              <div className="floating-number number-seven">7</div>
              <div className="floating-number number-eight">8</div>
            </div>

          </div>
        </section>

        {/* INTRO */}
        <section className="numerology-intro">
          <div className="numerology-container numerology-intro-grid">

            <div className="numerology-section-heading">
              <span className="numerology-small-label">
                {t("numerology", "introLabel")}
              </span>

              <h2>
                {t("numerology", "introTitle")}
                <span>
                  {" "}
                  {t("numerology", "introTitleHighlight")}
                </span>
              </h2>
            </div>

            <div className="numerology-intro-content">
              <p>
                {t("numerology", "introText1")}
              </p>

              <p>
                {t("numerology", "introText2")}
              </p>
            </div>

          </div>
        </section>

        {/* NUMBERS */}
        <section
          className="numerology-numbers"
          id="numbers"
        >
          <div className="numerology-container">

            <div className="numerology-section-heading centered">
              <span className="numerology-small-label">
                {t("numerology", "numbersLabel")}
              </span>

              <h2>
                {t("numerology", "numbersTitle")}
                <span>
                  {" "}
                  {t("numerology", "numbersTitleHighlight")}
                </span>
              </h2>

              <p>
                {t("numerology", "numbersDescription")}
              </p>
            </div>

            <div className="number-grid">
              {numbers.map((item) => (
                <article
                  className="number-card"
                  key={item.number}
                >
                  <div className="number-icon">
                    {item.icon}
                  </div>

                  <div className="number-value">
                    {item.number}
                  </div>

                  <h3>
                    {t(
                      `numerology.numbers.${item.key}`,
                      "title"
                    )}
                  </h3>

                  <p>
                    {t(
                      `numerology.numbers.${item.key}`,
                      "description"
                    )}
                  </p>
                </article>
              ))}
            </div>

          </div>
        </section>

        {/* GUIDANCE */}
        <section className="numerology-guidance">
          <div className="numerology-container">

            <div className="numerology-section-heading">
              <span className="numerology-small-label">
                {t("numerology", "guidanceLabel")}
              </span>

              <h2>
                {t("numerology", "guidanceTitle")}
                <span>
                  {" "}
                  {t("numerology", "guidanceTitleHighlight")}
                </span>
              </h2>

              <p>
                {t("numerology", "guidanceDescription")}
              </p>
            </div>

            <div className="guidance-grid">
              {guidanceItems.map((item) => (
                <article
                  className="guidance-card"
                  key={item.key}
                >
                  <div className="guidance-icon">
                    {item.icon}
                  </div>

                  <h3>
                    {t(
                      `numerology.guidance.${item.key}`,
                      "title"
                    )}
                  </h3>

                  <p>
                    {t(
                      `numerology.guidance.${item.key}`,
                      "description"
                    )}
                  </p>
                </article>
              ))}
            </div>

          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="numerology-process">
          <div className="numerology-container">

            <div className="numerology-section-heading centered">
              <span className="numerology-small-label">
                {t("numerology", "processLabel")}
              </span>

              <h2>
                {t("numerology", "processTitle")}
                <span>
                  {" "}
                  {t("numerology", "processTitleHighlight")}
                </span>
              </h2>
            </div>

            <div className="process-grid">

              <article className="process-card">
                <strong>01</strong>
                <span>📝</span>
                <h3>
                  {t("numerology.process", "stepOneTitle")}
                </h3>
                <p>
                  {t("numerology.process", "stepOneText")}
                </p>
              </article>

              <article className="process-card">
                <strong>02</strong>
                <span>🔢</span>
                <h3>
                  {t("numerology.process", "stepTwoTitle")}
                </h3>
                <p>
                  {t("numerology.process", "stepTwoText")}
                </p>
              </article>

              <article className="process-card">
                <strong>03</strong>
                <span>💬</span>
                <h3>
                  {t("numerology.process", "stepThreeTitle")}
                </h3>
                <p>
                  {t("numerology.process", "stepThreeText")}
                </p>
              </article>

            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="numerology-cta">
          <div className="numerology-container">

            <span>✦ {t("numerology", "ctaLabel")}</span>

            <h2>
              {t("numerology", "ctaTitle")}
              <span>
                {" "}
                {t("numerology", "ctaTitleHighlight")}
              </span>
            </h2>

            <p>
              {t("numerology", "ctaDescription")}
            </p>

            <button
              type="button"
              onClick={handleConsultation}
            >
              {t("numerology", "ctaButton")} →
            </button>

          </div>
        </section>

      </main>
    </>
  );
}

export default NumerologyPage;