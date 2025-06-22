import React from 'react';
import { useState, useEffect } from 'react';
import Layout from './layouts/Layout';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      
      let currentSection = 'hero';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSection = section.id;
        }
      });
      
      setActiveSection(currentSection);
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
      <Experience />
      <Projects />
      <Education />
      <Contact />
    </Layout>
  );
}

export default App;