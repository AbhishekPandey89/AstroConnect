
const CareerApplication = require("../models/CareerApplication");

const allowedMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const allowedPositions = [
  "Astrologer Partners",
  "Customer Support",
  "Technology & Development",
  "Other",
];

const applyForCareer = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      position,
      skills,
      experience,
      coverLetter,
    } = req.body;

    // 1. Required field validation
    if (
      typeof fullName !== "string" ||
      typeof email !== "string" ||
      typeof phone !== "string" ||
      typeof position !== "string" ||
      typeof skills !== "string" ||
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !position.trim() ||
      !skills.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields correctly.",
      });
    }

    const cleanName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.replace(/[\s+-]/g, "");
    const cleanSkills = skills.trim();
    const cleanExperience =
      typeof experience === "string" ? experience.trim() : "";
    const cleanCoverLetter =
      typeof coverLetter === "string" ? coverLetter.trim() : "";

    // 2. Name validation
    if (
      cleanName.length < 2 ||
      cleanName.length > 100 ||
      !/^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ\s.'’-]{1,99}$/.test(
        cleanName
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid name between 2 and 100 characters.",
      });
    }

    // 3. Email validation
    if (
      cleanEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // 4. Indian mobile number validation
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid 10-digit Indian mobile number.",
      });
    }

    // 5. Position validation
    if (!allowedPositions.includes(position)) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid position.",
      });
    }

    // 6. Skills, experience and cover letter limits
    if (cleanSkills.length < 2 || cleanSkills.length > 1000) {
      return res.status(400).json({
        success: false,
        message: "Skills must be between 2 and 1000 characters.",
      });
    }

    if (cleanExperience.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Experience must be 100 characters or less.",
      });
    }

    if (cleanCoverLetter.length > 3000) {
      return res.status(400).json({
        success: false,
        message: "Cover letter must be 3000 characters or less.",
      });
    }

    // 7. Resume validation
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload your resume.",
      });
    }

    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Resume must be PDF, DOC, or DOCX.",
      });
    }

    if (
      !req.file.buffer ||
      req.file.size === 0 ||
      req.file.size > 5 * 1024 * 1024
    ) {
      return res.status(400).json({
        success: false,
        message: "Resume must be non-empty and no larger than 5 MB.",
      });
    }

    const fileBuffer = req.file.buffer;

    const isPDF = fileBuffer.subarray(0, 5).toString() === "%PDF-";

    const isDOC =
      fileBuffer.subarray(0, 8).toString("hex") ===
      "d0cf11e0a1b11ae1";

    const isDOCX =
      fileBuffer.subarray(0, 2).toString("hex") === "504b";

    const validSignature =
      (req.file.mimetype === "application/pdf" && isPDF) ||
      (req.file.mimetype === "application/msword" && isDOC) ||
      (
        req.file.mimetype ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
        isDOCX
      );

    if (!validSignature) {
      return res.status(400).json({
        success: false,
        message: "The file content does not match a supported resume format.",
      });
    }

    // 8. Save application and resume to MongoDB
    const application = await CareerApplication.create({
      fullName: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      position,
      skills: cleanSkills,
      experience: cleanExperience || "Not specified",
      coverLetter: cleanCoverLetter,
      resume: {
        data: fileBuffer,
        contentType: req.file.mimetype,
        originalName: req.file.originalname,
        size: req.file.size,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Your career application has been submitted successfully.",
      applicationId: application._id,
    });
  } catch (error) {
    console.error("Career application error:", error);

    // Mongoose schema validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Some application details are invalid. Please check them.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to submit your application right now.",
    });
  }
};

module.exports = { applyForCareer };