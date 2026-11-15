
import "./AboutPreview.css";
import { useLanguage } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";

function AboutPreview() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="home-about-section">
      <div className="home-about-container">

        <div className="home-about-content">
          <span className="home-about-label">
            ✦ {t("about.label")}
          </span>

          <h2>
            {t("about.purposeTitle")}
            <span> {t("about.purposeTitleHighlight")}</span>
          </h2>

          <p>{t("about.purposeText1")}</p>
          <p>{t("about.purposeText2")}</p>

          <button
            type="button"
            onClick={() => navigate("/about")}
            className="home-about-button"
          >
           {t("about", "knowMore")} <span>→</span>
          </button>
        </div>

        <div className="home-about-vision">
          <div className="home-about-icon">✦</div>

          <h3>{t("about.visionTitle")}</h3>

          <p>{t("about.visionText")}</p>

          <div className="home-about-highlights">
            <div>
              <span>🔮</span>
              <strong>{t("about.why.experts.title")}</strong>
            </div>

            <div>
              <span>🙏</span>
              <strong>{t("about.why.consultations.title")}</strong>
            </div>

            <div>
              <span>🌐</span>
              <strong>{t("about.why.language.title")}</strong>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutPreview;
