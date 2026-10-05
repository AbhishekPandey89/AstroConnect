import "./Services.css";
import { useLanguage } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";

const services = [
  {
    icon: "🔮",
    key: "jyotish",
    path: "/services",
  },
  {
    icon: "📜",
    key: "kundali",
    path: "/kundali",
  },
  {
    icon: "🏠",
    key: "vastu",
    path: "/vastu",
  },
  {
    icon: "🪔",
    key: "pooja",
    path: "/pooja",
  },
  {
    icon: "💍",
    key: "lagna",
    path: "/services",
  },
  {
    icon: "📅",
    key: "muhurat",
    path: "/muhurat",
  },
  {
    icon: "🔢",
    key: "numerology",
    path: "/services",
  },
  {
    icon: "🃏",
    key: "tarot",
    path: "/services",
  },
];

function Services() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleExplore = (path) => {
    navigate(path);
  };

  const handleViewAll = () => {
    navigate("/services");
  };

  return (
    <section className="services-section" id="services">
      <div className="services-container">

        {/* ================= HEADING ================= */}

        <div className="section-heading">

          <span className="section-label">
            ✦ {t("services", "label")}
          </span>

          <h2>
            {t("services", "title")}
            <span>
              {" "}
              {t("services", "titleHighlight")}
            </span>
          </h2>

          <p>
            {t("services", "description")}
          </p>

        </div>


        {/* ================= SERVICES ================= */}

        <div className="services-grid">

          {services.map((service) => {

            const title = t(
              "services",
              `${service.key}.title`
            );

            const description = t(
              "services",
              `${service.key}.description`
            );

            return (
              <article
                className="service-card"
                key={service.key}
              >

                {/* Icon */}

                <div className="service-icon">
                  {service.icon}
                </div>


                {/* Title */}

                <h3>
                  {title}
                </h3>


                {/* Description */}

                <p>
                  {description}
                </p>


                {/* Explore */}

                <button
                  className="service-link"
                  type="button"
                  onClick={() =>
                    handleExplore(service.path)
                  }
                >
                  {t("services", "explore")}

                  <span>
                    →
                  </span>
                </button>

              </article>
            );
          })}

        </div>


        {/* ================= BOTTOM CTA ================= */}

        <div className="services-bottom">

          <p>
            {t("services", "lookingFor")}
          </p>

          <button
            type="button"
            onClick={handleViewAll}
          >
            {t("services", "viewAll")} →
          </button>

        </div>

      </div>
    </section>
  );
}

export default Services;