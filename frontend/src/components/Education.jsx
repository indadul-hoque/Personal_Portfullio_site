import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiCalendar, FiArrowUpRight } from "react-icons/fi";

const educations = [
  {
    degree: "Bachelor of Computer Applications (BCA) (H)",
    institution: "Maulana Abul Kalam Azad University of Technology",
    year: "2022 - 2025",
    description:
      "Established a robust foundation in core computer science principles, database systems, and practical software engineering practices.",
    current: false, // Updated to false as 2025 has passed
  },
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Swami Vivekananda University (Pursuing)",
    year: "2025 - 2027",
    description:
      "Deepening expertise in advanced software engineering, database architecture, and full-stack development while actively building real-world applications.",
    current: true,
  },
];

const Education = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section
      id="education"
      ref={ref}
      className="py-6 bg-[#0B0F19] text-gray-300"
    >
      <div className="w-full max-w-5xl p-6 mx-auto border-2 border-gray-800/60 bg-[#0D1321]/40 backdrop-blur-sm rounded-2xl">
        {/* Section Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#d8d8e0] tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-sm bg-purple-500"></span>
            Education
          </h2>
          <span className="text-xs text-gray-500 font-mono">
            ACADEMICS // {educations.length} RECORD
          </span>
        </div>

        {/* Compact List Stack */}
        <div className="border border-gray-800/60 bg-[#0D1321]/30 backdrop-blur-sm rounded-xl divide-y divide-gray-800/60 overflow-hidden">
          {educations.map((edu, index) => (
            <motion.div
              key={index}
              className="p-5 md:px-6 transition-all duration-300 hover:bg-gray-800/20 group flex flex-col justify-between gap-3 relative"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {/* Top Row: Degree info & Date Metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-start gap-3.5">
                  <div className="mt-1.5 hidden sm:block">
                    {edu.current ? (
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
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-gray-400 font-medium">
                      {edu.institution}
                    </p>
                  </div>
                </div>

                {/* Date Tag */}
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-medium text-purple-300 bg-purple-950/30 border border-purple-500/20 px-2.5 py-1 rounded-full sm:justify-end self-start sm:self-center backdrop-blur-sm shadow-sm select-none">
                  <FiCalendar size={12} className="text-purple-400" />
                  <span>{edu.year}</span>
                </div>
              </div>

              {/* Bottom Row: Description Block */}
              <div className="pl-5 sm:pl-5.5 mt-1">
                <p className="text-sm leading-relaxed text-gray-400 max-w-3xl">
                  {edu.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
