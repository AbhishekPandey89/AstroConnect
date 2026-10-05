const User = require("../models/User");
const Booking = require("../models/Booking");

// ==========================================
// ADMIN DASHBOARD
// GET /api/admin/dashboard
// ==========================================

const getAdminDashboard = async (req, res) => {
  try {
    // Total users
    const totalUsers = await User.countDocuments({
      role: "user",
    });

    // Total astrologers
    const totalAstrologers = await User.countDocuments({
      role: "astrologer",
    });

    // Total bookings
    const totalBookings = await Booking.countDocuments();

    // Booking status counts
    const pendingBookings = await Booking.countDocuments({
      status: "pending",
    });

    const confirmedBookings = await Booking.countDocuments({
      status: "confirmed",
    });

    const completedBookings = await Booking.countDocuments({
      status: "completed",
    });

    const cancelledBookings = await Booking.countDocuments({
      status: "cancelled",
    });

    return res.status(200).json({
      success: true,
      dashboard: {
        totalUsers,
        totalAstrologers,
        totalBookings,
        pendingBookings,
        confirmedBookings,
        completedBookings,
        cancelledBookings,
      },
    });
  } catch (error) {
    console.error(
      "❌ Admin dashboard error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error while loading admin dashboard",
    });
  }
};


// ==========================================
// GET ALL USERS
// GET /api/admin/users
// ==========================================

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error(
      "❌ Get all users error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error while fetching users",
    });
  }
};


// ==========================================
// GET ALL BOOKINGS
// GET /api/admin/bookings
// ==========================================

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate(
        "user",
        "name email phone role"
      )
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error(
      "❌ Get all bookings error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error while fetching bookings",
    });
  }
};


// ==========================================
// UPDATE BOOKING STATUS
// PUT /api/admin/bookings/:id/status
// ==========================================

const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "confirmed",
      "completed",
      "cancelled",
    ];

    // Validate status
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Booking status is required",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status",
      });
    }

    // Find booking
    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Update status
    booking.status = status;

    await booking.save();

    return res.status(200).json({
      success: true,
      message: `Booking status updated to ${status}`,
      booking,
    });
  } catch (error) {
    console.error(
      "❌ Update booking status error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error while updating booking status",
    });
  }
};


module.exports = {
  getAdminDashboard,
  getAllUsers,
  getAllBookings,
  updateBookingStatus,
};