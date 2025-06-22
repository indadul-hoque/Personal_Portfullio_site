import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const Layout = ({ children, activeSection }) => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const dots = document.querySelectorAll('.animated-dot');
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      dots.forEach((dot, index) => {
        const delay = index * 0.1;
        setTimeout(() => {
          dot.style.left = `${mouseX}px`;
          dot.style.top = `${mouseY}px`;
        }, delay * 1000);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeSection={activeSection} />
      <motion.main 
        className="flex-grow"
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