
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./Gallery.css";

const galleryItems = [
  { id: 1, title: "Vedic Astrology", category: "Astrology", image: "/gallery/vedic-astrology.jpg" },
  { id: 2, title: "Sacred Pooja", category: "Pooja", image: "/gallery/sacred-pooja.jpg" },
  { id: 3, title: "Vastu Guidance", category: "Vastu", image: "/gallery/vastu-guidance.jpg" },
  { id: 4, title: "Spiritual Ceremony", category: "Ceremony", image: "/gallery/spiritual-ceremony.jpg" },
  { id: 5, title: "Kundali Reading", category: "Astrology", image: "/gallery/kundali-reading.jpg" },
  { id: 6, title: "Marriage Muhurat", category: "Muhurat", image: "/gallery/marriage-muhurat.jpg" },
];

const categories = ["All", "Astrology", "Pooja", "Vastu", "Ceremony", "Muhurat"];

const galleryText = {
  en: {
    label: "OUR GALLERY",
    heading: "Moments of",
    subheading: "Faith & Tradition",
    description: "Explore moments from our astrology consultations, spiritual ceremonies, poojas and other services.",
    categories: ["All", "Astrology", "Pooja", "Vastu", "Ceremony", "Muhurat"],
    more: "More spiritual moments coming soon.",
    viewAll: "View Full Gallery",
    view: "View",
    close: "Close image",
    items: [
      ["Vedic Astrology", "Astrology"],
      ["Sacred Pooja", "Pooja"],
      ["Vastu Guidance", "Vastu"],
      ["Spiritual Ceremony", "Ceremony"],
      ["Kundali Reading", "Astrology"],
      ["Marriage Muhurat", "Muhurat"],
    ],
  },
  hi: {
    label: "हमारी गैलरी",
    heading: "आस्था के",
    subheading: "पावन पल",
    description: "हमारी ज्योतिष परामर्श सेवाओं, पूजा-पाठ, धार्मिक समारोहों और अन्य सेवाओं की झलक देखें।",
    categories: ["सभी", "ज्योतिष", "पूजा", "वास्तु", "समारोह", "मुहूर्त"],
    more: "और भी आध्यात्मिक झलकियाँ जल्द आ रही हैं।",
    viewAll: "पूरी गैलरी देखें",
    view: "देखें",
    close: "तस्वीर बंद करें",
    items: [
      ["वैदिक ज्योतिष", "ज्योतिष"],
      ["पवित्र पूजा", "पूजा"],
      ["वास्तु मार्गदर्शन", "वास्तु"],
      ["आध्यात्मिक समारोह", "समारोह"],
      ["कुंडली अध्ययन", "ज्योतिष"],
      ["विवाह मुहूर्त", "मुहूर्त"],
    ],
  },
  kn: {
    label: "ನಮ್ಮ ಗ್ಯಾಲರಿ",
    heading: "ನಂಬಿಕೆಯ",
    subheading: "ಪವಿತ್ರ ಕ್ಷಣಗಳು",
    description: "ನಮ್ಮ ಜ್ಯೋತಿಷ್ಯ ಸಲಹೆಗಳು, ಪೂಜೆಗಳು, ಧಾರ್ಮಿಕ ಸಮಾರಂಭಗಳು ಮತ್ತು ಇತರ ಸೇವೆಗಳ ಕ್ಷಣಗಳನ್ನು ವೀಕ್ಷಿಸಿ.",
    categories: ["ಎಲ್ಲವೂ", "ಜ್ಯೋತಿಷ್ಯ", "ಪೂಜೆ", "ವಾಸ್ತು", "ಸಮಾರಂಭ", "ಮುಹೂರ್ತ"],
    more: "ಇನ್ನಷ್ಟು ಆಧ್ಯಾತ್ಮಿಕ ಕ್ಷಣಗಳು ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿವೆ.",
    viewAll: "ಪೂರ್ಣ ಗ್ಯಾಲರಿ ವೀಕ್ಷಿಸಿ",
    view: "ವೀಕ್ಷಿಸಿ",
    close: "ಚಿತ್ರವನ್ನು ಮುಚ್ಚಿ",
    items: [
      ["ವೇದ ಜ್ಯೋತಿಷ್ಯ", "ಜ್ಯೋತಿಷ್ಯ"],
      ["ಪವಿತ್ರ ಪೂಜೆ", "ಪೂಜೆ"],
      ["ವಾಸ್ತು ಮಾರ್ಗದರ್ಶನ", "ವಾಸ್ತು"],
      ["ಆಧ್ಯಾತ್ಮಿಕ ಸಮಾರಂಭ", "ಸಮಾರಂಭ"],
      ["ಜಾತಕ ಓದು", "ಜ್ಯೋತಿಷ್ಯ"],
      ["ವಿವಾಹ ಮುಹೂರ್ತ", "ಮುಹೂರ್ತ"],
    ],
  },
};

function Gallery() {
  const { language } = useLanguage();
  const text = galleryText[language] || galleryText.en;

  // Store the original category key so filtering works in every language.
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const selectedItemIndex = selectedImage
    ? galleryItems.findIndex((item) => item.id === selectedImage.id)
    : -1;

  const selectedItemText = selectedItemIndex >= 0
    ? text.items[selectedItemIndex]
    : null;

  return (
    <main className="gallery-page">
      <section className="gallery-section" id="gallery">
        <div className="gallery-container">
          <div className="section-heading gallery-heading">
            <span className="section-label">✦ {text.label}</span>

            <h2>
              {text.heading}
              <span> {text.subheading}</span>
            </h2>

            <p>{text.description}</p>
          </div>

          <div className="gallery-filters">
            {categories.map((category, index) => (
              <button
                key={category}
                type="button"
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {text.categories[index]}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {filteredItems.map((item) => {
              const itemText = text.items[item.id - 1];

              return (
                <article
                  key={item.id}
                  className={`gallery-card gallery-${item.id}`}
                  onClick={() => setSelectedImage(item)}
                >
                  <img
                    src={item.image}
                    alt={itemText[0]}
                    className="gallery-image"
                  />

                  <div className="gallery-overlay">
                    <div>
                      <small>{itemText[1]}</small>
                      <h3>{itemText[0]}</h3>
                    </div>

                    <button
                      type="button"
                      aria-label={`${text.view} ${itemText[0]}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedImage(item);
                      }}
                    >
                      ↗
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="gallery-bottom">
            <p>{text.more}</p>

            <button
              type="button"
              onClick={() => setActiveCategory("All")}
            >
              {text.viewAll} →
            </button>
          </div>
        </div>
      </section>

      {selectedImage && selectedItemText && (
        <div
          className="gallery-lightbox"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="gallery-lightbox-close"
            onClick={() => setSelectedImage(null)}
            aria-label={text.close}
          >
            ×
          </button>

          <div
            className="gallery-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={selectedItemText[0]}
            />

            <div className="gallery-lightbox-info">
              <span>{selectedItemText[1]}</span>
              <h3>{selectedItemText[0]}</h3>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Gallery;
