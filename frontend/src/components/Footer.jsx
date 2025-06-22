import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-0"
          >
            <h3 className="text-2xl font-bold text-white mb-2">Indadul Hoque</h3>
            <p className="text-gray-400 max-w-md">
              A passionate MERN stack developer dedicated to creating 
              innovative and user-friendly web applications.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex space-x-4"
          >
            <a
              href="https://github.com/indadul-hoque"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary-600 transition-colors"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/indadul-hoque/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary-600 transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>
            {/* <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary-600 transition-colors"
              aria-label="Twitter"
            >
              <FiTwitter />
            </a> */}
          </motion.div>
        </div>

        <motion.hr
          initial={{ opacity: 0, width: '0%' }}
          animate={{ opacity: 0.3, width: '100%' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="my-8 border-gray-700"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Your Name. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center">
            Made with <FiHeart className="text-red-500 mx-1" /> using React
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;