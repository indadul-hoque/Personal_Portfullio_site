import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiCalendar, FiArrowUpRight } from "react-icons/fi";

const experiences = [
  {
    title: "Junior Full Stack Developer",
    company: "GS3 Solution PVT.LTD",
    duration: "6 mos",
    date: "Jul 2025 - Dec 2025",
    current: false,
  },
  {
    title: "MERN Stack Intern",
    company: "Ardent Computech PVT.LTD.",
    duration: "3 mos",
    date: "Feb 2025 - Apr 2025",
    current: false,
  },
  {
    title: "MERN Stack Intern",
    company: "Ardent Computech PVT.LTD.",
    duration: "1 mos",
    date: "Jul 2024 - Aug 2024",
    current: false,
  },
];

const Experience = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="experience" ref={ref} className=" bg-[#0B0F19] text-gray-300">
      <div className="w-full max-w-5xl p-6 mx-auto border-2 border-gray-800/60 bg-[#0D1321]/40 backdrop-blur-sm rounded-2xl">
        {/* Section Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#d8d8e0] tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-sm bg-purple-500"></span>
            Experience
          </h2>
          <span className="text-xs text-gray-500 font-mono">
            HISTORY // {experiences.length} ROLES
          </span>
        </div>

        {/* Compact List Stack */}
        <div className="border border-gray-800/60 bg-[#0D1321]/30 backdrop-blur-sm rounded-xl divide-y divide-gray-800/60 overflow-hidden">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="p-5 md:px-6 transition-all duration-300 hover:bg-gray-800/20 group flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {/* Left Side: Title & Company */}
              <div className="flex items-start gap-3.5">
                <div className="mt-1.5 hidden sm:block">
                  {exp.current ? (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-gray-700 group-hover:bg-gray-500 transition-colors" />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white group-hover:text-purple-400 transition-colors flex items-center gap-1.5">
                    {exp.title}
                    <FiArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 text-purple-400 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </h3>
                  <p className="text-sm text-gray-400 font-medium">
                    {exp.company}
                  </p>
                </div>
              </div>

              {/* Right Side: Dates & Badges */}
              <div className="flex flex-wrap items-center sm:justify-end gap-3 text-xs font-mono text-gray-500">
                <div className="flex items-center gap-1.5">
                  <FiCalendar size={13} className="text-gray-600" />
                  <span>{exp.date}</span>
                </div>

                {exp.duration && (
                  <span className="px-2 py-0.5 rounded bg-gray-900/60 border border-gray-800 text-gray-400 text-[11px]">
                    {exp.duration}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
