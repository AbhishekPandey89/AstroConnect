
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const protect = require("../middleware/authMiddleware");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check required fields
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Profile API
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Profile error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone are required",
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name;
    user.phone = phone;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const forgotPassword = async (req, res) => {
  let user;

  try {
    const email = req.body.email?.trim().toLowerCase();

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    user = await User.findOne({ email });

    // Do not reveal whether the account exists.
    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          "If an account exists with this email, password reset instructions will be sent.",
      });
    }

    // Generate a secure random token.
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Store only the hashed token in MongoDB.
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);

    await user.save();

    const frontendUrl = process.env.FRONTEND_URL;

    if (!frontendUrl) {
      throw new Error("FRONTEND_URL is not configured in the environment");
    }

    const resetLink = `${frontendUrl.replace(/\/+$/, "")}/reset-password/${resetToken}`;

    try {
      await emailTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "AstroConnect - Reset Your Password",

        text: `You requested a password reset for AstroConnect.

Open this link to set a new password:
${resetLink}

This link expires in 15 minutes. If you did not request this, ignore this email.`,

        // FIX: HTML must be a string enclosed in backticks.
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>AstroConnect Password Reset</h2>

            <p>You requested to reset your AstroConnect password.</p>

            <p>
              <a
                href="${resetLink}"
                style="display:inline-block;padding:12px 20px;background:#f59e0b;color:#ffffff;text-decoration:none;border-radius:6px;"
              >
                Reset Password
              </a>
            </p>

            <p>This link expires in 15 minutes.</p>

            <p>If you did not request this, you can ignore this email.</p>
          </div>
        `,
      });
    } catch (emailError) {
      // Invalidate the token if sending the email fails.
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      throw emailError;
    }

    return res.status(200).json({
      success: true,
      message:
        "If an account exists with this email, password reset instructions will be sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error.message);
    console.error("Error code:", error.code || "Not provided");
    console.error("Error name:", error.name || "Not provided");

    return res.status(500).json({
      success: false,
      message: "Unable to process the request right now. Please try again later.",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: "Token and new password are required",
      });
    }

    if (typeof password !== "string" || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Hash the token received from the reset link.
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find the user with a valid, unexpired token.
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Reset link is invalid or expired. Please request a new one.",
      });
    }

    // Hash the new password before saving it.
    user.password = await bcrypt.hash(password, 10);

    // Make the reset token unusable after success.
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully. You can now log in.",
    });
  } catch (error) {
    console.error("Reset password error:", error.message);
    console.error("Error code:", error.code || "Not provided");

    return res.status(500).json({
      success: false,
      message: "Server error while resetting password",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
};
