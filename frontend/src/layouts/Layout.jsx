import React, { useEffect } from "react";
import Navbar from "../components/Navbar"; // Make sure your path to Navbar is correct
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const Layout = ({ children, activeSection }) => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const dots = document.querySelectorAll(".animated-dot");
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      dots.forEach((dot, index) => {
        const delay = index * 0.1;
        setTimeout(() => {
          if (dot) {
            dot.style.left = `${mouseX}px`;
            dot.style.top = `${mouseY}px`;
          }
        }, delay * 1000);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-300 font-sans antialiased selection:bg-gray-800 selection:text-white flex flex-col">
      <header className="fixed top-5 left-0 right-0 z-50 w-full max-w-5xl mx-auto px-4 transition-all duration-300">
        <Navbar activeSection={activeSection} />
      </header>

      <motion.main
        className="flex-grow w-full max-w-5xl mx-auto mt-28 px-4 pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>

      <Footer />
    </div>
  );
};

export default Layout;
