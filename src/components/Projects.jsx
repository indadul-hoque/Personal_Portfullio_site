import { useState } from 'react';
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiExternalLink, FiCode, FiX } from 'react-icons/fi';

const projects = [
  {
    id: 1,
    title: 'Restaurant Web App',
    description: 'A full-stack restaurant web application with menu management, online ordering, and reservation system.',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    features: [
      'Interactive menu with filtering options',
      'Online ordering system with real-time updates',
      'Table reservation functionality',
      'Admin dashboard for menu and order management'
    ],
    demoLink: '#',
    codeLink: '#'
  },
  {
    id: 2,
    title: 'Children Academic School Website',
    description: 'A comprehensive school website featuring curriculum information, student portal, and administrative tools.',
    image: 'https://images.pexels.com/photos/8471799/pexels-photo-8471799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Bootstrap'],
    features: [
      'Interactive curriculum explorer',
      'Student and teacher portals',
      'Event calendar and announcements',
      'Parent-teacher communication system'
    ],
    demoLink: '#',
    codeLink: '#'
  },
  {
    id: 3,
    title: 'OCR-Based E-commerce Site',
    description: 'An innovative e-commerce platform with OCR technology for product search and information extraction.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tesseract.js'],
    features: [
      'OCR-powered product search from images',
      'Full e-commerce functionality with cart and checkout',
      'User authentication and profile management',
      'Order tracking and history'
    ],
    demoLink: '#',
    codeLink: '#'
  }
];

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProject, setSelectedProject] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const openProjectDetails = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="projects" ref={ref} className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title text-gray-900 dark:text-white">My Projects</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Here are some of the projects I've worked on, showcasing my skills in full-stack development 
            with the MERN stack.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="card overflow-hidden group h-full flex flex-col"
              whileHover={{ y: -5 }}
            >
              <div className="relative overflow-hidden h-56">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <div className="flex justify-end space-x-2">
                      <a href={project.demoLink} className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors">
                        <FiExternalLink size={18} />
                      </a>
                      <a href={project.codeLink} className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors">
                        <FiCode size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
                  {project.description}
                </p>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs font-medium py-1 px-2 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => openProjectDetails(project)}
                  className="btn btn-primary w-full mt-auto"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Details Modal */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={closeProjectDetails}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-72 md:h-96">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={closeProjectDetails}
                  className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>
              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  {selectedProject.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {selectedProject.description}
                </p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start text-gray-600 dark:text-gray-300"
                      >
                        <span className="inline-block w-2 h-2 bg-primary-500 rounded-full mt-2 mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="py-1.5 px-3 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={selectedProject.demoLink}
                    className="btn btn-primary flex-1 flex items-center justify-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiExternalLink className="mr-2" /> Live Demo
                  </a>
                  <a
                    href={selectedProject.codeLink}
                    className="btn btn-secondary flex-1 flex items-center justify-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiCode className="mr-2" /> View Code
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;