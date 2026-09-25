import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext(null);

const STORAGE_KEY = "portfolio_shared_data";
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4001/api";

const initialData = {
  profile: {
    displayName: "Indadul Hoque",
    roleTitle: "Full Stack Developer",
    email: "indadul.hoque@example.com",
    phone: "+91 98765 43210",
    address: "Kolkata, India",
    bio: "I'm a passionate MERN stack developer dedicated to creating innovative, clean, and scalable web solutions. I specialize in engineering highly responsive, user-friendly full-stack web applications built with structural integrity and reliable performance.",
    photoURL: "/myimage.png",
    cvURL: "/Indadul_Hoque.pdf",
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/Hoqueindadul" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/indadul-hoque" },
      { platform: "Twitter", url: "https://twitter.com" },
    ],
    skills: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "Prisma ORM",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "Git & GitHub",
    ],
  },
  projects: [
    {
      id: "proj-1",
      title: "OCR-Based E-commerce Site",
      description:
        "An innovative e-commerce platform with OCR technology for product search and information extraction.",
      image:
        "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Azure OCR"],
      features: [
        "OCR-powered product search from images",
        "Full e-commerce functionality with cart and checkout",
        "User authentication and profile management",
        "Order tracking and history",
      ],
      demoLink: "https://list-karo.vercel.app/",
      codeLink: "https://github.com/Hoqueindadul/ListKaro",
      featured: true,
    },
    {
      id: "proj-2",
      title: "Children Academic School Website",
      description:
        "A comprehensive school website featuring curriculum information, student portal, and administrative tools.",
      image:
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Bootstrap"],
      features: [
        "Interactive curriculum explorer",
        "Student and teacher portals",
        "Event calendar and announcements",
        "Parent-teacher communication system",
      ],
      demoLink: "https://franchaisemodelformathguruabacus.vercel.app/",
      codeLink:
        "https://github.com/Hoqueindadul/franchaisemodelformathguruabacus",
      featured: true,
    },
    {
      id: "proj-3",
      title: "Restaurant Web App",
      description:
        "A full-stack restaurant web application with menu management, online ordering, and reservation system.",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      features: [
        "Interactive menu with filtering options",
        "Online ordering system with real-time updates",
        "Table reservation functionality",
        "Admin menu & sales manager",
      ],
      demoLink: "https://restaurant-app-demo.vercel.app/",
      codeLink: "https://github.com/Hoqueindadul/restaurant-app",
      featured: false,
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
        "Engineered full stack features using React, Node.js, and PostgreSQL. Integrated REST APIs and optimized database queries.",
      current: false,
    },
    {
      id: "exp-2",
      title: "MERN Stack Intern",
      company: "Ardent Computech PVT.LTD.",
      duration: "3 mos",
      date: "Feb 2025 - Apr 2025",
      description:
        "Developed responsive frontend components in React and crafted robust backend endpoints with Express and MongoDB.",
      current: false,
    },
    {
      id: "exp-3",
      title: "MERN Stack Intern",
      company: "Ardent Computech PVT.LTD.",
      duration: "1 mos",
      date: "Jul 2024 - Aug 2024",
      description:
        "Built dynamic user interfaces and connected them to secure RESTful microservices with JWT authentication.",
      current: false,
    },
  ],
  educations: [
    {
      id: "edu-1",
      institution: "Swami Vivekananda University (Pursuing)",
      degree: "Master of Computer Applications (MCA)",
      field: "Advanced Software Engineering & Database Architecture",
      date: "2025 - 2027",
      description:
        "Deepening expertise in advanced software engineering, database architecture, and full-stack development while actively building real-world applications.",
    },
    {
      id: "edu-2",
      institution: "Maulana Abul Kalam Azad University of Technology",
      degree: "Bachelor of Computer Applications (BCA) (H)",
      field: "Computer Science Principles & Web Technologies",
      date: "2022 - 2025",
      description:
        "Established a robust foundation in core computer science principles, database systems, and practical software engineering practices.",
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
    {
      id: "cert-2",
      title: "React & Modern JavaScript Certification",
      issuer: "Coursera / Meta",
      issueDate: "2024",
      image:
        "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=600&q=80",
      link: "https://example.com/cert/react",
    },
  ],
  messages: [
    {
      id: "msg-1",
      name: "Sarah Jenkins",
      email: "sarah.j@techinnovate.io",
      subject: "Exciting Senior Frontend Opportunity",
      message:
        "Hi Indadul, I saw your portfolio and was blown away by your OCR E-commerce project. Would love to discuss a developer role at our company!",
      date: "2026-09-24",
      unread: true,
    },
    {
      id: "msg-2",
      name: "Alex Rivera",
      email: "alex@riveradesign.co",
      subject: "Freelance Project Inquiry",
      message:
        "Looking for an expert React developer to build an interactive dashboard. Let me know your current availability.",
      date: "2026-09-22",
      unread: false,
    },
  ],
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

  // Sync to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      // Dispatch custom storage event for same-window / cross-tab reflection
      window.dispatchEvent(new Event("portfolio_data_updated"));
    } catch (e) {
      console.error("Failed to save portfolio data", e);
    }
  }, [data]);

  const [profileLoading, setProfileLoading] = useState(false);

  // Sync profile from backend database on mount
  useEffect(() => {
    let isMounted = true;
    const fetchBackendProfile = async () => {
      try {
        setProfileLoading(true);
        const res = await fetch(`${API_BASE_URL}/profile/get`, {
          credentials: "include",
        });
        if (res.ok) {
          const result = await res.json();
          if (result.success && result.data && isMounted) {
            setData((prev) => ({
              ...prev,
              profile: {
                ...prev.profile,
                ...result.data,
              },
            }));
          }
        }
      } catch (err) {
        console.warn(
          "Could not fetch profile from backend API, using cached data:",
          err.message,
        );
      } finally {
        if (isMounted) setProfileLoading(false);
      }
    };

    fetchBackendProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  // Profile actions (saves to backend database via API & syncs locally)
  const updateProfile = async (profileData) => {
    // 1. Immediately update local state for snappy UI
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...profileData },
    }));

    // 2. Prepare payload matching backend Prisma model
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

    try {
      let res;
      if (targetId) {
        // Update existing record by ID
        res = await fetch(`${API_BASE_URL}/profile/update/${targetId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });
      } else {
        // Check if a profile already exists on backend before creating
        let existingId = null;
        try {
          const checkRes = await fetch(`${API_BASE_URL}/profile/get`, {
            credentials: "include",
          });
          if (checkRes.ok) {
            const checkData = await checkRes.json();
            if (checkData.success && checkData.data?.id) {
              existingId = checkData.data.id;
            }
          }
        } catch {
          // ignore lookup error
        }

        if (existingId) {
          res = await fetch(`${API_BASE_URL}/profile/update/${existingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload),
          });
        } else {
          res = await fetch(`${API_BASE_URL}/profile/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload),
          });
        }
      }

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to update profile via API");
      }

      if (result.data) {
        setData((prev) => ({
          ...prev,
          profile: {
            ...prev.profile,
            ...result.data,
            ...(profileData.roleTitle
              ? { roleTitle: profileData.roleTitle }
              : {}),
          },
        }));
      }

      return { success: true, data: result.data };
    } catch (err) {
      console.error("API updateProfile error:", err);
      return { success: false, error: err.message };
    }
  };

  // Projects actions
  const addProject = (project) => {
    const newProject = {
      ...project,
      id: "proj-" + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects],
    }));
  };

  const updateProject = (id, updated) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id ? { ...p, ...updated } : p,
      ),
    }));
  };

  const deleteProject = (id) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  // Experience actions
  const addExperience = (exp) => {
    const newExp = { ...exp, id: "exp-" + Date.now() };
    setData((prev) => ({
      ...prev,
      experiences: [newExp, ...prev.experiences],
    }));
  };

  const updateExperience = (id, updated) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((e) =>
        e.id === id ? { ...e, ...updated } : e,
      ),
    }));
  };

  const deleteExperience = (id) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id),
    }));
  };

  // Education actions
  const addEducation = (edu) => {
    const newEdu = { ...edu, id: "edu-" + Date.now() };
    setData((prev) => ({
      ...prev,
      educations: [newEdu, ...prev.educations],
    }));
  };

  const updateEducation = (id, updated) => {
    setData((prev) => ({
      ...prev,
      educations: prev.educations.map((e) =>
        e.id === id ? { ...e, ...updated } : e,
      ),
    }));
  };

  const deleteEducation = (id) => {
    setData((prev) => ({
      ...prev,
      educations: prev.educations.filter((e) => e.id !== id),
    }));
  };

  // Certificate actions
  const addCertificate = (cert) => {
    const newCert = { ...cert, id: "cert-" + Date.now() };
    setData((prev) => ({
      ...prev,
      certificates: [newCert, ...prev.certificates],
    }));
  };

  const updateCertificate = (id, updated) => {
    setData((prev) => ({
      ...prev,
      certificates: prev.certificates.map((c) =>
        c.id === id ? { ...c, ...updated } : c,
      ),
    }));
  };

  const deleteCertificate = (id) => {
    setData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((c) => c.id !== id),
    }));
  };

  // Messages actions
  const markMessageAsRead = (id) => {
    setData((prev) => ({
      ...prev,
      messages: prev.messages.map((m) =>
        m.id === id ? { ...m, unread: false } : m,
      ),
    }));
  };

  const deleteMessage = (id) => {
    setData((prev) => ({
      ...prev,
      messages: prev.messages.filter((m) => m.id !== id),
    }));
  };

  // Reset to original default data
  const resetToDefault = () => {
    setData(initialData);
  };

  const value = {
    ...data,
    profileLoading,
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
