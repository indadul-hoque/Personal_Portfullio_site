import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("portfolio_admin_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("portfolio_admin_token") || null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Auto-login verify
  useEffect(() => {
    const savedToken = localStorage.getItem("portfolio_admin_token");
    const savedUser = localStorage.getItem("portfolio_admin_user");
    if (savedToken && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      } catch (e) {
        logout();
      }
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      // Attempt backend login first
      const res = await fetch("http://localhost:4001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      const userData = data.user || {
        email,
        username: email.split("@")[0],
        role: "ADMIN",
        id: "admin-local",
      };
      const authToken = data.token || "session-token-" + Date.now();

      setUser(userData);
      setToken(authToken);
      localStorage.setItem("portfolio_admin_user", JSON.stringify(userData));
      localStorage.setItem("portfolio_admin_token", authToken);

      setLoading(false);
      return { success: true };
    } catch (err) {
      // If backend network error (e.g. backend isn't started yet), allow demo / admin fallback
      if (err.message.includes("Failed to fetch") || err.message.includes("NetworkError")) {
        // Fallback for development if backend server is not running
        if (email && password) {
          const fallbackUser = {
            email,
            username: email.split("@")[0],
            role: "ADMIN",
            id: "admin-offline",
          };
          const fallbackToken = "offline-token-" + Date.now();
          setUser(fallbackUser);
          setToken(fallbackToken);
          localStorage.setItem("portfolio_admin_user", JSON.stringify(fallbackUser));
          localStorage.setItem("portfolio_admin_token", fallbackToken);
          setLoading(false);
          return { success: true, offline: true };
        }
      }

      setError(err.message || "Failed to log in");
      setLoading(false);
      return { success: false, message: err.message };
    }
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:4001/api/auth/logout", {
        method: "POST",
        credentials: "include",
      }).catch(() => {});
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("portfolio_admin_user");
      localStorage.removeItem("portfolio_admin_token");
    }
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
