import React, { useState } from "react";
import { Link } from "react-router-dom";
import { blogsData } from "../data/blogsData";

const categories = [
  "All",
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Career",
];

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? blogsData
      : blogsData.filter((b) => b.category === activeCategory);

  return (
    <div className="mt-8 mb-24 max-w-6xl mx-auto px-4 sm:px-6">
      {/* ── Modern Header ───────────────────────────────────── */}
      <header className="relative mb-16">
        {/* Ambient gradient glow behind the title */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-56 w-[36rem] max-w-full rounded-full bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/20 to-sky-500/20 blur-3xl"
        />

        <div className="relative">
          {/* Eyebrow with animated line */}
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
              Articles & Writings
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Engineering Blogs
            <span className="bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
              .
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed">
            Deep-dives and field notes on{" "}
            <span className="text-gray-200 font-medium">
              frontend architectures, scalable backends, database design
            </span>
            , and lessons learned building real-world products.
          </p>
        </div>
      </header>

      {/* ── Category Filter ─────────────────────────────────── */}
      <nav className="flex flex-wrap gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`relative px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-200 border ${
              activeCategory === cat
                ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30"
                : "bg-gray-900/60 text-gray-400 border-gray-800 hover:border-gray-700 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* ── Blog Grid ───────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((blog) => (
            <article key={blog.id} className="group">
              <Link
                to={`/blogs/${blog.slug}`}
                className="relative flex flex-col h-full border border-gray-800/80 rounded-2xl p-6 bg-[#0E1322]/80 hover:bg-[#11182B] hover:border-indigo-500/60 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 backdrop-blur-sm"
              >
                {/* Top accent line on hover */}
                <span className="absolute top-0 left-6 right-6 h-0.5 scale-x-0 group-hover:scale-x-100 origin-left bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-sky-500 transition-transform duration-500 rounded-full" />

                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                    {blog.category}
                  </span>
                  <span className="text-[11px] font-mono text-gray-400">
                    {blog.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 leading-snug line-clamp-2 group-hover:text-indigo-400 transition-colors">
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-400 mb-6 line-clamp-3 leading-relaxed flex-1">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-800/70">
                  <time className="text-xs font-mono text-gray-500">
                    {formatDate(blog.date)}
                  </time>
                  <span className="text-xs font-mono font-medium text-white flex items-center gap-1.5 group-hover:text-indigo-400 group-hover:gap-2.5 transition-all">
                    <span>Read Article</span>
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 border border-dashed border-gray-800 rounded-2xl bg-gray-900/20">
          <p className="text-gray-400">
            No posts in this category yet. Check back soon!
          </p>
        </div>
      )}

      {/* ── CTA Footer ──────────────────────────────────────── */}
      <div className="mt-20 relative overflow-hidden rounded-3xl border border-gray-800/80 bg-gray-900/30 p-8 md:p-12 text-center backdrop-blur-sm">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[30rem] rounded-full bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/20 to-sky-500/20 blur-3xl"
        />
        <div className="relative">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Want to collaborate or discuss an article?
          </h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm leading-relaxed">
            Have thoughts on one of the topics or building something cool? Feel free to reach out.
          </p>
          <Link
            to="/#contact"
            className="inline-block px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/30"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
