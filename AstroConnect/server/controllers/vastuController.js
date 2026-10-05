const VastuConsultation = require("../models/VastuConsultation");

// Create Vastu consultation
const createVastuConsultation = async (req, res) => {
  try {
    const {
      propertyType,
      propertySize,
      location,
      facing,
      concern,
      name,
      phone,
      email,
    } = req.body;

    if (!propertyType || !location || !name || !phone) {
      return res.status(400).json({
        success: false,
        message:
          "Property type, location, name and phone are required.",
      });
    }

    const consultation =
      await VastuConsultation.create({
        propertyType,
        propertySize,
        location,
        facing,
        concern,
        name,
        phone,
        email,
      });

    return res.status(201).json({
      success: true,
      message:
        "Vastu consultation request submitted successfully.",
      consultation,
    });
  } catch (error) {
    console.error(
      "Create Vastu consultation error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to submit Vastu consultation request.",
    });
  }
};


// Get all Vastu consultations - Admin
const getAllVastuConsultations = async (req, res) => {
  try {
    const consultations =
      await VastuConsultation.find()
        .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      consultations,
    });
  } catch (error) {
    console.error(
      "Get Vastu consultations error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to load Vastu consultations.",
    });
  }
};


// Update consultation status - Admin
const updateVastuConsultationStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "contacted",
      "completed",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid consultation status.",
      });
    }

    const consultation =
      await VastuConsultation.findByIdAndUpdate(
        req.params.id,
        { status },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message:
          "Vastu consultation not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Vastu consultation status updated.",
      consultation,
    });
  } catch (error) {
    console.error(
      "Update Vastu consultation status error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to update consultation status.",
    });
  }
};


module.exports = {
  createVastuConsultation,
  getAllVastuConsultations,
  updateVastuConsultationStatus,
};


// =====================================================
// CREATE VASTU CONSULTATION
// =====================================================

exports.createVastuConsultation = async (req, res) => {
  try {
    const consultation = await VastuConsultation.create(req.body);

    res.status(201).json({
      success: true,
      message: "Vastu consultation request submitted successfully.",
      consultation,
    });
  } catch (error) {
    console.error("Create Vastu consultation error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to submit Vastu consultation request.",
    });
  }
};

// =====================================================
// GET ALL VASTU CONSULTATIONS - ADMIN
// =====================================================

exports.getAllVastuConsultations = async (req, res) => {
  try {
    const consultations = await VastuConsultation.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      consultations,
    });
  } catch (error) {
    console.error("Get Vastu consultations error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load Vastu consultations.",
    });
  }
};

// =====================================================
// UPDATE VASTU STATUS - ADMIN
// =====================================================

exports.updateVastuStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const consultation =
      await VastuConsultation.findByIdAndUpdate(
        id,
        { status },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: "Vastu consultation not found.",
      });
    }

    res.json({
      success: true,
      message: "Vastu consultation status updated.",
      consultation,
    });
  } catch (error) {
    console.error("Update Vastu status error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update Vastu status.",
    });
  }
};

// =====================================================
// DELETE VASTU CONSULTATION - ADMIN
// =====================================================

exports.deleteVastuConsultation = async (req, res) => {
  try {
    const { id } = req.params;

    const consultation =
      await VastuConsultation.findByIdAndDelete(id);

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: "Vastu consultation not found.",
      });
    }

    res.json({
      success: true,
      message: "Vastu consultation deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Vastu consultation error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete Vastu consultation.",
    });
  }
};