import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

// Pages
import Login from "./pages/Login";
import Overview from "./pages/Overview";
import ProfileManager from "./pages/ProfileManager";
import ProjectsManager from "./pages/ProjectsManager";
import ExperienceManager from "./pages/ExperienceManager";
import EducationManager from "./pages/EducationManager";
import CertificatesManager from "./pages/CertificatesManager";
import MessagesManager from "./pages/MessagesManager";
import Settings from "./pages/Settings";

// Login gate: if already authenticated, go to dashboard
const LoginRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : <Login />;
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            {/* Public Login Route */}
            <Route path="/login" element={<LoginRoute />} />

            {/* Protected Dashboard Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<Overview />} />
                <Route path="/profile" element={<ProfileManager />} />
                <Route path="/projects" element={<ProjectsManager />} />
                <Route path="/experience" element={<ExperienceManager />} />
                <Route path="/education" element={<EducationManager />} />
                <Route path="/certificates" element={<CertificatesManager />} />
                <Route path="/messages" element={<MessagesManager />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
