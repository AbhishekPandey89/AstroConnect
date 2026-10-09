const express = require("express");

const {
  createKundali,
  getMyKundalis,
  getKundaliById,
} = require("../controllers/kundaliController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// CREATE KUNDALI
// POST /api/kundali
// ==========================================
router.post("/", protect, createKundali);

// ==========================================
// GET MY KUNDALIS
// GET /api/kundali/my
// ==========================================
router.get("/my", protect, getMyKundalis);

// ==========================================
// GET SINGLE KUNDALI
// GET /api/kundali/:id
// ==========================================
router.get("/:id", protect, getKundaliById);

module.exports = router;