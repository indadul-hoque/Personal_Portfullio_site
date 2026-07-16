import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full max-w-5xl mx-auto border-t-2 border-gray-800/40 text-gray-400 text-sm px-4 pb-6 pt-2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-center gap-4"
      >
        {/* Name & Copyright Info */}
        <div className="text-center md:text-left">
          <p className="font-medium text-gray-300">Indadul Hoque</p>
          <p className="text-xs text-gray-500 mt-0.5">
            &copy; {currentYear} All rights reserved.
          </p>
        </div>

        {/* Quick Contact Info Details */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-xs text-gray-400 font-mono">
          <a
            href="mailto:your.email@example.com"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <FiMail size={13} />
            <span>indadul.hoque9735@gmail.com</span>
          </a>
          <a
            href="tel:+1234567890"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <FiPhone size={13} />
            <span>+91 9735088948</span>
          </a>
        </div>

        {/* Clean, Simple Icon Link Grid */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/indadul-hoque"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors text-base p-1"
            aria-label="GitHub Profile Link"
          >
            <FiGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/indadul-hoque/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors text-base p-1"
            aria-label="LinkedIn Profile Link"
          >
            <FiLinkedin />
          </a>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
