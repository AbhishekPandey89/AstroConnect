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

    offerLabel: "WHAT WE OFFER",
    offerTitle: "Traditional guidance,",
    offerTitleHighlight: " made accessible.",
    offerDescription:
      "Explore our range of astrology and spiritual guidance services and connect with an experienced Acharya.",

    exploreService: "Explore Service",

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

    ctaLabel: "✦ BEGIN YOUR JOURNEY",
    ctaTitle: "Find the guidance",
    ctaTitleHighlight: " you're looking for.",
    ctaDescription:
      "Connect with an experienced Acharya for personalized astrology and spiritual guidance.",
    ctaButton: "Explore Acharyas →",
  },

  hi: {
    eyebrow: "✦ अपनी यात्रा शुरू करें",
    title: "पाएं वह मार्गदर्शन",
    titleHighlight: " जिसकी आप तलाश कर रहे हैं।",
    description:
      "व्यक्तिगत ज्योतिष और आध्यात्मिक मार्गदर्शन के लिए अनुभवी आचार्य से जुड़ें।",
    button: "आचार्यों को देखें →",

    offerLabel: "हम क्या प्रदान करते हैं",
    offerTitle: "पारंपरिक मार्गदर्शन,",
    offerTitleHighlight: " अब सभी के लिए सुलभ।",
    offerDescription:
      "ज्योतिष और आध्यात्मिक मार्गदर्शन की हमारी सेवाओं को जानें और अनुभवी आचार्य से जुड़ें।",

    exploreService: "सेवा देखें",

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

    ctaLabel: "✦ अपनी यात्रा शुरू करें",
    ctaTitle: "पाएं वह मार्गदर्शन",
    ctaTitleHighlight: " जिसकी आप तलाश कर रहे हैं।",
    ctaDescription:
      "व्यक्तिगत ज्योतिष और आध्यात्मिक मार्गदर्शन के लिए अनुभवी आचार्य से जुड़ें।",
    ctaButton: "आचार्यों को देखें →",
  },

  kn: {
    eyebrow: "✦ ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ",
    title: "ನಿಮಗೆ ಬೇಕಾದ",
    titleHighlight: " ಮಾರ್ಗದರ್ಶನವನ್ನು ಕಂಡುಕೊಳ್ಳಿ.",
    description:
      "ವೈಯಕ್ತಿಕ ಜ್ಯೋತಿಷ್ಯ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಅನುಭವಿ ಆಚಾರ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    button: "ಆಚಾರ್ಯರನ್ನು ನೋಡಿ →",

    offerLabel: "ನಾವು ಏನನ್ನು ಒದಗಿಸುತ್ತೇವೆ",
    offerTitle: "ಸಾಂಪ್ರದಾಯಿಕ ಮಾರ್ಗದರ್ಶನ,",
    offerTitleHighlight: " ಈಗ ಎಲ್ಲರಿಗೂ ಸುಲಭವಾಗಿ ಲಭ್ಯ.",
    offerDescription:
      "ನಮ್ಮ ಜ್ಯೋತಿಷ್ಯ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಮಾರ್ಗದರ್ಶನ ಸೇವೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ ಹಾಗೂ ಅನುಭವಿ ಆಚಾರ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",

    exploreService: "ಸೇವೆಯನ್ನು ನೋಡಿ",

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
        title: "ಸಮಾಲೋಚನೆಯನ್ನು ಬುಕ್ ಮಾಡಿ",
        description:
          "ನಿಮ್ಮ ಆಯ್ಕೆಯ ದಿನಾಂಕ, ಸಮಯ ಮತ್ತು ಸಮಾಲೋಚನೆಯ ವಿಧಾನವನ್ನು ಆರಿಸಿ.",
      },
    ],

    ctaLabel: "✦ ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ",
    ctaTitle: "ನಿಮಗೆ ಬೇಕಾದ",
    ctaTitleHighlight: " ಮಾರ್ಗದರ್ಶನವನ್ನು ಕಂಡುಕೊಳ್ಳಿ.",
    ctaDescription:
      "ವೈಯಕ್ತಿಕ ಜ್ಯೋತಿಷ್ಯ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಅನುಭವಿ ಆಚಾರ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    ctaButton: "ಆಚಾರ್ಯರನ್ನು ನೋಡಿ →",
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
                {text.offerLabel}
              </span>

              <h2>
                {text.offerTitle}
                <strong>{text.offerTitleHighlight}</strong>
              </h2>

              <p>
                {text.offerDescription}
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
                      {text.exploreService}
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

            </div>



            <div className="services-process-grid">

              {text.steps.map((step, index) => (
                <div className="services-process-card" key={step.title}>

                  <div className="process-number">
                    0{index + 1}
                  </div>

                  <h3>
                    {step.title}
                  </h3>

                  <p>
                    {step.description}
                  </p>

                </div>
              ))}

            </div>


          </div>

        </section>


        {/* ================= CTA ================= */}


        <section className="services-page-cta">

          <div className="services-page-container">

            <span>
              {text.ctaLabel}
            </span>

            <h2>
              {text.ctaTitle}
              <strong>{text.ctaTitleHighlight}</strong>
            </h2>

            <p>
              {text.ctaDescription}
            </p>

            <button
              type="button"
              onClick={() => navigate("/acharyas")}
            >
              {text.ctaButton}
            </button>

          </div>

        </section>


      </main>

    </div>
  );
}

export default ServicesPage;