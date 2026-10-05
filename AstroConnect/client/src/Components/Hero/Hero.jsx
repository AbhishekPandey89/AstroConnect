import "./Hero.css";
import { useLanguage } from "../../context/LanguageContext";
function Hero() {
  const { t } = useLanguage();
  

  return (
    <section className="hero" id="home">
      <div className="hero-container">

        {/* Left Content */}
        <div className="hero-content">

          <div className="hero-badge">
            <span>✦</span>
            {t("hero", "badge")}
          </div>

          <h1>
            {t("hero", "title")}
            <span>{t("hero", "titleHighlight")}</span>
          </h1>

          <p className="hero-description">
            {t("hero", "subtitle")}
          </p>

          <div className="hero-actions">
            <button className="hero-primary-btn">
              {t("hero", "book")}
              <span>→</span>
            </button>

            <button className="hero-secondary-btn">
              {t("hero", "explore")}
            </button>
          </div>

          <div className="hero-trust">
            <div className="trust-item">
              <strong>50+</strong>
              <span>{t("hero", "acharyas")}</span>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <strong>10K+</strong>
              <span>{t("hero", "consultations")}</span>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <strong>4.9★</strong>
              <span>{t("hero", "rating")}</span>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="hero-visual">
          <div className="hero-glow"></div>

          <div className="astrology-card">
            <div className="card-top">
              <span>✦</span>
              <span>ASTROCONNECT</span>
            </div>

            <div className="mandala">
              <div className="mandala-circle">✨</div>
            </div>

            <div className="card-title">
              <h3>{t("hero", "cardTitle")}</h3>
              <p>{t("hero", "cardSubtitle")}</p>
            </div>

            <div className="card-details">
              <div>
                <span>☀</span>
                <small>{t("hero", "jyotish")}</small>
              </div>
              <div>
                <span>☾</span>
                <small>{t("hero", "kundali")}</small>
              </div>
              <div>
                <span>ॐ</span>
                <small>{t("hero", "pooja")}</small>
              </div>
            </div>
          </div>

          <div className="floating-card floating-card-one">
            <span>✨</span>
            <div>
              <strong>{t("hero", "expertGuidance")}</strong>
              <small>{t("hero", "verifiedAcharyas")}</small>
            </div>
          </div>

          <div className="floating-card floating-card-two">
            <span>⭐</span>
            <div>
              <strong>4.9 / 5</strong>
              <small>{t("hero", "clientExperience")}</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
