import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";

// Separate the main landing page content to keep scrolling logic clean
const MainLandingPage = () => {
  return (
    <>
      {/* Intro & Hero Banner */}
      <Hero />

      {/* Main Professional History Sections */}
      <Experience />
      <Education />

      {/* Portfolios & Form Targets */}
      <Contact />
    </>
  );
};

// Internal wrapper to safely watch route changes if needed
function AppContent({ activeSection }) {
  return (
    <Layout activeSection={activeSection}>
      <CustomCursor />

      <Routes>
        {/* Home Route renders all your sections */}
        <Route path="/" element={<MainLandingPage />} />

        {/* Dedicated view page for all projects */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/education" element={<Education />} />
      </Routes>
    </Layout>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("hero");

  return (
    <Router>
      <AppContent activeSection={activeSection} />
    </Router>
  );
}

export default App;
