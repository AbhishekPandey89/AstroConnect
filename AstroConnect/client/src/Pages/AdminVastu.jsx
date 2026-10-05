import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getAllVastuConsultations,
  updateVastuStatus,
} from "../services/api";

import "./AdminVastu.css";

const AdminVastu = () => {
  const { user, token, loading: authLoading } = useAuth();

  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // LOAD VASTU CONSULTATIONS
  // =====================================================

  const loadConsultations = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getAllVastuConsultations(token);

      if (response.success) {
        setConsultations(
          response.consultations ||
          response.vastuConsultations ||
          []
        );
      } else {
        setError(
          response.message ||
          "Unable to load Vastu consultations."
        );
      }
    } catch (err) {
      console.error(
        "Load Vastu consultations error:",
        err
      );

      setError(
        err.message ||
        "Unable to load Vastu consultations."
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

    loadConsultations();
  }, [user, token, authLoading]);

  // =====================================================
  // UPDATE STATUS
  // =====================================================

  const handleStatusChange = async (
    consultationId,
    status
  ) => {
    try {
      setUpdatingId(consultationId);
      setError("");
      setSuccess("");

      const response = await updateVastuStatus(
        token,
        consultationId,
        status
      );

      if (!response.success) {
        setError(
          response.message ||
          "Unable to update Vastu status."
        );
        return;
      }

      setConsultations((current) =>
        current.map((item) =>
          item._id === consultationId
            ? {
                ...item,
                status,
              }
            : item
        )
      );

      setSuccess(
        "Vastu consultation status updated successfully."
      );
    } catch (err) {
      console.error(
        "Update Vastu status error:",
        err
      );

      setError(
        err.message ||
        "Unable to update Vastu status."
      );
    } finally {
      setUpdatingId("");
    }
  };

  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (status) => {
    const normalizedStatus =
      String(status || "pending")
        .toLowerCase()
        .replace(/\s+/g, "-");

    return `admin-vastu-status admin-vastu-status-${normalizedStatus}`;
  };

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (authLoading || loading) {
    return (
      <div className="admin-vastu-page">
        <div className="admin-vastu-loading">
          <div>⏳</div>

          <h2>
            Loading Vastu Consultations...
          </h2>

          <p>
            Please wait while we load the requests.
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
      <div className="admin-vastu-page">
        <div className="admin-vastu-access-card">
          <div>🔐</div>

          <h2>Admin Access Required</h2>

          <p>
            You must be logged in with an admin
            account to manage Vastu consultations.
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
    <div className="admin-vastu-page">
      <div className="admin-vastu-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="admin-vastu-header">
          <div>
            <span className="admin-vastu-label">
              ✦ ASTROCONNECT ADMIN
            </span>

            <h1>
              Vastu{" "}
              <span>Consultations</span>
            </h1>

            <p>
              Manage customer Vastu consultation
              requests and update their status.
            </p>
          </div>

          <span className="admin-vastu-count">
            {consultations.length} Requests
          </span>
        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="admin-vastu-error">
            ⚠️ {error}
          </div>
        )}

        {/* =================================================
            SUCCESS
        ================================================= */}

        {success && (
          <div
            className="admin-vastu-success"
            style={{
              marginBottom: "25px",
              padding: "14px 16px",
              borderRadius: "12px",
              border:
                "1px solid #cde8d6",
              background: "#effaf2",
              color: "#198754",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            ✅ {success}
          </div>
        )}

        {/* =================================================
            EMPTY
        ================================================= */}

        {consultations.length === 0 ? (
          <div className="admin-vastu-empty">
            <div>🧭</div>

            <h2>
              No Vastu Consultations
            </h2>

            <p>
              No consultation requests have been
              submitted yet.
            </p>
          </div>
        ) : (

          /* =================================================
             LIST
          ================================================= */

          <div className="admin-vastu-list">

            {consultations.map(
              (consultation) => (

                <article
                  className="admin-vastu-card"
                  key={consultation._id}
                >

                  {/* HEADER */}

                  <div className="admin-vastu-card-header">

                    <div>
                      <span>
                        REQUEST ID
                      </span>

                      <strong>
                        {consultation._id}
                      </strong>
                    </div>

                    <span
                      className={getStatusClass(
                        consultation.status
                      )}
                    >
                      {consultation.status ||
                        "Pending"}
                    </span>

                  </div>

                  {/* DETAILS */}

                  <div className="admin-vastu-grid">

                    <div>
                      <span>
                        Customer
                      </span>

                      <strong>
                        {consultation.name ||
                          "—"}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Phone
                      </span>

                      <strong>
                        {consultation.phone ||
                          "—"}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Email
                      </span>

                      <strong>
                        {consultation.email ||
                          "—"}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Property Type
                      </span>

                      <strong>
                        {consultation.propertyType ||
                          "—"}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Property Size
                      </span>

                      <strong>
                        {consultation.propertySize ||
                          "—"}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Location
                      </span>

                      <strong>
                        {consultation.location ||
                          "—"}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Facing
                      </span>

                      <strong>
                        {consultation.facing ||
                          "—"}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Submitted
                      </span>

                      <strong>
                        {formatDate(
                          consultation.createdAt
                        )}
                      </strong>
                    </div>

                  </div>

                  {/* CONCERN */}

                  <div className="admin-vastu-concern">

                    <span>
                      VASTU CONCERN
                    </span>

                    <p>
                      {consultation.concern ||
                        "No concern provided."}
                    </p>

                  </div>

                  {/* FOOTER */}

                  <div className="admin-vastu-footer">

                    <small>
                      Last updated:{" "}
                      {formatDate(
                        consultation.updatedAt ||
                        consultation.createdAt
                      )}
                    </small>

                    <select
                      value={
                        consultation.status ||
                        "pending"
                      }
                      disabled={
                        updatingId ===
                        consultation._id
                      }
                      onChange={(e) =>
                        handleStatusChange(
                          consultation._id,
                          e.target.value
                        )
                      }
                    >
                      <option value="pending">
                        Pending
                      </option>

                      <option value="contacted">
                        Contacted
                      </option>

                      <option value="completed">
                        Completed
                      </option>

                      <option value="cancelled">
                        Cancelled
                      </option>
                    </select>

                    {updatingId ===
                      consultation._id && (
                      <span>
                        Updating...
                      </span>
                    )}

                  </div>

                </article>
              )
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default AdminVastu;