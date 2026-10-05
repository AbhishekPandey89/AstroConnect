import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getAdminDashboard,
  getAllUsers,
  getAllBookings,
  updateBookingStatus,
} from "../services/api";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { user, token, loading: authLoading } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingBooking, setUpdatingBooking] = useState("");

  // ==========================================
  // LOAD ADMIN DATA
  // ==========================================

  useEffect(() => {
    const loadAdminData = async () => {
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

      try {
        setLoading(true);
        setError("");

        const [
          dashboardResponse,
          usersResponse,
          bookingsResponse,
        ] = await Promise.all([
          getAdminDashboard(token),
          getAllUsers(token),
          getAllBookings(token),
        ]);

        if (dashboardResponse.success) {
          setDashboard(dashboardResponse.dashboard);
        } else {
          setError(
            dashboardResponse.message ||
              "Unable to load dashboard."
          );
        }

        if (usersResponse.success) {
          setUsers(usersResponse.users || []);
        }

        if (bookingsResponse.success) {
          setBookings(bookingsResponse.bookings || []);
        }
      } catch (err) {
        console.error("Admin dashboard error:", err);

        setError(
          err.message ||
            "Unable to load admin dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAdminData();
  }, [user, token, authLoading]);

  // ==========================================
  // UPDATE BOOKING STATUS
  // ==========================================

  const handleStatusChange = async (
    bookingId,
    newStatus
  ) => {
    try {
      setUpdatingBooking(bookingId);
      setError("");

      const response = await updateBookingStatus(
        token,
        bookingId,
        newStatus
      );

      if (response.success) {
        setBookings((currentBookings) =>
          currentBookings.map((booking) =>
            booking._id === bookingId
              ? {
                  ...booking,
                  status: newStatus,
                }
              : booking
          )
        );

        // Update dashboard counters
        const dashboardResponse =
          await getAdminDashboard(token);

        if (dashboardResponse.success) {
          setDashboard(
            dashboardResponse.dashboard
          );
        }
      } else {
        setError(
          response.message ||
            "Unable to update booking status."
        );
      }
    } catch (err) {
      console.error(
        "Update booking status error:",
        err
      );

      setError(
        err.message ||
          "Unable to update booking status."
      );
    } finally {
      setUpdatingBooking("");
    }
  };

  // ==========================================
  // STATUS CLASS
  // ==========================================

  const getStatusClass = (status) => {
    switch (status) {
      case "confirmed":
        return "admin-status-confirmed";

      case "completed":
        return "admin-status-completed";

      case "cancelled":
        return "admin-status-cancelled";

      default:
        return "admin-status-pending";
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (authLoading || loading) {
    return (
      <div className="admin-dashboard-page">
        <div className="admin-dashboard-loading">
          <div className="admin-loading-spinner">
            ⏳
          </div>

          <h2>Loading Admin Dashboard...</h2>

          <p>
            Please wait while we load your admin data.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // NOT LOGGED IN / NOT ADMIN
  // ==========================================

  if (!user || !token || user.role !== "admin") {
    return (
      <div className="admin-dashboard-page">
        <div className="admin-access-card">

          <div className="admin-access-icon">
            🔐
          </div>

          <h2>Admin Access Required</h2>

          <p>
            You must be logged in with an admin
            account to access this dashboard.
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

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-container">

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="admin-dashboard-header">

          <div>
            <span className="admin-dashboard-label">
              ✦ ASTROCONNECT ADMIN
            </span>

            <h1>
              Admin <span>Dashboard</span>
            </h1>

            <p>
              Manage users, bookings and
              consultation activity.
            </p>
          </div>

          <div className="admin-user-badge">
            <span className="admin-user-avatar">
              {user.name
                ?.charAt(0)
                .toUpperCase()}
            </span>

            <div>
              <strong>{user.name}</strong>
              <small>Administrator</small>
            </div>
          </div>

        </div>

        {/* ======================================
            ERROR
        ====================================== */}

        {error && (
          <div className="admin-dashboard-error">
            ⚠️ {error}
          </div>
        )}

        {/* ======================================
            STATISTICS
        ====================================== */}

        {dashboard && (
          <div className="admin-stats-grid">

            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                👥
              </div>

              <div>
                <span>Total Users</span>
                <strong>
                  {dashboard.totalUsers}
                </strong>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                🔮
              </div>

              <div>
                <span>Astrologers</span>
                <strong>
                  {dashboard.totalAstrologers}
                </strong>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                📅
              </div>

              <div>
                <span>Total Bookings</span>
                <strong>
                  {dashboard.totalBookings}
                </strong>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                ⏳
              </div>

              <div>
                <span>Pending</span>
                <strong>
                  {dashboard.pendingBookings}
                </strong>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                ✅
              </div>

              <div>
                <span>Confirmed</span>
                <strong>
                  {dashboard.confirmedBookings}
                </strong>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                ✔️
              </div>

              <div>
                <span>Completed</span>
                <strong>
                  {dashboard.completedBookings}
                </strong>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                ❌
              </div>

              <div>
                <span>Cancelled</span>
                <strong>
                  {dashboard.cancelledBookings}
                </strong>
              </div>
            </div>

          </div>
        )}

        {/* ======================================
            USERS
        ====================================== */}

        <section className="admin-section">

          <div className="admin-section-header">
            <div>
              <span className="admin-section-label">
                USERS
              </span>

              <h2>Registered Users</h2>

              <p>
                All users registered on
                AstroConnect.
              </p>
            </div>

            <span className="admin-count-badge">
              {users.length} Users
            </span>
          </div>

          {users.length === 0 ? (
            <div className="admin-empty-state">
              No users found.
            </div>
          ) : (
            <div className="admin-table-wrapper">

              <table className="admin-table">

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Joined</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((item) => (
                    <tr key={item._id}>

                      <td>
                        <strong>
                          {item.name}
                        </strong>
                      </td>

                      <td>
                        {item.email}
                      </td>

                      <td>
                        {item.phone || "-"}
                      </td>

                      <td>
                        <span
                          className={`admin-role-badge ${
                            item.role === "admin"
                              ? "admin-role"
                              : item.role ===
                                "astrologer"
                              ? "astrologer-role"
                              : "user-role"
                          }`}
                        >
                          {item.role}
                        </span>
                      </td>

                      <td>
                        {item.createdAt
                          ? new Date(
                              item.createdAt
                            ).toLocaleDateString(
                              "en-IN"
                            )
                          : "-"}
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}

        </section>

        {/* ======================================
            BOOKINGS
        ====================================== */}

        <section className="admin-section">

          <div className="admin-section-header">
            <div>
              <span className="admin-section-label">
                BOOKINGS
              </span>

              <h2>All Consultations</h2>

              <p>
                View and manage all customer
                bookings.
              </p>
            </div>

            <span className="admin-count-badge">
              {bookings.length} Bookings
            </span>
          </div>

          {bookings.length === 0 ? (
            <div className="admin-empty-state">
              No bookings found.
            </div>
          ) : (
            <div className="admin-bookings-list">

              {bookings.map((booking) => (

                <div
                  className="admin-booking-card"
                  key={booking._id}
                >

                  {/* Booking Header */}

                  <div className="admin-booking-header">

                    <div>
                      <span>
                        BOOKING ID
                      </span>

                      <strong>
                        {booking._id}
                      </strong>
                    </div>

                    <span
                      className={`admin-booking-status ${getStatusClass(
                        booking.status
                      )}`}
                    >
                      {booking.status
                        ?.charAt(0)
                        .toUpperCase() +
                        booking.status?.slice(1)}
                    </span>

                  </div>

                  {/* Booking Details */}

                  <div className="admin-booking-grid">

                    <div>
                      <span>Customer</span>

                      <strong>
                        {booking.user?.name ||
                          "Unknown"}
                      </strong>
                    </div>

                    <div>
                      <span>Email</span>

                      <strong>
                        {booking.user?.email ||
                          "-"}
                      </strong>
                    </div>

                    <div>
                      <span>Phone</span>

                      <strong>
                        {booking.user?.phone ||
                          "-"}
                      </strong>
                    </div>

                    <div>
                      <span>Service</span>

                      <strong>
                        {booking.service}
                      </strong>
                    </div>

                    <div>
                      <span>Acharya</span>

                      <strong>
                        {booking.acharya}
                      </strong>
                    </div>

                    <div>
                      <span>Date</span>

                      <strong>
                        {booking.date}
                      </strong>
                    </div>

                    <div>
                      <span>Time</span>

                      <strong>
                        {booking.time}
                      </strong>
                    </div>

                    <div>
                      <span>Mode</span>

                      <strong>
                        {booking.mode}
                      </strong>
                    </div>

                    <div>
                      <span>Fee</span>

                      <strong>
                        ₹{booking.fee}
                      </strong>
                    </div>

                  </div>

                  {/* Booking Footer */}

                  <div className="admin-booking-footer">

                    <small>
                      Booked on{" "}
                      {booking.createdAt
                        ? new Date(
                            booking.createdAt
                          ).toLocaleString(
                            "en-IN"
                          )
                        : "-"}
                    </small>

                    <div className="admin-status-control">

                      <label>
                        Status
                      </label>

                      <select
                        value={
                          booking.status ||
                          "pending"
                        }
                        disabled={
                          updatingBooking ===
                          booking._id
                        }
                        onChange={(e) =>
                          handleStatusChange(
                            booking._id,
                            e.target.value
                          )
                        }
                      >
                        <option value="pending">
                          Pending
                        </option>

                        <option value="confirmed">
                          Confirmed
                        </option>

                        <option value="completed">
                          Completed
                        </option>

                        <option value="cancelled">
                          Cancelled
                        </option>
                      </select>

                      {updatingBooking ===
                        booking._id && (
                        <span>
                          Updating...
                        </span>
                      )}

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

export default AdminDashboard;