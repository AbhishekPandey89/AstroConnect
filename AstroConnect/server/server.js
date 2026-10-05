const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const User = require("./models/User");

const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const acharyaRoutes = require("./routes/acharyaRoutes");
const vastuRoutes = require("./routes/vastuRoutes");
const poojaRoutes = require("./routes/poojaRoutes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());
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


app.get("/api/setup-admin", async (req, res) => {
  // ...
});


// ==========================================
// SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(
    `🚀 AstroConnect Server running on http://localhost:${PORT}`
  );
});