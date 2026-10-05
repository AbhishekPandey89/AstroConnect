
import "./Reviews.css";
import { useLanguage } from "../../context/LanguageContext";

const reviews = [
  {
    initials: "RS",
    name: "Rahul Sharma",
    location: "Delhi",
    service: "Kundali Consultation",
    rating: 5,
    review:
      "The consultation was detailed and easy to understand. The Acharya patiently explained everything and answered all my questions.",
  },
  {
    initials: "PK",
    name: "Priya Kapoor",
    location: "Noida",
    service: "Vastu Consultation",
    rating: 5,
    review:
      "I received practical Vastu guidance for my home. The overall consultation experience was smooth and professional.",
  },
  {
    initials: "AM",
    name: "Ananya Mishra",
    location: "Bengaluru",
    service: "Marriage Guidance",
    rating: 5,
    review:
      "The consultation gave me a much clearer understanding of my kundali and compatibility. Very helpful experience.",
  },
  {
    initials: "VK",
    name: "Vikas Kumar",
    location: "Lucknow",
    service: "Pooja Service",
    rating: 4,
    review:
      "The booking process was simple and the service was well coordinated. I really liked the overall experience.",
  },
];

function Reviews() {
  const { t } = useLanguage();

  const handleBooking = () => {
    alert(t("reviews", "bookConsultation"));
  };

  return (
    <section className="reviews-section" id="reviews">
      <div className="reviews-container">

        {/* Heading */}
        <div className="section-heading reviews-heading">

          <span className="section-label">
            ✦ {t("reviews", "label")}
          </span>

          <h2>
            {t("reviews", "title")}
            <span> {t("reviews", "titleHighlight")}</span>
          </h2>

          <p>
            {t("reviews", "description")}
          </p>

        </div>

        {/* Reviews */}
        <div className="reviews-grid">

          {reviews.map((review) => (
            <article
              className="review-card"
              key={review.name}
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

              <div className="review-rating">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>

              <p className="review-text">
                “{review.review}”
              </p>

              <div className="review-service">

                <span>
                  {t("reviews", "consultedFor")}
                </span>

                <strong>
                  {review.service}
                </strong>

              </div>

            </article>
          ))}

        </div>

        {/* Summary */}
        <div className="reviews-summary">

          <div className="summary-rating">

            <strong>4.9</strong>

            <div>

              <div className="summary-stars">
                ★★★★★
              </div>

              <span>
                {t("reviews", "basedOn")}
              </span>

            </div>

          </div>

          <div className="summary-divider"></div>

          <div className="summary-stat">

            <strong>10K+</strong>

            <span>
              {t("reviews", "consultations")}
            </span>

          </div>

          <div className="summary-stat">

            <strong>50+</strong>

            <span>
              {t("reviews", "expertAcharyas")}
            </span>

          </div>

          <button
            className="review-cta"
            type="button"
            onClick={handleBooking}
          >
            {t("reviews", "bookConsultation")} →
          </button>

        </div>

      </div>
    </section>
  );
}

export default Reviews;
