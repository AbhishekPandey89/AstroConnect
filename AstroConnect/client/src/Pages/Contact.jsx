import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { createContactMessage } from "../services/api";
import Navbar from "../Components/Navbar/Navbar";
import "./Contact.css";

const CONTACT = {
  phone: "+91XXXXXXXXXX",
  whatsapp: "91XXXXXXXXXX",
  email: "support@astroconnect.com",
  location:
    "https://www.google.com/maps/search/?api=1&query=New+Delhi+India",
};

const Contact = () => {
  const { language, t } = useLanguage();
 const ui = (key) => t("contact", key);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setError(ui("requiredError"));
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setError(ui("invalidEmail"));
      return;
    }

    try {
      const data = await createContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      if (!data.success) {
        throw new Error(
          data.message || ui("submitError")
        );
      }

      setSuccess(
        ui("success")
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(
        "❌ Contact form error:",
        error
      );

      setError(
        error.message ||
        ui("generalError")
      );
    }
  };

  const handleCall = () => {
    window.location.href = `tel:${CONTACT.phone}`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello AstroConnect, I want to know more about your astrology services."
    );

    window.open(
      `https://wa.me/${CONTACT.whatsapp}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleEmail = () => {
    window.location.href = `mailto:${CONTACT.email}`;
  };

  const handleLocation = () => {
    window.open(
      CONTACT.location,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <Navbar />

      <main className="contact-page">
        {/* HERO */}
        <section className="contact-hero">
          <div className="contact-hero-content">
            <span className="contact-badge">
              ✦ {ui("getInTouch")}
            </span>

            <h1>
              {ui("connectWith")}{" "}
              <span>AstroConnect</span>
            </h1>

            <p>
              {ui("heroDescription")}
            </p>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="contact-section">
          <div className="contact-container">

            {/* LEFT SIDE */}
            <div className="contact-info">
              <div className="contact-heading">
                <span>{ui("contactUs")}</span>

                <h2>
                  {ui("heading")}
                </h2>

                <p>
                  {ui("contactDescription")}
                </p>
              </div>

              <div className="contact-info-list">

                {/* LOCATION */}
                <button
                  type="button"
                  className="contact-info-card contact-clickable"
                  onClick={handleLocation}
                >
                  <div className="contact-icon">
                    📍
                  </div>

                  <div>
                    <h3>{ui("ourLocation")}</h3>
                    <p>{ui("locationName")}</p>
                    <span className="contact-action-text">
                      {ui("openMaps")}
                    </span>
                  </div>
                </button>

                {/* CALL */}
                <button
                  type="button"
                  className="contact-info-card contact-clickable"
                  onClick={handleCall}
                >
                  <div className="contact-icon">
                    📞
                  </div>

                  <div>
                    <h3>{ui("callUs")}</h3>
                    <p>{CONTACT.phone}</p>
                    <span className="contact-action-text">
                      {ui("callNow")}
                    </span>
                  </div>
                </button>

                {/* WHATSAPP */}
                <button
                  type="button"
                  className="contact-info-card contact-clickable"
                  onClick={handleWhatsApp}
                >
                  <div className="contact-icon whatsapp-icon">
                    🟢
                  </div>

                  <div>
                    <h3>{ui("whatsappUs")}</h3>
                    <p>{ui("chatTeam")}</p>
                    <span className="contact-action-text">
                      {ui("chatWhatsapp")}
                    </span>
                  </div>
                </button>

                {/* EMAIL */}
                <button
                  type="button"
                  className="contact-info-card contact-clickable"
                  onClick={handleEmail}
                >
                  <div className="contact-icon">
                    ✉️
                  </div>

                  <div>
                    <h3>{ui("emailUs")}</h3>
                    <p>{CONTACT.email}</p>
                    <span className="contact-action-text">
                      {ui("sendEmail")}
                    </span>
                  </div>
                </button>

                {/* WORKING HOURS */}
                <div className="contact-info-card">
                  <div className="contact-icon">
                    🕐
                  </div>

                  <div>
                    <h3>{ui("workingHours")}</h3>
                    <p>
                      {ui("workingDays")}
                      <br />
                      9:00 AM – 9:00 PM
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT SIDE FORM */}
            <div className="contact-form-card">
              <div className="contact-form-heading">
                <h2>{ui("sendMessage")}</h2>

                <p>
                  {ui("formDescription")}
                </p>
              </div>

              <form
                className="contact-form"
                onSubmit={handleSubmit}
              >
                <div className="contact-form-row">

                  <div className="contact-field">
                    <label>{ui("fullName")} *</label>

                    <input
                      type="text"
                      name="name"
                      placeholder={ui("enterName")}
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="contact-field">
                    <label>{ui("emailAddress")} *</label>

                    <input
                      type="email"
                      name="email"
                      placeholder={ui("enterEmail")}
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                </div>

                <div className="contact-form-row">

                  <div className="contact-field">
                    <label>{ui("phoneNumber")}</label>

                    <input
                      type="tel"
                      name="phone"
                      placeholder={ui("enterPhone")}
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="contact-field">
                    <label>{ui("subject")} *</label>
                    <input
                      type="text"
                      name="subject"
                      placeholder={ui("query")}
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>

                </div>

                <div className="contact-field">
                  <label>{ui("yourMessage")} *</label>

                  <textarea
                    name="message"
                    placeholder={ui("messagePlaceholder")}
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                {error && (
                  <p className="contact-message contact-error">
                    {error}
                  </p>
                )}

                {success && (
                  <p className="contact-message contact-success">
                    {success}
                  </p>
                )}

                <button
                  type="submit"
                  className="contact-submit-btn"
                >
                  {ui("send")}
                  <span>→</span>
                </button>
              </form>
            </div>

          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;