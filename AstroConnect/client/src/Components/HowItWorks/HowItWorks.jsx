
import "./HowItWorks.css";
import { useLanguage } from "../../context/LanguageContext";

const steps = [
  {
    number: "01",
    icon: "🔮",
    titleKey: "step1",
  },
  {
    number: "02",
    icon: "👨‍🏫",
    titleKey: "step2",
  },
  {
    number: "03",
    icon: "📅",
    titleKey: "step3",
  },
  {
    number: "04",
    icon: "🔐",
    titleKey: "step4",
  },
];

function HowItWorks() {
  const { t } = useLanguage();

  const handleBookAcharya = () => {
    alert(
      `${t("howItWorks", "bookAcharya")} - ${t(
        "howItWorks",
        "journey"
      )}`
    );
  };

  return (
    <section className="how-section" id="how-it-works">
      <div className="how-container">

        {/* Heading */}
        <div className="section-heading how-heading">
          <span className="section-label">
            ✦ {t("howItWorks", "label")}
          </span>

          <h2>
            {t("howItWorks", "title")}
            <span> {t("howItWorks", "titleHighlight")}</span>
          </h2>

          <p>
            {t("howItWorks", "description")}
          </p>
        </div>

        {/* Steps */}
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div
              className="step-wrapper"
              key={step.number}
            >
              <article className="step-card">

                <div className="step-number">
                  {step.number}
                </div>

                <div className="step-icon">
                  {step.icon}
                </div>

                <h3>
                  {t(
                    `howItWorks.${step.titleKey}`,
                    "title"
                  )}
                </h3>

                <p>
                  {t(
                    `howItWorks.${step.titleKey}`,
                    "description"
                  )}
                </p>

              </article>

              {index < steps.length - 1 && (
                <div className="step-arrow">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="how-cta">
          <div>
            <span>
              ✨ {t("howItWorks", "ready")}
            </span>

            <h3>
              {t("howItWorks", "journey")}
            </h3>
          </div>

          <button
            type="button"
            onClick={handleBookAcharya}
          >
            {t("howItWorks", "bookAcharya")} →
          </button>
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;
