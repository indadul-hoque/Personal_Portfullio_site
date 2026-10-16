import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiShare2,
  FiCheck,
  FiCopy,
  FiBookmark,
  FiTag,
  FiChevronRight,
} from "react-icons/fi";
import { blogsData } from "../data/blogsData";

// Individual Code Block with interactive copy button
function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-gray-800 bg-[#0B0F19] my-8 shadow-2xl">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900/80 border-b border-gray-800/80">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
          </div>
          <span className="text-xs text-gray-400 font-mono ml-2 uppercase tracking-wider font-semibold">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-white px-2.5 py-1 rounded-md bg-gray-800/60 hover:bg-gray-800 transition-all"
          title="Copy code"
        >
          {copied ? (
            <>
              <FiCheck size={12} className="text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <FiCopy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <pre className="p-5 overflow-x-auto text-sm font-mono text-gray-200 leading-relaxed scrollbar-thin scrollbar-thumb-gray-800">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// Block Renderer for all custom block types
function RenderBlocks({ blocks }) {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return block.level === 2 ? (
              <h2
                key={i}
                id={block.text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                className="text-2xl md:text-3xl font-bold text-white mt-12 mb-4 scroll-mt-28 flex items-center gap-2 group"
              >
                <span className="text-indigo-400 opacity-60 group-hover:opacity-100 transition-opacity">
                  #
                </span>
                {block.text}
              </h2>
            ) : (
              <h3
                key={i}
                className="text-xl md:text-2xl font-semibold text-gray-100 mt-8 mb-3"
              >
                {block.text}
              </h3>
            );

          case "paragraph":
            return (
              <p
                key={i}
                className="text-[17px] leading-relaxed text-gray-300 font-normal"
              >
                {block.text}
              </p>
            );

          case "list":
            return (
              <ul key={i} className="space-y-3 pl-1 my-6">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-[17px] leading-relaxed text-gray-300"
                  >
                    <span className="mt-2.5 h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-indigo-500 pl-6 py-4 my-8 text-lg italic text-gray-200 bg-gray-900/40 rounded-r-xl border border-gray-800/40"
              >
                "{block.text}"
              </blockquote>
            );

          case "code":
            return (
              <CodeBlock
                key={i}
                code={block.code}
                language={block.language || "code"}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

export default function BlogContent() {
  const { slug } = useParams();
  const [shareCopied, setShareCopied] = useState(false);

  // Scroll to top upon navigating to a blog post
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  // Find blog by slug
  const blog = blogsData.find((b) => b.slug === slug);

  // If blog is not found, render a friendly 404 state
  if (!blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 mb-6 text-indigo-400">
          <FiBookmark size={40} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Article Not Found
        </h1>
        <p className="text-gray-400 max-w-md mb-8">
          The article you are looking for does not exist or may have been moved.
        </p>
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all shadow-lg shadow-indigo-500/20"
        >
          <FiArrowLeft size={16} />
          <span>Back to All Articles</span>
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2500);
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Other related blogs
  const relatedBlogs = blogsData
    .filter((b) => b.slug !== slug)
    .slice(0, 2);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* ── Top Navigation Bar ───────────────────────────────── */}
      <nav className="flex items-center justify-between mb-10 pb-6 border-b border-gray-800/60">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors group"
        >
          <FiArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Back to all posts</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-900/80 border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700 transition-all"
            title="Share article link"
          >
            {shareCopied ? (
              <>
                <FiCheck size={13} className="text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Link Copied!</span>
              </>
            ) : (
              <>
                <FiShare2 size={13} />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </nav>

      {/* ── Article Header ───────────────────────────────────── */}
      <header className="mb-12">
        {/* Meta badges: Category, Date, Read Time */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {blog.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <FiCalendar size={13} className="text-gray-500" />
            <time dateTime={blog.date}>{formatDate(blog.date)}</time>
          </span>
          <span className="text-gray-600">•</span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <FiClock size={13} className="text-gray-500" />
            <span>{blog.readTime}</span>
          </span>
        </div>

        {/* Article Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
          {blog.title}
        </h1>

        {/* Lead Excerpt */}
        <p className="text-lg md:text-xl text-gray-400 leading-relaxed pb-8 border-b border-gray-800/80">
          {blog.excerpt}
        </p>

        {/* Author Card */}
        <div className="flex items-center gap-4 mt-6">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-sky-400 p-0.5 shadow-md">
            <div className="w-full h-full rounded-full bg-gray-950 flex items-center justify-center overflow-hidden">
              <span className="text-xs font-bold text-white font-mono">IH</span>
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">
              {blog.author?.name || "Indadul Hoque"}
            </div>
            <div className="text-xs text-gray-400">
              {blog.author?.role || "Full-Stack Engineer"}
            </div>
          </div>
        </div>
      </header>

      {/* ── Article Body Content ─────────────────────────────── */}
      <main className="mb-16">
        <RenderBlocks blocks={blog.blocks} />
      </main>

      {/* ── Article Footer / Actions ─────────────────────────── */}
      <footer className="pt-10 border-t border-gray-800/80">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-gray-900/40 border border-gray-800 mb-16">
          <div>
            <h4 className="text-base font-semibold text-white mb-1">
              Found this article helpful?
            </h4>
            <p className="text-xs text-gray-400">
              Share it with fellow engineers or connect with me.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-all shadow-md shadow-indigo-600/20"
            >
              <FiShare2 size={13} />
              <span>{shareCopied ? "Copied Link!" : "Share Article"}</span>
            </button>
          </div>
        </div>

        {/* Related Posts */}
        {relatedBlogs.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Continue Reading</h3>
              <Link
                to="/blogs"
                className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <span>View all</span>
                <FiChevronRight size={12} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {relatedBlogs.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/blogs/${rel.slug}`}
                  className="group p-5 rounded-2xl bg-gray-900/30 border border-gray-800 hover:border-gray-700 transition-all hover:-translate-y-1"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400 mb-2 block">
                    {rel.category}
                  </span>
                  <h4 className="text-base font-semibold text-white group-hover:text-indigo-400 transition-colors line-clamp-2 mb-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-gray-400 line-clamp-2 mb-4">
                    {rel.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-gray-500 pt-3 border-t border-gray-800/60">
                    <span>{formatDate(rel.date)}</span>
                    <span className="text-indigo-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                      Read <FiChevronRight size={11} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </footer>
    </article>
  );
}
