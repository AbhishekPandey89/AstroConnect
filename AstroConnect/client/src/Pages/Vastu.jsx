import Navbar from "../Components/Navbar/Navbar";
import VastuConsultation from "../Components/Vastu/VastuConsultation";
import "./Vastu.css";

function Vastu() {
  const services = [
    {
      icon: "🏠",
      title: "Home Vastu",
      description:
        "Get guidance for the placement and arrangement of important spaces in your home.",
    },
    {
      icon: "🏢",
      title: "Office Vastu",
      description:
        "Understand traditional Vastu principles for workspaces, cabins, entrances and important areas.",
    },
    {
      icon: "📐",
      title: "Plot Vastu",
      description:
        "Get traditional Vastu guidance before planning or constructing your property.",
    },
    {
      icon: "🧭",
      title: "Direction Analysis",
      description:
        "Understand the traditional significance of directions and their use in space planning.",
    },
  ];

  const process = [
    {
      number: "01",
      title: "Share Your Details",
      description:
        "Provide your property details and the information required for consultation.",
    },
    {
      number: "02",
      title: "Consult an Acharya",
      description:
        "Discuss your requirements with an experienced AstroConnect Acharya.",
    },
    {
      number: "03",
      title: "Get Guidance",
      description:
        "Receive personalized traditional Vastu guidance based on your consultation.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="vastu-page">

        {/* HERO */}
        <section className="vastu-hero">
          <div className="vastu-container">

            <div className="vastu-hero-content">

              <span className="section-label">
                ✦ VASTU CONSULTATION
              </span>

              <h1>
                Create a More
                <span> Balanced Space</span>
              </h1>

              <p>
                Explore traditional Vastu guidance for your
                home, workplace and property with experienced
                AstroConnect Acharyas.
              </p>

              <div className="vastu-hero-actions">

                <button
                  type="button"
                  className="vastu-primary-btn"
                  onClick={() =>
                    document
                      .getElementById("vastu-services")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                >
                  Explore Vastu Services →
                </button>

                <button
                  type="button"
                  className="vastu-secondary-btn"
                  onClick={() =>
                    document
                      .getElementById("vastu-process")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                >
                  How It Works
                </button>

              </div>

            </div>

            <div className="vastu-hero-card">

              <div className="vastu-compass">
                🧭
              </div>

              <span>
                Traditional Vastu Guidance
              </span>

              <strong>
                Home • Office • Plot
              </strong>

              <p>
                Personalized consultation based on your
                requirements.
              </p>

            </div>

          </div>
        </section>

        {/* INTRO */}
        <section className="vastu-intro">
          <div className="vastu-container">

            <div className="vastu-section-heading">

              <span className="section-label">
                ✦ WHY VASTU
              </span>

              <h2>
                Guidance for the
                <span> Spaces You Live In</span>
              </h2>

              <p>
                Vastu consultation focuses on traditional
                principles related to directions, placement
                and arrangement of spaces. Explore the area
                of guidance that matches your requirement.
              </p>

            </div>

          </div>
        </section>

        {/* SERVICES */}
        <section
          className="vastu-services"
          id="vastu-services"
        >
          <div className="vastu-container">

            <div className="vastu-section-heading">

              <span className="section-label">
                ✦ OUR SERVICES
              </span>

              <h2>
                Choose Your
                <span> Vastu Consultation</span>
              </h2>

              <p>
                Select the type of Vastu guidance you are
                looking for.
              </p>

            </div>

            <div className="vastu-services-grid">

              {services.map((service) => (
                <article
                  className="vastu-service-card"
                  key={service.title}
                >

                  <div className="vastu-service-icon">
                    {service.icon}
                  </div>

                  <h3>
                    {service.title}
                  </h3>

                  <p>
                    {service.description}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById(
                          "vastu-consultation"
                        )
                        ?.scrollIntoView({
                          behavior: "smooth",
                        })
                    }
                  >
                    Consult Now →
                  </button>

                </article>
              ))}

            </div>

          </div>
        </section>

        {/* BENEFITS */}
        <section className="vastu-guidance">
          <div className="vastu-container">

            <div className="vastu-guidance-grid">

              <div className="vastu-guidance-content">

                <span className="section-label">
                  ✦ PERSONALIZED GUIDANCE
                </span>

                <h2>
                  Understand Your Space
                  <span> With Expert Guidance</span>
                </h2>

                <p>
                  Every property has different requirements.
                  AstroConnect helps you connect with an
                  Acharya to discuss your specific space
                  and questions.
                </p>

                <div className="vastu-points">

                  <div>
                    <span>✓</span>
                    <p>
                      Discuss your home or workplace
                      requirements.
                    </p>
                  </div>

                  <div>
                    <span>✓</span>
                    <p>
                      Ask questions related to directions
                      and placement.
                    </p>
                  </div>

                  <div>
                    <span>✓</span>
                    <p>
                      Get guidance according to your
                      consultation.
                    </p>
                  </div>

                </div>

              </div>

              <div className="vastu-highlight-card">

                <div className="vastu-highlight-symbol">
                  ✦
                </div>

                <h3>
                  Traditional Wisdom
                </h3>

                <p>
                  Explore Vastu principles with guidance
                  from experienced practitioners.
                </p>

                <div className="vastu-highlight-line"></div>

                <small>
                  AstroConnect Vastu Consultation
                </small>

              </div>

            </div>

          </div>
        </section>

        {/* PROCESS */}
        <section
          className="vastu-process"
          id="vastu-process"
        >
          <div className="vastu-container">

            <div className="vastu-section-heading center">

              <span className="section-label">
                ✦ HOW IT WORKS
              </span>

              <h2>
                Simple Consultation
                <span> Process</span>
              </h2>

              <p>
                Getting Vastu guidance through AstroConnect
                is simple and straightforward.
              </p>

            </div>

            <div className="vastu-process-grid">

              {process.map((item) => (
                <div
                  className="vastu-process-card"
                  key={item.number}
                >

                  <span className="vastu-process-number">
                    {item.number}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                </div>
              ))}

            </div>

          </div>
        </section>

        {/* CTA */}
        <section
          className="vastu-consultation"
          id="vastu-consultation"
        >
          <div className="vastu-container">

            <div className="vastu-cta-card">

              <div>

                <span className="section-label">
                  ✦ BEGIN YOUR CONSULTATION
                </span>

                <h2>
                  Looking for Vastu Guidance?
                </h2>

                <p>
                  Connect with an AstroConnect Acharya
                  and discuss your home, office or
                  property requirements.
                </p>

              </div>

              <button
                type="button"
                onClick={() => {
                  window.location.href =
                    "/acharyas";
                }}
              >
                Find an Acharya →
              </button>

            </div>

          </div>
        </section>

        {/* CONSULTATION FORM */}
        <VastuConsultation />

      </main>
    </>
  );
}

export default Vastu;