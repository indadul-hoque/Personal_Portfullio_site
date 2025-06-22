import React from 'react';
import { Download } from "lucide-react";
import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';

const Hero = () => {
    return (
        <section id="hero" className="min-h-screen flex items-center animated-gradient">
            <div className="container-custom">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 text-sm font-medium mb-4">
                            MERN Stack Developer
                        </span>
                        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
                            Hello, I'm <br />
                            <span className="text-primary-500">Indadul Hoque</span>
                        </h1>
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                            A passionate MERN stack developer creating innovative web solutions.
                            I specialize in building responsive and user-friendly <b>Fullstack</b> web applications.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="#contact" className="btn btn-primary">
                                Contact Me
                            </a>

                            <a
                                href="/Indadul_Hoque.pdf"
                                download
                                className="btn btn-secondary flex items-center gap-2"
                            >
                                <span>Download My CV</span>
                                <Download size={18} />
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        className="hidden md:block p-6 top-3"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 0.9 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative top-3 ">
                            <div className=" absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full blur opacity-30 animate-pulse "></div>

                            <div className="w-full aspect-square bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden relative border-4 border-white dark:border-gray-800 mt-5">
                                <img
                                    src="/myimage.png"
                                    alt="Profile portrait"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll Down</span>
                    <FiArrowDown className="animate-bounce-slow text-primary-500" size={24} />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;