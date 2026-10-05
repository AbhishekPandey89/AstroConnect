import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getProfile } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(() => {
    return localStorage.getItem("astroconnect_token");
  });

  const [loading, setLoading] = useState(true);

  // ==========================================
  // CHECK LOGIN WHEN APP STARTS
  // ==========================================

  useEffect(() => {
    const loadUser = async () => {
      const savedToken =
        localStorage.getItem("astroconnect_token");

      if (!savedToken) {
        setUser(null);
        setToken(null);
        setLoading(false);
        return;
      }

      try {
        const data = await getProfile(savedToken);

        if (data.success && data.user) {
          setUser(data.user);
          setToken(savedToken);
        } else {
          throw new Error("Invalid session");
        }
      } catch (error) {
        console.error(
          "Authentication failed:",
          error.message
        );

        localStorage.removeItem("astroconnect_token");

        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // ==========================================
  // SAVE LOGIN
  // ==========================================

  const saveLogin = (loginData) => {
    if (!loginData?.token) {
      console.error("Login token missing");
      return;
    }

    localStorage.setItem(
      "astroconnect_token",
      loginData.token
    );

    setToken(loginData.token);

    setUser(loginData.user || null);
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = () => {
    localStorage.removeItem("astroconnect_token");

    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(user && token),
    saveLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};