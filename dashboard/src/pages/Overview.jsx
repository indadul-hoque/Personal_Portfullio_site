import React from "react";
import { Link } from "react-router-dom";
import {
  FolderGit2,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  ArrowUpRight,
  Plus,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";

const Overview = () => {
  const { profile, projects, experiences, educations, certificates, messages } = useData();
  const { user } = useAuth();

  const unreadCount = messages.filter((m) => m.unread).length;

  const statCards = [
    {
      title: "Total Projects",
      value: projects.length,
      icon: FolderGit2,
      color: "from-blue-500 to-indigo-600",
      link: "/projects",
      badge: "Portfolio Showcase",
    },
    {
      title: "Work Roles",
      value: experiences.length,
      icon: Briefcase,
      color: "from-purple-500 to-pink-600",
      link: "/experience",
      badge: "Career History",
    },
    {
      title: "Academic Degrees",
      value: educations.length,
      icon: GraduationCap,
      color: "from-teal-500 to-emerald-600",
      link: "/education",
      badge: "Education",
    },
    {
      title: "Certificates",
      value: certificates.length,
      icon: Award,
      color: "from-amber-500 to-orange-600",
      link: "/certificates",
      badge: "Verified Skills",
    },
    {
      title: "Visitor Messages",
      value: messages.length,
      icon: Mail,
      color: "from-rose-500 to-red-600",
      link: "/messages",
      badge: unreadCount > 0 ? `${unreadCount} New` : "Inbox Clean",
      isUnread: unreadCount > 0,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-[#0D1321] border border-purple-500/20 p-6 md:p-8">
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              Welcome back, {user?.username || profile?.displayName || "Admin"}
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Control Center & Portfolio Hub
            </h2>
            <p className="text-gray-400 text-sm max-w-xl">
              Changes updated here reflect across your main portfolio website in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-all shadow-lg shadow-purple-600/30 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              New Project
            </Link>
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D1321] hover:bg-gray-800 text-gray-200 border border-gray-700 font-medium text-sm transition-all active:scale-95"
            >
              <span>Preview Site</span>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link
              key={idx}
              to={stat.link}
              className="group p-5 rounded-2xl bg-[#0D1321]/70 border border-gray-800/80 hover:border-purple-500/40 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/5 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${stat.color} flex items-center justify-center text-white shadow-md`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-purple-400 transition-colors" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-gray-400">{stat.title}</span>
                <div className="text-2xl font-bold text-white tracking-tight">
                  {stat.value}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-800/60 flex items-center justify-between text-[11px] font-mono">
                <span className={stat.isUnread ? "text-rose-400 font-semibold" : "text-gray-400"}>
                  {stat.badge}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Middle Columns: Recent Projects & Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-purple-400" />
              Recent Portfolio Projects
            </h3>
            <Link
              to="/projects"
              className="text-xs font-mono text-purple-400 hover:text-purple-300 flex items-center gap-1"
            >
              View All ({projects.length}) &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="p-4 rounded-xl bg-[#0D1321]/60 border border-gray-800/80 hover:border-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 rounded-lg bg-gray-800 overflow-hidden flex-shrink-0 border border-gray-700">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=400&q=80";
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{project.title}</h4>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {project.technologies?.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies?.length > 3 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 text-gray-500">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                      title="Open Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <Link
                    to="/projects"
                    className="px-3 py-1.5 rounded-lg text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/20 transition-all"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries (1 Col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-purple-400" />
              Latest Inquiries
            </h3>
            <Link
              to="/messages"
              className="text-xs font-mono text-purple-400 hover:text-purple-300"
            >
              Inbox ({messages.length}) &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {messages.length === 0 ? (
              <div className="p-6 rounded-xl bg-[#0D1321]/60 border border-gray-800/80 text-center text-gray-500 text-xs font-mono">
                No inquiries yet.
              </div>
            ) : (
              messages.slice(0, 3).map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    msg.unread
                      ? "bg-purple-950/20 border-purple-500/30 shadow-sm"
                      : "bg-[#0D1321]/60 border-gray-800/80"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-white truncate max-w-[150px]">
                      {msg.name}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">{msg.date}</span>
                  </div>
                  <p className="text-xs text-purple-300/90 font-medium truncate mb-1">
                    {msg.subject}
                  </p>
                  <p className="text-xs text-gray-400 line-clamp-2">{msg.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
