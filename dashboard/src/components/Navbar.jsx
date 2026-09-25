import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

const routeNames = {
  "/": "Overview & Statistics",
  "/profile": "Profile & Bio Manager",
  "/projects": "Projects & Case Studies",
  "/experience": "Experience & Career History",
  "/education": "Academic Background",
  "/certificates": "Licenses & Certifications",
  "/messages": "Visitor Inquiries & Inbox",
  "/settings": "Settings & Database Sync",
};

const Navbar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { messages } = useData();

  const currentTitle = routeNames[location.pathname] || "Dashboard";
  const unreadCount = messages?.filter((m) => m.unread).length || 0;

  return (
    <header className="h-16 border-b border-gray-800/80 bg-[#0B0F19]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]"></span>
          {currentTitle}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Live Site Preview Button */}
        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          View Live Site
          <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
        </a>

        {/* Inquiries Notification Bell */}
        <Link
          to="/messages"
          className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/60 transition-colors"
          title={`${unreadCount} unread inquiries`}
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-[#0B0F19] animate-pulse"></span>
          )}
        </Link>

        {/* Admin Badge */}
        <div className="flex items-center gap-2 pl-3 border-l border-gray-800">
          <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-xs font-semibold text-gray-200">
              {user?.username || "Admin"}
            </span>
            <span className="text-[10px] text-gray-400 font-mono">Full Access</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
