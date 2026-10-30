import "./ServicesPage.css";
import Navbar from "../Components/Navbar/Navbar";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";

const serviceData = [
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


const SERVICES_TRANSLATIONS = {
  en: {
    eyebrow: "✦ BEGIN YOUR JOURNEY",
    title: "Find the guidance",
    titleHighlight: " you're looking for.",
    description:
      "Connect with an experienced Acharya for personalized astrology and spiritual guidance.",
    button: "Explore Acharyas →",
    howTitle: "Guidance in three simple steps.",
    
    steps: [
      {
        title: "Choose a Service",
        description:
          "Select the astrology or spiritual service that matches your needs.",
      },
      {
        title: "Choose an Acharya",
        description:
          "Explore experienced Acharyas and select the expert you want to consult.",
      },
      {
        title: "Book Your Consultation",
        description:
          "Select your preferred date, time and consultation mode.",
      },
      
    ],
  },

  hi: {
    eyebrow: "✦ अपनी यात्रा शुरू करें",
    title: "पाएं वह मार्गदर्शन",
    titleHighlight: " जिसकी आप तलाश कर रहे हैं।",
    description:
      "व्यक्तिगत ज्योतिष और आध्यात्मिक मार्गदर्शन के लिए अनुभवी आचार्य से जुड़ें।",
    button: "आचार्यों को देखें →",
    howTitle: "तीन आसान चरणों में मार्गदर्शन।",
    steps: [
      {
        title: "सेवा चुनें",
        description:
          "अपनी जरूरत के अनुसार ज्योतिष या आध्यात्मिक सेवा चुनें।",
      },
      {
        title: "आचार्य चुनें",
        description:
          "अनुभवी आचार्यों को देखें और अपने लिए उपयुक्त विशेषज्ञ चुनें।",
      },
      {
        title: "परामर्श बुक करें",
        description:
          "अपनी पसंद की तारीख, समय और परामर्श का तरीका चुनें।",
      },
    ],
  },

  kn: {
    eyebrow: "✦ ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ",
    title: "ನಿಮಗೆ ಬೇಕಾದ",
    titleHighlight: " ಮಾರ್ಗದರ್ಶನವನ್ನು ಕಂಡುಕೊಳ್ಳಿ.",
    description:
      "ವೈಯಕ್ತಿಕ ಜ್ಯೋತಿಷ್ಯ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಅನುಭವಿ ಆಚಾರ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    button: "ಆಚಾರ್ಯರನ್ನು ನೋಡಿ →",
    howTitle: "ಮೂರು ಸರಳ ಹಂತಗಳಲ್ಲಿ ಮಾರ್ಗದರ್ಶನ.",
    steps: [
      {
        title: "ಸೇವೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
        description:
          "ನಿಮ್ಮ ಅಗತ್ಯಕ್ಕೆ ತಕ್ಕ ಜ್ಯೋತಿಷ್ಯ ಅಥವಾ ಆಧ್ಯಾತ್ಮಿಕ ಸೇವೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      },
      {
        title: "ಆಚಾರ್ಯರನ್ನು ಆಯ್ಕೆಮಾಡಿ",
        description:
          "ಅನುಭವಿ ಆಚಾರ್ಯರನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ನಿಮಗೆ ಬೇಕಾದ ತಜ್ಞರನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      },
      {
        title: "ಸಮಾಲೋಚನೆ ಬುಕ್ ಮಾಡಿ",
        description:
          "ನಿಮ್ಮ ಆಯ್ಕೆಯ ದಿನಾಂಕ, ಸಮಯ ಮತ್ತು ಸಮಾಲೋಚನೆಯ ವಿಧಾನವನ್ನು ಆರಿಸಿ.",
      },
    ],
  },
};

function ServicesPage() {
 const { language, t } = useLanguage();
const navigate = useNavigate();

const currentLanguage = SERVICES_TRANSLATIONS[language]
  ? language
  : "en";

const text = SERVICES_TRANSLATIONS[currentLanguage];

  return (
    <div className="services-page">

      <Navbar />

      <main>

        {/* ================= HERO ================= */}

        <section className="services-page-hero">

          <div className="services-page-container">

       <span className="services-page-label">
  {text.eyebrow}
</span>

<h1>
  {text.title}
  <span>{text.titleHighlight}</span>
</h1>

<p>{text.description}</p>

<button
  className="services-page-hero-button"
  type="button"
  onClick={() => navigate("/acharyas")}
>
  {text.button}
</button>

          </div>

        </section>


        {/* ================= SERVICES ================= */}

        <section className="services-page-list">

          <div className="services-page-container">

            <div className="services-page-heading">

              <span>
                WHAT WE OFFER
              </span>

              <h2>
                Traditional guidance,
                <strong> made accessible.</strong>
              </h2>

              <p>
                Explore our range of astrology and spiritual
                guidance services and connect with an
                experienced Acharya.
              </p>

            </div>


            <div className="services-page-grid">

              {serviceData.map((service, index) => {

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
                    className="services-page-card"
                    key={service.key}
                  >

                    <div className="services-page-card-top">

                      <div className="services-page-icon">
                        {service.icon}
                      </div>

                      <span>
                        {String(index + 1).padStart(2, "0")}
                      </span>

                    </div>


                    <h3>
                      {title}
                    </h3>

                    <p>
                      {description}
                    </p>


                    <button
                      type="button"
                      onClick={() =>
                        navigate(service.path)
                      }
                    >
                      Explore Service
                      <span>→</span>
                    </button>

                  </article>
                );
              })}

            </div>

          </div>

        </section>


        {/* ================= HOW IT WORKS ================= */}

        <section className="services-page-process">

          <div className="services-page-container">

            <div className="services-page-heading center">

              <h2>{text.howTitle}</h2>

{text.steps.map((step, index) => (
  <div className="step-card" key={step.title}>
    <span>0{index + 1}</span>
    <h3>{step.title}</h3>
    <p>{step.description}</p>
  </div>
))}

            </div>


            <div className="services-process-grid">

              <div className="services-process-card">

                <div className="process-number">
                  01
                </div>

                <h3>
                  Choose a Service
                </h3>

                <p>
                  Select the astrology or spiritual
                  service that matches your needs.
                </p>

              </div>


              <div className="services-process-card">

                <div className="process-number">
                  02
                </div>

                <h3>
                  Choose an Acharya
                </h3>

                <p>
                  Explore experienced Acharyas and
                  select the expert you want to consult.
                </p>

              </div>


              <div className="services-process-card">

                <div className="process-number">
                  03
                </div>

                <h3>
                  Book Your Consultation
                </h3>

                <p>
                  Select your preferred date, time and
                  consultation mode.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ================= CTA ================= */}

        <section className="services-page-cta">

          <div className="services-page-container">

            <span>
              ✦ BEGIN YOUR JOURNEY
            </span>

            <h2>
              Find the guidance
              <strong> you're looking for.</strong>
            </h2>

            <p>
              Connect with an experienced Acharya
              for personalized astrology and spiritual
              guidance.
            </p>

            <button
              type="button"
              onClick={() => navigate("/acharyas")}
            >
              Explore Acharyas →
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default ServicesPage;