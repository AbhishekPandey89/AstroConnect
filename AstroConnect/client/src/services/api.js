const API_URL = "http://localhost:5000/api";

// =====================================================
// COMMON API REQUEST
// =====================================================

const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Something went wrong. Please try again."
      );
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);

    throw new Error(
      error.message || "Unable to connect to AstroConnect server."
    );
  }
};


// =====================================================
// AUTHENTICATION
// =====================================================

// Register
export const registerUser = async (userData) => {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};


// Login
export const loginUser = async (loginData) => {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(loginData),
  });
};


// Get logged-in user profile
export const getProfile = async (token) => {
  return apiRequest("/auth/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// Update logged-in user profile
export const updateProfile = async (token, profileData) => {
  return apiRequest("/auth/profile", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });
};


// =====================================================
// BOOKING
// =====================================================

// Create Booking
export const createBooking = async (token, bookingData) => {
  return apiRequest("/bookings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookingData),
  });
};


// Get My Bookings
export const getMyBookings = async (token) => {
  return apiRequest("/bookings/my", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// Cancel Booking
export const cancelBooking = async (token, bookingId) => {
  return apiRequest(`/bookings/${bookingId}/cancel`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// =====================================================
// ADMIN
// =====================================================

// Get Admin Dashboard
export const getAdminDashboard = async (token) => {
  return apiRequest("/admin/dashboard", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// Get All Users
export const getAllUsers = async (token) => {
  return apiRequest("/admin/users", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// Get All Bookings
export const getAllBookings = async (token) => {
  return apiRequest("/admin/bookings", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// Update Booking Status
export const updateBookingStatus = async (
  token,
  bookingId,
  status
) => {
  return apiRequest(
    `/admin/bookings/${bookingId}/status`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status,
      }),
    }
  );
};


// =====================================================
// ACHARYA
// =====================================================

// Get active acharyas
export const getAcharyas = async () => {
  return apiRequest("/acharyas", {
    method: "GET",
  });
};


// Get all acharyas - Admin
export const getAllAcharyasAdmin = async (token) => {
  return apiRequest("/acharyas/admin/all", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// Create acharya - Admin
export const createAcharya = async (
  token,
  acharyaData
) => {
  return apiRequest("/acharyas", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(acharyaData),
  });
};


// Update acharya - Admin
export const updateAcharya = async (
  token,
  acharyaId,
  acharyaData
) => {
  return apiRequest(`/acharyas/${acharyaId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(acharyaData),
  });
};


// Delete acharya - Admin
export const deleteAcharya = async (
  token,
  acharyaId
) => {
  return apiRequest(`/acharyas/${acharyaId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// =====================================================
// VASTU CONSULTATION
// =====================================================

// Create Vastu consultation - Public
export const createVastuConsultation = async (
  consultationData
) => {
  return apiRequest("/vastu", {
    method: "POST",
    body: JSON.stringify(consultationData),
  });
};


// =====================================================
// VASTU ADMIN
// =====================================================

// Get all Vastu consultations - Admin
export const getAllVastuConsultations = async (
  token
) => {
  return apiRequest("/vastu/admin/all", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// Update Vastu consultation status - Admin
export const updateVastuStatus = async (
  token,
  consultationId,
  status
) => {
  return apiRequest(
    `/vastu/admin/${consultationId}/status`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status,
      }),
    }
  );
};

// =====================================================
// POOJA
// =====================================================

// Get all completed poojas - Public
export const getAllPoojas = async () => {
  return apiRequest("/poojas", {
    method: "GET",
  });
};


// Create completed pooja - Admin
export const createPooja = async (token, poojaData) => {
  return apiRequest("/poojas", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(poojaData),
  });
};


// Update completed pooja - Admin
export const updatePooja = async (
  token,
  id,
  poojaData
) => {
  return apiRequest(`/poojas/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(poojaData),
  });
};


// Delete completed pooja - Admin
export const deletePooja = async (
  token,
  id
) => {
  return apiRequest(`/poojas/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};