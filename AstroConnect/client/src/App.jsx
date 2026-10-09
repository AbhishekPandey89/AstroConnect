import { Routes, Route } from "react-router-dom";

// Footer
import Footer from "./Components/Footer/Footer";

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
import Contact from "./Pages/Contact";
import Career from "./Pages/Career";

// Auth
import Login from "./Pages/Login";
import Register from "./Pages/Register";

// Protected Pages
import BookingPage from "./Pages/BookingPage";
import MyBookings from "./Pages/MyBookings";
import Dashboard from "./Pages/Dashboard";
import KundaliDetails from "./Pages/KundaliDetails";

// Admin
import AdminDashboard from "./Pages/AdminDashboard";
import AdminAcharyas from "./Pages/AdminAcharyas";
import AdminVastu from "./Pages/AdminVastu";
import AdminPoojas from "./Pages/AdminPoojas";

// Route Protection
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

// =====================================================
// PAGE WITH FOOTER
// =====================================================
// Footer normal website/user pages ke liye hai.
// Admin pages me Footer nahi lagega.

const WithFooter = ({ children }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

function App() {
  return (
    <Routes>

      {/* =====================================================
          PUBLIC ROUTES
          ===================================================== */}

      <Route
        path="/"
        element={
          <WithFooter>
            <Home />
          </WithFooter>
        }
      />

      <Route
        path="/about"
        element={
          <WithFooter>
            <About />
          </WithFooter>
        }
      />

      <Route
        path="/services"
        element={
          <WithFooter>
            <Services />
          </WithFooter>
        }
      />

      <Route
        path="/acharyas"
        element={
          <WithFooter>
            <AcharyasPage />
          </WithFooter>
        }
      />

      <Route
        path="/ai-help"
        element={
          <WithFooter>
            <AIHelpPage />
          </WithFooter>
        }
      />

      <Route
        path="/kundali"
        element={
          <WithFooter>
            <Kundali />
          </WithFooter>
        }
      />

      <Route
        path="/vastu"
        element={
          <WithFooter>
            <Vastu />
          </WithFooter>
        }
      />

      <Route
        path="/pooja"
        element={
          <WithFooter>
            <Pooja />
          </WithFooter>
        }
      />

      <Route
        path="/jyotish"
        element={
          <WithFooter>
            <JyotishPage />
          </WithFooter>
        }
      />

      <Route
        path="/lagna"
        element={
          <WithFooter>
            <LagnaPage />
          </WithFooter>
        }
      />

      <Route
        path="/muhurat"
        element={
          <WithFooter>
            <Muhurat />
          </WithFooter>
        }
      />

      <Route
        path="/numerology"
        element={
          <WithFooter>
            <NumerologyPage />
          </WithFooter>
        }
      />

      <Route
        path="/tarot"
        element={
          <WithFooter>
            <TarotPage />
          </WithFooter>
        }
      />

      <Route
        path="/reviews"
        element={
          <WithFooter>
            <ReviewsPage />
          </WithFooter>
        }
      />

      <Route
        path="/gallery"
        element={
          <WithFooter>
            <GalleryPage />
          </WithFooter>
        }
      />

      <Route
        path="/cities"
        element={
          <WithFooter>
            <CitiesPage />
          </WithFooter>
        }
      />

      {/* =====================================================
          CONTACT
          ===================================================== */}

      <Route
        path="/contact"
        element={
          <WithFooter>
            <Contact />
          </WithFooter>
        }
      />


      <Route
        path="/career"
        element={
          <WithFooter>
            <Career />
          </WithFooter>
        }
      />

      {/* =====================================================
          AUTH ROUTES
          ===================================================== */}

      <Route
        path="/login"
        element={
          <WithFooter>
            <Login />
          </WithFooter>
        }
      />

      <Route
        path="/register"
        element={
          <WithFooter>
            <Register />
          </WithFooter>
        }
      />

      {/* =====================================================
          PROTECTED USER ROUTES
          ===================================================== */}

      <Route element={<ProtectedRoute />}>

        <Route
          path="/booking"
          element={
            <WithFooter>
              <BookingPage />
            </WithFooter>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <WithFooter>
              <MyBookings />
            </WithFooter>
          }
        />

        <Route
          path="/dashboard"
          element={
            <WithFooter>
              <Dashboard />
            </WithFooter>
          }
        />

        {/* KUNDALI DETAILS - NORMAL LOGGED-IN USER */}

        <Route
          path="/kundali/:id"
          element={<KundaliDetails />}
        />

      </Route>

      {/* =====================================================
          ADMIN ROUTES
          =====================================================
          Admin pages intentionally Footer ke bahar hain.
          Inka apna Admin design rahega.
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