const adminOnly = (req, res, next) => {
  try {
    // protect middleware pehle hi req.user set karta hai
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please login first.",
      });
    }

    // Check admin role
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }

    // User is admin
    next();
  } catch (error) {
    console.error(
      "❌ Admin authorization error:",
      error.message
    );

    return res.status(403).json({
      success: false,
      message: "Admin access denied.",
    });
  }
};

module.exports = adminOnly;