import React, { createContext, useContext, useState, useEffect } from "react";
import { API_BASE_URL } from "../config";

// ─── Context ──────────────────────────────────────────────────────────────────
const PortfolioDataContext = createContext(null);

// ─── Helper: generic fetch with abort signal ──────────────────────────────────
const fetchResource = async (endpoint, signal) => {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${endpoint}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.message || `Failed: ${endpoint}`);
  return json.data;
};

// ─── Provider ─────────────────────────────────────────────────────────────────
export const PortfolioDataProvider = ({ children }) => {
  // Separate state per resource — no overwrite risk, clean & scalable
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);

  // Shared loading & error state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchAll = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch all resources in parallel — fastest approach
        const [profileData, projectsData, educationsData, experiencesData] =
          await Promise.all([
            fetchResource("/profile", signal),
            fetchResource("/projects", signal),
            fetchResource("/educations", signal),
            fetchResource("/experiences", signal),
          ]);

        setProfile(profileData);
        setProjects(projectsData);
        setEducations(educationsData);
        setExperiences(experiencesData);
      } catch (err) {
        // Ignore abort errors (caused by StrictMode unmount / navigation)
        if (err.name === "AbortError") return;
        console.error("Portfolio data fetch failed:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();

    // Cleanup: cancel all in-flight requests on unmount
    return () => controller.abort();
  }, []);

  const contextValue = {
    profile,
    projects,
    educations,
    experiences,
    loading,
    error,
  };

  return (
    <PortfolioDataContext.Provider value={contextValue}>
      {children}
    </PortfolioDataContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const usePortfolioData = () => {
  const context = useContext(PortfolioDataContext);
  if (context === null) {
    throw new Error(
      "usePortfolioData must be used inside <PortfolioDataProvider>",
    );
  }
  return context;
};
