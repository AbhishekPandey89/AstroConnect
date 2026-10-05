import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./AdminAcharyas.css";

import {
  getAllAcharyasAdmin,
  createAcharya,
  updateAcharya,
  deleteAcharya,
} from "../services/api";


const emptyForm = {
  name: "",
  specialty: "",
  fee: "",
  experience: "",
  languages: "Hindi, English",
  bio: "",
  image: "",
  active: true,
};

const AdminAcharyas = () => {
  const { user, token, loading: authLoading } = useAuth();

  const [acharyas, setAcharyas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState(emptyForm);

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // LOAD ACHARYAS
  // =====================================================

  const loadAcharyas = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllAcharyasAdmin(token);

      if (response.success) {
        setAcharyas(response.acharyas || []);
      } else {
        setError(
          response.message || "Unable to load acharyas."
        );
      }
    } catch (err) {
      console.error("Load acharyas error:", err);

      setError(
        err.message || "Unable to load acharyas."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    if (authLoading) return;

    if (!user || !token) {
      setError("Please login first.");
      setLoading(false);
      return;
    }

    if (user.role !== "admin") {
      setError("Access denied. Admin only.");
      setLoading(false);
      return;
    }

    loadAcharyas();
  }, [user, token, authLoading]);

  // =====================================================
  // FORM INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =====================================================
  // OPEN ADD FORM
  // =====================================================

  const handleAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // =====================================================
  // OPEN EDIT FORM
  // =====================================================

  const handleEdit = (acharya) => {
    setEditingId(acharya._id);

    setForm({
      name: acharya.name || "",
      specialty: acharya.specialty || "",
      fee: acharya.fee ?? "",
      experience: acharya.experience ?? "",
      languages:
        Array.isArray(acharya.languages)
          ? acharya.languages.join(", ")
          : "",
      bio: acharya.bio || "",
      image: acharya.image || "",
      active:
        acharya.active !== undefined
          ? acharya.active
          : true,
    });

    setError("");
    setSuccess("");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // CLOSE FORM
  // =====================================================

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  // =====================================================
  // SUBMIT FORM
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Acharya name is required.");
      return;
    }

    if (!form.specialty.trim()) {
      setError("Specialty is required.");
      return;
    }

    if (form.fee === "") {
      setError("Fee is required.");
      return;
    }

    try {
      setSaving(true);

      const acharyaData = {
        name: form.name.trim(),
        specialty: form.specialty.trim(),
        fee: Number(form.fee),
        experience:
          form.experience === ""
            ? 0
            : Number(form.experience),

        languages: form.languages
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        bio: form.bio.trim(),
        image: form.image.trim(),
        active: form.active,
      };

      let response;

      // EDIT
      if (editingId) {
        response = await updateAcharya(
          token,
          editingId,
          acharyaData
        );
      }

      // CREATE
      else {
        response = await createAcharya(
          token,
          acharyaData
        );
      }

      if (!response.success) {
        setError(
          response.message ||
            "Unable to save acharya."
        );
        return;
      }

      setSuccess(
        editingId
          ? "Acharya updated successfully."
          : "Acharya created successfully."
      );

      handleCloseForm();

      await loadAcharyas();
    } catch (err) {
      console.error("Save acharya error:", err);

      setError(
        err.message ||
          "Unable to save acharya."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (acharyaId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Acharya?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(acharyaId);
      setError("");
      setSuccess("");

      const response = await deleteAcharya(
        token,
        acharyaId
      );

      if (!response.success) {
        setError(
          response.message ||
            "Unable to delete acharya."
        );
        return;
      }

      setSuccess(
        "Acharya deleted successfully."
      );

      setAcharyas((current) =>
        current.filter(
          (item) => item._id !== acharyaId
        )
      );
    } catch (err) {
      console.error(
        "Delete acharya error:",
        err
      );

      setError(
        err.message ||
          "Unable to delete acharya."
      );
    } finally {
      setDeletingId("");
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (authLoading || loading) {
    return (
      <div className="admin-acharyas-page">
        <div className="admin-acharyas-loading">
          <div>⏳</div>

          <h2>
            Loading Acharya Management...
          </h2>

          <p>
            Please wait while we load the
            astrologers.
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ACCESS DENIED
  // =====================================================

  if (
    !user ||
    !token ||
    user.role !== "admin"
  ) {
    return (
      <div className="admin-acharyas-page">
        <div className="admin-acharya-access-card">

          <div className="admin-acharya-access-icon">
            🔐
          </div>

          <h2>Admin Access Required</h2>

          <p>
            You must be logged in with an
            admin account to manage Acharyas.
          </p>

          <button
            type="button"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Go to Login
          </button>

        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <div className="admin-acharyas-page">
      <div className="admin-acharyas-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="admin-acharyas-header">

          <div>
            <span className="admin-acharyas-label">
              ✦ ASTROCONNECT ADMIN
            </span>

            <h1>
              Acharya{" "}
              <span>Management</span>
            </h1>

            <p>
              Add, edit and manage your
              AstroConnect Acharyas.
            </p>
          </div>

          <button
            type="button"
            className="admin-add-acharya-btn"
            onClick={handleAdd}
          >
            + Add New Acharya
          </button>

        </div>

        {/* =================================================
            MESSAGES
        ================================================= */}

        {error && (
          <div className="admin-acharya-error">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="admin-acharya-success">
            ✅ {success}
          </div>
        )}

        {/* =================================================
            FORM
        ================================================= */}

        {showForm && (
          <section className="admin-acharya-form-section">

            <div className="admin-acharya-form-header">

              <div>
                <span>
                  {editingId
                    ? "EDIT ACHARYA"
                    : "NEW ACHARYA"}
                </span>

                <h2>
                  {editingId
                    ? "Update Acharya"
                    : "Add Acharya"}
                </h2>
              </div>

              <button
                type="button"
                className="admin-close-form-btn"
                onClick={handleCloseForm}
              >
                ✕
              </button>

            </div>

            <form
              className="admin-acharya-form"
              onSubmit={handleSubmit}
            >

              <div className="admin-form-grid">

                {/* NAME */}

                <div className="admin-form-group">
                  <label>
                    Acharya Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Acharya Rajesh Sharma"
                  />
                </div>

                {/* SPECIALTY */}

                <div className="admin-form-group">
                  <label>
                    Specialty *
                  </label>

                  <input
                    type="text"
                    name="specialty"
                    value={form.specialty}
                    onChange={handleChange}
                    placeholder="e.g. Vedic Astrology"
                  />
                </div>

                {/* FEE */}

                <div className="admin-form-group">
                  <label>
                    Consultation Fee *
                  </label>

                  <input
                    type="number"
                    name="fee"
                    min="0"
                    value={form.fee}
                    onChange={handleChange}
                    placeholder="e.g. 999"
                  />
                </div>

                {/* EXPERIENCE */}

                <div className="admin-form-group">
                  <label>
                    Experience (Years)
                  </label>

                  <input
                    type="number"
                    name="experience"
                    min="0"
                    value={form.experience}
                    onChange={handleChange}
                    placeholder="e.g. 12"
                  />
                </div>

                {/* LANGUAGES */}

                <div className="admin-form-group">
                  <label>
                    Languages
                  </label>

                  <input
                    type="text"
                    name="languages"
                    value={form.languages}
                    onChange={handleChange}
                    placeholder="Hindi, English, Kannada"
                  />

                  <small>
                    Separate languages with commas.
                  </small>
                </div>

                {/* IMAGE */}

                <div className="admin-form-group">
                  <label>
                    Image URL
                  </label>

                  <input
                    type="text"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="https://example.com/acharya.jpg"
                  />
                </div>

                {/* BIO */}

                <div className="admin-form-group admin-form-full">
                  <label>
                    Biography
                  </label>

                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    placeholder="Write a short biography..."
                    rows="5"
                  />
                </div>

                {/* ACTIVE */}

                <div className="admin-form-group admin-form-full">
                  <label className="admin-active-toggle">

                    <input
                      type="checkbox"
                      name="active"
                      checked={form.active}
                      onChange={handleChange}
                    />

                    <span>
                      Make this Acharya active
                    </span>

                  </label>
                </div>

              </div>

              {/* ACTIONS */}

              <div className="admin-acharya-form-actions">

                <button
                  type="button"
                  className="admin-cancel-btn"
                  onClick={handleCloseForm}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="admin-save-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Acharya"
                    : "Create Acharya"}
                </button>

              </div>

            </form>

          </section>
        )}

        {/* =================================================
            ACHARYA LIST
        ================================================= */}

        <section className="admin-acharya-list-section">

          <div className="admin-acharya-list-header">

            <div>
              <span>
                ACHARYAS
              </span>

              <h2>
                All Acharyas
              </h2>

              <p>
                Manage all astrologers available
                on AstroConnect.
              </p>
            </div>

            <span className="admin-acharya-count">
              {acharyas.length} Acharyas
            </span>

          </div>

          {/* EMPTY */}

          {acharyas.length === 0 ? (
            <div className="admin-acharya-empty">

              <div>🔮</div>

              <h3>
                No Acharyas Found
              </h3>

              <p>
                Start by adding your first
                Acharya.
              </p>

              <button
                type="button"
                onClick={handleAdd}
              >
                + Add Acharya
              </button>

            </div>
          ) : (

            /* GRID */

            <div className="admin-acharya-grid">

              {acharyas.map((acharya) => (

                <div
                  className="admin-acharya-card"
                  key={acharya._id}
                >

                  {/* IMAGE */}

                  <div className="admin-acharya-image">

                    {acharya.image ? (
                      <img
                        src={acharya.image}
                        alt={acharya.name}
                      />
                    ) : (
                      <div className="admin-acharya-placeholder">
                        🔮
                      </div>
                    )}

                    {acharya.active ? (
                      <span className="admin-acharya-active">
                        Active
                      </span>
                    ) : (
                      <span className="admin-acharya-inactive">
                        Inactive
                      </span>
                    )}

                  </div>

                  {/* CONTENT */}

                  <div className="admin-acharya-content">

                    <h3>
                      {acharya.name}
                    </h3>

                    <p className="admin-acharya-specialty">
                      {acharya.specialty}
                    </p>

                    <div className="admin-acharya-meta">

                      <span>
                        Experience
                      </span>

                      <span>
                        {acharya.experience || 0} Years
                      </span>

                    </div>

                    <div className="admin-acharya-meta">

                      <span>
                        Consultation
                      </span>

                      <span>
                        ₹{acharya.fee}
                      </span>

                    </div>

                    {/* LANGUAGES */}

                    {Array.isArray(
                      acharya.languages
                    ) &&
                      acharya.languages.length > 0 && (
                        <div className="admin-acharya-languages">

                          {acharya.languages.map(
                            (language, index) => (
                              <span
                                key={`${language}-${index}`}
                              >
                                {language}
                              </span>
                            )
                          )}

                        </div>
                      )}

                    {/* BIO */}

                    {acharya.bio && (
                      <p className="admin-acharya-bio">
                        {acharya.bio}
                      </p>
                    )}

                    {/* ACTIONS */}

                    <div className="admin-acharya-actions">

                      <button
                        type="button"
                        className="admin-edit-acharya-btn"
                        onClick={() =>
                          handleEdit(acharya)
                        }
                      >
                        ✏️ Edit
                      </button>

                      <button
                        type="button"
                        className="admin-delete-acharya-btn"
                        disabled={
                          deletingId ===
                          acharya._id
                        }
                        onClick={() =>
                          handleDelete(
                            acharya._id
                          )
                        }
                      >
                        {deletingId ===
                        acharya._id
                          ? "Deleting..."
                          : "🗑️ Delete"}
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>
          )}

        </section>

      </div>
    </div>
  );
};

export default AdminAcharyas;