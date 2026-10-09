const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  getKundaliAstrology,
} = require("../controllers/astrologyController");

const router = express.Router();

router.get(
  "/kundali/:id",
  protect,
  getKundaliAstrology
);

module.exports = router;