import { useState } from "react";
import "./Reviews.css";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";

function Reviews() {
  const { t, language } = useLanguage();
  const { user, token } = useAuth();

  const reviewsData = {
    en: [
      {
        id: 1,
        name: "Aarav Sharma",
        location: "Delhi",
        rating: 5,
        date: "2 days ago",
        comment: "Acharya Shiv's guidance on my career path was extremely precise. The Kundali reading opened my eyes to opportunities I hadn't considered.",
        service: "Kundali Consultation",
      },
      {
        id: 2,
        name: "Priya Verma",
        location: "Noida",
        rating: 5,
        date: "1 week ago",
        comment: "Very detailed Vastu consultation for our new office. We implemented the changes suggested and already feel a positive shift in energy.",
        service: "Vastu Consultation",
      },
      {
        id: 3,
        name: "Rahul Nair",
        location: "Bengaluru",
        rating: 5,
        date: "2 weeks ago",
        comment: "Booked an online Pooja service. The entire ritual was performed with utmost devotion and clarity. Highly recommended!",
        service: "Pooja Service",
      },
    ],
    hi: [
      {
        id: 1,
        name: "आरव शर्मा",
        location: "दिल्ली",
        rating: 5,
        date: "2 दिन पहले",
        comment: "मेरे करियर पथ पर आचार्य शिव का मार्गदर्शन अत्यंत सटीक था। कुंडली पढ़ने से मुझे उन अवसरों के बारे में पता चला जिन पर मैंने विचार नहीं किया था।",
        service: "कुंडली परामर्श",
      },
      {
        id: 2,
        name: "प्रिया वर्मा",
        location: "नोएडा",
        rating: 5,
        date: "1 सप्ताह पहले",
        comment: "हमारे नए कार्यालय के लिए बहुत विस्तृत वास्तु परामर्श। हमने सुझाए गए बदलाव लागू किए और पहले से ही ऊर्जा में सकारात्मक बदलाव महसूस कर रहे हैं।",
        service: "वास्तु परामर्श",
      },
      {
        id: 3,
        name: "राहुल नायर",
        location: "बेंगलुरु",
        rating: 5,
        date: "2 सप्ताह पहले",
        comment: "एक ऑनलाइन पूजा सेवा बुक की। पूरी रस्म पूरी श्रद्धा और स्पष्टता के साथ संपन्न हुई। अत्यधिक अनुशंसित!",
        service: "पूजा सेवा",
      },
    ],
    kn: [
      {
        id: 1,
        name: "ಆರವ್ ಶರ್ಮಾ",
        location: "ದೆಹಲಿ",
        rating: 5,
        date: "2 ದಿನಗಳ ಹಿಂದೆ",
        comment: "ನಮ್ಮ ವೃತ್ತಿಜೀವನದ ಹಾದಿಯಲ್ಲಿ ಆಚಾರ್ಯ ಶಿವ ಅವರ ಮಾರ್ಗದರ್ಶನ ಅತ್ಯಂತ ನಿಖರವಾಗಿತ್ತು. ಕುಂಡಲಿ ಓದುವಿಕೆಯಿಂದ ನನಗೆ ಹೊಸ ಅವಕಾಶಗಳ ಬಗ್ಗೆ ತಿಳಿಯಿತು.",
        service: "ಕುಂಡಲಿ ಸಮಾಲೋಚನೆ",
      },
      {
        id: 2,
        name: "ಪ್ರಿಯಾ ವರ್ಮಾ",
        location: "ನೊಯ್ಡಾ",
        rating: 5,
        date: "1 ವಾರದ ಹಿಂದೆ",
        comment: "ನಮ್ಮ ಹೊಸ ಕಚೇರಿಗೆ ಬಹಳ ವಿವರವಾದ ವಾಸ್ತು ಸಮಾಲೋಚನೆ. ಸೂಚಿಸಿದ ಬದಲಾವಣೆಗಳನ್ನು ನಾವು ಜಾರಿಗೆ ತಂದಿದ್ದೇವೆ ಮತ್ತು ಈಗಾಗಲೇ ಸಕಾರಾತ್ಮಕ ಬದಲಾವಣೆಯನ್ನು ಅನುಭವಿಸುತ್ತಿದ್ದೇವೆ.",
        service: "ವಾಸ್ತು ಸಮಾಲೋಚನೆ",
      },
      {
        id: 3,
        name: "ರಾಹುಲ್ ನಾಯರ್",
        location: "ಬೆಂಗಳೂರು",
        rating: 5,
        date: "2 ವಾರಗಳ ಹಿಂದೆ",
        comment: "ಆನ್‌ಲೈನ್ ಪೂಜಾ ಸೇವೆಯನ್ನು ಬುಕ್ ಮಾಡಲಾಗಿದೆ. ಸಂಪೂರ್ಣ ವಿಧಿಯನ್ನು ಅತ್ಯಂತ ಭಕ್ತಿಯಿಂದ ನೆರವೇರಿಸಲಾಯಿತು. ಹೆಚ್ಚು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ!",
        service: "ಪೂಜೆ ಸೇವೆ",
      },
    ],
  };

  const currentReviews = reviewsData[language] || reviewsData.en;

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    rating: "5",
    service: "Kundali Consultation",
    comment: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setMessage("");
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!user || !token) {
      setError("Please login first to submit a review.");
      return;
    }

    if (!formData.comment.trim()) {
      setError("Please write your review comment.");
      return;
    }

    try {
      setLoading(true);
      setTimeout(() => {
        setMessage("Thank you! Your review has been submitted successfully.");
        setFormData({ rating: "5", service: "Kundali Consultation", comment: "" });
        setShowForm(false);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError("An error occurred while submitting your review.");
      setLoading(false);
    }
  };

  return (
    <section className="reviews-section" id="reviews">
      <div className="reviews-container">

        {/* Heading */}
        <div className="reviews-heading">
          <div>
            <span className="section-label">
              ✦ {t("reviews", "label") || "CLIENT REVIEWS"}
            </span>
            <h2>
              {t("reviews", "title") || "Trusted by Seekers"}
              <span> {t("reviews", "titleHighlight") || "Across India"}</span>
            </h2>
          </div>

          <p>
            {t("reviews", "description") ||
              "Read authentic experiences from individuals who found clarity, direction, and spiritual peace through our Acharyas."}
          </p>

          <button
            type="button"
            className="write-review-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "✍️ Write a Review"}
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <form className="review-form" onSubmit={handleReviewSubmit}>
            <h3>Share Your Experience</h3>

            <div className="form-group">
              <label>Rating</label>
              <select name="rating" value={formData.rating} onChange={handleInputChange}>
                <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                <option value="4">⭐⭐⭐⭐ (4/5)</option>
                <option value="3">⭐⭐⭐ (3/5)</option>
                <option value="2">⭐⭐ (2/5)</option>
                <option value="1">⭐ (1/5)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Service Consulted</label>
              <select name="service" value={formData.service} onChange={handleInputChange}>
                <option value="Kundali Consultation">Kundali Consultation</option>
                <option value="Jyotish Consultation">Jyotish Consultation</option>
                <option value="Vastu Consultation">Vastu Consultation</option>
                <option value="Pooja Service">Pooja Service</option>
              </select>
            </div>

            <div className="form-group">
              <label>Your Review</label>
              <textarea
                name="comment"
                rows="4"
                placeholder="Write your feedback here..."
                value={formData.comment}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {error && <div className="form-error">{error}</div>}
            {message && <div className="form-success">{message}</div>}

            <button type="submit" className="submit-review-btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        )}

        {/* Reviews Cards Grid */}
        <div className="reviews-grid">
          {currentReviews.map((rev) => (
            <article className="review-card" key={rev.id}>
              <div className="review-card-top">
                <div className="review-rating">
                  {"⭐".repeat(rev.rating)}
                </div>
                <span className="review-date">{rev.date}</span>
              </div>

              <p className="review-comment">"{rev.comment}"</p>

              <div className="review-author">
                <div className="author-avatar">
                  {rev.name.charAt(0)}
                </div>
                <div className="author-info">
                  <strong>{rev.name}</strong>
                  <small>{rev.location} · {rev.service}</small>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Reviews;