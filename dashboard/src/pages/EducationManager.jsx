import React, { useState } from "react";
import { GraduationCap, Plus, Calendar, Edit2, Trash2, X } from "lucide-react";
import { useData } from "../context/DataContext";

const defaultEduState = {
  institutionName: "",
  degreeName: "",
  fieldOfStudy: "",
  description: "",
  startDate: "",
  endDate: "",
};

// "2021-06-01" → "Jun 2021"
const formatMonth = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

// "Jun 2021 – Present"
const formatRange = (start, end) => {
  const s = formatMonth(start);
  const e = end ? formatMonth(end) : "Present";
  if (!s) return "";
  return `${s} – ${e}`;
};

const EducationManager = () => {
  const { educations, addEducation, updateEducation, deleteEducation } =
    useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(defaultEduState);

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData(defaultEduState);
    setModalOpen(true);
  };

  const handleOpenEditModal = (edu) => {
    setEditingId(edu.id);
    setFormData({
      institutionName: edu.institutionName || "",
      degreeName: edu.degreeName || "",
      fieldOfStudy: edu.fieldOfStudy || "",
      description: edu.description || "",
      startDate: edu.startDate ? edu.startDate.slice(0, 10) : "",
      endDate: edu.endDate ? edu.endDate.slice(0, 10) : "",
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.institutionName.trim() || !formData.degreeName.trim()) return;
    if (!formData.startDate) return;

    const payload = {
      institutionName: formData.institutionName.trim(),
      degreeName: formData.degreeName.trim(),
      fieldOfStudy: formData.fieldOfStudy.trim(),
      description: formData.description.trim(),
      startDate: new Date(formData.startDate).toISOString(),
      endDate: formData.endDate
        ? new Date(formData.endDate).toISOString()
        : null,
    };

    if (editingId) {
      updateEducation(editingId, payload);
    } else {
      addEducation(payload);
    }
    setModalOpen(false);
  };

  const handleDelete = (id, degreeName) => {
    if (window.confirm(`Delete education record for "${degreeName}"?`)) {
      deleteEducation(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-sm bg-teal-500"></span>
            Academic Degrees & Education
          </h2>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Display your academic background, universities, and qualifications.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs font-mono transition-all shadow-lg shadow-purple-600/30 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add Degree
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {educations.length === 0 ? (
          <div className="col-span-full py-16 text-center rounded-2xl bg-[#0D1321]/40 border border-gray-800 font-mono text-gray-500 text-sm">
            No education history added yet.
          </div>
        ) : (
          educations.map((edu) => (
            <div
              key={edu.id}
              className="p-5 rounded-2xl bg-[#0D1321]/70 border border-gray-800/80 hover:border-teal-500/30 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 flex-shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditModal(edu)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-purple-300 hover:bg-purple-500/10"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(edu.id, edu.degreeName)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-rose-400 hover:bg-rose-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">
                    {edu.degreeName}
                  </h3>
                  <p className="text-xs text-teal-400 font-mono font-medium">
                    {edu.institutionName}
                  </p>
                </div>

                <div className="flex items-center flex-wrap gap-3 text-xs text-gray-400 font-mono pt-1">
                  <span>{edu.fieldOfStudy}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    {formatRange(edu.startDate, edu.endDate)}
                  </span>
                </div>

                {edu.description && (
                  <p className="text-xs text-gray-400 pt-1 leading-relaxed">
                    {edu.description}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#0D1321] border border-gray-800 rounded-2xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-purple-400" />
                {editingId ? "Edit Degree" : "Add Degree"}
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
                  Degree / Certificate *
                </label>
                <input
                  type="text"
                  required
                  value={formData.degreeName}
                  onChange={(e) =>
                    setFormData({ ...formData, degreeName: e.target.value })
                  }
                  placeholder="e.g. Bachelor of Technology"
                  className="w-full px-3.5 py-2.5 bg-[#0B0F19] border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">
                  University / College *
                </label>
                <input
                  type="text"
                  required
                  value={formData.institutionName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      institutionName: e.target.value,
                    })
                  }
                  placeholder="e.g. Techno International New Town"
                  className="w-full px-3.5 py-2.5 bg-[#0B0F19] border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">
                  Field of Study
                </label>
                <input
                  type="text"
                  value={formData.fieldOfStudy}
                  onChange={(e) =>
                    setFormData({ ...formData, fieldOfStudy: e.target.value })
                  }
                  placeholder="e.g. Computer Science"
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
                    Leave empty if ongoing
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">
                  Description / Honors
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Additional details, honors..."
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
                  {editingId ? "Save Changes" : "Add Education"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationManager;
