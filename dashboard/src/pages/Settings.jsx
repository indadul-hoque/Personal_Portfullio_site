import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  Shield,
  Download,
  Upload,
  RefreshCw,
  Database,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
  const data = useData();
  const { user } = useAuth();

  const [notification, setNotification] = useState("");

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(
      {
        profile: data.profile,
        projects: data.projects,
        experiences: data.experiences,
        educations: data.educations,
        certificates: data.certificates,
      },
      null,
      2
    );

    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `portfolio-backup-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    setNotification("Portfolio JSON exported successfully!");
    setTimeout(() => setNotification(""), 3000);
  };

  const handleResetData = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all data back to the default portfolio state?"
      )
    ) {
      data.resetToDefault();
      setNotification("Portfolio data reset to default demo state.");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <span className="w-1.5 h-4 rounded-sm bg-purple-500"></span>
          Settings & Synchronization
        </h2>
        <p className="text-xs text-gray-400 font-mono mt-1">
          Manage system sync, export backups, and administer your account.
        </p>
      </div>

      {notification && (
        <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-purple-400" />
          {notification}
        </div>
      )}

      {/* Account Info */}
      <div className="p-6 rounded-2xl bg-[#0D1321]/70 border border-gray-800/80 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 pb-2 border-b border-gray-800">
          <Shield className="w-4 h-4 text-purple-400" />
          Administrator Account
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div>
            <span className="text-gray-400 block mb-1">Active Email</span>
            <div className="p-2.5 bg-[#0B0F19] rounded-xl border border-gray-800 text-white">
              {user?.email || "admin@portfolio.com"}
            </div>
          </div>
          <div>
            <span className="text-gray-400 block mb-1">Access Role</span>
            <div className="p-2.5 bg-[#0B0F19] rounded-xl border border-gray-800 text-purple-400 font-semibold">
              {user?.role || "ADMIN"}
            </div>
          </div>
        </div>
      </div>

      {/* Backup and Sync */}
      <div className="p-6 rounded-2xl bg-[#0D1321]/70 border border-gray-800/80 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 pb-2 border-b border-gray-800">
          <Database className="w-4 h-4 text-purple-400" />
          Data Backup & Portability
        </h3>
        <p className="text-xs text-gray-400 leading-relaxed font-sans">
          Download a complete JSON snapshot of your portfolio (projects, work history, education,
          certificates, and profile) for instant backups or offline migrations.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={handleExportJSON}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs font-mono transition-all shadow-md active:scale-95"
          >
            <Download className="w-4 h-4" />
            Export Portfolio JSON
          </button>
        </div>
      </div>

      {/* Reset Data */}
      <div className="p-6 rounded-2xl bg-rose-950/10 border border-rose-500/20 space-y-3">
        <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Danger Zone
        </h3>
        <p className="text-xs text-gray-400 leading-relaxed font-sans">
          Reset all stored projects, experience, and education records to their default state.
        </p>

        <button
          onClick={handleResetData}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-mono transition-all active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset to Sample Data
        </button>
      </div>
    </div>
  );
};

export default Settings;
