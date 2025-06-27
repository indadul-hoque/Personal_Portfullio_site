import React, { useState, useEffect } from 'react';
import Layout from './layouts/Layout';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('experience');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'hero';

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);

      // Sync activeTab with visible section
      if (currentSection === 'experience') {
        setActiveTab('experience');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-primary-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout activeSection={activeSection}>
      <CustomCursor />
      <Hero />
      <About />

      {/* Experience & Education Toggle Section */}
      <section id="experience" className="relative py-20 bg-gray-100 dark:bg-gray-900">
        {/* Hidden anchors to support scroll tracking */}
        <div id="experience-anchor" className="h-[1px]" />
        <div className="text-center mb-8">
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-6 py-2 rounded-l-md transition-all duration-500 ease-in-out 
              ${activeTab === 'experience'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-700'
              }`}
          >
            Experience
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-6 py-2 rounded-r-md transition-all duration-300 ease-in-out 
              ${activeTab === 'education'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-300 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-700'
              }`}
          >
            Education
          </button>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'experience' ? (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Experience />
              </motion.div>
            ) : (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Education />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Projects />
      <Contact />
    </Layout>
  );
}

export default App;
