import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiGithub, FiLinkedin, FiLayers, FiBookOpen } from "react-icons/fi";
import { Menu, X } from "lucide-react"; // Hamburger and Close icons

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Controls the hamburger dropdown
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Collapse the mobile menu instantly if the user shifts pages
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleNavClick = (e, id, targetRoute) => {
    setIsOpen(false); // Close menu layout on link selection

    if (targetRoute) {
      return;
    }

    e.preventDefault();
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={`static w-full border-2 border-gray-800/60 rounded-2xl p-4 flex flex-col transition-all duration-300 z-40 ${
        isScrolled
          ? "bg-[#0D1321]/90 shadow-xl shadow-black/40"
          : "bg-[#0D1321]/40 backdrop-blur-md"
      }`}
    >
      {/* Top Main Bar Container */}
      <div className="w-full flex items-center justify-between">
        {/* Left Column: Brand / Logo */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="relative w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-gray-300 border border-gray-800/60 hover:opacity-90 transition-opacity select-none group"
          >
            <img
              src="../../public/myLogo.png" // Replace with your actual logo image path
              alt="Indadul Hoque Logo"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </Link>
          <span className="text-xl font-bold text-[#d8d8e0] tracking-tight">
            Indadul Hoque
          </span>
        </div>

        {/* Desktop Navigation Links (Hidden on Mobile/Tablet viewports) */}
        <div className="hidden md:flex items-center p-1 bg-gray-950/40 border border-gray-800/80 rounded-xl">
          <Link
            to="/"
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono font-medium text-gray-400 hover:text-white rounded-lg transition-colors duration-200"
          >
            <FiLayers size={13} className="text-gray-500" />
            <span>Home</span>
          </Link>

          <Link
            to="/projects"
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono font-medium text-gray-400 hover:text-white rounded-lg transition-colors duration-200"
          >
            <FiBookOpen size={13} className="text-gray-500" />
            <span>Projects</span>
          </Link>
        </div>

        {/* Desktop Social Profile Actions (Hidden on Mobile/Tablet viewports) */}
        <div className="hidden md:flex items-center gap-2.5">
          <a
            href="https://github.com/Hoqueindadul"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-gray-900/60 border border-gray-800/80 text-gray-400 hover:text-white hover:border-gray-700 transition-all duration-300"
            aria-label="GitHub Profile"
          >
            <FiGithub size={15} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-gray-900/60 border border-gray-800/80 text-gray-400 hover:text-white hover:border-gray-700 transition-all duration-300"
            aria-label="LinkedIn Profile"
          >
            <FiLinkedin size={15} />
          </a>
        </div>

        {/* Hamburger Menu Toggle Button (Visible ONLY on Mobile & Tablets) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl bg-gray-950/40 border border-gray-800/80 text-gray-400 hover:text-white transition-all duration-200"
          aria-label="Toggle navigation links"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Expandable Hamburger Mobile Drawer Overlay */}
      <div
        className={`w-full overflow-hidden transition-all duration-300 ease-in-out md:hidden flex flex-col items-center gap-4 ${
          isOpen
            ? "max-h-[250px] mt-4 pt-4 border-t border-gray-800/40"
            : "max-h-0"
        }`}
      >
        {/* Mobile Navigation Links */}
        <div className="flex flex-col w-full gap-2">
          <Link
            to="/projects"
            onClick={(e) => handleNavClick(e, "projects", true)}
            className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-mono font-medium text-gray-400 hover:text-white bg-gray-950/30 border border-gray-800/40 rounded-xl transition-colors"
          >
            <FiLayers size={14} className="text-gray-500" />
            <span>Projects</span>
          </Link>

          <button
            onClick={(e) => handleNavClick(e, "education", false)}
            className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-mono font-medium text-gray-400 hover:text-white bg-gray-950/30 border border-gray-800/40 rounded-xl transition-colors"
          >
            <FiBookOpen size={14} className="text-gray-500" />
            <span>Education</span>
          </button>
        </div>

        {/* Mobile Social Link Actions Grid */}
        <div className="flex items-center justify-center gap-4 w-full pt-2">
          <a
            href="https://github.com/Hoqueindadul"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-gray-900/60 border border-gray-800/80 text-gray-400 hover:text-white flex-1 flex justify-center transition-all"
            aria-label="GitHub Profile"
          >
            <FiGithub size={16} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-gray-900/60 border border-gray-800/80 text-gray-400 hover:text-white flex-1 flex justify-center transition-all"
            aria-label="LinkedIn Profile"
          >
            <FiLinkedin size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
