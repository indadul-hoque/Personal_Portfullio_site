import React from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
    { name: 'Home', path: '#hero' },
    { name: 'About', path: '#about' },
    { name: 'Experience', path: '#experience' },
    { name: 'Projects', path: '#projects' },    
    { name: 'Contact', path: '#contact' },
];

const Navbar = ({ activeSection }) => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md'
                : 'bg-transparent'
                }`}
        >
            <div className="container-custom">
                <nav className="flex items-center justify-between py-4">
                    <motion.a
                        href="#hero"
                        className="text-2xl font-bold text-primary-600 dark:text-primary-400 group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.h4
                            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 font-bold text-2xl"
                            initial={{ scale: 1, filter: "drop-shadow(0px 0px 0px rgba(0,0,0,0))" }}
                            whileHover={{
                                scale: 1.05,
                                filter: "drop-shadow(0px 0px 8px rgba(0, 255, 255, 0.7)) drop-shadow(0px 0px 16px rgba(255, 0, 255, 0.4))",
                            }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            {"{ Indadul.H }"}
                        </motion.h4>
                    </motion.a>

                    {/* Desktop Navigation */}
                    <motion.ul
                        className="hidden md:flex items-center space-x-8"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.path}
                                    className={`text-sm font-medium hover:text-primary-500 transition-colors relative ${
                                        activeSection === link.path.replace('#', '') ||
                                        (link.path === '#experience' && activeSection === 'education')
                                            ? 'text-primary-500'
                                            : 'text-gray-700 dark:text-gray-300'
                                        }`}
                                >
                                    {link.name}
                                    {(activeSection === link.path.replace('#', '') ||
                                      (link.path === '#experience' && activeSection === 'education')) && (
                                        <motion.span
                                            className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-500"
                                            layoutId="navIndicator"
                                        />
                                    )}
                                </a>
                            </li>
                        ))}
                    </motion.ul>

                    <div className="flex items-center space-x-4">
                        <motion.button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                        </motion.button>

                        {/* Mobile Menu Button */}
                        <motion.button
                            className="md:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                            onClick={toggleMobileMenu}
                            aria-label="Toggle mobile menu"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                        </motion.button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ul className="py-4 px-6 space-y-4">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.path}
                                    className={`block py-2 text-base font-medium hover:text-primary-500 transition-colors ${
                                        activeSection === link.path.replace('#', '') ||
                                        (link.path === '#experience' && activeSection === 'education')
                                            ? 'text-primary-500'
                                            : 'text-gray-700 dark:text-gray-300'
                                        }`}
                                    onClick={toggleMobileMenu}
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </header>
    );
};

export default Navbar;
