import "./Jyotish.css";
import Navbar from "../Components/Navbar/Navbar";

const jyotishServices = [
  {
    icon: "🔮",
    title: "Birth Chart Reading",
    description:
      "Understand your planetary positions, strengths, challenges and important life patterns through your birth chart.",
  },
  {
    icon: "🌙",
    title: "Life Guidance",
    description:
      "Get spiritual and astrological guidance for career, relationships, finances, family and personal growth.",
  },
  {
    icon: "🪐",
    title: "Planetary Guidance",
    description:
      "Learn how planetary influences may affect different areas of your life and explore traditional remedies.",
  },
  {
    icon: "💼",
    title: "Career Astrology",
    description:
      "Explore career-related planetary patterns and receive guidance about professional direction and opportunities.",
  },
  {
    icon: "❤️",
    title: "Relationship Guidance",
    description:
      "Understand relationship patterns and compatibility through traditional Jyotish consultation.",
  },
  {
    icon: "✨",
    title: "Personal Consultation",
    description:
      "Have a one-to-one consultation with an experienced Acharya based on your personal concerns.",
  },
];

const benefits = [
  "Experienced Acharya guidance",
  "Personalized birth chart analysis",
  "Private one-to-one consultation",
  "Hindi, English & Kannada support",
  "Online consultation from anywhere",
  "Traditional Vedic astrology approach",
];

function JyotishPage() {
  return (
    <>
      <Navbar />

      <main className="jyotish-page">

        {/* HERO */}
        <section className="jyotish-hero">
          <div className="jyotish-hero-bg"></div>

          <div className="jyotish-container jyotish-hero-content">

            <div className="jyotish-hero-text">
              <span className="jyotish-label">
                ✦ VEDIC JYOTISH
              </span>

              <h1>
                Discover the Guidance
                <span> Written in the Stars</span>
              </h1>

              <p>
                Explore your birth chart and understand the traditional
                wisdom of Vedic astrology with personalized guidance from
                experienced Acharyas.
              </p>

              <div className="jyotish-hero-actions">
                <a href="/booking" className="jyotish-primary-btn">
                  Book Consultation →
                </a>

                <a href="#jyotish-services" className="jyotish-secondary-btn">
                  Explore Services
                </a>
              </div>

              <div className="jyotish-trust">
                <div>
                  <strong>10K+</strong>
                  <span>Consultations</span>
                </div>

                <div>
                  <strong>50+</strong>
                  <span>Acharyas</span>
                </div>

                <div>
                  <strong>4.9★</strong>
                  <span>Client Rating</span>
                </div>
              </div>
            </div>

            <div className="jyotish-chart-card">

              <div className="jyotish-orbit orbit-one"></div>
              <div className="jyotish-orbit orbit-two"></div>

              <div className="jyotish-moon">
                ☾
              </div>

              <div className="jyotish-symbol">
                ✦
              </div>

              <span className="jyotish-star star-one">✦</span>
              <span className="jyotish-star star-two">✧</span>
              <span className="jyotish-star star-three">✦</span>
              <span className="jyotish-star star-four">✧</span>

              <div className="jyotish-chart-info">
                <small>YOUR COSMIC JOURNEY</small>
                <strong>Vedic Birth Chart</strong>
                <span>Personalized Astrological Insight</span>
              </div>

            </div>

          </div>
        </section>

        {/* INTRO */}
        <section className="jyotish-intro">
          <div className="jyotish-container jyotish-intro-grid">

            <div className="jyotish-intro-card">
              <span>🪐</span>

              <div>
                <small>VEDIC WISDOM</small>
                <h3>Ancient Knowledge, Modern Guidance</h3>
              </div>
            </div>

            <div className="jyotish-intro-text">
              <span className="jyotish-section-label">
                ✦ ABOUT JYOTISH
              </span>

              <h2>
                Understand the
                <span> cosmic influences</span>
                in your life.
              </h2>

              <p>
                Vedic Jyotish is a traditional system of astrology that
                studies planetary positions and their relationship with
                different areas of life.
              </p>

              <p>
                At AstroConnect, our consultations are designed to help you
                understand your chart clearly and make informed personal
                decisions with traditional astrological guidance.
              </p>
            </div>

          </div>
        </section>

        {/* SERVICES */}
        <section
          className="jyotish-services"
          id="jyotish-services"
        >
          <div className="jyotish-container">

            <div className="jyotish-section-heading">
              <span className="jyotish-section-label">
                ✦ OUR JYOTISH SERVICES
              </span>

              <h2>
                Guidance for
                <span> Every Chapter</span>
              </h2>

              <p>
                Choose the type of astrological guidance that matches your
                questions and goals.
              </p>
            </div>

            <div className="jyotish-services-grid">

              {jyotishServices.map((service) => (
                <article
                  className="jyotish-service-card"
                  key={service.title}
                >
                  <div className="jyotish-service-icon">
                    {service.icon}
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <a href="/booking">
                    Consult an Acharya <span>→</span>
                  </a>
                </article>
              ))}

            </div>

          </div>
        </section>

        {/* PROCESS */}
        <section className="jyotish-process">
          <div className="jyotish-container">

            <div className="jyotish-section-heading">
              <span className="jyotish-section-label">
                ✦ HOW IT WORKS
              </span>

              <h2>
                Your Consultation,
                <span> Made Simple</span>
              </h2>
            </div>

            <div className="jyotish-process-grid">

              <div className="jyotish-process-card">
                <span>01</span>
                <div>
                  <h3>Choose a Service</h3>
                  <p>
                    Select the type of Jyotish guidance you are looking for.
                  </p>
                </div>
              </div>

              <div className="jyotish-process-card">
                <span>02</span>
                <div>
                  <h3>Select an Acharya</h3>
                  <p>
                    Choose an available Acharya based on expertise and
                    language.
                  </p>
                </div>
              </div>

              <div className="jyotish-process-card">
                <span>03</span>
                <div>
                  <h3>Book Your Session</h3>
                  <p>
                    Select your preferred date, time and consultation mode.
                  </p>
                </div>
              </div>

              <div className="jyotish-process-card">
                <span>04</span>
                <div>
                  <h3>Receive Guidance</h3>
                  <p>
                    Connect privately with your Acharya and discuss your
                    questions.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* BENEFITS */}
        <section className="jyotish-benefits">
          <div className="jyotish-container jyotish-benefits-grid">

            <div>
              <span className="jyotish-section-label">
                ✦ WHY ASTROCONNECT
              </span>

              <h2>
                A more personal way to
                <span> explore Jyotish.</span>
              </h2>

              <p>
                Our platform combines traditional spiritual guidance with a
                simple and convenient online consultation experience.
              </p>

              <a href="/acharyas" className="jyotish-outline-btn">
                Meet Our Acharyas →
              </a>
            </div>

            <div className="jyotish-benefit-list">

              {benefits.map((benefit, index) => (
                <div className="jyotish-benefit" key={benefit}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{benefit}</strong>
                  <i>✓</i>
                </div>
              ))}

            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="jyotish-cta">
          <div className="jyotish-container">

            <span>✦ YOUR JOURNEY STARTS HERE</span>

            <h2>
              Have Questions About
              <span> Your Future?</span>
            </h2>

            <p>
              Connect with an experienced Acharya and explore your birth
              chart through a personalized Jyotish consultation.
            </p>

            <a href="/booking">
              Book Your Consultation →
            </a>

          </div>
        </section>

      </main>
    </>
  );
}

export default JyotishPage;