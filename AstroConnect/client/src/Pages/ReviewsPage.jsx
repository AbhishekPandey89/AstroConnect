import "./ReviewsPage.css";
import Navbar from "../Components/Navbar/Navbar";
import { useLanguage } from "../context/LanguageContext";

function ReviewsPage() {
  const { t } = useLanguage();

  // Translation file se reviews list fetch kar rahe hain
  const reviewsList = t("reviews", "reviewsList") || [];

  const handleBooking = () => {
    window.location.href = "/booking";
  };

  return (
    <>
      <Navbar />

      <main className="reviews-page">

        {/* HERO */}
        <section className="reviews-hero">
          <div className="reviews-hero-glow glow-one"></div>
          <div className="reviews-hero-glow glow-two"></div>

          <div className="reviews-container">
            <span className="reviews-label">
              ✦ {t("reviews", "label")}
            </span>

            <h1>
              {t("reviews", "heroTitle")}
              <span> {t("reviews", "heroHighlight")}</span>
            </h1>

            <p>
              {t("reviews", "heroDescription")}
            </p>

            <div className="reviews-hero-stats">
              <div>
                <strong>4.9</strong>
                <span>★★★★★</span>
                <small>{t("reviews", "overallRating")}</small>
              </div>

              <div>
                <strong>10K+</strong>
                <small>{t("reviews", "consultations")}</small>
              </div>

              <div>
                <strong>50+</strong>
                <small>{t("reviews", "expertAcharyas")}</small>
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="reviews-content">
          <div className="reviews-container">

            <div className="reviews-heading">
              <span>✦ {t("reviews", "storiesLabel")}</span>

              <h2>
                {t("reviews", "storiesTitle")}
                <strong> {t("reviews", "storiesHighlight")}</strong>
              </h2>

              <p>
                {t("reviews", "storiesDescription")}
              </p>
            </div>

            <div className="reviews-grid">
              {reviewsList.map((review, index) => (
                <article
                  className="review-card"
                  key={index}
                >
                  <div className="review-top">
                    <div className="review-user">
                      <div className="review-avatar">
                        {review.initials}
                      </div>

                      <div>
                        <h3>{review.name}</h3>
                        <span>{review.location}</span>
                      </div>
                    </div>

                    <div className="verified-badge">
                      ✓ {t("reviews", "verified")}
                    </div>
                  </div>

                  <div className="review-stars">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>

                  <p className="review-text">
                    “{review.text}”
                  </p>

                  <div className="review-service">
                    <span>
                      {t("reviews", "consultedFor")}
                    </span>

                    <strong>{review.service}</strong>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>

        {/* TRUST */}
        <section className="reviews-trust">
          <div className="reviews-container">

            <div className="trust-card">
              <div className="trust-number">4.9</div>

              <div className="trust-info">
                <div className="trust-stars">
                  ★★★★★
                </div>

                <strong>
                  {t("reviews", "trustedBy")}
                </strong>

                <span>
                  {t("reviews", "trustedDescription")}
                </span>
              </div>
            </div>

            <div className="trust-item">
              <strong>10K+</strong>
              <span>
                {t("reviews", "happyClients")}
              </span>
            </div>

            <div className="trust-item">
              <strong>50+</strong>
              <span>
                {t("reviews", "verifiedExperts")}
              </span>
            </div>

            <div className="trust-item">
              <strong>3</strong>
              <span>
                {t("reviews", "languages")}
              </span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="reviews-cta">
          <div className="reviews-container">

            <span>✦ {t("reviews", "ctaLabel")}</span>

            <h2>
              {t("reviews", "ctaTitle")}
              <strong> {t("reviews", "ctaHighlight")}</strong>
            </h2>

            <p>
              {t("reviews", "ctaDescription")}
            </p>

            <button
              type="button"
              onClick={handleBooking}
            >
              {t("reviews", "ctaButton")} →
            </button>

          </div>
        </section>

      </main>
    </>
  );
}

export default ReviewsPage;