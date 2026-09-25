import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

const navItems = [
  { name: "Overview", path: "/", icon: LayoutDashboard },
  { name: "Profile & Bio", path: "/profile", icon: User },
  { name: "Projects", path: "/projects", icon: FolderGit2, badgeKey: "projects" },
  { name: "Experience", path: "/experience", icon: Briefcase, badgeKey: "experiences" },
  { name: "Education", path: "/education", icon: GraduationCap, badgeKey: "educations" },
  { name: "Certificates", path: "/certificates", icon: Award, badgeKey: "certificates" },
  { name: "Inquiries", path: "/messages", icon: Mail, badgeKey: "unreadMessages" },
  { name: "Settings", path: "/settings", icon: Settings },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const data = useData();
  const navigate = useNavigate();

  const unreadMessagesCount = data.messages?.filter((m) => m.unread).length || 0;

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to sign out of the admin dashboard?")) {
      await logout();
      navigate("/login");
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out flex flex-col justify-between border-r border-gray-800/80 bg-[#0B0F19]/95 backdrop-blur-xl ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top Header */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800/60">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 p-[1px] flex-shrink-0 shadow-lg shadow-purple-500/20">
              <div className="w-full h-full bg-[#0D1321] rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                  Admin<span className="text-purple-400 font-mono text-xs uppercase px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/30">Hub</span>
                </span>
                <span className="text-[11px] text-gray-400 font-mono">Portfolio CMS</span>
              </div>
            )}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/60 transition-colors focus:outline-none"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Live Status Pill */}
        {!collapsed && (
          <div className="px-4 py-3">
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#0D1321]/80 border border-gray-800/70 text-xs font-mono">
              <span className="flex items-center gap-2 text-gray-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Live Connected
              </span>
              <span className="text-purple-400 text-[10px]">v1.0</span>
            </div>
          </div>
        )}

        {/* Navigation items */}
        <nav className="px-3 py-2 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            let badge = null;
            if (item.badgeKey === "unreadMessages" && unreadMessagesCount > 0) {
              badge = unreadMessagesCount;
            } else if (item.badgeKey && data[item.badgeKey]) {
              badge = data[item.badgeKey].length;
            }

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white bg-gradient-to-r from-purple-600/20 via-indigo-600/10 to-transparent border border-purple-500/30 shadow-lg shadow-purple-500/5 font-semibold"
                      : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/40 border border-transparent"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active vertical glow indicator */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r bg-gradient-to-b from-purple-400 to-indigo-500 shadow-[0_0_12px_#a855f7]" />
                    )}

                    <Icon
                      className={`w-5 h-5 flex-shrink-0 transition-colors ${
                        isActive
                          ? "text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                          : "text-gray-400 group-hover:text-gray-300"
                      }`}
                    />

                    {!collapsed && <span className="flex-1 truncate">{item.name}</span>}

                    {!collapsed && badge !== null && (
                      <span
                        className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${
                          item.badgeKey === "unreadMessages"
                            ? "bg-rose-500/20 text-rose-400 border-rose-500/30 animate-pulse"
                            : "bg-gray-800 text-gray-300 border-gray-700"
                        }`}
                      >
                        {badge}
                      </span>
                    )}

                    {/* Tooltip on collapse */}
                    {collapsed && (
                      <div className="absolute left-full ml-3 px-2.5 py-1 bg-gray-900 text-white text-xs rounded-lg shadow-xl border border-gray-700 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                        {item.name}
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-3 border-t border-gray-800/60 space-y-2">
        {/* Open Main Portfolio Link */}
        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-mono text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/40 transition-all"
        >
          <ExternalLink className="w-4 h-4 flex-shrink-0 text-purple-400" />
          {!collapsed && <span className="truncate">View Main Site</span>}
        </a>

        {/* User Profile Card */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-[#0D1321]/90 border border-gray-800/80">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow">
              {user?.username ? user.username.charAt(0).toUpperCase() : "A"}
            </div>
            {!collapsed && (
              <div className="flex flex-col truncate">
                <span className="text-xs font-medium text-white truncate">
                  {user?.username || "Admin"}
                </span>
                <span className="text-[10px] text-gray-400 font-mono truncate">
                  {user?.email || "admin@portfolio"}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="p-1.5 text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
