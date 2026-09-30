import React, { useState, useMemo, useRef } from "react";
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Eye,
  Columns,
  Download,
  Upload,
  CheckCircle2,
  Clock,
  Tag,
  Calendar,
  Sparkles,
  FileText,
  Globe,
  Lock,
  ChevronRight,
  X,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Link2,
  Image as ImageIcon,
  Copy,
  Check,
  AlertCircle,
  Share2,
} from "lucide-react";
import { useData } from "../context/DataContext";

// Built-in Markdown Preview Renderer
const MarkdownPreview = ({ content }) => {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState(null);

  const copyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  if (!content || !content.trim()) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500 py-16">
        <FileText className="w-12 h-12 text-gray-700 mb-3" />
        <p className="text-sm font-mono">No markdown content written yet.</p>
        <p className="text-xs text-gray-600 mt-1">Start typing on the editor or select a toolbar action.</p>
      </div>
    );
  }

  // Parse markdown lines into structured elements
  const lines = content.split("\n");
  const renderedElements = [];
  let inCodeBlock = false;
  let codeBlockLang = "";
  let codeBlockBuffer = [];
  let codeBlockIndex = 0;
  let inTable = false;
  let tableRows = [];

  const flushTable = (key) => {
    if (tableRows.length === 0) return null;
    const headerRow = tableRows[0];
    const bodyRows = tableRows.slice(2); // Skip separator row

    const parseCells = (row) =>
      row
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim());

    const headers = parseCells(headerRow);

    const elem = (
      <div key={`table-${key}`} className="my-5 overflow-x-auto rounded-xl border border-gray-800">
        <table className="min-w-full divide-y divide-gray-800 text-left text-sm">
          <thead className="bg-[#0B0F19]">
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="px-4 py-2.5 font-semibold text-gray-300">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60 bg-[#0D1321]/60">
            {bodyRows.map((r, ri) => (
              <tr key={ri} className="hover:bg-purple-500/5 transition-colors">
                {parseCells(r).map((cell, ci) => (
                  <td key={ci} className="px-4 py-2.5 text-gray-400 font-mono text-xs">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableRows = [];
    inTable = false;
    return elem;
  };

  const parseInline = (text) => {
    if (!text) return "";
    // Replace inline code, bold, italic, links, images
    let parts = [text];

    // Image: ![alt](url)
    const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    // Link: [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

    return (
      <span
        dangerouslySetInnerHTML={{
          __html: text
            .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="my-4 rounded-xl max-h-96 w-auto border border-gray-800 shadow-md inline-block" />')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-purple-400 hover:text-purple-300 underline underline-offset-4 font-medium transition-colors">$1</a>')
            .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 font-mono text-xs border border-purple-500/20">$1</code>')
            .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
            .replace(/\*([^*]+)\*/g, '<em class="italic text-gray-300">$1</em>')
            .replace(/~~([^~]+)~~/g, '<del class="line-through text-gray-500">$1</del>'),
        }}
      />
    );
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check Code blocks
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        // End code block
        const codeText = codeBlockBuffer.join("\n");
        const currentIndex = codeBlockIndex++;
        renderedElements.push(
          <div key={`code-${i}`} className="my-4 rounded-xl overflow-hidden border border-gray-800 bg-[#0B0F19] text-gray-200">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900/80 border-b border-gray-800/80 text-xs font-mono text-gray-400">
              <span className="uppercase tracking-wider text-purple-400 font-semibold">{codeBlockLang || "CODE"}</span>
              <button
                type="button"
                onClick={() => copyCode(codeText, currentIndex)}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                title="Copy code"
              >
                {copiedCodeIndex === currentIndex ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 text-xs font-mono overflow-x-auto text-gray-300 leading-relaxed">
              <code>{codeText}</code>
            </pre>
          </div>
        );
        codeBlockBuffer = [];
        codeBlockLang = "";
        inCodeBlock = false;
      } else {
        // Start code block
        inCodeBlock = true;
        codeBlockLang = line.trim().slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockBuffer.push(line);
      continue;
    }

    // Check Table
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      inTable = true;
      tableRows.push(line.trim());
      continue;
    } else if (inTable) {
      renderedElements.push(flushTable(i));
    }

    // Headings
    if (line.startsWith("# ")) {
      renderedElements.push(
        <h1 key={i} className="text-2xl md:text-3xl font-extrabold text-white mt-6 mb-3 tracking-tight border-b border-gray-800/80 pb-2">
          {parseInline(line.slice(2))}
        </h1>
      );
    } else if (line.startsWith("## ")) {
      renderedElements.push(
        <h2 key={i} className="text-xl md:text-2xl font-bold text-white mt-5 mb-2.5 tracking-tight">
          {parseInline(line.slice(3))}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      renderedElements.push(
        <h3 key={i} className="text-lg md:text-xl font-bold text-purple-200 mt-4 mb-2">
          {parseInline(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith("#### ")) {
      renderedElements.push(
        <h4 key={i} className="text-base font-semibold text-gray-200 mt-3 mb-1.5">
          {parseInline(line.slice(5))}
        </h4>
      );
    } else if (line.startsWith("> ")) {
      // Blockquote
      renderedElements.push(
        <blockquote key={i} className="my-3 pl-4 py-1 border-l-4 border-purple-500 bg-purple-500/5 text-gray-300 italic rounded-r-lg text-sm">
          {parseInline(line.slice(2))}
        </blockquote>
      );
    } else if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      // Unordered list
      renderedElements.push(
        <li key={i} className="ml-5 list-disc text-gray-300 text-sm my-1 leading-relaxed">
          {parseInline(line.trim().slice(2))}
        </li>
      );
    } else if (/^\d+\.\s/.test(line.trim())) {
      // Ordered list
      const content = line.trim().replace(/^\d+\.\s/, "");
      renderedElements.push(
        <li key={i} className="ml-5 list-decimal text-gray-300 text-sm my-1 leading-relaxed">
          {parseInline(content)}
        </li>
      );
    } else if (line.trim() === "---" || line.trim() === "***") {
      // Horizontal Rule
      renderedElements.push(<hr key={i} className="my-6 border-gray-800" />);
    } else if (line.trim() === "") {
      // Empty line / paragraph break
      renderedElements.push(<div key={i} className="h-2" />);
    } else {
      // Normal paragraph
      renderedElements.push(
        <p key={i} className="text-gray-300 text-sm leading-relaxed my-1.5">
          {parseInline(line)}
        </p>
      );
    }
  }

  if (inTable) {
    renderedElements.push(flushTable("end"));
  }

  return <div className="space-y-1">{renderedElements}</div>;
};

const defaultBlogState = {
  title: "",
  slug: "",
  excerpt: "",
  coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
  tags: ["WebDev", "Tech"],
  status: "published",
  readTime: "5 min read",
  content: `# New Article Title

Write an engaging introduction that hooks the reader right away...

## Subheading One

Explain your core technical insight or architectural decision.

\`\`\`javascript
// Example implementation snippet
function calculateMetrics(data) {
  return data.map(item => item.value * 2);
}
\`\`\`

## Key Takeaways
- First key insight
- Second practical implementation detail
- Future considerations

> *"Write clean, concise, and purposeful code that stands the test of time."*
`,
};

const BlogsManagement = () => {
  const { blogs = [], addBlog, updateBlog, deleteBlog } = useData();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // "all" | "published" | "draft"
  const [selectedTag, setSelectedTag] = useState("all");

  // Modal / Editor State
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(defaultBlogState);
  const [tagInput, setTagInput] = useState("");
  const [viewMode, setViewMode] = useState("split"); // "editor" | "split" | "preview"
  const [savedAlert, setSavedAlert] = useState(false);

  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  // Collect all unique tags across blogs
  const allTags = useMemo(() => {
    const set = new Set();
    blogs.forEach((b) => b.tags?.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [blogs]);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        b.title.toLowerCase().includes(q) ||
        b.slug.toLowerCase().includes(q) ||
        b.excerpt?.toLowerCase().includes(q) ||
        b.tags?.some((t) => t.toLowerCase().includes(q));

      const matchesStatus =
        statusFilter === "all" || b.status === statusFilter;

      const matchesTag =
        selectedTag === "all" || b.tags?.includes(selectedTag);

      return matchesSearch && matchesStatus && matchesTag;
    });
  }, [blogs, searchQuery, statusFilter, selectedTag]);

  // Statistics
  const stats = useMemo(() => {
    const total = blogs.length;
    const published = blogs.filter((b) => b.status === "published").length;
    const drafts = blogs.filter((b) => b.status === "draft").length;
    const totalWords = blogs.reduce((acc, b) => acc + (b.content?.split(/\s+/).length || 0), 0);
    return { total, published, drafts, totalWords };
  }, [blogs]);

  // Generate URL slug from title
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      // Auto-generate slug if it was empty or matched previous auto slug
      slug: !editingId ? generateSlug(title) : prev.slug,
    }));
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      ...defaultBlogState,
      content: defaultBlogState.content,
      readTime: "4 min read",
    });
    setTagInput("");
    setViewMode("split");
    setEditorOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (blog) => {
    setEditingId(blog.id);
    setFormData({
      title: blog.title || "",
      slug: blog.slug || "",
      excerpt: blog.excerpt || "",
      coverImage: blog.coverImage || "",
      tags: blog.tags ? [...blog.tags] : [],
      status: blog.status || "published",
      readTime: blog.readTime || "5 min read",
      content: blog.content || "",
    });
    setTagInput("");
    setViewMode("split");
    setEditorOpen(true);
  };

  // Add Tag
  const handleAddTag = (e) => {
    e?.preventDefault();
    const tag = tagInput.trim();
    if (!tag) return;
    if (!formData.tags.includes(tag)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    }
    setTagInput("");
  };

  // Remove Tag
  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  };

  // Calculate estimated reading time
  const calculateReadTime = (content) => {
    const words = content.trim().split(/\s+/).length;
    const mins = Math.max(1, Math.round(words / 200));
    return `${mins} min read`;
  };

  // Content change
  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setFormData((prev) => ({
      ...prev,
      content: newContent,
      readTime: calculateReadTime(newContent),
    }));
  };

  // Toolbar action helpers
  const insertMarkdown = (prefix, suffix = "", defaultText = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selection = text.substring(start, end) || defaultText;

    const replacement = `${prefix}${selection}${suffix}`;
    const newText = text.substring(0, start) + replacement + text.substring(end);

    setFormData((prev) => ({
      ...prev,
      content: newText,
      readTime: calculateReadTime(newText),
    }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selection.length
      );
    }, 0);
  };

  // Save Blog
  const handleSave = (e) => {
    e?.preventDefault();
    if (!formData.title.trim()) {
      alert("Please provide an article title.");
      return;
    }

    const finalBlog = {
      ...formData,
      slug: formData.slug || generateSlug(formData.title),
      readTime: formData.readTime || calculateReadTime(formData.content),
    };

    if (editingId) {
      updateBlog(editingId, finalBlog);
    } else {
      addBlog(finalBlog);
    }

    setSavedAlert(true);
    setTimeout(() => {
      setSavedAlert(false);
      setEditorOpen(false);
    }, 800);
  };

  // Delete Blog
  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete the blog post "${title}"?`)) {
      deleteBlog(id);
    }
  };

  // Toggle Publish / Draft
  const handleToggleStatus = (blog) => {
    const newStatus = blog.status === "published" ? "draft" : "published";
    updateBlog(blog.id, { status: newStatus });
  };

  // Download Blog as .md file
  const handleDownloadMD = (blog) => {
    const frontmatter = `---
title: "${blog.title}"
slug: "${blog.slug}"
status: "${blog.status}"
date: "${blog.createdAt ? blog.createdAt.split("T")[0] : new Date().toISOString().split("T")[0]}"
readTime: "${blog.readTime}"
tags: [${blog.tags?.map((t) => `"${t}"`).join(", ") || ""}]
coverImage: "${blog.coverImage || ""}"
excerpt: "${blog.excerpt?.replace(/"/g, '\\"') || ""}"
---

`;
    const fullMD = frontmatter + (blog.content || "");
    const blob = new Blob([fullMD], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${blog.slug || "article"}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import local .md file into editor
  const handleImportMDFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result || "";
      // Parse frontmatter if present
      let title = file.name.replace(/\.md$/, "");
      let content = text;
      let tags = ["Imported"];
      let excerpt = "";
      let status = "draft";

      if (text.startsWith("---")) {
        const parts = text.split("---");
        if (parts.length >= 3) {
          const fmText = parts[1];
          content = parts.slice(2).join("---").trim();

          const titleMatch = fmText.match(/title:\s*["']?([^"'\n]+)["']?/);
          if (titleMatch) title = titleMatch[1];

          const excerptMatch = fmText.match(/excerpt:\s*["']?([^"'\n]+)["']?/);
          if (excerptMatch) excerpt = excerptMatch[1];

          const statusMatch = fmText.match(/status:\s*["']?([^"'\n]+)["']?/);
          if (statusMatch) status = statusMatch[1];

          const tagsMatch = fmText.match(/tags:\s*\[(.*?)\]/);
          if (tagsMatch) {
            tags = tagsMatch[1]
              .split(",")
              .map((t) => t.replace(/["'\s]/g, ""))
              .filter(Boolean);
          }
        }
      }

      setFormData((prev) => ({
        ...prev,
        title,
        slug: generateSlug(title),
        content,
        tags: tags.length ? tags : prev.tags,
        excerpt: excerpt || prev.excerpt,
        status,
        readTime: calculateReadTime(content),
      }));

      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-sm bg-purple-500"></span>
            Blog & Article Manager
          </h2>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Author and publish technical articles directly in Markdown (<span className="text-purple-400">.md</span>).
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-all shadow-lg shadow-purple-600/30 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0D1321]/70 border border-gray-800/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400">Total Articles</span>
            <BookOpen className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-2 font-mono">{stats.total}</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D1321]/70 border border-gray-800/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400">Published</span>
            <Globe className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-emerald-400 mt-2 font-mono">{stats.published}</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D1321]/70 border border-gray-800/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400">Drafts</span>
            <Lock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-amber-400 mt-2 font-mono">{stats.drafts}</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0D1321]/70 border border-gray-800/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400">Total Words</span>
            <FileText className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-2 font-mono">{stats.totalWords.toLocaleString()}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0D1321]/70 border border-gray-800/80 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, tag, content..."
            className="w-full pl-10 pr-4 py-2 bg-[#0B0F19] border border-gray-800 rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 font-mono"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-2">
          {["all", "published", "draft"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all ${
                statusFilter === status
                  ? "bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/20"
                  : "bg-[#0B0F19] text-gray-400 hover:text-white border border-gray-800"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Tag Filter Dropdown */}
        {allTags.length > 0 && (
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-gray-500" />
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="bg-[#0B0F19] border border-gray-800 text-gray-300 text-xs rounded-lg px-2.5 py-1.5 font-mono focus:outline-none focus:border-purple-500"
            >
              <option value="all">All Tags ({allTags.length})</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  #{tag}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Blog Cards Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0D1321]/50 border border-gray-800/80">
          <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No articles found</h3>
          <p className="text-xs text-gray-400 font-mono mt-1">
            {searchQuery || statusFilter !== "all" || selectedTag !== "all"
              ? "Try clearing your search query or filter."
              : "Get started by creating your very first Markdown blog post."}
          </p>
          <button
            onClick={handleOpenCreate}
            className="mt-4 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium font-mono inline-flex items-center gap-2 shadow-lg shadow-purple-600/20"
          >
            <Plus className="w-3.5 h-3.5" />
            Write Article
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="group rounded-2xl bg-[#0D1321]/80 border border-gray-800/80 hover:border-purple-500/40 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-purple-500/5"
            >
              {/* Cover Image Banner */}
              <div className="h-44 w-full relative bg-gray-900 overflow-hidden">
                <img
                  src={blog.coverImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1321] via-transparent to-black/30" />

                {/* Status Badge */}
                <button
                  onClick={() => handleToggleStatus(blog)}
                  className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider backdrop-blur-md border transition-all ${
                    blog.status === "published"
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30"
                      : "bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30"
                  }`}
                  title="Click to toggle status"
                >
                  {blog.status === "published" ? "● Published" : "○ Draft"}
                </button>

                {/* Read Time */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] text-gray-300 font-mono flex items-center gap-1 border border-white/10">
                  <Clock className="w-3 h-3 text-purple-400" />
                  {blog.readTime || "4 min read"}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed font-sans">
                    {blog.excerpt || blog.content?.slice(0, 120) || "No excerpt provided."}
                  </p>
                </div>

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {blog.tags.slice(0, 4).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-[10px] text-purple-300 font-mono"
                      >
                        #{t}
                      </span>
                    ))}
                    {blog.tags.length > 4 && (
                      <span className="text-[10px] text-gray-500 font-mono self-center">
                        +{blog.tags.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Bottom Action Footer */}
                <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
                  <span className="font-mono text-[11px] text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {blog.createdAt ? blog.createdAt.split("T")[0] : "2026-09-30"}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleDownloadMD(blog)}
                      className="p-1.5 text-gray-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-lg transition-colors"
                      title="Download as .md file"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleOpenEdit(blog)}
                      className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800/60 rounded-lg transition-colors"
                      title="Edit Article"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id, blog.title)}
                      className="p-1.5 text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="Delete Article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===================== FULL MARKDOWN EDITOR MODAL ===================== */}
      {editorOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-[#0B0F19] border border-gray-800 rounded-2xl w-full max-w-7xl h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-fade-in">
            {/* Modal Top Header */}
            <div className="h-16 px-6 border-b border-gray-800/80 bg-[#0D1321] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    {editingId ? "Edit Markdown Article" : "Compose New Markdown Article"}
                  </h3>
                  <span className="text-[10px] text-gray-400 font-mono">
                    Markdown Format (.md)
                  </span>
                </div>
              </div>

              {/* Actions & View Controls */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Status Toggle */}
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      status: prev.status === "published" ? "draft" : "published",
                    }))
                  }
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all ${
                    formData.status === "published"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20"
                  }`}
                >
                  {formData.status === "published" ? "Published" : "Draft"}
                </button>

                {/* Import .md File */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImportMDFile}
                  accept=".md,.markdown,text/markdown"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B0F19] text-gray-300 border border-gray-700 hover:border-gray-600 hover:text-white text-xs font-mono transition-colors"
                  title="Import a local .md file"
                >
                  <Upload className="w-3.5 h-3.5 text-purple-400" />
                  <span>Import .md</span>
                </button>

                {/* Export .md */}
                <button
                  type="button"
                  onClick={() => handleDownloadMD(formData)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B0F19] text-gray-300 border border-gray-700 hover:border-gray-600 hover:text-white text-xs font-mono transition-colors"
                  title="Download as .md file"
                >
                  <Download className="w-3.5 h-3.5 text-purple-400" />
                  <span>Export</span>
                </button>

                {/* Save Button */}
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-purple-600/30 transition-all active:scale-95"
                >
                  {savedAlert ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <>
                      <span>Save Article</span>
                    </>
                  )}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setEditorOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors ml-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Metadata Settings Strip */}
            <div className="p-4 bg-[#0D1321]/60 border-b border-gray-800/80 grid grid-cols-1 md:grid-cols-3 gap-4 flex-shrink-0 text-xs font-mono">
              {/* Title & Slug */}
              <div className="md:col-span-2 space-y-2">
                <div>
                  <label className="text-gray-400 block mb-1">Article Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="e.g. Modern Fullstack Architecture with MERN & TypeScript"
                    className="w-full px-3 py-2 bg-[#0B0F19] border border-gray-800 rounded-lg text-white font-sans text-sm focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-400 block mb-1">URL Slug</label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="modern-fullstack-architecture"
                      className="w-full px-3 py-1.5 bg-[#0B0F19] border border-gray-800 rounded-lg text-purple-300 text-xs focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 block mb-1">Cover Image URL</label>
                    <input
                      type="text"
                      value={formData.coverImage}
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-1.5 bg-[#0B0F19] border border-gray-800 rounded-lg text-gray-300 text-xs focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Tags & Excerpt */}
              <div className="space-y-2">
                <div>
                  <label className="text-gray-400 block mb-1">Tags / Topics</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      placeholder="Add tag and press Enter"
                      className="flex-1 px-3 py-1.5 bg-[#0B0F19] border border-gray-800 rounded-lg text-gray-200 text-xs focus:outline-none focus:border-purple-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-2.5 py-1.5 rounded-lg bg-gray-800 text-gray-300 hover:text-white text-xs"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1.5 max-h-14 overflow-y-auto">
                    {formData.tags?.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[10px]"
                      >
                        #{t}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(t)}
                          className="hover:text-rose-400"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Excerpt / Brief Summary</label>
                  <input
                    type="text"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Short description for preview cards and SEO..."
                    className="w-full px-3 py-1.5 bg-[#0B0F19] border border-gray-800 rounded-lg text-gray-300 text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Markdown Action Toolbar */}
            <div className="px-4 py-2 bg-[#0D1321]/90 border-b border-gray-800/80 flex items-center justify-between flex-shrink-0 overflow-x-auto gap-2">
              <div className="flex items-center gap-1 text-gray-400">
                <button
                  type="button"
                  onClick={() => insertMarkdown("# ", "", "Heading 1")}
                  className="p-1.5 hover:text-white hover:bg-gray-800 rounded transition-colors"
                  title="Heading 1"
                >
                  <Heading1 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("## ", "", "Heading 2")}
                  className="p-1.5 hover:text-white hover:bg-gray-800 rounded transition-colors"
                  title="Heading 2"
                >
                  <Heading2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("### ", "", "Heading 3")}
                  className="p-1.5 hover:text-white hover:bg-gray-800 rounded transition-colors"
                  title="Heading 3"
                >
                  <Heading3 className="w-4 h-4" />
                </button>

                <span className="w-[1px] h-4 bg-gray-800 mx-1" />

                <button
                  type="button"
                  onClick={() => insertMarkdown("**", "**", "bold text")}
                  className="p-1.5 hover:text-white hover:bg-gray-800 rounded transition-colors"
                  title="Bold"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("*", "*", "italic text")}
                  className="p-1.5 hover:text-white hover:bg-gray-800 rounded transition-colors"
                  title="Italic"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("~~", "~~", "strikethrough")}
                  className="p-1.5 hover:text-white hover:bg-gray-800 rounded transition-colors"
                  title="Strikethrough"
                >
                  <Strikethrough className="w-4 h-4" />
                </button>

                <span className="w-[1px] h-4 bg-gray-800 mx-1" />

                <button
                  type="button"
                  onClick={() => insertMarkdown("`", "`", "inline code")}
                  className="p-1.5 hover:text-white hover:bg-gray-800 rounded transition-colors"
                  title="Inline Code"
                >
                  <Code className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("```javascript\n", "\n```", "// code block here")}
                  className="p-1.5 hover:text-white hover:bg-gray-800 rounded transition-colors font-mono text-xs"
                  title="Code Block"
                >
                  {"{ }"}
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("> ", "", "Quote text")}
                  className="p-1.5 hover:text-white hover:bg-gray-800 rounded transition-colors"
                  title="Blockquote"
                >
                  <Quote className="w-4 h-4" />
                </button>

                <span className="w-[1px] h-4 bg-gray-800 mx-1" />

                <button
                  type="button"
                  onClick={() => insertMarkdown("- ", "", "List item")}
                  className="p-1.5 hover:text-white hover:bg-gray-800 rounded transition-colors"
                  title="Bullet List"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("1. ", "", "Ordered item")}
                  className="p-1.5 hover:text-white hover:bg-gray-800 rounded transition-colors"
                  title="Numbered List"
                >
                  <ListOrdered className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("[", "](https://example.com)", "Link Title")}
                  className="p-1.5 hover:text-white hover:bg-gray-800 rounded transition-colors"
                  title="Link"
                >
                  <Link2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown("![", "](https://images.unsplash.com/...)", "Image Alt")}
                  className="p-1.5 hover:text-white hover:bg-gray-800 rounded transition-colors"
                  title="Image"
                >
                  <ImageIcon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    insertMarkdown(
                      "\n| Header 1 | Header 2 |\n| :--- | :--- |\n| Value 1 | Value 2 |\n"
                    )
                  }
                  className="p-1.5 hover:text-white hover:bg-gray-800 rounded transition-colors font-mono text-xs"
                  title="Insert Table"
                >
                  Table
                </button>
              </div>

              {/* View Mode Selector Tabs */}
              <div className="flex items-center gap-1 bg-[#0B0F19] p-1 rounded-xl border border-gray-800">
                <button
                  type="button"
                  onClick={() => setViewMode("editor")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                    viewMode === "editor"
                      ? "bg-purple-600 text-white font-semibold shadow"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Editor</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("split")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                    viewMode === "split"
                      ? "bg-purple-600 text-white font-semibold shadow"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <Columns className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Split</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("preview")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                    viewMode === "preview"
                      ? "bg-purple-600 text-white font-semibold shadow"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Preview</span>
                </button>
              </div>
            </div>

            {/* Editor Workspace Panes */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Pane: Markdown Textarea Editor */}
              {(viewMode === "editor" || viewMode === "split") && (
                <div
                  className={`h-full flex flex-col ${
                    viewMode === "split" ? "w-full md:w-1/2 border-r border-gray-800" : "w-full"
                  }`}
                >
                  <textarea
                    ref={textareaRef}
                    value={formData.content}
                    onChange={handleContentChange}
                    placeholder="Start typing your markdown article content here..."
                    className="flex-1 p-6 bg-[#0B0F19] text-gray-200 font-mono text-sm leading-relaxed resize-none focus:outline-none placeholder-gray-600"
                    spellCheck="false"
                  />
                </div>
              )}

              {/* Right Pane: Live Rendered Preview */}
              {(viewMode === "preview" || viewMode === "split") && (
                <div
                  className={`h-full flex flex-col overflow-y-auto bg-[#090D16] p-6 sm:p-8 ${
                    viewMode === "split" ? "hidden md:flex md:w-1/2" : "w-full"
                  }`}
                >
                  {/* Article Hero in Preview */}
                  {formData.coverImage && (
                    <div className="w-full h-48 rounded-xl overflow-hidden mb-6 border border-gray-800">
                      <img
                        src={formData.coverImage}
                        alt="Cover"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  )}

                  <div className="mb-4">
                    <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                      Live Article Preview
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                      {formData.title || "Untitled Article"}
                    </h1>
                    <div className="flex items-center gap-3 text-xs text-gray-400 font-mono mt-2 pb-4 border-b border-gray-800">
                      <span>{formData.readTime}</span>
                      <span>•</span>
                      <span className="capitalize text-emerald-400 font-semibold">{formData.status}</span>
                      <span>•</span>
                      <span>{new Date().toISOString().split("T")[0]}</span>
                    </div>
                  </div>

                  <MarkdownPreview content={formData.content} />
                </div>
              )}
            </div>

            {/* Bottom Status Bar */}
            <div className="h-10 px-6 bg-[#0D1321] border-t border-gray-800/80 flex items-center justify-between text-[11px] font-mono text-gray-400 flex-shrink-0">
              <div className="flex items-center gap-4">
                <span>Words: {formData.content.trim().split(/\s+/).filter(Boolean).length}</span>
                <span>Characters: {formData.content.length}</span>
                <span className="text-purple-300">Reading Time: {formData.readTime}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden sm:inline">Stored in CMS State • API Ready for Backend Sync</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogsManagement;
