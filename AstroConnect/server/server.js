const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const acharyaRoutes = require("./routes/acharyaRoutes");
const vastuRoutes = require("./routes/vastuRoutes");
const poojaRoutes = require("./routes/poojaRoutes");
const panchangRoutes = require("./routes/panchangRoutes");
const muhuratRoutes = require("./routes/muhuratRoutes");
const kundaliRoutes = require("./routes/kundaliRoutes");
const astrologyRoutes = require("./routes/astrologyRoutes");
const contactRoutes = require("./routes/contactRoutes");
const careerRoutes = require("./routes/careerRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ==========================================
// MONGODB
// ==========================================

connectDB();

// ==========================================
// ROUTES
// ==========================================

app.use("/api/auth", authRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/acharyas", acharyaRoutes);

app.use("/api/vastu", vastuRoutes);

app.use("/api/poojas", poojaRoutes);

// Panchang
app.use("/api/panchang", panchangRoutes);

app.use("/api/muhurat", muhuratRoutes);

app.use("/api/kundali", kundaliRoutes);

app.use("/api/astrology",astrologyRoutes);

app.use("/api/contact", contactRoutes);

app.use("/api/career", careerRoutes);


// ==========================================
// MAIN ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AstroConnect Backend is running",
  });
});

// ==========================================
// API TEST
// ==========================================

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "AstroConnect API is working",
  });
});

// ==========================================
// SETUP ADMIN
// ==========================================

app.get("/api/setup-admin", async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Admin setup endpoint is available.",
    });
  } catch (error) {
    console.error("Setup admin error:", error);

    res.status(500).json({
      success: false,
      message: "Admin setup failed.",
    });
  }
});

// ==========================================
// SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(
    `🚀 AstroConnect Server running on http://localhost:${PORT}`
  );
});
