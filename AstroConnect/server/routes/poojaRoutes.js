const express = require("express");

const {
  getAllPoojas,
  createPooja,
  updatePooja,
  deletePooja,
} = require("../controllers/poojaController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// =====================================================
// PUBLIC
// =====================================================

router.get("/", getAllPoojas);


// =====================================================
// ADMIN
// =====================================================

router.post("/", protect, createPooja);

router.put("/:id", protect, updatePooja);

router.delete("/:id", protect, deletePooja);


module.exports = router;