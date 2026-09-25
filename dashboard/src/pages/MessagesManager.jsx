import React, { useState } from "react";
import {
  Mail,
  Search,
  Trash2,
  CheckCircle,
  ExternalLink,
  Reply,
  Calendar,
  User,
  Inbox,
} from "lucide-react";
import { useData } from "../context/DataContext";

const MessagesManager = () => {
  const { messages, markMessageAsRead, deleteMessage } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // "all" | "unread"

  const filtered = messages.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "unread") return matchesSearch && m.unread;
    return matchesSearch;
  });

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete message from "${name}"?`)) {
      deleteMessage(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-sm bg-rose-500"></span>
            Visitor Inquiries & Contact Messages
          </h2>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Review and respond to messages submitted through your portfolio contact form.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1 bg-[#0D1321] p-1 rounded-xl border border-gray-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "all"
                ? "bg-purple-600 text-white font-medium"
                : "text-gray-400 hover:text-white"
            }`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setActiveTab("unread")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "unread"
                ? "bg-purple-600 text-white font-medium"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Unread ({messages.filter((m) => m.unread).length})
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by sender, email or keyword..."
          className="w-full pl-10 pr-4 py-2.5 bg-[#0D1321] border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
        />
      </div>

      {/* Message List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-[#0D1321]/40 border border-gray-800 font-mono text-gray-500 text-sm">
            <Inbox className="w-10 h-10 mx-auto mb-2 text-gray-600" />
            No inquiries match your criteria.
          </div>
        ) : (
          filtered.map((msg) => (
            <div
              key={msg.id}
              className={`p-5 rounded-2xl border transition-all ${
                msg.unread
                  ? "bg-purple-950/20 border-purple-500/40 shadow-lg shadow-purple-500/5"
                  : "bg-[#0D1321]/70 border-gray-800/80"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-purple-400 font-bold text-xs font-mono border border-gray-700">
                    {msg.name?.charAt(0) || "V"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{msg.name}</span>
                      {msg.unread && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-mono font-semibold">
                          NEW
                        </span>
                      )}
                    </div>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs text-purple-400 hover:underline font-mono"
                    >
                      {msg.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className="text-xs text-gray-500 font-mono flex items-center gap-1 mr-2">
                    <Calendar className="w-3.5 h-3.5" />
                    {msg.date}
                  </span>

                  {msg.unread && (
                    <button
                      onClick={() => markMessageAsRead(msg.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 text-xs font-mono flex items-center gap-1 transition-colors"
                      title="Mark as read"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  )}

                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-purple-300 hover:bg-purple-500/10 transition-colors"
                    title="Reply via Email"
                  >
                    <Reply className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => handleDelete(msg.id, msg.name)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="pl-11 space-y-1">
                <p className="text-xs font-semibold text-purple-300 font-mono">{msg.subject}</p>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">{msg.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessagesManager;
