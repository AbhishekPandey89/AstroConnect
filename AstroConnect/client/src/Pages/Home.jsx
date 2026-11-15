import Navbar from "../Components/Navbar/Navbar";
import Hero from "../Components/Hero/Hero";
import Services from "../Components/Services/Services";
import Acharyas from "../Components/Acharyas/Acharyas";
import HowItWorks from "../Components/HowItWorks/HowItWorks";
import Reviews from "../Components/Reviews/Reviews";
import Cities from "../Components/Cities/Cities";
import Gallery from "../Components/Gallery/Gallery";
import AIHelp from "../Components/AIHelp/AIHelp";
import Booking from "../Components/Booking/Booking";
import AboutPreview from "../Components/AboutPreview/AboutPreview";
import SEO from "../Components/SEO/SEO";

function Home() {
  return (
    <div className="home-page">
      <Navbar />

      <main>

        <SEO
          title="AstroConnect | Astrology, Kundali & Spiritual Guidance"
          description="Explore Vedic astrology, Kundali, Vastu, Pooja, Muhurat, Numerology and Tarot services. Connect with experienced Acharyas for personalized spiritual guidance."
          keywords="AstroConnect, Astrology, Vedic Astrology, Kundali, Vastu, Pooja, Muhurat, Numerology, Tarot, Jyotish, Acharyas"
          canonical="https://astroconnect.com/"
        />
        <section id="home">
          <Hero />
        </section>

        <section id="about">
          <AboutPreview />
        </section>

        <section id="services">
          <Services />
        </section>

        <section id="acharyas">
          <Acharyas />
        </section>

        <section id="how-it-works">
          <HowItWorks />
        </section>

        <section id="reviews">
          <Reviews />
        </section>

        <section id="cities">
          <Cities />
        </section>

        <section id="gallery">
          <Gallery />
        </section>

        <section id="ai-help">
          <AIHelp />
        </section>

        <section id="booking">
          <Booking />
        </section>
      </main>
    </div>
  );
}

export default Home;