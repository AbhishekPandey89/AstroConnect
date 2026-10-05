const Pooja = require("../models/Pooja");


// =====================================================
// GET ALL POOJAS
// =====================================================

const getAllPoojas = async (req, res) => {
  try {
    const poojas = await Pooja.find()
      .sort({ date: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: poojas.length,
      poojas,
    });
  } catch (error) {
    console.error("Get poojas error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch pooja records.",
    });
  }
};


// =====================================================
// CREATE POOJA
// =====================================================

const createPooja = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required.",
      });
    }

    const {
      city,
      date,
      poojaName,
      poojaType,
      images,
      acharya,
      yajmanName,
    } = req.body;

    if (
      !city ||
      !date ||
      !poojaName ||
      !poojaType ||
      !acharya ||
      !yajmanName
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const pooja = await Pooja.create({
      city,
      date,
      poojaName,
      poojaType,
      images: Array.isArray(images) ? images : [],
      acharya,
      yajmanName,
    });

    res.status(201).json({
      success: true,
      message: "Pooja record created successfully.",
      pooja,
    });
  } catch (error) {
    console.error("Create pooja error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create pooja record.",
    });
  }
};


// =====================================================
// UPDATE POOJA
// =====================================================

const updatePooja = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required.",
      });
    }

    const {
      city,
      date,
      poojaName,
      poojaType,
      images,
      acharya,
      yajmanName,
    } = req.body;

    const pooja = await Pooja.findById(req.params.id);

    if (!pooja) {
      return res.status(404).json({
        success: false,
        message: "Pooja record not found.",
      });
    }

    pooja.city = city;
    pooja.date = date;
    pooja.poojaName = poojaName;
    pooja.poojaType = poojaType;
    pooja.images = Array.isArray(images) ? images : [];
    pooja.acharya = acharya;
    pooja.yajmanName = yajmanName;

    await pooja.save();

    res.status(200).json({
      success: true,
      message: "Pooja record updated successfully.",
      pooja,
    });
  } catch (error) {
    console.error("Update pooja error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update pooja record.",
    });
  }
};


// =====================================================
// DELETE POOJA
// =====================================================

const deletePooja = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required.",
      });
    }

    const pooja = await Pooja.findById(req.params.id);

    if (!pooja) {
      return res.status(404).json({
        success: false,
        message: "Pooja record not found.",
      });
    }

    await pooja.deleteOne();

    res.status(200).json({
      success: true,
      message: "Pooja deleted successfully.",
    });
  } catch (error) {
    console.error("Delete pooja error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete pooja.",
    });
  }
};


module.exports = {
  getAllPoojas,
  createPooja,
  updatePooja,
  deletePooja,
};