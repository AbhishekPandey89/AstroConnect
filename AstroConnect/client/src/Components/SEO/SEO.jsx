import { Helmet } from "react-helmet-async";

function SEO({
  title = "AstroConnect | Astrology & Spiritual Guidance",
  description = "Connect with experienced Acharyas for astrology, Kundali, Vastu, Pooja, Muhurat and personalized spiritual guidance.",
  keywords = "Astrology, Kundali, Vastu, Pooja, Muhurat, Jyotish, Acharya, Spiritual Guidance, AstroConnect",
  canonical = "https://astroconnect.com/",
}) {
  return (
    <Helmet>
      {/* ================= BASIC SEO ================= */}

      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      <meta
        name="keywords"
        content={keywords}
      />

      <meta
        name="robots"
        content="index, follow"
      />

      <meta
        name="author"
        content="AstroConnect"
      />

      {/* ================= CANONICAL ================= */}

      <link
        rel="canonical"
        href={canonical}
      />

      {/* ================= OPEN GRAPH ================= */}

      <meta
        property="og:title"
        content={title}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:url"
        content={canonical}
      />

      <meta
        property="og:site_name"
        content="AstroConnect"
      />

      {/* ================= TWITTER ================= */}

      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={title}
      />

      <meta
        name="twitter:description"
        content={description}
      />

    </Helmet>
  );
}

export default SEO;