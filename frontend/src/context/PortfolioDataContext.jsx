import React, { createContext, useContext, useState, useEffect } from "react";

const PortfolioDataContext = createContext(null);

const STORAGE_KEY = "portfolio_shared_data";
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4001/api";

export const PortfolioDataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setData(JSON.parse(saved));
        }
      } catch (e) {
        console.error("Error reading shared portfolio data", e);
      }
    };

    window.addEventListener("storage", handleUpdate);
    window.addEventListener("portfolio_data_updated", handleUpdate);
    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("portfolio_data_updated", handleUpdate);
    };
  }, []);

  // Fetch latest profile directly from backend API
  useEffect(() => {
    const fetchApiProfile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/profile/get`);
        if (res.ok) {
          const result = await res.json();
          console.log(result);
          if (result.success && result.data) {
            setData((prev) => ({
              ...(prev || {}),
              profile: {
                ...(prev?.profile || {}),
                ...result.data,
              },
            }));
          }
        }
      } catch (e) {
        // Backend offline or unreachable, fallback to localStorage/default
      }
    };

    fetchApiProfile();
  }, []);

  return (
    <PortfolioDataContext.Provider value={data}>
      {children}
    </PortfolioDataContext.Provider>
  );
};

export const usePortfolioData = () => {
  return useContext(PortfolioDataContext);
};
