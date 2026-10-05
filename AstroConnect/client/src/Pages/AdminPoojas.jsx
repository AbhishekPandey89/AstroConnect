import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
  getAllPoojas,
  createPooja,
  updatePooja,
  deletePooja,
} from "../services/api";

import "./AdminPoojas.css";

const emptyForm = {
  city: "",
  date: "",
  poojaName: "",
  acharya: "",
  yajmanName: "",
  images: "",
};

const AdminPoojas = () => {
  const {
    user,
    token,
    loading: authLoading,
  } = useAuth();

  const [poojas, setPoojas] = useState([]);
  const [form, setForm] = useState({ ...emptyForm });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // LOAD POOJAS
  // =====================================================

  const loadPoojas = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllPoojas();

      console.log("GET POOJAS:", response);

      if (response?.success) {
        setPoojas(
          Array.isArray(response.poojas)
            ? response.poojas
            : []
        );
      } else {
        setPoojas([]);
        setError(
          response?.message ||
            "Unable to load pooja records."
        );
      }
    } catch (err) {
      console.error("Load poojas error:", err);

      setError(
        err?.message ||
          "Unable to load pooja records."
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
      setError("Admin access required.");
      setLoading(false);
      return;
    }

    loadPoojas();
  }, [user, token, authLoading]);

  // =====================================================
  // CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // =====================================================
  // ADD
  // =====================================================

  const handleAdd = () => {
    setForm({ ...emptyForm });
    setEditingId(null);
    setShowForm(true);
    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (pooja) => {
    setEditingId(pooja._id);

    setForm({
      city: pooja.city || "",

      date: pooja.date
        ? new Date(pooja.date)
            .toISOString()
            .split("T")[0]
        : "",

      poojaName: pooja.poojaName || "",

      acharya: pooja.acharya || "",

      yajmanName: pooja.yajmanName || "",

      images: Array.isArray(pooja.images)
        ? pooja.images.join("\n")
        : "",
    });

    setShowForm(true);
    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) return;

    setError("");
    setSuccess("");

    // -----------------------------------------------
    // READ CURRENT VALUES
    // -----------------------------------------------

    const city = String(form.city || "").trim();
    const date = String(form.date || "").trim();
    const poojaName = String(
      form.poojaName || ""
    ).trim();
    const acharya = String(
      form.acharya || ""
    ).trim();
    const yajmanName = String(
      form.yajmanName || ""
    ).trim();

    // -----------------------------------------------
    // VALIDATE
    // -----------------------------------------------

    if (!city) {
      setError("City is required.");
      return;
    }

    if (!date) {
      setError("Date is required.");
      return;
    }

    if (!poojaName) {
      setError("Pooja Name is required.");
      return;
    }

    if (!acharya) {
      setError("Acharya is required.");
      return;
    }

    if (!yajmanName) {
      setError("Yajman Name is required.");
      return;
    }

    // -----------------------------------------------
    // IMAGES
    // -----------------------------------------------

    const images = String(form.images || "")
      .split(/\r?\n/)
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    // -----------------------------------------------
    // FINAL DATA
    // -----------------------------------------------

    const poojaData = {
      city,
      date,
      poojaName,
      acharya,
      yajmanName,
      images,
    };

    console.log(
      "POOJA DATA BEING SENT:",
      poojaData
    );

    try {
      setSaving(true);

      let response;

      if (editingId) {
        response = await updatePooja(
          token,
          editingId,
          poojaData
        );
      } else {
        response = await createPooja(
          token,
          poojaData
        );
      }

      console.log(
        "POOJA SAVE RESPONSE:",
        response
      );

      if (!response?.success) {
        setError(
          response?.message ||
            "Unable to save pooja."
        );
        return;
      }

      // ---------------------------------------------
      // SUCCESS
      // ---------------------------------------------

      setSuccess(
        editingId
          ? "Pooja updated successfully."
          : "Pooja added successfully."
      );

      setForm({ ...emptyForm });
      setShowForm(false);
      setEditingId(null);

      await loadPoojas();
    } catch (err) {
      console.error(
        "Save pooja error:",
        err
      );

      setError(
        err?.message ||
          "Unable to save pooja."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this pooja record?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      const response = await deletePooja(
        token,
        id
      );

      console.log(
        "DELETE POOJA RESPONSE:",
        response
      );

      if (!response?.success) {
        setError(
          response?.message ||
            "Unable to delete pooja."
        );
        return;
      }

      setPoojas((current) =>
        current.filter(
          (item) => item._id !== id
        )
      );

      setSuccess(
        "Pooja deleted successfully."
      );
    } catch (err) {
      console.error(
        "Delete pooja error:",
        err
      );

      setError(
        err?.message ||
          "Unable to delete pooja."
      );
    }
  };

  // =====================================================
  // CANCEL
  // =====================================================

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...emptyForm });
    setError("");
    setSuccess("");
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (authLoading || loading) {
    return (
      <div className="admin-pooja-page">
        <div className="admin-pooja-container">
          <div className="admin-pooja-loading">
            <h2>
              Loading Pooja Management...
            </h2>

            <p>
              Please wait...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // ADMIN CHECK
  // =====================================================

  if (
    !user ||
    !token ||
    user.role !== "admin"
  ) {
    return (
      <div className="admin-pooja-page">
        <div className="admin-pooja-container">
          <div className="admin-pooja-empty">

            <div className="admin-pooja-empty-icon">
              🔐
            </div>

            <h3>
              Admin Access Required
            </h3>

            <p>
              You must be logged in as
              an administrator.
            </p>

            <button
              type="button"
              onClick={() => {
                window.location.href =
                  "/login";
              }}
            >
              Go to Login
            </button>

          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="admin-pooja-page">
      <div className="admin-pooja-container">

        {/* HEADER */}

        <div className="admin-pooja-header">

          <div>
            <span className="admin-pooja-label">
              ✦ ASTROCONNECT ADMIN
            </span>

            <h1>
              Pooja{" "}
              <span>
                Management
              </span>
            </h1>

            <p>
              Manage completed pooja
              records.
            </p>
          </div>

          <button
            type="button"
            className="admin-pooja-add-btn"
            onClick={handleAdd}
          >
            + Add Completed Pooja
          </button>

        </div>

        {/* ERROR */}

        {error && (
          <div className="admin-pooja-error">
            ⚠️ {error}
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div className="admin-pooja-success">
            ✅ {success}
          </div>
        )}

        {/* FORM */}

        {showForm && (
          <form
            className="admin-pooja-form-card"
            onSubmit={handleSubmit}
          >

            <h2 className="admin-pooja-form-title">
              {editingId
                ? "Edit Pooja"
                : "Add Completed Pooja"}
            </h2>

            <div className="admin-pooja-form-grid">

              {/* CITY */}

              <div className="admin-pooja-field">
                <label>
                  City *
                </label>

                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Varanasi"
                />
              </div>

              {/* DATE */}

              <div className="admin-pooja-field">
                <label>
                  Date *
                </label>

                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                />
              </div>

              {/* POOJA */}

              <div className="admin-pooja-field">
                <label>
                  Pooja Name *
                </label>

                <input
                  type="text"
                  name="poojaName"
                  value={form.poojaName}
                  onChange={handleChange}
                  placeholder="Maha Mrityunjaya Pooja"
                />
              </div>

              {/* ACHARYA */}

              <div className="admin-pooja-field">
                <label>
                  Acharya *
                </label>

                <input
                  type="text"
                  name="acharya"
                  value={form.acharya}
                  onChange={handleChange}
                  placeholder="Acharya Rajesh Sharma"
                />
              </div>

              {/* YAJMAN */}

              <div className="admin-pooja-field">
                <label>
                  Yajman Name *
                </label>

                <input
                  type="text"
                  name="yajmanName"
                  value={form.yajmanName}
                  onChange={handleChange}
                  placeholder="Yajman name"
                />
              </div>

              {/* IMAGES */}

              <div className="admin-pooja-field full">
                <label>
                  Image URLs
                </label>

                <textarea
                  name="images"
                  value={form.images}
                  onChange={handleChange}
                  placeholder={
                    "Paste one image URL per line"
                  }
                  rows={5}
                />

                <small className="admin-pooja-help">
                  One image URL per line.
                </small>
              </div>

            </div>

            {/* ACTIONS */}

            <div className="admin-pooja-form-actions">

              <button
                type="button"
                className="admin-pooja-cancel-btn"
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="admin-pooja-save-btn"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Pooja"
                  : "Add Pooja"}
              </button>

            </div>

          </form>
        )}

        {/* LIST */}

        <section className="admin-pooja-list">

          <div className="admin-pooja-list-header">

            <div>
              <span className="admin-pooja-label">
                COMPLETED POOJAS
              </span>

              <h2>
                All Pooja Records
              </h2>
            </div>

            <span className="admin-pooja-count">
              {poojas.length} Poojas
            </span>

          </div>

          {/* EMPTY */}

          {poojas.length === 0 ? (

            <div className="admin-pooja-empty">

              <div className="admin-pooja-empty-icon">
                🕉️
              </div>

              <h3>
                No Pooja Records
              </h3>

              <p>
                Add your first completed
                pooja.
              </p>

              <br />

              <button
                type="button"
                className="admin-pooja-add-btn"
                onClick={handleAdd}
              >
                + Add Pooja
              </button>

            </div>

          ) : (

            <div className="admin-pooja-grid">

              {poojas.map((pooja) => (

                <article
                  className="admin-pooja-card"
                  key={pooja._id}
                >

                  {/* IMAGE */}

                  {pooja.images?.[0] ? (

                    <img
                      className="admin-pooja-image"
                      src={pooja.images[0]}
                      alt={
                        pooja.poojaName ||
                        "Pooja"
                      }
                      onError={(e) => {
                        e.currentTarget.style.display =
                          "none";
                      }}
                    />

                  ) : (

                    <div className="admin-pooja-image-placeholder">
                      🕉️
                    </div>

                  )}

                  {/* BODY */}

                  <div className="admin-pooja-card-body">

                    <span className="admin-pooja-type">
                      COMPLETED POOJA
                    </span>

                    <h3>
                      {pooja.poojaName}
                    </h3>

                    <div className="admin-pooja-details">

                      <div className="admin-pooja-detail">
                        <span>
                          City
                        </span>

                        <strong>
                          📍 {pooja.city}
                        </strong>
                      </div>

                      <div className="admin-pooja-detail">
                        <span>
                          Date
                        </span>

                        <strong>
                          📅{" "}
                          {pooja.date
                            ? new Date(
                                pooja.date
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "-"}
                        </strong>
                      </div>

                      <div className="admin-pooja-detail">
                        <span>
                          Acharya
                        </span>

                        <strong>
                          👨‍🦳{" "}
                          {pooja.acharya}
                        </strong>
                      </div>

                      <div className="admin-pooja-detail">
                        <span>
                          Yajman
                        </span>

                        <strong>
                          🙏{" "}
                          {pooja.yajmanName}
                        </strong>
                      </div>

                    </div>

                    {/* ACTIONS */}

                    <div className="admin-pooja-actions">

                      <button
                        type="button"
                        className="admin-pooja-edit"
                        onClick={() =>
                          handleEdit(pooja)
                        }
                      >
                        ✏️ Edit
                      </button>

                      <button
                        type="button"
                        className="admin-pooja-delete"
                        onClick={() =>
                          handleDelete(
                            pooja._id
                          )
                        }
                      >
                        🗑️ Delete
                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          )}

        </section>

      </div>
    </div>
  );
};

export default AdminPoojas;