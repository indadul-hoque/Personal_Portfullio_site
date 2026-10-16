import React from "react";

/* ─── Shared Shimmer Block ──────────────────────────────────────────────────── */
const Shimmer = ({ className = "", style }) => (
  <div
    style={style}
    className={`relative overflow-hidden bg-gray-800/40 rounded before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/[0.06] before:to-transparent ${className}`}
  />
);

/* ─── Hero Skeleton ─────────────────────────────────────────────────────────── */
export const HeroSkeleton = () => (
  <div className="space-y-6 pt-6">
    {/* Row 1: About + Skills */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* About card (2 cols) */}
      <div className="lg:col-span-2 border-2 border-gray-800/60 bg-[#0D1321]/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="flex-1 space-y-3 order-2 sm:order-1">
            <Shimmer className="h-4 w-20 rounded" />
            <Shimmer className="h-3 w-32 rounded" />
            <Shimmer className="h-3 w-full rounded mt-2" />
            <Shimmer className="h-3 w-5/6 rounded" />
            <Shimmer className="h-3 w-4/6 rounded" />
            <Shimmer className="h-3 w-3/4 rounded" />
          </div>
          <div className="flex-shrink-0 order-1 sm:order-2">
            <Shimmer className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl" />
          </div>
        </div>
        <div className="pt-4 border-t border-gray-800/40">
          <Shimmer className="h-8 w-40 rounded-xl" />
        </div>
      </div>

      {/* Skills card */}
      <div className="border-2 border-gray-800/60 bg-[#0D1321]/30 backdrop-blur-sm rounded-2xl p-6 flex flex-col gap-4">
        <div className="space-y-1">
          <Shimmer className="h-4 w-24 rounded" />
          <Shimmer className="h-3 w-32 rounded" />
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {Array.from({ length: 11 }).map((_, i) => (
            <Shimmer key={i} className="h-6 rounded-xl" style={{ width: `${56 + (i % 4) * 12}px` }} />
          ))}
        </div>
      </div>
    </div>

    {/* Row 2: Projects skeleton */}
    <ProjectsSkeleton />
  </div>
);

/* ─── Projects Skeleton ─────────────────────────────────────────────────────── */
export const ProjectsSkeleton = ({ count = 3 }) => (
  <div className="pt-6">
    <div className="w-full max-w-5xl mx-auto border-2 border-gray-800/60 bg-[#0D1321]/30 backdrop-blur-sm rounded-2xl p-6">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Shimmer className="h-5 w-44 rounded" />
        <Shimmer className="h-4 w-28 rounded hidden sm:block" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="border border-gray-800/60 bg-[#0D1321]/30 rounded-xl overflow-hidden flex flex-col">
            <Shimmer className="h-44 w-full rounded-none" />
            <div className="p-5 flex flex-col gap-3 flex-1">
              <Shimmer className="h-4 w-3/4 rounded" />
              <Shimmer className="h-3 w-full rounded" />
              <Shimmer className="h-3 w-5/6 rounded" />
              <div className="flex flex-wrap gap-1.5 mt-1">
                {Array.from({ length: 4 }).map((_, j) => (
                  <Shimmer key={j} className="h-5 w-14 rounded" />
                ))}
              </div>
              <Shimmer className="h-8 w-full rounded-xl mt-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─── Experience Skeleton ───────────────────────────────────────────────────── */
export const ExperienceSkeleton = ({ count = 3 }) => (
  <section className="bg-[#0B0F19] text-gray-300">
    <div className="w-full max-w-5xl p-6 mx-auto border-2 border-gray-800/60 bg-[#0D1321]/40 backdrop-blur-sm rounded-2xl">
      <div className="mb-8 flex items-center justify-between">
        <Shimmer className="h-5 w-32 rounded" />
        <Shimmer className="h-4 w-24 rounded" />
      </div>
      <div className="border border-gray-800/60 bg-[#0D1321]/30 backdrop-blur-sm rounded-xl divide-y divide-gray-800/60 overflow-hidden">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="p-5 md:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3.5">
              <Shimmer className="mt-1.5 h-2 w-2 rounded-full hidden sm:block flex-shrink-0" />
              <div className="space-y-1.5">
                <Shimmer className="h-4 w-44 rounded" />
                <Shimmer className="h-3 w-32 rounded" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shimmer className="h-4 w-32 rounded" />
              <Shimmer className="h-5 w-14 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Education Skeleton ────────────────────────────────────────────────────── */
export const EducationSkeleton = ({ count = 2 }) => (
  <section className="py-6 bg-[#0B0F19] text-gray-300">
    <div className="w-full max-w-5xl p-6 mx-auto border-2 border-gray-800/60 bg-[#0D1321]/40 backdrop-blur-sm rounded-2xl">
      <div className="mb-8 flex items-center justify-between">
        <Shimmer className="h-5 w-28 rounded" />
        <Shimmer className="h-4 w-28 rounded" />
      </div>
      <div className="border border-gray-800/60 bg-[#0D1321]/30 backdrop-blur-sm rounded-xl divide-y divide-gray-800/60 overflow-hidden">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="p-5 md:px-6 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-start gap-3.5">
                <Shimmer className="mt-1.5 h-2 w-2 rounded-full hidden sm:block flex-shrink-0" />
                <div className="space-y-1.5">
                  <Shimmer className="h-4 w-64 rounded" />
                  <Shimmer className="h-3 w-48 rounded" />
                </div>
              </div>
              <Shimmer className="h-6 w-24 rounded-full self-start sm:self-center" />
            </div>
            <div className="pl-5 space-y-1.5">
              <Shimmer className="h-3 w-full rounded" />
              <Shimmer className="h-3 w-5/6 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Contact Skeleton ──────────────────────────────────────────────────────── */
export const ContactSkeleton = () => (
  <section className="bg-[#0B0F19] text-gray-300">
    <div className="border-2 border-gray-800/60 bg-[#0D1321]/30 backdrop-blur-sm rounded-2xl pt-6 md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <Shimmer className="h-5 w-32 rounded" />
        <Shimmer className="h-4 w-28 rounded hidden sm:block" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <Shimmer key={i} className="h-10 w-full rounded-xl" />
        ))}
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Shimmer className="h-11 w-full rounded-xl" />
          <Shimmer className="h-11 w-full rounded-xl" />
        </div>
        <Shimmer className="h-11 w-full rounded-xl" />
        <Shimmer className="h-28 w-full rounded-xl" />
        <Shimmer className="h-11 w-full rounded-xl" />
      </div>
    </div>
  </section>
);
