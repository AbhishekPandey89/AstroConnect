import { Routes, Route } from "react-router-dom";

// Public Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/Services";
import AcharyasPage from "./Pages/AcharyasPage";
import AIHelpPage from "./Pages/AIHelpPage";
import Kundali from "./Pages/Kundali";
import Vastu from "./Pages/Vastu";
import Pooja from "./Pages/Pooja";
import JyotishPage from "./Pages/JyotishPage";
import LagnaPage from "./Pages/LagnaPage";
import Muhurat from "./Pages/Muhurat";
import NumerologyPage from "./Pages/NumerologyPage";
import TarotPage from "./Pages/TarotPage";
import ReviewsPage from "./Pages/ReviewsPage";
import GalleryPage from "./Pages/GalleryPage";
import CitiesPage from "./Pages/CitiesPage";

// Auth
import Login from "./Pages/Login";
import Register from "./Pages/Register";

// Protected Pages
import BookingPage from "./Pages/BookingPage";
import MyBookings from "./Pages/MyBookings";
import Dashboard from "./Pages/Dashboard";

// Admin
import AdminDashboard from "./Pages/AdminDashboard";
import AdminAcharyas from "./Pages/AdminAcharyas";
import AdminVastu from "./Pages/AdminVastu";
import AdminPoojas from "./Pages/AdminPoojas";

// Route Protection
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* =====================================================
          PUBLIC ROUTES
      ===================================================== */}

      <Route path="/" element={<Home />} />

      <Route path="/about" element={<About />} />

      <Route path="/services" element={<Services />} />

      <Route
        path="/acharyas"
        element={<AcharyasPage />}
      />

      <Route
        path="/ai-help"
        element={<AIHelpPage />}
      />

      <Route
        path="/kundali"
        element={<Kundali />}
      />

      <Route
        path="/vastu"
        element={<Vastu />}
      />

      <Route
        path="/pooja"
        element={<Pooja />}
      />

      <Route
        path="/jyotish"
        element={<JyotishPage />}
      />

      <Route
        path="/lagna"
        element={<LagnaPage />}
      />

      <Route
        path="/muhurat"
        element={<Muhurat />}
      />

      <Route
        path="/numerology"
        element={<NumerologyPage />}
      />

      <Route
        path="/tarot"
        element={<TarotPage />}
      />

      <Route
        path="/reviews"
        element={<ReviewsPage />}
      />

      <Route
        path="/gallery"
        element={<GalleryPage />}
      />

      <Route
        path="/cities"
        element={<CitiesPage />}
      />


      {/* =====================================================
          AUTH ROUTES
      ===================================================== */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />


      {/* =====================================================
          PROTECTED USER ROUTES
      ===================================================== */}

      <Route element={<ProtectedRoute />}>

        <Route
          path="/booking"
          element={<BookingPage />}
        />

        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Route>


      {/* =====================================================
          ADMIN ROUTES
      ===================================================== */}

      <Route element={<ProtectedRoute adminOnly />}>

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/acharyas"
          element={<AdminAcharyas />}
        />

        <Route
          path="/admin/vastu"
          element={<AdminVastu />}
        />

        <Route
          path="/admin/poojas"
          element={<AdminPoojas />}
        />

      </Route>

    </Routes>
  );
}

export default App;