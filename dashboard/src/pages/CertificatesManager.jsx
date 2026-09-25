import React, { useState } from "react";
import {
  Award,
  Plus,
  ExternalLink,
  Edit2,
  Trash2,
  X,
  Calendar,
} from "lucide-react";
import { useData } from "../context/DataContext";

const defaultCertState = {
  title: "",
  issuer: "",
  issueDate: "",
  image: "",
  link: "",
};

const CertificatesManager = () => {
  const { certificates, addCertificate, updateCertificate, deleteCertificate } = useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(defaultCertState);

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData(defaultCertState);
    setModalOpen(true);
  };

  const handleOpenEditModal = (cert) => {
    setEditingId(cert.id);
    setFormData({
      title: cert.title || "",
      issuer: cert.issuer || "",
      issueDate: cert.issueDate || "",
      image: cert.image || "",
      link: cert.link || "",
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingId) {
      updateCertificate(editingId, formData);
    } else {
      addCertificate(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete certificate "${title}"?`)) {
      deleteCertificate(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-sm bg-amber-500"></span>
            Certifications & Licenses
          </h2>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Showcase validated skills, cloud badges, and course completions.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs font-mono transition-all shadow-lg shadow-purple-600/30 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add Certificate
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.length === 0 ? (
          <div className="col-span-full py-16 text-center rounded-2xl bg-[#0D1321]/40 border border-gray-800 font-mono text-gray-500 text-sm">
            No certificates added yet.
          </div>
        ) : (
          certificates.map((cert) => (
            <div
              key={cert.id}
              className="rounded-2xl bg-[#0D1321]/70 border border-gray-800/80 hover:border-amber-500/30 transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-36 w-full bg-gray-900 overflow-hidden border-b border-gray-800">
                  <img
                    src={cert.image || "https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=600&q=80"}
                    alt={cert.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-amber-400">
                    <Award className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-bold text-white leading-snug">{cert.title}</h3>
                  <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                    <span className="text-amber-400">{cert.issuer}</span>
                    {cert.issueDate && (
                      <span className="flex items-center gap-1 text-[11px] text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {cert.issueDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-3 border-t border-gray-800/60 flex items-center justify-between bg-black/10">
                {cert.link ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-purple-400 hover:text-purple-300"
                  >
                    Verify <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span />
                )}

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEditModal(cert)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-purple-300 hover:bg-purple-500/10"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cert.id, cert.title)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-rose-400 hover:bg-rose-500/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#0D1321] border border-gray-800 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-400" />
                {editingId ? "Edit Certificate" : "Add Certificate"}
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
                  Certificate Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Meta Front-End Developer Professional Certificate"
                  className="w-full px-3.5 py-2.5 bg-[#0B0F19] border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">
                    Issuing Organization
                  </label>
                  <input
                    type="text"
                    value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    placeholder="e.g. Coursera / Meta"
                    className="w-full px-3.5 py-2.5 bg-[#0B0F19] border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">
                    Year / Date
                  </label>
                  <input
                    type="text"
                    value={formData.issueDate}
                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                    placeholder="e.g. 2024"
                    className="w-full px-3.5 py-2.5 bg-[#0B0F19] border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">
                  Image URL / Badge URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 bg-[#0B0F19] border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">
                  Credential Verification URL
                </label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://coursera.org/verify/..."
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
                  {editingId ? "Save Changes" : "Add Certificate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificatesManager;
