import React from "react";
import { Eye } from "lucide-react";
import { motion } from "framer-motion";
import Projects from "./Projects";
import { usePortfolioData } from "../context/PortfolioDataContext";

const defaultSkills = [
  {
    name: "JavaScript",
    styles: "hover:text-yellow-400 hover:border-yellow-500/30 hover:bg-yellow-950/20",
  },
  {
    name: "TypeScript",
    styles: "hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-950/30",
  },
  {
    name: "ReactJS",
    styles: "hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-950/30",
  },
  {
    name: "Node.js",
    styles: "hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-950/30",
  },
  {
    name: "Express.js",
    styles: "hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-950/30",
  },
  {
    name: "MongoDB",
    styles: "hover:text-green-400 hover:border-green-500/30 hover:bg-green-950/30",
  },
  {
    name: "Next.js",
    styles: "hover:text-white hover:border-gray-500/30 hover:bg-gray-800/40",
  },
  {
    name: "TailwindCSS",
    styles: "hover:text-sky-400 hover:border-sky-500/30 hover:bg-sky-950/30",
  },
  {
    name: "RESTful APIs",
    styles: "hover:text-orange-400 hover:border-orange-500/30 hover:bg-orange-950/20",
  },
  {
    name: "CI/CD",
    styles: "hover:text-orange-400 hover:border-orange-500/30 hover:bg-orange-950/20",
  },
  {
    name: "Git",
    styles: "hover:text-orange-400 hover:border-orange-500/30 hover:bg-orange-950/20",
  },
];

const getSkillStyle = (skillName) => {
  const lower = skillName.toLowerCase();
  if (lower.includes("javascript") || lower.includes("js"))
    return "hover:text-yellow-400 hover:border-yellow-500/30 hover:bg-yellow-950/20";
  if (lower.includes("typescript") || lower.includes("ts") || lower.includes("docker"))
    return "hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-950/30";
  if (lower.includes("react"))
    return "hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-950/30";
  if (lower.includes("node") || lower.includes("mongo"))
    return "hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-950/30";
  if (lower.includes("express") || lower.includes("api"))
    return "hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-950/30";
  if (lower.includes("tailwind") || lower.includes("css"))
    return "hover:text-sky-400 hover:border-sky-500/30 hover:bg-sky-950/30";
  if (lower.includes("next"))
    return "hover:text-white hover:border-gray-500/30 hover:bg-gray-800/40";
  if (lower.includes("prisma") || lower.includes("postgres") || lower.includes("sql"))
    return "hover:text-indigo-400 hover:border-indigo-500/30 hover:bg-indigo-950/30";
  if (lower.includes("git") || lower.includes("ci/cd"))
    return "hover:text-orange-400 hover:border-orange-500/30 hover:bg-orange-950/20";
  return "hover:text-purple-400 hover:border-purple-500/30 hover:bg-purple-950/20";
};

const Hero = () => {
  const portfolioData = usePortfolioData();
  const profile = portfolioData?.profile;

  const skillsToRender =
    profile?.skills && profile.skills.length > 0
      ? profile.skills
      : defaultSkills;

  const cvDownloadUrl = profile?.cvURL
    ? profile.cvURL.startsWith("http")
      ? profile.cvURL
      : `http://localhost:4001${profile.cvURL.startsWith("/") ? "" : "/"}${profile.cvURL}`
    : "/Indadul_Hoque.pdf";

  return (
    <div className="space-y-6">
      {/* ROW 1: About Panel & Skills Panel Grid Arrangement */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
        {/* Card A: About Me (Spans 2 columns on large displays) */}
        <motion.section
          id="hero"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 border-2 border-gray-800/60 bg-[#0D1321]/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between gap-6"
        >
          <div className="absolute top-0 left-1/4 w-96 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row gap-6 items-center flex-1">
            {/* Profile Bio */}
            <div className="flex-1 order-2 sm:order-1">
              <div className="mb-3">
                <h1 className="text-xl font-bold text-[#d8d8e0] tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-4 rounded-sm bg-purple-500"></span>
                  About me
                </h1>
                {profile?.roleTitle && (
                  <p className="text-xs text-purple-400/90 font-mono mt-1 font-medium">
                    {profile.roleTitle}
                  </p>
                )}
              </div>
              <p className="text-sm md:text-base leading-relaxed text-gray-400 whitespace-pre-line">
                {profile?.bio ||
                  "I'm a passionate MERN stack developer dedicated to creating innovative, clean, and scalable web solutions. I specialize in engineering highly responsive, user-friendly full-stack web applications built with structural integrity and reliable performance."}
              </p>
            </div>

            {/* Profile Image Asset */}
            <div className="flex-shrink-0 order-1 sm:order-2">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border border-gray-800 bg-[#0F1626] p-1.5 shadow-inner">
                <img
                  src={profile?.photoURL || "/myimage.png"}
                  alt={`${profile?.displayName || "Indadul Hoque"} portrait`}
                  className="w-full h-full object-cover rounded-xl bg-gray-900 filter grayscale contrast-125 brightness-90 hover:grayscale-0 transition-all duration-500"
                  onError={(e) => {
                    e.currentTarget.src = "/myimage.png";
                  }}
                />
              </div>
            </div>
          </div>

          {/* CV Button Tray */}
          <div className="pt-4 border-t border-gray-800/40 flex items-center">
            <a
              href={cvDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800/60 text-gray-300 border border-gray-700/40 hover:text-orange-400 hover:bg-orange-950/20 font-medium text-xs transition-all duration-200"
            >
              <span>Preview & Download CV</span>
              <Eye
                size={14}
                className="transition-transform group-hover:scale-105"
              />
            </a>
          </div>
        </motion.section>

        {/* Card B: Core Skills Module Grid Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="border-2 border-gray-800/60 bg-[#0D1321]/30 backdrop-blur-sm rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between gap-4"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>

          <div>
            <h2 className="text-sm font-bold text-[#d8d8e0] uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-3 rounded-sm bg-purple-500"></span>
              Core Stack
            </h2>
            <p className="text-[11px] text-gray-500 font-mono mt-0.5">
              TECHNOLOGIES & TOOLS
            </p>
          </div>

          {/* Tight Layout Cluster Badges */}
          <div className="flex flex-wrap gap-2 relative z-10 flex-1 content-start mt-2">
            {skillsToRender.map((skill) => {
              const name = typeof skill === "string" ? skill : skill.name;
              const style =
                typeof skill === "object" && skill.styles
                  ? skill.styles
                  : getSkillStyle(name);

              return (
                <span
                  key={name}
                  className={`px-2.5 py-1 text-xs font-mono font-medium text-gray-400 bg-gray-900/60 border border-gray-800/80 rounded-xl transition-all duration-300 cursor-default select-none shadow-sm ${style}`}
                >
                  {name}
                </span>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ROW 2: Independent Sub-Grid Project Architecture */}
      <div>
        <Projects limit={3} />
      </div>
    </div>
  );
};

export default Hero;

