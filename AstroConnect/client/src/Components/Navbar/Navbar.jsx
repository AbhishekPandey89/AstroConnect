import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { language, changeLanguage, t } = useLanguage();

  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  // =====================================================
  // NAVIGATION
  // =====================================================

  const goTo = (path) => {
    setMobileOpen(false);
    setLanguageOpen(false);

    navigate(path);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // HOME SECTION SCROLL
  // =====================================================

  const scrollToSection = (id) => {
    setMobileOpen(false);
    setLanguageOpen(false);

    // If already on home page
    if (location.pathname === "/") {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    // If on another page, go home first
    navigate("/");

    setTimeout(() => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 150);
  };

  // =====================================================
  // AUTH
  // =====================================================

  const handleLogin = () => {
    goTo("/login");
  };

  const handleRegister = () => {
    goTo("/register");
  };

  const handleDashboard = () => {
    goTo("/dashboard");
  };

  // ================= MY BOOKINGS =================

  const handleMyBookings = () => {
    goTo("/my-bookings");
  };

  const handleLogout = () => {
    logout();
    goTo("/");
  };

  // =====================================================
  // AI HELP
  // =====================================================

  const handleAIHelp = () => {
    goTo("/ai-help");
  };

  // =====================================================
  // BOOKING
  // =====================================================

  const handleBooking = () => {
    goTo("/booking");
  };

  // =====================================================
  // LANGUAGE
  // =====================================================

  const selectLanguage = (lang) => {
    changeLanguage(lang);

    setLanguageOpen(false);
    setMobileOpen(false);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* =====================================================
            LOGO
        ===================================================== */}

        <button
          className="navbar-logo"
          onClick={() => goTo("/")}
          type="button"
          aria-label="AstroConnect Home"
        >
          <img
            src="/astroconnect-logo.png"
            alt="AstroConnect"
            className="navbar-logo-image"
          />
        </button>


        {/* =====================================================
            DESKTOP NAVIGATION
        ===================================================== */}

        <nav className="navbar-links">

          {/* HOME */}

          <button
            type="button"
            onClick={() => goTo("/")}
          >
            {t("nav", "home")}
          </button>


          {/* ACHARYAS */}

          <button
            type="button"
            onClick={() => goTo("/acharyas")}
          >
            {t("nav", "acharyas")}
          </button>


          {/* SERVICES */}

          <button
            type="button"
            onClick={() => goTo("/services")}
          >
            {t("nav", "services")}
          </button>


          {/* POOJA */}

          <button
            type="button"
            onClick={() => goTo("/pooja")}
          >
            {t("nav", "pooja")}
          </button>


          {/* KUNDALI */}

          <button
            type="button"
            onClick={() => goTo("/kundali")}
          >
            {t("nav", "kundali")}
          </button>


          {/* VASTU */}


          {/* MUHURAT */}

          <button
            type="button"
            onClick={() => goTo("/muhurat")}
          >
            {t("nav", "muhurat")}
          </button>


          {/* GALLERY */}

          <button
            type="button"
            onClick={() => goTo("/gallery")}
          >
            Gallery
          </button>

          {/* CONTACT */}

          <button
            type="button"
            onClick={() => goTo("/contact")}
          >
            Contact
          </button>

        </nav>


        {/* =====================================================
            DESKTOP ACTIONS
        ===================================================== */}

        <div className="navbar-actions">

          {/* ================= AI HELP ================= */}

          <button
            className="ai-help-btn"
            onClick={handleAIHelp}
            type="button"
          >
            ✨ {t("nav", "aiHelp")}
          </button>


          {/* ================= LANGUAGE ================= */}

          <div className="language-wrapper">

            <button
              className="language-btn"
              onClick={() =>
                setLanguageOpen(!languageOpen)
              }
              type="button"
            >
              🌐 {language.toUpperCase()} ▾
            </button>


            {languageOpen && (

              <div className="language-dropdown">

                {/* ENGLISH */}

                <button
                  type="button"
                  className={
                    language === "en"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    selectLanguage("en")
                  }
                >
                  🇬🇧 English
                </button>


                {/* HINDI */}

                <button
                  type="button"
                  className={
                    language === "hi"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    selectLanguage("hi")
                  }
                >
                  🇮🇳 हिन्दी
                </button>


                {/* KANNADA */}

                <button
                  type="button"
                  className={
                    language === "kn"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    selectLanguage("kn")
                  }
                >
                  🇮🇳 ಕನ್ನಡ
                </button>

              </div>

            )}

          </div>


          {/* =====================================================
              AUTH
          ===================================================== */}

          {!isAuthenticated ? (

            <>

              {/* LOGIN */}

              <button
                className="login-btn"
                onClick={handleLogin}
                type="button"
              >
                {t("nav", "login")}
              </button>


              {/* REGISTER */}

              <button
                className="register-btn"
                onClick={handleRegister}
                type="button"
              >
                {t("nav", "register")}
              </button>

            </>

          ) : (

            <>

              {/* DASHBOARD */}

              <button
                className="login-btn"
                onClick={handleDashboard}
                type="button"
              >
                👤{" "}
                {user?.name ||
                  t("nav", "dashboard")}
              </button>


              {/* MY BOOKINGS */}

              <button
                className="login-btn"
                onClick={handleMyBookings}
                type="button"
              >
                📅 My Bookings
              </button>


              {/* LOGOUT */}

              <button
                className="login-btn"
                onClick={handleLogout}
                type="button"
              >
                {t("nav", "logout")}
              </button>

            </>

          )}

        </div>


        {/* =====================================================
            MOBILE MENU BUTTON
        ===================================================== */}

        <button
          className="mobile-menu-btn"
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
          aria-label="Toggle menu"
          type="button"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>

      </div>


      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      {mobileOpen && (

        <div className="mobile-menu">

          {/* HOME */}

          <button
            type="button"
            onClick={() => goTo("/")}
          >
            {t("nav", "home")}
          </button>


          {/* ACHARYAS */}

          <button
            type="button"
            onClick={() => goTo("/acharyas")}
          >
            {t("nav", "acharyas")}
          </button>


          {/* SERVICES */}

          <button
            type="button"
            onClick={() => goTo("/services")}
          >
            {t("nav", "services")}
          </button>


          {/* POOJA */}

          <button
            type="button"
            onClick={() => goTo("/pooja")}
          >
            {t("nav", "pooja")}
          </button>


          {/* KUNDALI */}

          <button
            type="button"
            onClick={() => goTo("/kundali")}
          >
            {t("nav", "kundali")}
          </button>


          {/* VASTU */}



          {/* MUHURAT */}

          <button
            type="button"
            onClick={() => goTo("/muhurat")}
          >
            {t("nav", "muhurat")}
          </button>


          {/* AI HELP */}

          <button
            type="button"
            onClick={handleAIHelp}
          >
            ✨ {t("nav", "aiHelp")}
          </button>

          {/* GALLERY */}

          <button
            type="button"
            onClick={() => goTo("/gallery")}
          >
            Gallery
          </button>

          {/* CONTACT */}

          <button
            type="button"
            onClick={() => goTo("/contact")}
          >
            Contact
          </button>


          {/* BOOK CONSULTATION */}

          <button
            type="button"
            onClick={handleBooking}
          >
            📅 {t("nav", "bookConsultation")}
          </button>


          {/* =====================================================
              MOBILE LANGUAGE
          ===================================================== */}

          <div className="mobile-language">

            <span>
              {t("nav", "chooseLanguage")}
            </span>


            <div className="mobile-language-buttons">

              {/* ENGLISH */}

              <button
                type="button"
                className={
                  language === "en"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  selectLanguage("en")
                }
              >
                🇬🇧 EN
              </button>


              {/* HINDI */}

              <button
                type="button"
                className={
                  language === "hi"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  selectLanguage("hi")
                }
              >
                🇮🇳 HI
              </button>


              {/* KANNADA */}

              <button
                type="button"
                className={
                  language === "kn"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  selectLanguage("kn")
                }
              >
                🇮🇳 KN
              </button>

            </div>

          </div>


          {/* =====================================================
              MOBILE AUTH
          ===================================================== */}

          {!isAuthenticated ? (

            <>

              {/* LOGIN */}

              <button
                type="button"
                onClick={handleLogin}
              >
                {t("nav", "login")}
              </button>


              {/* REGISTER */}

              <button
                type="button"
                className="mobile-register-btn"
                onClick={handleRegister}
              >
                {t("nav", "register")}
              </button>

            </>

          ) : (

            <>

              {/* DASHBOARD */}

              <button
                type="button"
                onClick={handleDashboard}
              >
                👤{" "}
                {user?.name ||
                  t("nav", "dashboard")}
              </button>


              {/* MY BOOKINGS */}

              <button
                type="button"
                onClick={handleMyBookings}
              >
                📅 My Bookings
              </button>


              {/* LOGOUT */}

              <button
                type="button"
                onClick={handleLogout}
              >
                {t("nav", "logout")}
              </button>

            </>

          )}

        </div>

      )}

    </header>
  );
}

export default Navbar;