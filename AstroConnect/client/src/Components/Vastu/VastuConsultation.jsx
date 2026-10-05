import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VastuConsultation.css";
import { createVastuConsultation } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

function VastuConsultation() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    propertyType: "",
    propertySize: "",
    location: "",
    facing: "",
    concern: "",
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Login check
    if (!token || !user) {
      navigate("/login", {
        state: {
          from: {
            pathname: "/vastu",
          },
        },
      });

      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const response = await createVastuConsultation(form);

      if (!response.success) {
        setError(
          response.message ||
            "Unable to submit consultation request."
        );
        return;
      }

      setSubmitted(true);

      setForm({
        propertyType: "",
        propertySize: "",
        location: "",
        facing: "",
        concern: "",
        name: user?.name || "",
        phone: user?.phone || "",
        email: user?.email || "",
      });
    } catch (err) {
      console.error(
        "Vastu consultation error:",
        err
      );

      setError(
        err.message ||
          "Unable to submit consultation request."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="vastu-consultation-section">
      <div className="vastu-consultation-container">

        {/* Heading */}
        <div className="vastu-consultation-heading">
          <span className="section-label">
            ✦ VASTU CONSULTATION
          </span>

          <h2>
            Get Personalised
            <span> Vastu Guidance</span>
          </h2>

          <p>
            Share your property details and our Vastu experts
            will help you understand the energy and direction
            of your space.
          </p>
        </div>

        {/* Form */}
        <div className="vastu-consultation-card">

          {submitted ? (
            <div className="vastu-success-message">

              <div className="vastu-success-icon">
                ✓
              </div>

              <h3>
                Consultation Request Received
              </h3>

              <p>
                Thank you for sharing your details.
                Our Vastu expert will contact you soon.
              </p>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
              >
                Submit Another Request
              </button>

            </div>
          ) : (
            <form onSubmit={handleSubmit}>

              {error && (
                <div className="vastu-form-error">
                  ⚠️ {error}
                </div>
              )}

              <div className="vastu-form-grid">

                {/* Property Type */}
                <div className="vastu-form-group">
                  <label htmlFor="propertyType">
                    Property Type *
                  </label>

                  <select
                    id="propertyType"
                    name="propertyType"
                    value={form.propertyType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select Property Type
                    </option>

                    <option value="home">
                      Home
                    </option>

                    <option value="office">
                      Office
                    </option>

                    <option value="shop">
                      Shop / Business
                    </option>

                    <option value="plot">
                      Plot
                    </option>

                    <option value="factory">
                      Factory
                    </option>
                  </select>
                </div>

                {/* Property Size */}
                <div className="vastu-form-group">
                  <label htmlFor="propertySize">
                    Property Size
                  </label>

                  <input
                    id="propertySize"
                    type="text"
                    name="propertySize"
                    value={form.propertySize}
                    onChange={handleChange}
                    placeholder="e.g. 30 × 50 ft"
                  />
                </div>

                {/* Location */}
                <div className="vastu-form-group">
                  <label htmlFor="location">
                    Property Location *
                  </label>

                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Enter city / location"
                    required
                  />
                </div>

                {/* Facing */}
                <div className="vastu-form-group">
                  <label htmlFor="facing">
                    Property Facing
                  </label>

                  <select
                    id="facing"
                    name="facing"
                    value={form.facing}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select Direction
                    </option>

                    <option value="north">
                      North
                    </option>

                    <option value="south">
                      South
                    </option>

                    <option value="east">
                      East
                    </option>

                    <option value="west">
                      West
                    </option>

                    <option value="north-east">
                      North-East
                    </option>

                    <option value="north-west">
                      North-West
                    </option>

                    <option value="south-east">
                      South-East
                    </option>

                    <option value="south-west">
                      South-West
                    </option>
                  </select>
                </div>

                {/* Name */}
                <div className="vastu-form-group">
                  <label htmlFor="name">
                    Your Name *
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="vastu-form-group">
                  <label htmlFor="phone">
                    Phone Number *
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                  />
                </div>

                {/* Email */}
                <div className="vastu-form-group vastu-form-full">
                  <label htmlFor="email">
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>

                {/* Concern */}
                <div className="vastu-form-group vastu-form-full">
                  <label htmlFor="concern">
                    Tell Us About Your Vastu Concern
                  </label>

                  <textarea
                    id="concern"
                    name="concern"
                    value={form.concern}
                    onChange={handleChange}
                    placeholder="Describe your Vastu concern, property issue or what you would like guidance about..."
                    rows="5"
                  />
                </div>

              </div>

              {/* Footer */}
              <div className="vastu-form-footer">

                <p>
                  🔒 Your information is kept private.
                </p>

                <button
                  type="submit"
                  className="vastu-submit-btn"
                  disabled={submitting}
                >
                  {submitting
                    ? "Submitting..."
                    : "Request Consultation →"}
                </button>

              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}

export default VastuConsultation;