const Acharya = require("../models/Acharya");

// ==========================================
// GET ALL ACTIVE ACHARYAS
// GET /api/acharyas
// ==========================================

const getAllAcharyas = async (req, res) => {
  try {
    const acharyas = await Acharya.find({
      active: true,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: acharyas.length,
      acharyas,
    });
  } catch (error) {
    console.error("❌ Get acharyas error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching acharyas",
    });
  }
};


// ==========================================
// GET ALL ACHARYAS - ADMIN
// GET /api/acharyas/admin/all
// ==========================================

const getAllAcharyasAdmin = async (req, res) => {
  try {
    const acharyas = await Acharya.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: acharyas.length,
      acharyas,
    });
  } catch (error) {
    console.error(
      "❌ Get all acharyas admin error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error while fetching acharyas",
    });
  }
};


// ==========================================
// CREATE ACHARYA
// POST /api/acharyas
// ADMIN ONLY
// ==========================================

const createAcharya = async (req, res) => {
  try {
    const {
      name,
      specialty,
      fee,
      experience,
      languages,
      bio,
      image,
      active,
    } = req.body;

    if (!name || !specialty || fee === undefined) {
      return res.status(400).json({
        success: false,
        message:
          "Name, specialty and fee are required",
      });
    }

    const acharya = await Acharya.create({
      name,
      specialty,
      fee,
      experience: experience || 0,
      languages:
        languages && languages.length
          ? languages
          : ["Hindi", "English"],
      bio: bio || "",
      image: image || "",
      active:
        active !== undefined ? active : true,
    });

    return res.status(201).json({
      success: true,
      message: "Acharya created successfully",
      acharya,
    });
  } catch (error) {
    console.error(
      "❌ Create acharya error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error while creating acharya",
    });
  }
};


// ==========================================
// UPDATE ACHARYA
// PUT /api/acharyas/:id
// ADMIN ONLY
// ==========================================

const updateAcharya = async (req, res) => {
  try {
    const acharya = await Acharya.findById(
      req.params.id
    );

    if (!acharya) {
      return res.status(404).json({
        success: false,
        message: "Acharya not found",
      });
    }

    const {
      name,
      specialty,
      fee,
      experience,
      languages,
      bio,
      image,
      active,
    } = req.body;

    if (name !== undefined) acharya.name = name;
    if (specialty !== undefined)
      acharya.specialty = specialty;
    if (fee !== undefined) acharya.fee = fee;
    if (experience !== undefined)
      acharya.experience = experience;
    if (languages !== undefined)
      acharya.languages = languages;
    if (bio !== undefined) acharya.bio = bio;
    if (image !== undefined) acharya.image = image;
    if (active !== undefined)
      acharya.active = active;

    await acharya.save();

    return res.status(200).json({
      success: true,
      message: "Acharya updated successfully",
      acharya,
    });
  } catch (error) {
    console.error(
      "❌ Update acharya error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error while updating acharya",
    });
  }
};


// ==========================================
// DELETE ACHARYA
// DELETE /api/acharyas/:id
// ADMIN ONLY
// ==========================================

const deleteAcharya = async (req, res) => {
  try {
    const acharya = await Acharya.findById(
      req.params.id
    );

    if (!acharya) {
      return res.status(404).json({
        success: false,
        message: "Acharya not found",
      });
    }

    await acharya.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Acharya deleted successfully",
    });
  } catch (error) {
    console.error(
      "❌ Delete acharya error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error while deleting acharya",
    });
  }
};


module.exports = {
  getAllAcharyas,
  getAllAcharyasAdmin,
  createAcharya,
  updateAcharya,
  deleteAcharya,
};