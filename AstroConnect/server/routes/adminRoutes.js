const express = require("express");

const {
  getAdminDashboard,
  getAllUsers,
  getAllBookings,
  updateBookingStatus,
} = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();


// ==========================================
// ADMIN DASHBOARD
// GET /api/admin/dashboard
// ==========================================

router.get(
  "/dashboard",
  protect,
  adminOnly,
  getAdminDashboard
);


// ==========================================
// GET ALL USERS
// GET /api/admin/users
// ==========================================

router.get(
  "/users",
  protect,
  adminOnly,
  getAllUsers
);


// ==========================================
// GET ALL BOOKINGS
// GET /api/admin/bookings
// ==========================================

router.get(
  "/bookings",
  protect,
  adminOnly,
  getAllBookings
);


// ==========================================
// UPDATE BOOKING STATUS
// PUT /api/admin/bookings/:id/status
// ==========================================

router.put(
  "/bookings/:id/status",
  protect,
  adminOnly,
  updateBookingStatus
);


module.exports = router;