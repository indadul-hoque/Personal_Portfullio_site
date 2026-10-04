import React, { useState } from "react";
import { Briefcase, Plus, Calendar, Edit2, Trash2, X } from "lucide-react";
import { useData } from "../context/DataContext";

const defaultExpState = {
  jobTitle: "",
  companyName: "",
  jobDescription: "",
  startDate: "",
  endDate: "",
};

// "2024-07-01" → "Jul 2024"
const formatMonth = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

// "Jul 2024 – Present" or "Jul 2024 – Mar 2025"
const formatRange = (start, end) => {
  const s = formatMonth(start);
  const e = end ? formatMonth(end) : "Present";
  if (!s) return "";
  return `${s} – ${e}`;
};

// "6 mos" / "1 yr 2 mos" based on two dates
const formatDuration = (start, end) => {
  if (!start) return "";
  const s = new Date(start);
  const e = end ? new Date(end) : new Date();
  if (isNaN(s) || isNaN(e) || e < s) return "";

  let months =
    (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());

  if (months <= 0) months = 1; // at least 1 month

  const yrs = Math.floor(months / 12);
  const mos = months % 12;

  if (yrs && mos)
    return `${yrs} yr${yrs > 1 ? "s" : ""} ${mos} mo${mos > 1 ? "s" : ""}`;
  if (yrs) return `${yrs} yr${yrs > 1 ? "s" : ""}`;
  return `${mos} mo${mos > 1 ? "s" : ""}`;
};

const ExperienceManager = () => {
  const { experiences, addExperience, updateExperience, deleteExperience } =
    useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(defaultExpState);

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData(defaultExpState);
    setModalOpen(true);
  };

  const handleOpenEditModal = (exp) => {
    setEditingId(exp.id);
    setFormData({
      jobTitle: exp.jobTitle || "",
      companyName: exp.companyName || "",
      jobDescription: exp.jobDescription || "",
      // Convert ISO → yyyy-MM-dd for <input type="date">
      startDate: exp.startDate ? exp.startDate.slice(0, 10) : "",
      endDate: exp.endDate ? exp.endDate.slice(0, 10) : "",
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.jobTitle.trim() || !formData.companyName.trim()) return;
    if (!formData.startDate) return;

    const payload = {
      jobTitle: formData.jobTitle.trim(),
      companyName: formData.companyName.trim(),
      jobDescription: formData.jobDescription.trim(),
      startDate: new Date(formData.startDate).toISOString(),
      endDate: formData.endDate
        ? new Date(formData.endDate).toISOString()
        : null,
    };

    if (editingId) {
      updateExperience(editingId, payload);
    } else {
      addExperience(payload);
    }
    setModalOpen(false);
  };

  const handleDelete = (id, jobTitle) => {
    if (window.confirm(`Delete experience entry for "${jobTitle}"?`)) {
      deleteExperience(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-sm bg-purple-500"></span>
            Career Experience
          </h2>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Manage your employment history, internships, and roles.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs font-mono transition-all shadow-lg shadow-purple-600/30 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add Role
        </button>
      </div>

      {/* Timeline List */}
      <div className="space-y-4">
        {experiences.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-[#0D1321]/40 border border-gray-800 font-mono text-gray-500 text-sm">
            No experiences listed yet.
          </div>
        ) : (
          experiences.map((exp) => {
            const isCurrent = !exp.endDate;
            const duration = formatDuration(exp.startDate, exp.endDate);

            return (
              <div
                key={exp.id}
                className="p-5 rounded-2xl bg-[#0D1321]/70 border border-gray-800/80 hover:border-purple-500/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0 mt-0.5">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-white">
                        {exp.jobTitle}
                      </h3>
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                          Present
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-400 font-mono mt-1 flex-wrap">
                      <span className="text-purple-300 font-semibold">
                        {exp.companyName}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-500" />
                        {formatRange(exp.startDate, exp.endDate)}
                      </span>
                      {duration && (
                        <>
                          <span>•</span>
                          <span className="text-gray-500">({duration})</span>
                        </>
                      )}
                    </div>

                    {exp.jobDescription && (
                      <p className="text-xs text-gray-400 mt-2 max-w-2xl leading-relaxed">
                        {exp.jobDescription}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleOpenEditModal(exp)}
                    className="p-2 rounded-lg text-gray-400 hover:text-purple-300 hover:bg-purple-500/10 transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id, exp.jobTitle)}
                    className="p-2 rounded-lg text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#0D1321] border border-gray-800 rounded-2xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-400" />
                {editingId ? "Edit Experience" : "Add Experience"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.jobTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, jobTitle: e.target.value })
                  }
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full px-3.5 py-2.5 bg-[#0B0F19] border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">
                  Company / Organization *
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  placeholder="e.g. Google / Tech Corp"
                  className="w-full px-3.5 py-2.5 bg-[#0B0F19] border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#0B0F19] border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#0B0F19] border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                  <p className="text-[10px] text-gray-500 font-mono mt-1">
                    Leave empty if current role
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">
                  Key Responsibilities / Description
                </label>
                <textarea
                  rows={3}
                  value={formData.jobDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, jobDescription: e.target.value })
                  }
                  placeholder="Summarize key tasks, technologies used, achievements..."
                  className="w-full px-3.5 py-2.5 bg-[#0B0F19] border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div className="pt-3 border-t border-gray-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-800 text-gray-400 hover:text-white text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs font-mono shadow-md"
                >
                  {editingId ? "Save Changes" : "Add Experience"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceManager;
