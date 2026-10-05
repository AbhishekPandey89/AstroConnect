const express = require("express");

const {
  createVastuConsultation,
  getAllVastuConsultations,
  updateVastuConsultationStatus,
} = require("../controllers/vastuController");

const router = express.Router();

// =====================================================
// TEST
// =====================================================

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Vastu API is working",
  });
});

// =====================================================
// PUBLIC - SUBMIT VASTU CONSULTATION
// =====================================================

router.post("/", createVastuConsultation);

// =====================================================
// ADMIN - GET ALL VASTU CONSULTATIONS
// =====================================================

router.get(
  "/admin/all",
  getAllVastuConsultations
);

// =====================================================
// ADMIN - UPDATE VASTU STATUS
// =====================================================

router.put(
  "/admin/:id/status",
  updateVastuConsultationStatus
);

module.exports = router;