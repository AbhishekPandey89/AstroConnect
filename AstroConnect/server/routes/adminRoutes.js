const express = require("express");

const {
getAdminDashboard,
getAllUsers,
getAllBookings,
updateBookingStatus,
} = require("../controllers/adminController");

const {
getAllContactMessages,
updateContactMessageStatus,
deleteContactMessage,
} = require("../controllers/adminContactController");

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

// ==========================================
// CONTACT MESSAGES
// ==========================================

// GET all contact messages
router.get(
"/contact-messages",
protect,
adminOnly,
getAllContactMessages
);

// Update contact message status
router.put(
"/contact-messages/:id/status",
protect,
adminOnly,
updateContactMessageStatus
);

// Delete contact message
router.delete(
"/contact-messages/:id",
protect,
adminOnly,
deleteContactMessage
);

module.exports = router;
