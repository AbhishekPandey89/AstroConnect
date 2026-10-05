import "./About.css";
import Navbar from "../Components/Navbar/Navbar";
import SEO from "../Components/SEO/SEO";
import { useLanguage } from "../context/LanguageContext";

function About() {
  const { t } = useLanguage();

  return (
    <div className="about-page">

      {/* ================= SEO ================= */}
      <SEO
        title="About AstroConnect | Astrology & Spiritual Guidance"
        description="Learn about AstroConnect, a modern platform connecting people with experienced Acharyas for astrology, Kundali, Vastu, Pooja, Muhurat and spiritual guidance."
        keywords="About AstroConnect, Astrology, Acharya, Kundali, Vastu, Pooja, Muhurat, Jyotish, Spiritual Guidance"
        canonical="https://astroconnect.com/about"
      />

      <Navbar />

      {/* ================= HERO ================= */}
      <section className="about-hero">
        <div className="about-container">

          <span className="about-label">
            ✦ {t("about.label")}
          </span>

          <h1>
            {t("about.heroTitle")}
            <span> {t("about.heroTitleHighlight")}</span>
          </h1>

          <p>
            {t("about.heroDescription")}
          </p>

        </div>
      </section>

      {/* ================= INTRODUCTION ================= */}
      <section className="about-intro">
        <div className="about-container about-intro-grid">

          <div className="about-content">

            <span className="about-small-label">
              {t("about.purposeLabel")}
            </span>

            <h2>
              {t("about.purposeTitle")}
              <span>
                {" "}
                {t("about.purposeTitleHighlight")}
              </span>
            </h2>

            <p>
              {t("about.purposeText1")}
            </p>

            <p>
              {t("about.purposeText2")}
            </p>

          </div>

          <div className="about-highlight-card">

            <div className="about-card-icon">
              ✦
            </div>

            <h3>
              {t("about.visionTitle")}
            </h3>

            <p>
              {t("about.visionText")}
            </p>

          </div>

        </div>
      </section>

      {/* ================= WHAT WE OFFER ================= */}
      <section className="about-offer">
        <div className="about-container">

          <div className="about-section-heading">

            <span className="about-small-label">
              {t("about.offerLabel")}
            </span>

            <h2>
              {t("about.offerTitle")}
              <span>
                {" "}
                {t("about.offerTitleHighlight")}
              </span>
            </h2>

            <p>
              {t("about.offerDescription")}
            </p>

          </div>

          <div className="about-feature-grid">

            <article className="about-feature-card">
              <span>🔮</span>

              <h3>
                {t("about.features.jyotish.title")}
              </h3>

              <p>
                {t("about.features.jyotish.description")}
              </p>
            </article>

            <article className="about-feature-card">
              <span>📜</span>

              <h3>
                {t("about.features.kundali.title")}
              </h3>

              <p>
                {t("about.features.kundali.description")}
              </p>
            </article>

            <article className="about-feature-card">
              <span>🏠</span>

              <h3>
                {t("about.features.vastu.title")}
              </h3>

              <p>
                {t("about.features.vastu.description")}
              </p>
            </article>

            <article className="about-feature-card">
              <span>🪔</span>

              <h3>
                {t("about.features.pooja.title")}
              </h3>

              <p>
                {t("about.features.pooja.description")}
              </p>
            </article>

            <article className="about-feature-card">
              <span>✨</span>

              <h3>
                {t("about.features.muhurat.title")}
              </h3>

              <p>
                {t("about.features.muhurat.description")}
              </p>
            </article>

            <article className="about-feature-card">
              <span>💫</span>

              <h3>
                {t("about.features.spiritual.title")}
              </h3>

              <p>
                {t("about.features.spiritual.description")}
              </p>
            </article>

          </div>

        </div>
      </section>

      {/* ================= WHY ASTROCONNECT ================= */}
      <section className="about-why">
        <div className="about-container">

          <div className="about-section-heading">

            <span className="about-small-label">
              {t("about.whyLabel")}
            </span>

            <h2>
              {t("about.whyTitle")}
              <span>
                {" "}
                {t("about.whyTitleHighlight")}
              </span>
            </h2>

          </div>

          <div className="about-why-grid">

            <div className="about-why-item">

              <strong>01</strong>

              <div>
                <h3>
                  {t("about.why.experts.title")}
                </h3>

                <p>
                  {t("about.why.experts.description")}
                </p>
              </div>

            </div>

            <div className="about-why-item">

              <strong>02</strong>

              <div>
                <h3>
                  {t("about.why.consultations.title")}
                </h3>

                <p>
                  {t("about.why.consultations.description")}
                </p>
              </div>

            </div>

            <div className="about-why-item">

              <strong>03</strong>

              <div>
                <h3>
                  {t("about.why.language.title")}
                </h3>

                <p>
                  {t("about.why.language.description")}
                </p>
              </div>

            </div>

            <div className="about-why-item">

              <strong>04</strong>

              <div>
                <h3>
                  {t("about.why.modern.title")}
                </h3>

                <p>
                  {t("about.why.modern.description")}
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="about-cta">
        <div className="about-container">

          <span>
            ✦ {t("about.ctaLabel")}
          </span>

          <h2>
            {t("about.ctaTitle")}
            <span>
              {" "}
              {t("about.ctaTitleHighlight")}
            </span>
          </h2>

          <p>
            {t("about.ctaDescription")}
          </p>

          <a href="/acharyas">
            {t("about.ctaButton")} →
          </a>

        </div>
      </section>

    </div>
  );
}

export default About;