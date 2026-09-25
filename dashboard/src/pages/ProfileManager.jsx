import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Sparkles,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Plus,
  X,
  ExternalLink,
} from "lucide-react";
import { useData } from "../context/DataContext";

const ProfileManager = () => {
  const { profile, updateProfile, profileLoading } = useData();

  const [formData, setFormData] = useState({
    id: profile?.id || "",
    displayName: profile?.displayName || "",
    roleTitle: profile?.roleTitle || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    address: profile?.address || "",
    bio: profile?.bio || "",
    photoURL: profile?.photoURL || "",
    cvURL: profile?.cvURL || "",
    skills: profile?.skills ? [...profile.skills] : [],
    socialLinks: profile?.socialLinks ? [...profile.socialLinks] : [],
  });

  // Sync formData whenever profile data updates or loads from the API
  useEffect(() => {
    if (profile) {
      setFormData({
        id: profile.id || "",
        displayName: profile.displayName || "",
        roleTitle: profile.roleTitle || "",
        email: profile.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
        bio: profile.bio || "",
        photoURL: profile.photoURL || "",
        cvURL: profile.cvURL || "",
        skills: profile.skills ? [...profile.skills] : [],
        socialLinks: profile.socialLinks ? [...profile.socialLinks] : [],
      });
    }
  }, [profile]);

  const [skillInput, setSkillInput] = useState("");
  const [socialPlatform, setSocialPlatform] = useState("");
  const [socialUrl, setSocialUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleAddSkill = (e) => {
    e?.preventDefault();
    if (!skillInput.trim()) return;
    if (!formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      });
    }
    setSkillInput("");
  };

  const handleRemoveSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const handleAddSocial = (e) => {
    e?.preventDefault();
    if (!socialPlatform.trim() || !socialUrl.trim()) return;
    setFormData({
      ...formData,
      socialLinks: [
        ...formData.socialLinks,
        { platform: socialPlatform.trim(), url: socialUrl.trim() },
      ],
    });
    setSocialPlatform("");
    setSocialUrl("");
  };

  const handleRemoveSocial = (idx) => {
    setFormData({
      ...formData,
      socialLinks: formData.socialLinks.filter((_, i) => i !== idx),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage(null);
    setSavedSuccess(false);

    try {
      const res = await updateProfile(formData);
      if (res && res.success === false) {
        setErrorMessage(
          res.error || "Failed to update profile via backend API",
        );
      } else {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 4000);
      }
    } catch (err) {
      setErrorMessage(
        err.message || "An unexpected error occurred while saving",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>
              Profile successfully updated in database! Changes are live across
              portfolio.
            </span>
          </div>
          <button
            onClick={() => setSavedSuccess(false)}
            className="text-emerald-400 hover:text-emerald-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2 font-mono">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-rose-400 hover:text-rose-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Left Column: Form Fields (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Details Card */}
          <div className="p-6 rounded-2xl bg-[#0D1321]/70 border border-gray-800/80 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 pb-2 border-b border-gray-800">
              <User className="w-4 h-4 text-purple-400" />
              Primary Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                  Display Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.displayName}
                  onChange={(e) =>
                    setFormData({ ...formData, displayName: e.target.value })
                  }
                  placeholder="e.g. Indadul Hoque"
                  className="w-full px-3.5 py-2.5 bg-[#0B0F19] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                  Role / Headline *
                </label>
                <input
                  type="text"
                  required
                  value={formData.roleTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, roleTitle: e.target.value })
                  }
                  placeholder="e.g. Full Stack Developer"
                  className="w-full px-3.5 py-2.5 bg-[#0B0F19] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                Bio / About Summary *
              </label>
              <textarea
                rows={4}
                required
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Write a compelling personal summary for the hero/about section..."
                className="w-full px-3.5 py-2.5 bg-[#0B0F19] border border-gray-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3.5 py-2 bg-[#0B0F19] border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                  Phone
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3.5 py-2 bg-[#0B0F19] border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                  Location / City
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-3.5 py-2 bg-[#0B0F19] border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Media & Resume URLs Card */}
          <div className="p-6 rounded-2xl bg-[#0D1321]/70 border border-gray-800/80 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 pb-2 border-b border-gray-800">
              <FileText className="w-4 h-4 text-purple-400" />
              Media & Documents
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                  Avatar Photo URL
                </label>
                <input
                  type="text"
                  value={formData.photoURL}
                  onChange={(e) =>
                    setFormData({ ...formData, photoURL: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 bg-[#0B0F19] border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                  CV / Resume Link
                </label>
                <input
                  type="text"
                  value={formData.cvURL}
                  onChange={(e) =>
                    setFormData({ ...formData, cvURL: e.target.value })
                  }
                  placeholder="https://drive.google.com/... or pdf url"
                  className="w-full px-3.5 py-2.5 bg-[#0B0F19] border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Skills Management */}
          <div className="p-6 rounded-2xl bg-[#0D1321]/70 border border-gray-800/80 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 pb-2 border-b border-gray-800">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Technical Skills & Badges
            </h3>

            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                placeholder="Add skill (e.g. Next.js, PostgreSQL, Docker)..."
                className="flex-1 px-3.5 py-2 bg-[#0B0F19] border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-mono"
              >
                Add Skill
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/80 border border-gray-700 text-gray-200 text-xs font-mono hover:border-purple-500/40 transition-colors"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-gray-400 hover:text-rose-400"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Social Links Management */}
          <div className="p-6 rounded-2xl bg-[#0D1321]/70 border border-gray-800/80 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 pb-2 border-b border-gray-800">
              <ExternalLink className="w-4 h-4 text-purple-400" />
              Social Profiles & Links
            </h3>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={socialPlatform}
                onChange={(e) => setSocialPlatform(e.target.value)}
                placeholder="Platform (GitHub, LinkedIn, Twitter)"
                className="w-full sm:w-1/3 px-3.5 py-2 bg-[#0B0F19] border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              />
              <input
                type="url"
                value={socialUrl}
                onChange={(e) => setSocialUrl(e.target.value)}
                placeholder="https://..."
                className="flex-1 px-3.5 py-2 bg-[#0B0F19] border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              />
              <button
                type="button"
                onClick={handleAddSocial}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-xs font-mono"
              >
                Add Link
              </button>
            </div>

            <div className="space-y-2 pt-2">
              {formData.socialLinks.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#0B0F19] border border-gray-800 text-xs font-mono"
                >
                  <span className="font-semibold text-purple-400">
                    {item.platform}
                  </span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white truncate max-w-xs underline"
                  >
                    {item.url}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleRemoveSocial(idx)}
                    className="text-gray-500 hover:text-rose-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isSaving}
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 font-mono active:scale-[0.99] transition-all"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving to Database...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Profile & Update Portfolio</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Live Portfolio Preview Card (1 Col) */}
        <div className="space-y-4">
          <div className="sticky top-24">
            <h3 className="text-xs font-mono uppercase text-gray-400 tracking-wider mb-3">
              Live Preview (Hero / Bio)
            </h3>

            <div className="rounded-2xl bg-[#0D1321] border border-gray-800 p-6 space-y-6 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

              {/* Photo & Name */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gray-800 overflow-hidden border-2 border-purple-500/40 flex-shrink-0 shadow-md">
                  <img
                    src={
                      formData.photoURL ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                    }
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">
                    {formData.displayName || "Your Name"}
                  </h4>
                  <p className="text-xs text-purple-400 font-mono">
                    {formData.roleTitle || "Full Stack Developer"}
                  </p>
                  <p className="text-[11px] text-gray-500 font-mono mt-0.5">
                    {formData.address || "City, Country"}
                  </p>
                </div>
              </div>

              {/* Bio summary */}
              <div className="text-xs text-gray-300 leading-relaxed border-t border-b border-gray-800/80 py-4 font-sans">
                {formData.bio || "Your bio summary will be shown here..."}
              </div>

              {/* Top skills preview */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-gray-500 uppercase tracking-wider block">
                  Top Skills
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {formData.skills.slice(0, 8).map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700/60"
                    >
                      {s}
                    </span>
                  ))}
                  {formData.skills.length > 8 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 text-gray-500">
                      +{formData.skills.length - 8}
                    </span>
                  )}
                </div>
              </div>

              {/* CV Button */}
              {formData.cvURL && (
                <div className="pt-2">
                  <a
                    href={formData.cvURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-xs font-mono border border-purple-500/30 transition-all"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Download Resume
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileManager;
