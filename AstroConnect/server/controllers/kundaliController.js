const Kundali = require("../models/Kundali");

// ==========================================
// CREATE KUNDALI
// ==========================================
const createKundali = async (req, res) => {
  try {
    const {
      name,
      dateOfBirth,
      birthTime,
      birthPlace,
    } = req.body;

    // Validation
    if (!name || !dateOfBirth || !birthTime || !birthPlace) {
      return res.status(400).json({
        success: false,
        message:
          "Name, date of birth, birth time and birth place are required.",
      });
    }

    // Create Kundali
    const kundali = await Kundali.create({
      user: req.user.userId,
      name: name.trim(),
      dateOfBirth,
      birthTime: birthTime.trim(),
      birthPlace: birthPlace.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Kundali saved successfully.",
      data: kundali,
    });
  } catch (error) {
    console.error("❌ Create Kundali Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to save Kundali.",
      error: error.message,
    });
  }
};

// ==========================================
// GET MY KUNDALIS
// ==========================================
const getMyKundalis = async (req, res) => {
  try {
    const kundalis = await Kundali.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: kundalis.length,
      data: kundalis,
    });
  } catch (error) {
    console.error("❌ Get Kundalis Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch Kundalis.",
      error: error.message,
    });
  }
};

// ==========================================
// GET SINGLE KUNDALI
// ==========================================
const getKundaliById = async (req, res) => {
  try {
    const kundali = await Kundali.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!kundali) {
      return res.status(404).json({
        success: false,
        message: "Kundali not found.",
      });
    }

    return res.json({
      success: true,
      data: kundali,
    });
  } catch (error) {
    console.error("❌ Get Kundali Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch Kundali.",
      error: error.message,
    });
  }
};

// ==========================================
// EXPORT
// ==========================================
module.exports = {
  createKundali,
  getMyKundalis,
  getKundaliById,
};