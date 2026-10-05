import "./TarotPage.css";
import Navbar from "../Components/Navbar/Navbar";
import { useLanguage } from "../context/LanguageContext";

const tarotServices = [
  {
    icon: "🃏",
    title: "Tarot Reading",
    description:
      "Get meaningful insights about your current situation, relationships and personal journey.",
  },
  {
    icon: "❤️",
    title: "Love & Relationship",
    description:
      "Explore relationship questions and understand the energies surrounding your love life.",
  },
  {
    icon: "💼",
    title: "Career & Finance",
    description:
      "Gain guidance around career decisions, opportunities and financial situations.",
  },
  {
    icon: "🔮",
    title: "Future Guidance",
    description:
      "Discover possible paths and receive spiritual guidance for important life decisions.",
  },
];

const tarotCards = [
  {
    icon: "☀️",
    title: "The Sun",
    text: "Positive energy, clarity and new opportunities.",
  },
  {
    icon: "🌙",
    title: "The Moon",
    text: "Intuition, emotions and things that need deeper understanding.",
  },
  {
    icon: "⭐",
    title: "The Star",
    text: "Hope, inspiration and renewed confidence.",
  },
];

function TarotPage() {
  const { t } = useLanguage();

  const handleBooking = () => {
    window.location.href = "/booking";
  };

  return (
    <div className="tarot-page">
      <Navbar />

      {/* Hero */}
      <section className="tarot-hero">
        <div className="tarot-container tarot-hero-grid">

          <div className="tarot-hero-content">
            <span className="tarot-label">
              ✦ TAROT GUIDANCE
            </span>

            <h1>
              Discover the
              <span> Messages Within</span>
            </h1>

            <p>
              Explore tarot guidance with experienced readers and gain
              deeper insight into love, career, relationships and life's
              important decisions.
            </p>

            <div className="tarot-hero-actions">
              <button
                className="tarot-primary-btn"
                onClick={handleBooking}
              >
                Get a Tarot Reading →
              </button>

              <a href="#tarot-services" className="tarot-secondary-btn">
                Explore Readings
              </a>
            </div>

            <div className="tarot-trust">
              <span>✦ Experienced Readers</span>
              <span>✦ Private Sessions</span>
              <span>✦ Hindi · English · Kannada</span>
            </div>
          </div>

          {/* Tarot Visual */}
          <div className="tarot-visual">
            <div className="tarot-glow"></div>

            <div className="tarot-card tarot-card-back">
              <div className="tarot-card-inner">
                <span>✦</span>
                <strong>ASTRO</strong>
                <small>CONNECT</small>
              </div>
            </div>

            <div className="tarot-floating-card tarot-floating-left">
              🌙
            </div>

            <div className="tarot-floating-card tarot-floating-right">
              ⭐
            </div>
          </div>

        </div>
      </section>

      {/* Services */}
      <section
        className="tarot-services"
        id="tarot-services"
      >
        <div className="tarot-container">

          <div className="tarot-section-heading">
            <span>✦ TAROT READINGS</span>

            <h2>
              Guidance for
              <strong> Every Question</strong>
            </h2>

            <p>
              Choose the type of tarot guidance that matches what you
              want to understand better.
            </p>
          </div>

          <div className="tarot-services-grid">
            {tarotServices.map((service) => (
              <article
                className="tarot-service-card"
                key={service.title}
              >
                <div className="tarot-service-icon">
                  {service.icon}
                </div>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <button onClick={handleBooking}>
                  Explore Reading →
                </button>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* How it works */}
      <section className="tarot-process">
        <div className="tarot-container">

          <div className="tarot-section-heading">
            <span>✦ SIMPLE PROCESS</span>

            <h2>
              Your Reading in
              <strong> 3 Steps</strong>
            </h2>
          </div>

          <div className="tarot-process-grid">

            <div className="tarot-process-card">
              <div>01</div>
              <h3>Choose Your Reading</h3>
              <p>
                Select the type of guidance you are looking for.
              </p>
            </div>

            <div className="tarot-process-card">
              <div>02</div>
              <h3>Connect With a Reader</h3>
              <p>
                Choose an available tarot reader and your preferred
                consultation mode.
              </p>
            </div>

            <div className="tarot-process-card">
              <div>03</div>
              <h3>Receive Guidance</h3>
              <p>
                Discuss your questions and receive your personalized
                tarot reading.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Cards meaning */}
      <section className="tarot-symbols">
        <div className="tarot-container">

          <div className="tarot-section-heading">
            <span>✦ TAROT SYMBOLISM</span>

            <h2>
              Every Card Has a
              <strong> Story</strong>
            </h2>

            <p>
              Tarot cards use symbols and imagery to help explore
              emotions, possibilities and perspectives.
            </p>
          </div>

          <div className="tarot-symbol-grid">
            {tarotCards.map((card) => (
              <article
                className="tarot-symbol-card"
                key={card.title}
              >
                <span>{card.icon}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="tarot-cta">
        <div className="tarot-container">

          <span>✦ READY TO EXPLORE?</span>

          <h2>
            Ask Your Question.
            <strong> Discover Your Path.</strong>
          </h2>

          <p>
            Connect with an experienced tarot reader and begin your
            personalized session.
          </p>

          <button onClick={handleBooking}>
            Book Tarot Consultation →
          </button>

        </div>
      </section>

    </div>
  );
}

export default TarotPage;