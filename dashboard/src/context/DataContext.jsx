import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { API_BASE_URL } from "../../config";
import toast from "react-hot-toast";

const DataContext = createContext(null);
const STORAGE_KEY = "portfolio_shared_data";

// Helper for clean, safe API requests
const api = async (path, method = "GET", body = null) => {
  try {
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    const cleanBase = API_BASE_URL.endsWith("/")
      ? API_BASE_URL.slice(0, -1)
      : API_BASE_URL;
    const options = {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };
    if (body) options.body = JSON.stringify(body);

    const res = await fetch(`${cleanBase}/${cleanPath}`, options);
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    return { ok: false, error: err.message };
  }
};

// Safe ISO date converter for Prisma DateTime fields
const toISODate = (val) => {
  if (!val) return new Date().toISOString();
  const d = new Date(val);
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
};

// Bidirectional normalizers so both frontend and backend field conventions work
const normalizeProject = (p) => ({
  id: p.id || `proj-${Date.now()}`,
  title: p.projectTitle || p.title || "",
  projectTitle: p.projectTitle || p.title || "",
  description: p.projectDescription || p.description || "",
  projectDescription: p.projectDescription || p.description || "",
  image:
    p.displayImage ||
    p.image ||
    "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80",
  displayImage:
    p.displayImage ||
    p.image ||
    "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80",
  features: p.projectFeatures || p.features || [],
  projectFeatures: p.projectFeatures || p.features || [],
  technologies: p.techStack || p.technologies || [],
  techStack: p.techStack || p.technologies || [],
  demoLink: p.liveLink || p.demoLink || "",
  liveLink: p.liveLink || p.demoLink || "",
  codeLink: p.repoLink || p.codeLink || "",
  repoLink: p.repoLink || p.codeLink || "",
  featured: p.featured ?? true,
});

const normalizeExperience = (e) => ({
  id: e.id || `exp-${Date.now()}`,
  title: e.jobTitle || e.title || "",
  jobTitle: e.jobTitle || e.title || "",
  company: e.companyName || e.company || "",
  companyName: e.companyName || e.company || "",
  description: e.jobDescription || e.description || "",
  jobDescription: e.jobDescription || e.description || "",
  duration: e.duration || "Present",
  date:
    e.date ||
    (e.startDate && e.endDate
      ? `${new Date(e.startDate).getFullYear()} - ${new Date(e.endDate).getFullYear()}`
      : "Present"),
  startDate: e.startDate || toISODate(e.date),
  endDate: e.endDate || toISODate(e.date),
  current: e.current ?? false,
});

const normalizeEducation = (ed) => ({
  id: ed.id || `edu-${Date.now()}`,
  institution: ed.institutionName || ed.institution || "",
  institutionName: ed.institutionName || ed.institution || "",
  degree: ed.degreeName || ed.degree || "",
  degreeName: ed.degreeName || ed.degree || "",
  field: ed.fieldOfStudy || ed.field || "",
  fieldOfStudy: ed.fieldOfStudy || ed.field || "",
  date: ed.date || "2022 - 2025",
  startDate: ed.startDate || toISODate(ed.date),
  endDate: ed.endDate || toISODate(ed.date),
  description: ed.description || "",
});

const normalizeMessage = (m) => ({
  id: m.id || `msg-${Date.now()}`,
  name: m.name || "Anonymous",
  email: m.email || "",
  subject: m.subject || "",
  message: m.message || "",
  date:
    m.date ||
    (m.createdAt
      ? new Date(m.createdAt).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]),
  unread: m.unread ?? true,
});

// Default initial state
const initialData = {
  profile: {
    displayName: "Indadul Hoque",
    roleTitle: "Full Stack Developer",
    email: "indadul.hoque@example.com",
    phone: "+91 98765 43210",
    address: "Kolkata, India",
    bio: "I'm a passionate MERN stack developer dedicated to creating innovative, clean, and scalable web solutions.",
    photoURL: "/myimage.png",
    cvURL: "/Indadul_Hoque.pdf",
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/Hoqueindadul" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/indadul-hoque" },
    ],
    skills: [
      "React.js",
      "Node.js",
      "Express.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma ORM",
      "PostgreSQL",
    ],
  },
  projects: [
    {
      id: "proj-1",
      title: "OCR-Based E-commerce Site",
      description:
        "An innovative e-commerce platform with OCR technology for product search and extraction.",
      image:
        "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Azure OCR"],
      features: ["OCR-powered search", "Cart & checkout", "Authentication"],
      demoLink: "https://list-karo.vercel.app/",
      codeLink: "https://github.com/Hoqueindadul/ListKaro",
      featured: true,
    },
  ],
  experiences: [
    {
      id: "exp-1",
      title: "Junior Full Stack Developer",
      company: "GS3 Solution PVT.LTD",
      duration: "6 mos",
      date: "Jul 2025 - Dec 2025",
      description:
        "Engineered full stack features using React, Node.js, and PostgreSQL.",
      current: false,
    },
  ],
  educations: [
    {
      id: "edu-1",
      institution: "Swami Vivekananda University",
      degree: "Master of Computer Applications (MCA)",
      field: "Software Engineering & Databases",
      date: "2025 - 2027",
      description:
        "Specializing in software engineering and database architectures.",
    },
  ],
  certificates: [
    {
      id: "cert-1",
      title: "Full Stack Web Development",
      issuer: "Ardent Computech",
      issueDate: "2025",
      image:
        "https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=600&q=80",
      link: "https://example.com/cert/fullstack",
    },
  ],
  blogs: [
    {
      id: "blog-1",
      title: "Mastering Fullstack Architecture with MERN & TypeScript",
      slug: "mastering-fullstack-architecture-mern-typescript",
      excerpt:
        "A comprehensive guide to organizing scalable, enterprise-grade web applications with Node.js, Express, Prisma ORM, and React.",
      coverImage:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
      tags: ["MERN", "TypeScript", "Architecture", "Fullstack"],
      status: "published",
      readTime: "6 min read",
      createdAt: "2026-09-15T10:00:00.000Z",
      updatedAt: "2026-09-20T14:30:00.000Z",
      content: `# Mastering Fullstack Architecture with MERN & TypeScript


### Key Architectural Pillars:
1. **Modular Routing**: Keep endpoints grouped by business domain.
2. **Controller Decoupling**: Isolate business logic from HTTP transport layers.
3. **Database Client Pooling**: Leverage Prisma with connection pooling.

> *"Clean architecture is not about writing less code; it is about writing code that is straightforward to change."*

Happy coding!
`,
    },
    {
      id: "blog-2",
      title: "Optimizing High Performance React Applications in 2026",
      slug: "optimizing-high-performance-react-applications",
      excerpt:
        "Deep dive into memoization techniques, transition hooks, bundle splitting, and virtual rendering.",
      coverImage:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1000&q=80",
      tags: ["React", "Performance", "WebDev", "Vite"],
      status: "draft",
      readTime: "4 min read",
      createdAt: "2026-09-28T08:15:00.000Z",
      updatedAt: "2026-09-28T08:15:00.000Z",
      content: `# Optimizing High Performance React Applications in 2026

React applications scale rapidly, but without careful attention to rendering lifecycle, performance can degrade.

## Core Best Practices

- **Avoid premature memoization**: Profile first with React DevTools.
- **Use \`useDeferredValue\` & \`useTransition\`** for non-blocking UI updates.
- **Dynamic Imports**: Lazy load routes that aren't immediately critical.

\`\`\`jsx
const HeavyChart = React.lazy(() => import('./components/HeavyChart'));
\`\`\`

Stay tuned for part two!
`,
    },
  ],
  messages: [],
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialData;
    } catch {
      return initialData;
    }
  });

  const [profileLoading, setProfileLoading] = useState(false);

  // Sync state to localStorage & dispatch notification for cross-tab reflection
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new Event("portfolio_data_updated"));
    } catch (e) {
      console.error("Failed to save data locally", e);
    }
  }, [data]);

  // Fetch all live data from backend APIs on mount
  const refreshData = useCallback(async () => {
    setProfileLoading(true);

    try {
      const [profRes, projRes, expRes, eduRes, msgRes] =
        await Promise.allSettled([
          api("profile"),
          api("projects"),
          api("experiences"),
          api("educations"),
          api("contact"),
        ]);

      setData((prev) => {
        const next = { ...prev };

        if (
          profRes.status === "fulfilled" &&
          profRes.value.ok &&
          profRes.value.data?.data
        ) {
          next.profile = { ...prev.profile, ...profRes.value.data.data };
        }

        if (
          projRes.status === "fulfilled" &&
          projRes.value.ok &&
          Array.isArray(projRes.value.data?.data)
        ) {
          next.projects = projRes.value.data.data.map(normalizeProject);
        }

        if (
          expRes.status === "fulfilled" &&
          expRes.value.ok &&
          Array.isArray(expRes.value.data?.data)
        ) {
          next.experiences = expRes.value.data.data.map(normalizeExperience);
        }

        if (
          eduRes.status === "fulfilled" &&
          eduRes.value.ok &&
          Array.isArray(eduRes.value.data?.data)
        ) {
          next.educations = eduRes.value.data.data.map(normalizeEducation);
        }

        if (
          msgRes.status === "fulfilled" &&
          msgRes.value.ok &&
          Array.isArray(msgRes.value.data?.data)
        ) {
          next.messages = msgRes.value.data.data.map(normalizeMessage);
        }

        return next;
      });
    } finally {
      setProfileLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // ===================== PROFILE =====================
  const updateProfile = async (profileData) => {
    // Optimistic local update
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...profileData },
    }));

    const payload = {
      displayName: profileData.displayName,
      email: profileData.email,
      phone: profileData.phone,
      address: profileData.address,
      bio: profileData.bio,
      socialLinks: profileData.socialLinks || [],
      photoURL: profileData.photoURL,
      cvURL: profileData.cvURL,
      skills: profileData.skills || [],
    };

    const targetId = profileData.id || data.profile?.id;
    const res = targetId
      ? await api(`profile/${targetId}`, "PUT", payload)
      : await api("profile", "POST", payload);

    if (res.ok && res.data?.data) {
      setData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          ...res.data.data,
          ...(profileData.roleTitle
            ? { roleTitle: profileData.roleTitle }
            : {}),
        },
      }));
      toast.success("Profile updated successfully!");
      return { success: true, data: res.data.data };
    }

    if (res.ok) {
      toast.success("Profile updated successfully!");
      return { success: true };
    } else {
      toast.error(res.data?.message || "Failed to update profile.");
      return { success: false, error: res.data?.message || res.error };
    }
  };

  // ===================== PROJECTS =====================
  const addProject = async (project) => {
    const payload = {
      projectTitle: project.title || project.projectTitle,
      projectDescription: project.description || project.projectDescription,
      displayImage:
        project.image ||
        project.displayImage ||
        "https://images.unsplash.com/photo-1557821552-17105176677c",
      projectFeatures: project.features || project.projectFeatures || [],
      techStack: project.technologies || project.techStack || [],
      liveLink: project.demoLink || project.liveLink || "",
      repoLink: project.codeLink || project.repoLink || "",
    };

    const res = await api("projects", "POST", payload);
    const saved =
      res.ok && res.data?.data
        ? normalizeProject(res.data.data)
        : normalizeProject({ ...project, id: `proj-${Date.now()}` });

    setData((prev) => ({
      ...prev,
      projects: [saved, ...prev.projects],
    }));

    if (res.ok) {
      toast.success("Project added successfully!");
    } else {
      toast.error(res.data?.message || "Failed to save project to server, added locally.");
    }
    return saved;
  };

  const updateProject = async (id, updated) => {
    const payload = {
      projectTitle: updated.title || updated.projectTitle,
      projectDescription: updated.description || updated.projectDescription,
      displayImage: updated.image || updated.displayImage,
      projectFeatures: updated.features || updated.projectFeatures,
      techStack: updated.technologies || updated.techStack,
      liveLink: updated.demoLink || updated.liveLink,
      repoLink: updated.codeLink || updated.repoLink,
    };

    const res = await api(`projects/${id}`, "PUT", payload);
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id ? normalizeProject({ ...p, ...updated }) : p,
      ),
    }));

    if (res.ok) {
      toast.success("Project updated successfully!");
    } else {
      toast.error(res.data?.message || "Failed to update project on server.");
    }
  };

  const deleteProject = async (id) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));

    const res = await api(`projects/${id}`, "DELETE");
    if (res.ok) {
      toast.success("Project deleted successfully!");
    } else {
      toast.error(res.data?.message || "Failed to delete project on server.");
    }
  };

  // ===================== EXPERIENCE =====================
  const addExperience = async (exp) => {
    const payload = {
      companyName: exp.company || exp.companyName,
      jobTitle: exp.title || exp.jobTitle,
      jobDescription: exp.description || exp.jobDescription,
      startDate: toISODate(exp.startDate || exp.date),
      endDate: toISODate(exp.endDate || exp.date),
    };

    const res = await api("experiences", "POST", payload);
    const saved =
      res.ok && res.data?.data
        ? normalizeExperience(res.data.data)
        : normalizeExperience({ ...exp, id: `exp-${Date.now()}` });

    setData((prev) => ({
      ...prev,
      experiences: [saved, ...prev.experiences],
    }));

    if (res.ok) {
      toast.success("Experience added successfully!");
    } else {
      toast.error(res.data?.message || "Failed to add experience to server.");
    }
    return saved;
  };

  const updateExperience = async (id, updated) => {
    const payload = {
      companyName: updated.company || updated.companyName,
      jobTitle: updated.title || updated.jobTitle,
      jobDescription: updated.description || updated.jobDescription,
      startDate: toISODate(updated.startDate || updated.date),
      endDate: toISODate(updated.endDate || updated.date),
    };

    const res = await api(`experiences/${id}`, "PUT", payload);
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((e) =>
        e.id === id ? normalizeExperience({ ...e, ...updated }) : e,
      ),
    }));

    if (res.ok) {
      toast.success("Experience updated successfully!");
    } else {
      toast.error(res.data?.message || "Failed to update experience on server.");
    }
  };

  const deleteExperience = async (id) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id),
    }));

    const res = await api(`experiences/${id}`, "DELETE");
    if (res.ok) {
      toast.success("Experience deleted successfully!");
    } else {
      toast.error(res.data?.message || "Failed to delete experience on server.");
    }
  };

  // ===================== EDUCATION =====================
  const addEducation = async (edu) => {
    const payload = {
      institutionName: edu.institutionName || edu.institution,
      degreeName: edu.degreeName || edu.degree,
      fieldOfStudy: edu.fieldOfStudy || edu.field || "",
      description: edu.description || "",
      startDate: toISODate(edu.startDate || edu.date),
      endDate: edu.endDate ? toISODate(edu.endDate) : null,
    };

    const res = await api("educations", "POST", payload);
    const saved =
      res.ok && res.data?.data
        ? normalizeEducation(res.data.data)
        : normalizeEducation({ ...edu, id: `edu-${Date.now()}` });

    setData((prev) => ({
      ...prev,
      educations: [saved, ...prev.educations],
    }));

    if (res.ok) {
      toast.success("Education added successfully!");
    } else {
      toast.error(res.data?.message || "Failed to add education to server.");
    }
    return saved;
  };

  const updateEducation = async (id, updated) => {
    const payload = {
      institutionName: updated.institutionName || updated.institution,
      degreeName: updated.degreeName || updated.degree,
      fieldOfStudy: updated.fieldOfStudy || updated.field || "",
      description: updated.description || "",
      startDate: toISODate(updated.startDate || updated.date),
      endDate: updated.endDate ? toISODate(updated.endDate) : null,
    };

    const res = await api(`educations/${id}`, "PUT", payload);
    setData((prev) => ({
      ...prev,
      educations: prev.educations.map((e) =>
        e.id === id ? normalizeEducation({ ...e, ...updated }) : e,
      ),
    }));

    if (res.ok) {
      toast.success("Education updated successfully!");
    } else {
      toast.error(res.data?.message || "Failed to update education on server.");
    }
  };

  const deleteEducation = async (id) => {
    setData((prev) => ({
      ...prev,
      educations: prev.educations.filter((e) => e.id !== id),
    }));

    const res = await api(`educations/${id}`, "DELETE");
    if (res.ok) {
      toast.success("Education deleted successfully!");
    } else {
      toast.error(res.data?.message || "Failed to delete education on server.");
    }
  };

  // ===================== CERTIFICATES =====================
  const addCertificate = (cert) => {
    const newCert = { ...cert, id: `cert-${Date.now()}` };
    setData((prev) => ({
      ...prev,
      certificates: [newCert, ...prev.certificates],
    }));
    toast.success("Certificate added successfully!");
  };

  const updateCertificate = (id, updated) => {
    setData((prev) => ({
      ...prev,
      certificates: prev.certificates.map((c) =>
        c.id === id ? { ...c, ...updated } : c,
      ),
    }));
    toast.success("Certificate updated successfully!");
  };

  const deleteCertificate = (id) => {
    setData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((c) => c.id !== id),
    }));
    toast.success("Certificate deleted successfully!");
  };

  // ===================== MESSAGES =====================
  const markMessageAsRead = (id) => {
    setData((prev) => ({
      ...prev,
      messages: prev.messages.map((m) =>
        m.id === id ? { ...m, unread: false } : m,
      ),
    }));
    toast.success("Message marked as read!");
  };

  const deleteMessage = (id) => {
    setData((prev) => ({
      ...prev,
      messages: prev.messages.filter((m) => m.id !== id),
    }));
    toast.success("Message deleted successfully!");
  };

  // ===================== BLOGS =====================
  const addBlog = (blog) => {
    const newBlog = {
      ...blog,
      id: blog.id || `blog-${Date.now()}`,
      createdAt: blog.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setData((prev) => ({
      ...prev,
      blogs: [newBlog, ...(prev.blogs || [])],
    }));
    toast.success("Blog post added successfully!");
    return newBlog;
  };

  const updateBlog = (id, updated) => {
    setData((prev) => ({
      ...prev,
      blogs: (prev.blogs || []).map((b) =>
        b.id === id
          ? { ...b, ...updated, updatedAt: new Date().toISOString() }
          : b,
      ),
    }));
    toast.success("Blog post updated successfully!");
  };

  const deleteBlog = (id) => {
    setData((prev) => ({
      ...prev,
      blogs: (prev.blogs || []).filter((b) => b.id !== id),
    }));
    toast.success("Blog post deleted successfully!");
  };

  // Reset to default
  const resetToDefault = () => {
    setData(initialData);
    toast.success("Settings reset to default!");
  };

  const value = {
    ...data,
    profileLoading,
    refreshData,
    updateProfile,
    addProject,
    updateProject,
    deleteProject,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    addBlog,
    updateBlog,
    deleteBlog,
    markMessageAsRead,
    deleteMessage,
    resetToDefault,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
