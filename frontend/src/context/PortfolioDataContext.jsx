import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
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

// ─── Helper: sleep that respects abort signal ─────────────────────────────────
const sleep = (ms, signal) =>
  new Promise((resolve, reject) => {
    const id = setTimeout(resolve, ms);
    signal.addEventListener("abort", () => {
      clearTimeout(id);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });

const MAX_RETRIES = 8;
const BASE_DELAY_MS = 2000; // starts at 2 s, doubles each time, cap 10 s

// ─── Provider ─────────────────────────────────────────────────────────────────
export const PortfolioDataProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // track retry count for display (optional)
  const retryCountRef = useRef(0);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      retryCountRef.current = 0;

      while (retryCountRef.current <= MAX_RETRIES) {
        try {
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
          setLoading(false);
          return;
        } catch (err) {
          if (err.name === "AbortError") return;

          retryCountRef.current += 1;

          if (retryCountRef.current > MAX_RETRIES) {
            // All retries exhausted — stop skeleton, show error
            console.error(
              "Portfolio data fetch failed after max retries:",
              err.message,
            );
            setError(err.message);
            setLoading(false);
            return;
          }

          // Exponential backoff: 2s, 4s, 8s … capped at 10s
          const delay = Math.min(
            BASE_DELAY_MS * 2 ** (retryCountRef.current - 1),
            10_000,
          );
          console.warn(
            `Portfolio fetch failed (attempt ${retryCountRef.current}/${MAX_RETRIES}). Retrying in ${delay / 1000}s…`,
            err.message,
          );

          try {
            await sleep(delay, signal); // wait before next attempt
          } catch {
            return; // aborted during sleep
          }
        }
      }
    };

    fetchAll();

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
