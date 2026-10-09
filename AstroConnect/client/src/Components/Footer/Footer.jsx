
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Our Acharyas", href: "/acharyas" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/contact" },
    { label: "Careers", href: "/career" },
  ];

  const services = [
    { label: "Kundali", href: "/kundali" },
    { label: "Pooja", href: "/pooja" },
    { label: "Vastu", href: "/vastu" },
    { label: "Jyotish", href: "/jyotish" },
    { label: "Muhurat", href: "/muhurat" },
    { label: "Numerology", href: "/numerology" },
    { label: "Tarot Reading", href: "/tarot" },
  ];

  return (
    <footer className="astro-footer">
      <div className="astro-footer-glow" aria-hidden="true" />

      <div className="astro-footer-container">
        {/* Brand */}
        <div className="astro-footer-brand">
          <a
            href="/"
            className="astro-footer-brand-link"
            aria-label="AstroConnect home"
          >
            <img
              src="/astroconnect-logo.png"
              alt="AstroConnect Logo"
              className="astro-footer-logo-image"
            />

            <span className="astro-footer-brand-name">
              Astro<span>Connect</span>
            </span>
          </a>

          <p className="astro-footer-description">
            Connect with trusted astrologers and discover meaningful
            guidance for your life's journey. Find clarity, positivity,
            and direction with AstroConnect.
          </p>

          <div className="astro-footer-trust">
            <span className="astro-footer-trust-icon" aria-hidden="true">
              ✦
            </span>
            <span>Guidance for your journey</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="astro-footer-column">
          <h3>Quick Links</h3>
          {quickLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        {/* Services */}
        <div className="astro-footer-column">
          <h3>Our Services</h3>
          {services.map((service) => (
            <a href={service.href} key={service.href}>
              {service.label}
            </a>
          ))}
        </div>

        {/* Connect */}
        <div className="astro-footer-column astro-footer-connect">
          <h3>Connect With Us</h3>

          <p className="astro-footer-connect-text">
            Have questions or need assistance? We are here to help.
          </p>

          <a className="astro-footer-contact-link" href="/contact">
            <span aria-hidden="true">✉</span>
            Contact our team
            <span className="astro-footer-arrow" aria-hidden="true">
              ↗
            </span>
          </a>

          <div className="astro-footer-socials">
            <a href="/contact" aria-label="Contact AstroConnect">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M4 5h16v14H4z" />
                <path d="m4 7 8 6 8-6" />
              </svg>
            </a>

            <a href="/gallery" aria-label="Explore AstroConnect gallery">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="astro-footer-bottom">
        <p>
          © {currentYear} <strong>AstroConnect</strong>. All rights reserved.
        </p>

        <p className="astro-footer-credit">
          Crafted with <span aria-label="love">♥</span> by{" "}
          <strong>Abhishek Pandey</strong>
        </p>

        <a className="astro-footer-back-top" href="#root">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
