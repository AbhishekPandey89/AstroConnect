import { useState } from "react";
import "./Gallery.css";

const galleryItems = [
  {
    id: 1,
    title: "Vedic Astrology",
    category: "Astrology",
    image: "/gallery/vedic-astrology.jpg",
  },
  {
    id: 2,
    title: "Sacred Pooja",
    category: "Pooja",
    image: "/gallery/sacred-pooja.jpg",
  },
  {
    id: 3,
    title: "Vastu Guidance",
    category: "Vastu",
    image: "/gallery/vastu-guidance.jpg",
  },
  {
    id: 4,
    title: "Spiritual Ceremony",
    category: "Ceremony",
    image: "/gallery/spiritual-ceremony.jpg",
  },
  {
    id: 5,
    title: "Kundali Reading",
    category: "Astrology",
    image: "/gallery/kundali-reading.jpg",
  },
  {
    id: 6,
    title: "Marriage Muhurat",
    category: "Muhurat",
    image: "/gallery/marriage-muhurat.jpg",
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
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter(
          (item) => item.category === activeCategory
        );

  return (
    <>
      <main className="gallery-page">
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

            {/* Gallery Grid */}
            <div className="gallery-grid">
              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  className={`gallery-card gallery-${item.id}`}
                  onClick={() => setSelectedImage(item)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="gallery-image"
                  />

                  <div className="gallery-overlay">
                    <div>
                      <small>{item.category}</small>
                      <h3>{item.title}</h3>
                    </div>

                    <button
                      type="button"
                      aria-label={`View ${item.title}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedImage(item);
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
              <p>More spiritual moments coming soon.</p>

              <button
                type="button"
                onClick={() => setActiveCategory("All")}
              >
                View Full Gallery →
              </button>
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="gallery-lightbox"
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              className="gallery-lightbox-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image"
            >
              ×
            </button>

            <div
              className="gallery-lightbox-content"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
              />

              <div className="gallery-lightbox-info">
                <span>{selectedImage.category}</span>
                <h3>{selectedImage.title}</h3>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default Gallery;