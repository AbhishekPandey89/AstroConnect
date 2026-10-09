
import { useState } from "react";
import "./Career.css";

const opportunities = [
  {
    icon: "✦",
    title: "Astrologer Partners",
    type: "Consultation & Guidance",
    description:
      "Connect with people seeking astrological guidance and share your knowledge through our platform.",
    skills: ["Astrology", "Communication", "Consultation"],
  },
  {
    icon: "♡",
    title: "Customer Support",
    type: "Customer Experience",
    description:
      "Help our users with their questions, bookings, and overall AstroConnect experience.",
    skills: ["Communication", "Problem Solving", "Customer Care"],
  },
  {
    icon: "⌘",
    title: "Technology & Development",
    type: "Product & Engineering",
    description:
      "Help build and improve the digital experience that connects users with astrology services.",
    skills: ["React", "JavaScript", "Web Development"],
  },
];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  position: "",
  skills: "",
  experience: "",
  coverLetter: "",
};

const allowedTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const Career = () => {
  const [form, setForm] = useState(initialForm);
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const showMessage = (text, type = "error") => {
    setMessage(text);
    setMessageType(type);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Validate resume when the user selects a file.
  const handleResumeChange = (event) => {
    const file = event.target.files?.[0];

    setResume(null);
    showMessage("", "");

    if (!file) return;

    const extension = file.name.split(".").pop()?.toLowerCase();
    const allowedExtensions = ["pdf", "doc", "docx"];

    if (
      !allowedExtensions.includes(extension) ||
      !allowedTypes.includes(file.type)
    ) {
      event.target.value = "";
      showMessage("Resume must be a valid PDF, DOC, or DOCX file.");
      return;
    }

    if (file.size === 0) {
      event.target.value = "";
      showMessage("The selected resume file is empty.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      event.target.value = "";
      showMessage("Resume size must be 5 MB or less.");
      return;
    }

    setResume(file);
  };

  // Validate all application fields before sending them to the backend.
  const validateApplication = () => {
    const name = form.fullName.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const skills = form.skills.trim();
    const normalizedPhone = phone.replace(/[\s+-]/g, "");

    if (!name || !email || !phone || !form.position || !skills) {
      return "Please fill in all required fields.";
    }

    if (name.length < 2 || name.length > 100) {
      return "Name must be between 2 and 100 characters.";
    }

    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ\s.'’-]{1,99}$/.test(name)) {
      return "Please enter a valid name using letters and normal name punctuation.";
    }

    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return "Please enter a valid email address.";
    }

    if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
      return "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.";
    }

    const validPositions = [
      ...opportunities.map((item) => item.title),
      "Other",
    ];

    if (!validPositions.includes(form.position)) {
      return "Please select a valid position.";
    }

    if (skills.length < 2 || skills.length > 1000) {
      return "Skills must be between 2 and 1000 characters.";
    }

    if (form.experience.trim().length > 100) {
      return "Experience must be 100 characters or less.";
    }

    if (form.coverLetter.trim().length > 3000) {
      return "Cover letter must be 3000 characters or less.";
    }

    if (!resume) {
      return "Please upload your resume.";
    }

    if (!allowedTypes.includes(resume.type)) {
      return "Resume must be PDF, DOC, or DOCX.";
    }

    if (resume.size === 0 || resume.size > 5 * 1024 * 1024) {
      return "Resume must be non-empty and no larger than 5 MB.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    showMessage("", "");

    const validationError = validateApplication();

    if (validationError) {
      showMessage(validationError);
      return;
    }

    const normalizedPhone = form.phone.replace(/[\s+-]/g, "");
    const formData = new FormData();

    formData.append("fullName", form.fullName.trim());
    formData.append("email", form.email.trim().toLowerCase());
    formData.append("phone", normalizedPhone);
    formData.append("position", form.position);
    formData.append("skills", form.skills.trim());
    formData.append("experience", form.experience.trim());
    formData.append("coverLetter", form.coverLetter.trim());
    formData.append("resume", resume);

    setSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/career/apply",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to submit your application."
        );
      }

      showMessage(
        `${result.message} Application ID: ${result.applicationId}`,
        "success"
      );

      setForm(initialForm);
      setResume(null);

      const fileInput = document.getElementById("career-resume");
      if (fileInput) fileInput.value = "";
    } catch (error) {
      showMessage(
        error.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="career-page">
      <section className="career-hero">
        <div className="career-hero-content">
          <span className="career-eyebrow">
            <span className="career-eyebrow-dot" />
            GROW WITH ASTROCONNECT
          </span>

          <h1>
            Build your future.
            <br />
            <span>Make a difference.</span>
          </h1>

          <p>
            Be part of a team connecting people with meaningful guidance.
            Bring your skills, ideas, and passion to AstroConnect.
          </p>

          <a href="#career-opportunities" className="career-primary-btn">
            Explore Opportunities <span aria-hidden="true">↗</span>
          </a>

          <div className="career-hero-note">
            <span aria-hidden="true">✧</span>
            Your journey could start here.
          </div>
        </div>

        <div className="career-hero-art" aria-hidden="true">
          <div className="career-orbit career-orbit-one" />
          <div className="career-orbit career-orbit-two" />
          <div className="career-orbit career-orbit-three" />

          <div className="career-planet">
            <span>✦</span>
          </div>

          <span className="career-star career-star-one">✦</span>
          <span className="career-star career-star-two">✧</span>
          <span className="career-star career-star-three">✦</span>
          <span className="career-star career-star-four">✧</span>

          <div className="career-art-label">
            <span>✦</span> A universe of possibilities
          </div>
        </div>
      </section>

      <section className="career-values">
        <div className="career-value">
          <span className="career-value-icon">✧</span>
          <div>
            <h3>Meaningful Work</h3>
            <p>Help create experiences that matter to people.</p>
          </div>
        </div>

        <div className="career-value">
          <span className="career-value-icon">↗</span>
          <div>
            <h3>Keep Growing</h3>
            <p>Bring your ideas and develop your skills.</p>
          </div>
        </div>

        <div className="career-value">
          <span className="career-value-icon">◎</span>
          <div>
            <h3>Build Together</h3>
            <p>Contribute to a growing digital platform.</p>
          </div>
        </div>
      </section>

      <section
        className="career-opportunities"
        id="career-opportunities"
      >
        <div className="career-section-heading">
          <span className="career-section-label">FIND YOUR PATH</span>
          <h2>Explore career opportunities</h2>
          <p>
            Explore the areas where your skills may fit and submit your
            application directly to our team.
          </p>
        </div>

        <div className="career-cards">
          {opportunities.map((opportunity) => (
            <article className="career-card" key={opportunity.title}>
              <div className="career-card-top">
                <span className="career-card-icon">
                  {opportunity.icon}
                </span>
                <span className="career-card-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>

              <span className="career-card-type">
                {opportunity.type}
              </span>

              <h3>{opportunity.title}</h3>

              <p className="career-card-description">
                {opportunity.description}
              </p>

              <div className="career-skills">
                {opportunity.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>

              <a
                href="#career-application"
                className="career-card-link"
                onClick={() =>
                  setForm((previous) => ({
                    ...previous,
                    position: opportunity.title,
                  }))
                }
                aria-label={`Apply for ${opportunity.title}`}
              >
                Apply Now <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>

        <p className="career-opportunities-note">
          These are areas of interest, not confirmed vacancies.
          Submitting an application does not guarantee employment.
        </p>
      </section>

      <section className="career-application" id="career-application">
        <div className="career-section-heading">
          <span className="career-section-label">YOUR NEXT CHAPTER</span>
          <h2>Apply to AstroConnect</h2>
          <p>
            Share your details and upload your resume. Fields marked *
            are required.
          </p>
        </div>

        <form
          className="career-application-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="career-form-grid">
            <label>
              Full name *
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                maxLength={100}
                autoComplete="name"
                required
              />
            </label>

            <label>
              Email address *
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                maxLength={254}
                autoComplete="email"
                required
              />
            </label>

            <label>
              Phone number *
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                maxLength={10}
                inputMode="numeric"
                pattern="[6-9][0-9]{9}"
                title="Enter a valid 10-digit Indian mobile number"
                autoComplete="tel"
                required
              />
            </label>

            <label>
              Position *
              <select
                name="position"
                value={form.position}
                onChange={handleChange}
                required
              >
                <option value="">Select a position</option>
                {opportunities.map((opportunity) => (
                  <option
                    key={opportunity.title}
                    value={opportunity.title}
                  >
                    {opportunity.title}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </label>

            <label>
              Skills *
              <input
                type="text"
                name="skills"
                value={form.skills}
                onChange={handleChange}
                maxLength={1000}
                placeholder="e.g. React, communication, astrology"
                required
              />
            </label>

            <label>
              Experience
              <input
                type="text"
                name="experience"
                value={form.experience}
                onChange={handleChange}
                maxLength={100}
                placeholder="e.g. Fresher or 1 year"
              />
            </label>

            <label className="career-form-full">
              Cover letter
              <textarea
                name="coverLetter"
                value={form.coverLetter}
                onChange={handleChange}
                maxLength={3000}
                rows={5}
                placeholder="Tell us briefly why you would be a good fit."
              />
            </label>

            <label className="career-form-full">
              Upload resume * (PDF, DOC, or DOCX; max 5 MB)
              <input
                id="career-resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
                required
              />
              {resume && (
                <span className="career-resume-name">
                  Selected: {resume.name}
                </span>
              )}
            </label>
          </div>

          {message && (
            <p
              className={`career-form-message ${
                messageType === "success" ? "is-success" : "is-error"
              }`}
              role="status"
              aria-live="polite"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            className="career-primary-btn career-submit-btn"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Application"}
            {!submitting && <span aria-hidden="true">↗</span>}
          </button>
        </form>
      </section>

      <section className="career-cta">
        <div className="career-cta-decoration" aria-hidden="true">
          ✧
        </div>

        <div>
          <span className="career-section-label">LET'S CONNECT</span>
          <h2>Have a question?</h2>
          <p>
            Contact our team if you need help or have a question about
            career opportunities at AstroConnect.
          </p>
        </div>

        <a href="/contact" className="career-primary-btn">
          Get in Touch <span aria-hidden="true">↗</span>
        </a>
      </section>
    </main>
  );
};

export default Career;