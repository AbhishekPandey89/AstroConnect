import { useState } from "react";
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
    setError("Please fill all required fields.");
    return;
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(formData.email)) {
    setError("Please enter a valid email address.");
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
        data.message || "Unable to submit message."
      );
    }

    setSuccess(
      "Thank you! Your message has been submitted successfully."
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
        "Something went wrong. Please try again."
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
              ✦ Get In Touch
            </span>

            <h1>
              Connect With{" "}
              <span>AstroConnect</span>
            </h1>

            <p>
              Have a question, need guidance, or want to
              know more about our astrology services?
              We are here to help.
            </p>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="contact-section">
          <div className="contact-container">

            {/* LEFT SIDE */}
            <div className="contact-info">
              <div className="contact-heading">
                <span>CONTACT US</span>

                <h2>
                  We'd Love To Hear From You
                </h2>

                <p>
                  Reach out to us for any queries regarding
                  Acharya consultations, Kundali, Pooja,
                  Vastu, Muhurat or other services.
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
                    <h3>Our Location</h3>
                    <p>New Delhi, India</p>
                    <span className="contact-action-text">
                      Open in Google Maps →
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
                    <h3>Call Us</h3>
                    <p>{CONTACT.phone}</p>
                    <span className="contact-action-text">
                      Call Now →
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
                    <h3>WhatsApp Us</h3>
                    <p>Chat with our team</p>
                    <span className="contact-action-text">
                      Chat on WhatsApp →
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
                    <h3>Email Us</h3>
                    <p>{CONTACT.email}</p>
                    <span className="contact-action-text">
                      Send Email →
                    </span>
                  </div>
                </button>

                {/* WORKING HOURS */}
                <div className="contact-info-card">
                  <div className="contact-icon">
                    🕐
                  </div>

                  <div>
                    <h3>Working Hours</h3>
                    <p>
                      Monday – Sunday
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
                <h2>Send Us A Message</h2>

                <p>
                  Fill out the form and our team will get
                  back to you.
                </p>
              </div>

              <form
                className="contact-form"
                onSubmit={handleSubmit}
              >
                <div className="contact-form-row">

                  <div className="contact-field">
                    <label>
                      Full Name *
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="contact-field">
                    <label>
                      Email Address *
                    </label>

                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                </div>

                <div className="contact-form-row">

                  <div className="contact-field">
                    <label>
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="contact-field">
                    <label>
                      Subject *
                    </label>

                    <input
                      type="text"
                      name="subject"
                      placeholder="What is your query?"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>

                </div>

                <div className="contact-field">
                  <label>
                    Your Message *
                  </label>

                  <textarea
                    name="message"
                    placeholder="Write your message here..."
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
                  Send Message
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