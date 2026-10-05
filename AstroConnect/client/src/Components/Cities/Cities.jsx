import "./Cities.css";

const cities = [
  {
    icon: "🏛️",
    city: "Delhi",
    state: "Delhi",
    services: "Jyotish · Kundali · Pooja",
  },
  {
    icon: "🏙️",
    city: "Noida",
    state: "Uttar Pradesh",
    services: "Vastu · Jyotish · Muhurat",
  },
  {
    icon: "🌆",
    city: "Bengaluru",
    state: "Karnataka",
    services: "Kundali · Pooja · Astrology",
  },
  {
    icon: "🌇",
    city: "Mumbai",
    state: "Maharashtra",
    services: "Jyotish · Vastu · Marriage",
  },
  {
    icon: "🏰",
    city: "Lucknow",
    state: "Uttar Pradesh",
    services: "Pooja · Kundali · Muhurat",
  },
  {
    icon: "🌃",
    city: "Hyderabad",
    state: "Telangana",
    services: "Vastu · Jyotish · Pooja",
  },
  {
    icon: "🏯",
    city: "Jaipur",
    state: "Rajasthan",
    services: "Kundali · Jyotish · Vastu",
  },
  {
    icon: "🌉",
    city: "Chandigarh",
    state: "Chandigarh",
    services: "Astrology · Muhurat · Pooja",
  },
];

function Cities() {
  const handleCityClick = (city) => {
    window.location.href = `/acharyas?city=${encodeURIComponent(city)}`;
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
              ✦ OUR PRESENCE
            </span>

            <h2>
              Spiritual Guidance,
              <span> Wherever You Are</span>
            </h2>
          </div>

          <p>
            Connect with experienced Acharyas and explore astrology,
            Vastu, Kundali, Pooja and spiritual services from different
            cities across India.
          </p>
        </div>

        {/* Stats */}
        <div className="cities-stats">
          <div className="city-stat">
            <strong>08+</strong>
            <span>Major Cities</span>
          </div>

          <div className="city-stat">
            <strong>50+</strong>
            <span>Acharyas</span>
          </div>

          <div className="city-stat">
            <strong>10K+</strong>
            <span>Consultations</span>
          </div>

          <div className="city-stat">
            <strong>24×7</strong>
            <span>Online Access</span>
          </div>
        </div>

        {/* Cities */}
        <div className="cities-grid">
          {cities.map((item) => (
            <article
              className="city-card"
              key={item.city}
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
                Explore Acharyas →
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
            <span>ASTROCONNECT INDIA</span>

            <strong>
              Your city isn't listed?
            </strong>

            <p>
              No problem. Online consultations are available
              from anywhere in India.
            </p>
          </div>

          <button
            type="button"
            onClick={handleFindAcharya}
          >
            Find an Acharya →
          </button>
        </div>

      </div>
    </section>
  );
}

export default Cities;