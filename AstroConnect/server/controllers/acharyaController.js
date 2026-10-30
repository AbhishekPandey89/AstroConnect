
const Acharya = require("../models/Acharya");

// ==========================================
// GET ALL ACTIVE ACHARYAS
// GET /api/acharyas
// PUBLIC
// ==========================================
const getAllAcharyas = async (req, res) => {
  try {
    const acharyas = await Acharya.find({ active: true })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: acharyas.length,
      acharyas,
    });
  } catch (error) {
    console.error("Get acharyas error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching acharyas",
    });
  }
};

// ==========================================
// GET ALL ACHARYAS - ADMIN
// GET /api/acharyas/admin/all
// ADMIN ONLY
// ==========================================
const getAllAcharyasAdmin = async (req, res) => {
  try {
    const acharyas = await Acharya.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: acharyas.length,
      acharyas,
    });
  } catch (error) {
    console.error("Get all acharyas admin error:", error);

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

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof specialty !== "string" ||
      !specialty.trim() ||
      fee === undefined ||
      fee === null ||
      fee === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, specialty and fee are required",
      });
    }

    const parsedFee = Number(fee);
    const parsedExperience =
      experience === undefined || experience === ""
        ? 0
        : Number(experience);

    if (
      !Number.isFinite(parsedFee) ||
      parsedFee < 0 ||
      !Number.isFinite(parsedExperience) ||
      parsedExperience < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Fee and experience must be valid non-negative numbers",
      });
    }

    const acharya = await Acharya.create({
      name: name.trim(),
      specialty: specialty.trim(),
      fee: parsedFee,
      experience: parsedExperience,
      languages:
        Array.isArray(languages) && languages.length > 0
          ? languages
          : ["Hindi", "English"],
      bio: typeof bio === "string" ? bio : "",
      image: typeof image === "string" ? image : "",
      active: active === undefined ? true : active,
    });

    return res.status(201).json({
      success: true,
      message: "Acharya created successfully",
      acharya,
    });
  } catch (error) {
    console.error("Create acharya error:", error);

    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid acharya data",
      });
    }

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
    const acharya = await Acharya.findById(req.params.id);

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

    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Name must be a non-empty string",
        });
      }
      acharya.name = name.trim();
    }

    if (specialty !== undefined) {
      if (typeof specialty !== "string" || !specialty.trim()) {
        return res.status(400).json({
          success: false,
          message: "Specialty must be a non-empty string",
        });
      }
      acharya.specialty = specialty.trim();
    }

    if (fee !== undefined) {
      const parsedFee = Number(fee);

      if (fee === "" || !Number.isFinite(parsedFee) || parsedFee < 0) {
        return res.status(400).json({
          success: false,
          message: "Fee must be a valid non-negative number",
        });
      }

      acharya.fee = parsedFee;
    }

    if (experience !== undefined) {
      const parsedExperience = Number(experience);

      if (
        experience === "" ||
        !Number.isFinite(parsedExperience) ||
        parsedExperience < 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Experience must be a valid non-negative number",
        });
      }

      acharya.experience = parsedExperience;
    }

    if (languages !== undefined) {
      if (!Array.isArray(languages)) {
        return res.status(400).json({
          success: false,
          message: "Languages must be an array",
        });
      }
      acharya.languages = languages;
    }

    if (bio !== undefined) {
      if (typeof bio !== "string") {
        return res.status(400).json({
          success: false,
          message: "Bio must be a string",
        });
      }
      acharya.bio = bio;
    }

    if (image !== undefined) {
      if (typeof image !== "string") {
        return res.status(400).json({
          success: false,
          message: "Image must be a string",
        });
      }
      acharya.image = image;
    }

    if (active !== undefined) {
      if (typeof active !== "boolean") {
        return res.status(400).json({
          success: false,
          message: "Active must be true or false",
        });
      }
      acharya.active = active;
    }

    await acharya.save();

    return res.status(200).json({
      success: true,
      message: "Acharya updated successfully",
      acharya,
    });
  } catch (error) {
    console.error("Update acharya error:", error);

    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid acharya data or ID",
      });
    }

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
    const acharya = await Acharya.findById(req.params.id);

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
    console.error("Delete acharya error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid acharya ID",
      });
    }

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
