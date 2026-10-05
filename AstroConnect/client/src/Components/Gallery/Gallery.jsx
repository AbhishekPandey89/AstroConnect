import { useState } from "react";
import "./Gallery.css";

const galleryItems = [
  {
    id: 1,
    title: "Vedic Astrology",
    category: "Astrology",
    icon: "🔮",
  },
  {
    id: 2,
    title: "Sacred Pooja",
    category: "Pooja",
    icon: "🪔",
  },
  {
    id: 3,
    title: "Vastu Guidance",
    category: "Vastu",
    icon: "🏠",
  },
  {
    id: 4,
    title: "Spiritual Ceremony",
    category: "Ceremony",
    icon: "🕉️",
  },
  {
    id: 5,
    title: "Kundali Reading",
    category: "Astrology",
    icon: "📜",
  },
  {
    id: 6,
    title: "Marriage Muhurat",
    category: "Muhurat",
    icon: "💍",
  },
];

const categories = [
  "All",
  "Astrology",
  "Pooja",
  "Vastu",
  "Ceremony",
  "Muhurat",
];

function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter(
          (item) => item.category === activeCategory
        );

  const handleViewItem = (item) => {
    alert(
      `${item.title}\n\nMore gallery content for ${item.category} will be available soon.`
    );
  };

  const handleFullGallery = () => {
    alert(
      "Full gallery will be available soon with photos from AstroConnect services and ceremonies."
    );
  };

  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-container">

        {/* Heading */}
        <div className="section-heading gallery-heading">
          <span className="section-label">
            ✦ OUR GALLERY
          </span>

          <h2>
            Moments of
            <span> Faith & Tradition</span>
          </h2>

          <p>
            Explore moments from our astrology consultations,
            spiritual ceremonies, poojas and other services.
          </p>
        </div>

        {/* Filters */}
        <div className="gallery-filters">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                activeCategory === category ? "active" : ""
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery */}
        <div className="gallery-grid">
          {filteredItems.map((item) => (
            <article
              className={`gallery-card gallery-${item.id}`}
              key={item.id}
              onClick={() => handleViewItem(item)}
            >
              <div className="gallery-placeholder">
                <span>{item.icon}</span>
              </div>

              <div className="gallery-overlay">
                <div>
                  <small>{item.category}</small>
                  <h3>{item.title}</h3>
                </div>

                <button
                  type="button"
                  aria-label={`View ${item.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewItem(item);
                  }}
                >
                  ↗
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom */}
        <div className="gallery-bottom">
          <p>
            More spiritual moments coming soon.
          </p>

          <button
            type="button"
            onClick={handleFullGallery}
          >
            View Full Gallery →
          </button>
        </div>

      </div>
    </section>
  );
}

export default Gallery;