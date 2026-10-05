const Booking = require("../models/Booking");

// ==========================================
// CREATE BOOKING
// POST /api/bookings
// ==========================================

const createBooking = async (req, res) => {
  try {
    const {
      service,
      serviceKey,
      acharya,
      acharyaKey,
      fee,
      date,
      time,
      mode,
    } = req.body;

    // Check required fields
    if (
      !service ||
      !acharya ||
      !fee ||
      !date ||
      !time ||
      !mode
    ) {
      return res.status(400).json({
        success: false,
        message: "All booking details are required",
      });
    }

    // Create booking
    const booking = await Booking.create({
      user: req.user.userId,

      service,
      serviceKey: serviceKey || "",
      
      acharya,
      acharyaKey: acharyaKey || "",

      fee,
      date,
      time,
      mode,

      status: "confirmed",
    });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("❌ Create booking error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while creating booking",
    });
  }
};


// ==========================================
// GET MY BOOKINGS
// GET /api/bookings/my
// ==========================================

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.userId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("❌ Get bookings error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching bookings",
    });
  }
};


// ==========================================
// GET SINGLE BOOKING
// GET /api/bookings/:id
// ==========================================

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("❌ Get booking error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching booking",
    });
  }
};


// ==========================================
// CANCEL BOOKING
// PUT /api/bookings/:id/cancel
// ==========================================

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Completed booking cannot be cancelled",
      });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking is already cancelled",
      });
    }

    booking.status = "cancelled";

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    console.error("❌ Cancel booking error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while cancelling booking",
    });
  }
};


module.exports = {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
};