import "./MyBookings.css";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyBookings, cancelBooking } from "../services/api";

function MyBookings() {
  const { user, token, loading: authLoading } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelLoading, setCancelLoading] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      if (authLoading) return;

      if (!user || !token) {
        setError("Please login to view your bookings.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await getMyBookings(token);

        if (response.success) {
          setBookings(response.bookings || []);
        } else {
          setError(response.message || "Unable to load bookings.");
        }
      } catch (err) {
        console.error("My bookings error:", err);
        setError(err.message || "Unable to load your bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, token, authLoading]);

  const handleCancel = async (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    try {
      setCancelLoading(bookingId);
      setError("");

      const response = await cancelBooking(token, bookingId);

      if (response.success) {
        setBookings((currentBookings) =>
          currentBookings.map((booking) =>
            booking._id === bookingId
              ? {
                  ...booking,
                  status: "cancelled",
                }
              : booking
          )
        );
      } else {
        setError(
          response.message || "Unable to cancel booking."
        );
      }
    } catch (err) {
      console.error("Cancel booking error:", err);
      setError(
        err.message || "Unable to cancel booking."
      );
    } finally {
      setCancelLoading("");
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "confirmed":
        return "status-confirmed";

      case "completed":
        return "status-completed";

      case "cancelled":
        return "status-cancelled";

      default:
        return "status-pending";
    }
  };

  const formatStatus = (status) => {
    if (!status) return "Pending";

    return (
      status.charAt(0).toUpperCase() +
      status.slice(1)
    );
  };

  if (authLoading || loading) {
    return (
      <section className="my-bookings-page">
        <div className="my-bookings-container">
          <div className="my-bookings-loading">
            Loading your bookings...
          </div>
        </div>
      </section>
    );
  }

  if (!user || !token) {
    return (
      <section className="my-bookings-page">
        <div className="my-bookings-container">
          <div className="my-bookings-empty">
            <h2>Please Login</h2>

            <p>
              Login to view your consultation bookings.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="my-bookings-page">
      <div className="my-bookings-container">

        {/* Header */}
        <div className="my-bookings-header">
          <span className="my-bookings-label">
            ✦ MY CONSULTATIONS
          </span>

          <h1>
            My <span>Bookings</span>
          </h1>

          <p>
            View and manage your AstroConnect
            consultation bookings.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="my-bookings-error">
            {error}
          </div>
        )}

        {/* Empty */}
        {!error && bookings.length === 0 && (
          <div className="my-bookings-empty">
            <div className="empty-icon">📅</div>

            <h2>No Bookings Yet</h2>

            <p>
              You haven't booked a consultation yet.
            </p>
          </div>
        )}

        {/* Bookings */}
        {bookings.length > 0 && (
          <div className="bookings-list">

            {bookings.map((booking) => (
              <div
                className="booking-card"
                key={booking._id}
              >

                {/* Card Header */}
                <div className="booking-card-header">

                  <div>
                    <span className="booking-card-label">
                      BOOKING ID
                    </span>

                    <strong>
                      {booking._id}
                    </strong>
                  </div>

                  <span
                    className={`booking-status ${getStatusClass(
                      booking.status
                    )}`}
                  >
                    {formatStatus(booking.status)}
                  </span>

                </div>

                {/* Details */}
                <div className="booking-card-details">

                  <div className="booking-detail">
                    <span>Service</span>
                    <strong>
                      {booking.service}
                    </strong>
                  </div>

                  <div className="booking-detail">
                    <span>Acharya</span>
                    <strong>
                      {booking.acharya}
                    </strong>
                  </div>

                  <div className="booking-detail">
                    <span>Date</span>
                    <strong>
                      {booking.date}
                    </strong>
                  </div>

                  <div className="booking-detail">
                    <span>Time</span>
                    <strong>
                      {booking.time}
                    </strong>
                  </div>

                  <div className="booking-detail">
                    <span>Mode</span>
                    <strong>
                      {booking.mode}
                    </strong>
                  </div>

                  <div className="booking-detail">
                    <span>Fee</span>
                    <strong>
                      ₹{booking.fee}
                    </strong>
                  </div>

                </div>

                {/* Footer */}
                <div className="booking-card-footer">

                  <small>
                    Booked on{" "}
                    {booking.createdAt
                      ? new Date(
                          booking.createdAt
                        ).toLocaleDateString("en-IN")
                      : "-"}
                  </small>

                  {booking.status !== "cancelled" &&
                    booking.status !== "completed" && (
                      <button
                        type="button"
                        className="cancel-booking-btn"
                        disabled={
                          cancelLoading === booking._id
                        }
                        onClick={() =>
                          handleCancel(booking._id)
                        }
                      >
                        {cancelLoading === booking._id
                          ? "Cancelling..."
                          : "Cancel Booking"}
                      </button>
                    )}

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default MyBookings;