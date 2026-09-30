import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { API_BASE_URL } from "../../config";

const AuthContext = createContext(null);

const apiFetch = async (path, options = {}) => {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  const cleanBase = API_BASE_URL.endsWith("/")
    ? API_BASE_URL.slice(0, -1)
    : API_BASE_URL;

  const res = await fetch(`${cleanBase}/${cleanPath}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  // handle response error
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }
  return { res, data };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Auto-login verify
  useEffect(() => {
    let cancel = false;

    const verifyAuth = async () => {
      try {
        const { res, data } = await apiFetch("/auth/me");
        if (!cancel && res.ok && data.user) {
          setUser(data.user);
        }
      } catch (err) {
        if (!cancel) {
          setUser(null);
        }
      } finally {
        if (!cancel) {
          setLoading(false);
        }
      }
    };

    verifyAuth();

    return () => {
      cancel = true;
    };
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      // Attempt backend login first
      const { res, data } = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok || !data.user) {
        throw new Error(data.message || "Invalid credentials");
      }

      // set user data from backend
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (err) {
      const isNetworkError =
        err instanceof TypeError ||
        /Failed to fetch|NetworkError/i.test(err.message || "");

      if (isNetworkError && import.meta.env?.DEV && email && password) {
        // Dev-only offline fallback (no real session — mock only)
        const mockUser = {
          email,
          username: email.split("@")[0],
          role: "ADMIN",
          id: "admin-offline",
        };
        setUser(mockUser);
        return { success: true, offline: true, user: mockUser };
      }

      const message = err.message || "Failed to log in";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiFetch("/auth/logout", {
        method: "POST",
      });
    } catch (err) {
      console.warn("Logout request error:", err?.message || err);
    } finally {
      setUser(null);
      setError(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      loading,
      error,
      login,
      logout,
    }),
    [user, loading, error, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

