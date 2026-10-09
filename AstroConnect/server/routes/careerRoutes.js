
const express = require("express");
const multer = require("multer");
const { applyForCareer } = require("../controllers/careerController");

const router = express.Router();

const allowedMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Maximum 5 MB
    files: 1,
  },
  fileFilter: (req, file, callback) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return callback(
        new Error("Resume must be a PDF, DOC, or DOCX file.")
      );
    }

    callback(null, true);
  },
});

// POST /api/career/apply
router.post("/apply", (req, res, next) => {
  upload.single("resume")(req, res, (error) => {
    if (error) {
      const isFileTooLarge = error.code === "LIMIT_FILE_SIZE";

      return res.status(400).json({
        success: false,
        message: isFileTooLarge
          ? "Resume size must be 5 MB or less."
          : error.message || "Resume upload failed.",
      });
    }

    next();
  });
}, applyForCareer);

module.exports = router;