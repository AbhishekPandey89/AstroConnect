const express = require("express");

const {
  getAllAcharyas,
  getAllAcharyasAdmin,
  createAcharya,
  updateAcharya,
  deleteAcharya,
} = require("../controllers/acharyaController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

// ==========================================
// GET ACTIVE ACHARYAS
// GET /api/acharyas
// PUBLIC
// ==========================================

router.get("/", getAllAcharyas);


// ==========================================
// GET ALL ACHARYAS
// GET /api/acharyas/admin/all
// ADMIN ONLY
// ==========================================

router.get(
  "/admin/all",
  protect,
  adminOnly,
  getAllAcharyasAdmin
);


// ==========================================
// CREATE ACHARYA
// POST /api/acharyas
// ADMIN ONLY
// ==========================================

router.post(
  "/",
  protect,
  adminOnly,
  createAcharya
);


// ==========================================
// UPDATE ACHARYA
// PUT /api/acharyas/:id
// ADMIN ONLY
// ==========================================

router.put(
  "/:id",
  protect,
  adminOnly,
  updateAcharya
);


// ==========================================
// DELETE ACHARYA
// DELETE /api/acharyas/:id
// ADMIN ONLY
// ==========================================

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteAcharya
);


module.exports = router;