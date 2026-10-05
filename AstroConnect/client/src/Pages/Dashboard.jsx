import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  updateProfile,
  getMyBookings,
} from "../services/api";
import "./Dashboard.css";

const Dashboard = () => {
  const {
    user,
    token,
    loading: authLoading,
    logout,
  } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [bookings, setBookings] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(true);

  // =====================================================
  // LOAD BOOKINGS
  // =====================================================

  useEffect(() => {
    const loadBookings = async () => {
      if (authLoading) return;

      if (!user || !token) {
        setBookingLoading(false);
        return;
      }

      try {
        setBookingLoading(true);

        const response = await getMyBookings(token);

        if (response.success) {
          setBookings(response.bookings || []);
        }
      } catch (error) {
        console.error(
          "Dashboard bookings error:",
          error
        );
      } finally {
        setBookingLoading(false);
      }
    };

    loadBookings();
  }, [user, token, authLoading]);

  // =====================================================
  // LOADING
  // =====================================================

  if (authLoading) {
    return (
      <div className="dashboard-loading">
        <div className="dashboard-loading-card">
          <div className="dashboard-spinner"></div>
          <h2>Loading Dashboard...</h2>
          <p>Please wait a moment.</p>
        </div>
      </div>
    );
  }

  // =====================================================
  // NOT LOGGED IN
  // =====================================================

  if (!user || !token) {
    return (
      <div className="dashboard-auth-required">
        <div className="dashboard-auth-card">
          <div className="dashboard-auth-icon">
            🔐
          </div>

          <h2>Please Login First</h2>

          <p>
            You need to login to access your
            AstroConnect dashboard.
          </p>

          <button
            onClick={() =>
              (window.location.href = "/login")
            }
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // =====================================================
  // BOOKING STATISTICS
  // =====================================================

  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) =>
      booking.status === "pending"
  ).length;

  const confirmedBookings = bookings.filter(
    (booking) =>
      booking.status === "confirmed"
  ).length;

  const completedBookings = bookings.filter(
    (booking) =>
      booking.status === "completed"
  ).length;

  // =====================================================
  // START EDITING
  // =====================================================

  const startEditing = () => {
    setName(user.name || "");
    setPhone(user.phone || "");
    setMessage("");
    setIsEditing(true);
  };

  // =====================================================
  // UPDATE PROFILE
  // =====================================================

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!name.trim() || !phone.trim()) {
      setMessage(
        "Name and phone are required."
      );
      return;
    }

    if (!token) {
      setMessage(
        "Session expired. Please login again."
      );
      return;
    }

    try {
      setSaving(true);

      const response = await updateProfile(
        token,
        {
          name: name.trim(),
          phone: phone.trim(),
        }
      );

      if (response.success) {
        setMessage(
          "Profile updated successfully!"
        );

        setIsEditing(false);

        /*
         * Refresh profile data from server.
         * AuthContext will automatically reload user.
         */
        window.location.reload();
      } else {
        setMessage(
          response.message ||
            "Unable to update profile."
        );
      }
    } catch (error) {
      console.error(
        "Profile update error:",
        error
      );

      setMessage(
        error.message ||
          "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  // =====================================================
  // NAVIGATION
  // =====================================================

  const goToBookings = () => {
    window.location.href = "/my-bookings";
  };

  const goToBooking = () => {
    window.location.href = "/booking";
  };

  const goToAI = () => {
    window.location.href = "/ai-help";
  };

  return (
    <div className="dashboard-page">

      <div className="dashboard-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="dashboard-header">

          <div>
            <p className="dashboard-label">
              ASTROCONNECT
            </p>

            <h1>
              Welcome,{" "}
              <span>{user.name}</span> 👋
            </h1>

            <p className="dashboard-subtitle">
              Your personal AstroConnect dashboard
            </p>
          </div>

          <button
            className="dashboard-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>


        {/* =================================================
            STATISTICS
        ================================================= */}

        <div className="dashboard-stats">

          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              📅
            </div>

            <div>
              <span>Total Bookings</span>

              <strong>
                {bookingLoading
                  ? "..."
                  : totalBookings}
              </strong>
            </div>

          </div>


          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              ⏳
            </div>

            <div>
              <span>Pending</span>

              <strong>
                {bookingLoading
                  ? "..."
                  : pendingBookings}
              </strong>
            </div>

          </div>


          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              ✅
            </div>

            <div>
              <span>Confirmed</span>

              <strong>
                {bookingLoading
                  ? "..."
                  : confirmedBookings}
              </strong>
            </div>

          </div>


          <div className="dashboard-stat-card">

            <div className="dashboard-stat-icon">
              ✨
            </div>

            <div>
              <span>Completed</span>

              <strong>
                {bookingLoading
                  ? "..."
                  : completedBookings}
              </strong>
            </div>

          </div>

        </div>


        {/* =================================================
            PROFILE CARD
        ================================================= */}

        <div className="dashboard-card">

          <div className="dashboard-card-heading">

            <div className="dashboard-avatar">
              {user.name
                ?.charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <h2>My Profile</h2>

              <p>
                Manage your account information
              </p>
            </div>

          </div>


          {!isEditing ? (

            <>
              {/* PROFILE INFORMATION */}

              <div className="dashboard-info-grid">

                <div className="dashboard-info-item">
                  <span>Name</span>

                  <strong>
                    {user.name || "-"}
                  </strong>
                </div>


                <div className="dashboard-info-item">
                  <span>Email</span>

                  <strong>
                    {user.email || "-"}
                  </strong>
                </div>


                <div className="dashboard-info-item">
                  <span>Phone</span>

                  <strong>
                    {user.phone || "-"}
                  </strong>
                </div>


                <div className="dashboard-info-item">
                  <span>Account Type</span>

                  <strong>
                    {user.role
                      ? user.role
                          .charAt(0)
                          .toUpperCase() +
                        user.role.slice(1)
                      : "User"}
                  </strong>
                </div>

              </div>


              {/* EDIT BUTTON */}

              <button
                className="dashboard-edit-btn"
                onClick={startEditing}
              >
                ✏️ Edit Profile
              </button>

            </>

          ) : (

            /* =================================================
               EDIT FORM
            ================================================= */

            <form
              className="dashboard-edit-form"
              onSubmit={
                handleUpdateProfile
              }
            >

              {/* NAME */}

              <div className="dashboard-form-group">

                <label>
                  Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  placeholder="Enter your name"
                />

              </div>


              {/* EMAIL */}

              <div className="dashboard-form-group">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  value={user.email}
                  disabled
                />

                <small>
                  Email cannot be changed
                  from profile settings.
                </small>

              </div>


              {/* PHONE */}

              <div className="dashboard-form-group">

                <label>
                  Phone
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value
                    )
                  }
                  placeholder="Enter your phone number"
                />

              </div>


              {/* MESSAGE */}

              {message && (
                <p className="dashboard-message">
                  {message}
                </p>
              )}


              {/* FORM BUTTONS */}

              <div className="dashboard-form-actions">

                <button
                  type="button"
                  className="dashboard-cancel-btn"
                  onClick={() => {
                    setIsEditing(false);
                    setMessage("");
                  }}
                  disabled={saving}
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="dashboard-save-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </button>

              </div>

            </form>

          )}

        </div>


        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <div className="dashboard-section-title">

          <span>
            QUICK ACTIONS
          </span>

          <h2>
            Manage Your{" "}
            <span>AstroConnect</span>
          </h2>

        </div>


        <div className="dashboard-features">

          {/* BOOKINGS */}

          <button
            className="dashboard-feature-card"
            onClick={goToBookings}
          >

            <span className="dashboard-feature-icon">
              🕉️
            </span>

            <h3>
              My Bookings
            </h3>

            <p>
              View and manage your
              consultation bookings.
            </p>

            <span className="dashboard-feature-link">
              View Bookings →
            </span>

          </button>


          {/* NEW BOOKING */}

          <button
            className="dashboard-feature-card"
            onClick={goToBooking}
          >

            <span className="dashboard-feature-icon">
              🔮
            </span>

            <h3>
              Book Consultation
            </h3>

            <p>
              Choose a service, Acharya
              and your preferred time.
            </p>

            <span className="dashboard-feature-link">
              Book Now →
            </span>

          </button>


          {/* AI HELP */}

          <button
            className="dashboard-feature-card"
            onClick={goToAI}
          >

            <span className="dashboard-feature-icon">
              ✨
            </span>

            <h3>
              AI Help
            </h3>

            <p>
              Get assistance from
              AstroConnect AI.
            </p>

            <span className="dashboard-feature-link">
              Open AI Help →
            </span>

          </button>

        </div>


        {/* =================================================
            RECENT BOOKINGS
        ================================================= */}

        <div className="dashboard-recent">

          <div className="dashboard-recent-header">

            <div>
              <span>
                RECENT ACTIVITY
              </span>

              <h2>
                Recent Bookings
              </h2>
            </div>

            {bookings.length > 0 && (
              <button
                onClick={goToBookings}
                className="dashboard-view-all"
              >
                View All →
              </button>
            )}

          </div>


          {bookingLoading ? (

            <div className="dashboard-booking-loading">
              Loading bookings...
            </div>

          ) : bookings.length === 0 ? (

            <div className="dashboard-no-bookings">

              <div>
                📅
              </div>

              <h3>
                No bookings yet
              </h3>

              <p>
                Your consultation bookings
                will appear here.
              </p>

              <button
                onClick={goToBooking}
              >
                Book Your First Consultation
              </button>

            </div>

          ) : (

            <div className="dashboard-recent-list">

              {bookings
                .slice(0, 3)
                .map((booking) => (

                  <div
                    className="dashboard-recent-item"
                    key={booking._id}
                  >

                    <div className="dashboard-recent-icon">
                      🔮
                    </div>

                    <div className="dashboard-recent-info">

                      <strong>
                        {booking.service}
                      </strong>

                      <span>
                        {booking.acharya}
                      </span>

                      <small>
                        {booking.date}
                        {" • "}
                        {booking.time}
                      </small>

                    </div>

                    <div className="dashboard-recent-right">

                      <strong>
                        ₹{booking.fee}
                      </strong>

                      <span
                        className={`dashboard-booking-status dashboard-status-${booking.status}`}
                      >
                        {booking.status
                          ? booking.status
                              .charAt(0)
                              .toUpperCase() +
                            booking.status.slice(1)
                          : "Pending"}
                      </span>

                    </div>

                  </div>

                ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default Dashboard;