
import "./Footer.css";
import { useLanguage } from "../../context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { key: "home", href: "/" },
    { key: "aboutUs", href: "/about" },
    { key: "services", href: "/services" },
    { key: "ourAcharyas", href: "/acharyas" },
    { key: "gallery", href: "/gallery" },
    { key: "contactUs", href: "/contact" },
    { key: "careers", href: "/career" },
  ];

  const services = [
    { key: "kundali", href: "/kundali" },
    { key: "pooja", href: "/pooja" },
    { key: "vastu", href: "/vastu" },
    { key: "jyotish", href: "/jyotish" },
    { key: "muhurat", href: "/muhurat" },
    { key: "numerology", href: "/numerology" },
    { key: "tarotReading", href: "/tarot" },
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
            {t("footer.description")}
          </p>

          <div className="astro-footer-trust">
            <span className="astro-footer-trust-icon" aria-hidden="true">
              ✦
            </span>
            <span>{t("footer.trust")}</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="astro-footer-column">
          <h3>{t("footer.quickLinksTitle")}</h3>

          {quickLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {t(`footer.quickLinks.${link.key}`)}
            </a>
          ))}
        </div>

        {/* Services */}
        <div className="astro-footer-column">
          <h3>{t("footer.servicesTitle")}</h3>

          {services.map((service) => (
            <a href={service.href} key={service.href}>
              {t(`footer.services.${service.key}`)}
            </a>
          ))}
        </div>

        {/* Connect */}
        <div className="astro-footer-column astro-footer-connect">
          <h3>{t("footer.connectTitle")}</h3>

          <p className="astro-footer-connect-text">
            {t("footer.connectDescription")}
          </p>

          <a className="astro-footer-contact-link" href="/contact">
            <span aria-hidden="true">✉</span>
            {t("footer.contactTeam")}
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
          © {currentYear} <strong>AstroConnect</strong>.{" "}
          {t("footer.rights")}
        </p>

        <p className="astro-footer-credit">
          {t("footer.craftedWith")}{" "}
          <span aria-label="love">♥</span> {t("footer.by")}{" "}
          <strong>Abhishek Pandey</strong>
        </p>

        <a className="astro-footer-back-top" href="#root">
          {t("footer.backToTop")}{" "}
          <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
