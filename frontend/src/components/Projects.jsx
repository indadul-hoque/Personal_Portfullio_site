import { useState } from "react";
import React from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiExternalLink,
  FiCode,
  FiX,
  FiCheckCircle,
  FiArrowUpRight,
} from "react-icons/fi";

const projects = [
  {
    id: 3,
    title: "OCR-Based E-commerce Site",
    description:
      "An innovative e-commerce platform with OCR technology for product search and information extraction.",
    image: "./listkaroHomePage.png",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Azure OCR"],
    features: [
      "OCR-powered product search from images",
      "Full e-commerce functionality with cart and checkout",
      "User authentication and profile management",
      "Order tracking and history",
    ],
    demoLink: "https://list-karo.vercel.app/",
    codeLink: "https://github.com/Hoqueindadul/ListKaro",
  },
  {
    id: 2,
    title: "Children Academic School Website",
    description:
      "A comprehensive school website featuring curriculum information, student portal, and administrative tools.",
    image:
      "https://images.pexels.com/photos/8471799/pexels-photo-8471799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Bootstrap"],
    features: [
      "Interactive curriculum explorer",
      "Student and teacher portals",
      "Event calendar and announcements",
      "Parent-teacher communication system",
    ],
    demoLink: "https://franchaisemodelformathguruabacus.vercel.app/",
    codeLink:
      "https://github.com/Hoqueindadul/franchaisemodelformathguruabacus",
  },
  {
    id: 1,
    title: "Restaurant Web App",
    description:
      "A full-stack restaurant web application with menu management, online ordering, and reservation system.",
    image:
      "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Bootstrap"],
    features: [
      "Interactive menu with filtering options",
      "Online ordering system with real-time updates",
      "Table reservation functionality",
      "Admin dashboard for menu and order management",
    ],
    demoLink: "https://restaurent-web-app-with-team.vercel.app/",
    codeLink: "https://github.com/Hoqueindadul/RestaurentWebAppWithTeam",
  },
];

const getTechStyle = (tech) => {
  const t = tech.toLowerCase();
  if (t.includes("react"))
    return "hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-950/20";
  if (t.includes("node"))
    return "hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-950/20";
  if (t.includes("mongo"))
    return "hover:text-green-400 hover:border-green-500/30 hover:bg-green-950/20";
  if (t.includes("express"))
    return "hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-950/20";
  if (t.includes("azure") || t.includes("ocr"))
    return "hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-950/20";
  return "hover:text-purple-400 hover:border-purple-500/30 hover:bg-purple-950/20";
};

// --- Sub-component to handle DOM Portal tracking for exit animations ---
const ProjectPortal = ({ selectedProject, closeProjectDetails }) => {
  return ReactDOM.createPortal(
    <motion.div
      key={selectedProject.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-[#0B0F19]/80 backdrop-blur-md"
      onClick={closeProjectDetails}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-[#0D1321] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden w-full max-w-2xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-56 md:h-64 bg-gray-950 border-b border-gray-800/60">
          <img
            src={selectedProject.image}
            alt={selectedProject.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1321] via-transparent to-transparent" />
          <button
            onClick={closeProjectDetails}
            className="absolute top-4 right-4 p-2 bg-gray-900 border border-gray-800/80 rounded-xl text-gray-400 font-bold hover:text-white transition-colors"
          >
            <FiX size={16} />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight mb-2">
              {selectedProject.title}
            </h2>
            <p className="text-sm leading-relaxed text-gray-400">
              {selectedProject.description}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold font-mono uppercase text-gray-500 tracking-wider mb-3">
              Features
            </h3>
            <ul className="grid sm:grid-cols-2 gap-2 text-xs text-gray-400">
              {selectedProject.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 bg-gray-900/30 border border-gray-800/40 p-2 rounded-lg"
                >
                  <FiCheckCircle
                    size={14}
                    className="text-purple-400 mt-0.5 flex-shrink-0"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold font-mono uppercase text-gray-500 tracking-wider mb-3">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {selectedProject.technologies.map((tech, index) => (
                <span
                  key={index}
                  className={`px-2.5 py-1 text-xs font-mono font-medium text-gray-400 bg-gray-900/80 border border-gray-800 rounded-xl transition-all duration-300 ${getTechStyle(tech)}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2 border-t border-gray-800/60">
            <a
              href={selectedProject.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 rounded-xl text-xs font-medium tracking-wide bg-gray-900 text-gray-200 border border-gray-800 hover:text-orange-400 hover:bg-orange-950/20 hover:border-gray-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
            >
              <FiExternalLink size={14} /> Live Deployment
            </a>
            {selectedProject.codeLink && selectedProject.codeLink !== "#" ? (
              <a
                href={selectedProject.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl text-xs font-medium tracking-wide bg-gray-900 text-gray-200 border border-gray-800 hover:text-orange-400 hover:bg-orange-950/20 hover:border-gray-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
              >
                <FiCode size={14} /> Source Repository
              </a>
            ) : (
              <div className="flex-1 py-2.5 rounded-xl text-xs font-medium tracking-wide bg-gray-900/30 border border-gray-800/40 text-gray-600 flex hover:text-orange-400 hover:bg-orange-950/20 items-center justify-center gap-2 cursor-not-allowed select-none">
                <FiCode size={14} /> Private Repository
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
};

// --- Main Projects Component ---
const Projects = ({ limit }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [selectedProject, setSelectedProject] = useState(null);

  const openProjectDetails = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <div className="pt-6">
      <section
        id="projects"
        ref={ref}
        className="pb-6 bg-[#0B0F19] text-gray-300"
      >
        <div className="w-full max-w-5xl mx-auto border-2 border-gray-800/60 bg-[#0D1321]/30 backdrop-blur-sm rounded-2xl p-6 ">
          {/* Section Header */}
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-[#d8d8e0] tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-sm bg-purple-500"></span>
              Featured Projects
            </h2>

            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500 font-mono hidden sm:inline-block select-none">
                PORTFOLIO // {projects.length} WORKS
              </span>

              {limit && projects.length > limit && (
                <a
                  href="/projects"
                  className="group flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-gray-400 bg-gray-950/40 border border-gray-800/80 rounded-xl hover:text-orange-400 hover:bg-orange-950/20 transition-all duration-300"
                >
                  <span>View All</span>
                  <FiArrowUpRight
                    size={14}
                    className="text-gray-500 group-hover:text-orange-400 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              )}
            </div>
          </div>

          {/* Bento Clean Layout Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="border border-gray-800/60 bg-[#0D1321]/30 backdrop-blur-sm rounded-xl overflow-hidden flex flex-col group hover:border-gray-700/60 transition-all duration-300"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                {/* Media Container */}
                <div className="relative h-44 overflow-hidden bg-gray-950 border-b border-gray-800/50">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#0B0F19]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-gray-900 border border-gray-800 rounded-xl text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
                      >
                        <FiExternalLink size={16} />
                      </a>
                    )}
                    {project.codeLink && project.codeLink !== "#" && (
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-gray-900 border border-gray-800 rounded-xl text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
                      >
                        <FiCode size={16} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Card Meta Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-base font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-gray-400 mb-4 line-clamp-2 flex-1">
                    {project.description}
                  </p>

                  {/* Grid Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 text-[10px] font-mono font-medium text-gray-400 bg-gray-900/60 border border-gray-800/80 rounded transition-all duration-300 cursor-default select-none ${getTechStyle(tech)}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => openProjectDetails(project)}
                    className="w-full text-center py-2 text-xs font-medium tracking-wide border border-gray-800 bg-gray-900/40 hover:text-orange-400 hover:bg-orange-950/20 hover:border-gray-700 rounded-xl transition-all duration-300"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Modal Window Architecture with AnimatePresence Fix */}
          <AnimatePresence mode="wait">
            {selectedProject && (
              <ProjectPortal
                selectedProject={selectedProject}
                closeProjectDetails={closeProjectDetails}
              />
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Projects;
