import "./Cities.css";
import { useLanguage } from "../../context/LanguageContext";

function Cities() {
  const { t, language } = useLanguage();

  // Language ke hisaब se cities data direct yahan handle ho raha hai
  const citiesData = {
    en: [
      { icon: "🏛️", city: "Delhi", state: "Delhi", services: "Jyotish · Kundali · Pooja" },
      { icon: "🏙️", city: "Noida", state: "Uttar Pradesh", services: "Vastu · Jyotish · Muhurat" },
      { icon: "🌆", city: "Bengaluru", state: "Karnataka", services: "Kundali · Pooja · Astrology" },
      { icon: "🌇", city: "Mumbai", state: "Maharashtra", services: "Jyotish · Vastu · Marriage" },
      { icon: "🏰", city: "Lucknow", state: "Uttar Pradesh", services: "Pooja · Kundali · Muhurat" },
      { icon: "🌃", city: "Hyderabad", state: "Telangana", services: "Vastu · Jyotish · Pooja" },
      { icon: "🏯", city: "Jaipur", state: "Rajasthan", services: "Kundali · Jyotish · Vastu" },
      { icon: "🌉", city: "Chandigarh", state: "Chandigarh", services: "Astrology · Muhurat · Pooja" },
    ],
    hi: [
      { icon: "🏛️", city: "दिल्ली", state: "दिल्ली", services: "ज्योतिष · कुंडली · पूजा" },
      { icon: "🏙️", city: "नोएडा", state: "उत्तर प्रदेश", services: "वास्तु · ज्योतिष · मुहूर्त" },
      { icon: "🌆", city: "बेंगलुरु", state: "कर्नाटक", services: "कुंडली · पूजा · ज्योतिष" },
      { icon: "🌇", city: "मुंबई", state: "महाराष्ट्र", services: "ज्योतिष · वास्तु · विवाह" },
      { icon: "🏰", city: "लखनऊ", state: "उत्तर प्रदेश", services: "पूजा · कुंडली · मुहूर्त" },
      { icon: "🌃", city: "हैदराबाद", state: "तेलंगाना", services: "वास्तु · ज्योतिष · पूजा" },
      { icon: "🏯", city: "जयपुर", state: "राजस्थान", services: "कुंडली · ज्योतिष · वास्तु" },
      { icon: "🌉", city: "चंडीगढ़", state: "चंडीगढ़", services: "ज्योतिष · मुहूर्त · पूजा" },
    ],
    kn: [
      { icon: "🏛️", city: "ದೆಹಲಿ", state: "ದೆಹಲಿ", services: "ಜ್ಯೋತಿಷ್ಯ · ಕುಂಡಲಿ · ಪೂಜೆ" },
      { icon: "🏙️", city: "ನೊಯ್ಡಾ", state: "ಉತ್ತರ ಪ್ರದೇಶ", services: "ವಾಸ್ತು · ಜ್ಯೋತಿಷ್ಯ · ಮುಹೂರ್ತ" },
      { icon: "🌆", city: "ಬೆಂಗಳೂರು", state: "ಕರ್ನಾಟಕ", services: "ಕುಂಡಲಿ · ಪೂಜೆ · ಜ್ಯೋತಿಷ್ಯ" },
      { icon: "🌇", city: "ಮುಂಬೈ", state: "ಮಹಾರಾಷ್ಟ್ರ", services: "ಜ್ಯೋತಿಷ್ಯ · ವಾಸ್ತು · ಮದುವೆ" },
      { icon: "🏰", city: "ಲಕ್ನೋ", state: "ಉತ್ತರ ಪ್ರದೇಶ", services: "ಪೂಜೆ · ಕುಂಡಲಿ · ಮುಹೂರ್ತ" },
      { icon: "🌃", city: "ಹೈದರಾಬಾದ್", state: "ತೆಲಂಗಾಣ", services: "ವಾಸ್ತು · ಜ್ಯೋತಿಷ್ಯ · ಪೂಜೆ" },
      { icon: "🏯", city: "ಜೈಪುರ", state: "ರಾಜಸ್ಥಾನ", services: "ಕುಂಡಲಿ · ಜ್ಯೋತಿಷ್ಯ · ವಾಸ್ತು" },
      { icon: "🌉", city: "ಚಂಡೀಗಢ", state: "ಚಂಡೀಗಢ", services: "ಜ್ಯೋತಿಷ್ಯ · ಮುಹೂರ್ತ · ಪೂಜೆ" },
    ],
  };

  // Current language ke hisaab se list uthayega (fallback to English agar language match na ho)
  const citiesList = citiesData[language] || citiesData.en;

  const handleCityClick = (cityName) => {
    window.location.href = `/acharyas?city=${encodeURIComponent(cityName)}`;
  };

  const handleFindAcharya = () => {
    window.location.href = "/acharyas";
  };

  return (
    <section className="cities-section" id="cities">
      <div className="cities-container">

        {/* Header */}
        <div className="cities-heading">
          <div>
            <span className="section-label">
              ✦ {t("cities", "label") || "OUR PRESENCE"}
            </span>

            <h2>
              {t("cities", "title") || "Spiritual Guidance,"}
              <span> {t("cities", "titleHighlight") || "Wherever You Are"}</span>
            </h2>
          </div>

          <p>
            {t("cities", "description") ||
              "Connect with experienced Acharyas and explore astrology, Vastu, Kundali, Pooja and spiritual services from different cities across India."}
          </p>
        </div>

        {/* Stats */}
        <div className="cities-stats">
          <div className="city-stat">
            <strong>08+</strong>
            <span>{t("cities", "stat1") || "Major Cities"}</span>
          </div>

          <div className="city-stat">
            <strong>50+</strong>
            <span>{t("cities", "stat2") || "Acharyas"}</span>
          </div>

          <div className="city-stat">
            <strong>10K+</strong>
            <span>{t("cities", "stat3") || "Consultations"}</span>
          </div>

          <div className="city-stat">
            <strong>24×7</strong>
            <span>{t("cities", "stat4") || "Online Access"}</span>
          </div>
        </div>

        {/* Cities */}
        <div className="cities-grid">
          {citiesList.map((item, index) => (
            <article
              className="city-card"
              key={index}
              onClick={() => handleCityClick(item.city)}
            >
              <div className="city-card-top">
                <div className="city-icon">
                  {item.icon}
                </div>

                <span className="city-arrow">
                  ↗
                </span>
              </div>

              <div className="city-info">
                <span className="city-state">
                  {item.state}
                </span>

                <h3>{item.city}</h3>

                <p>{item.services}</p>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCityClick(item.city);
                }}
              >
                {t("cities", "exploreBtn") || "Explore Acharyas"} →
              </button>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="cities-bottom">
          <div className="cities-bottom-icon">
            🌍
          </div>

          <div className="cities-bottom-content">
            <span>{t("cities", "bottomLabel") || "ASTROCONNECT INDIA"}</span>

            <strong>
              {t("cities", "bottomTitle") || "Your city isn't listed?"}
            </strong>

            <p>
              {t("cities", "bottomDesc") ||
                "No problem. Online consultations are available from anywhere in India."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleFindAcharya}
          >
            {t("cities", "bottomBtn") || "Find an Acharya"} →
          </button>
        </div>

      </div>
    </section>
  );
}

export default Cities;