"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Category = "All Projects" | "Web Platforms" | "Mobile Apps" | "AI & Data" | "Branding";

interface Project {
  id: number;
  title: string;
  description: string;
  category: Exclude<Category, "All Projects">;
  image: string;
  tags: string[];
  href: string;
}

const CATEGORIES: Category[] = [
  "All Projects",
  "Web Platforms",
  "Mobile Apps",
  "AI & Data",
  "Branding",
];

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "NexGen ERP",
    description: "A comprehensive cloud-based enterprise resource planning system with real-time analytics and workflow automation.",
    category: "Web Platforms",
    image: "/projects/nexgen.jpg",
    tags: ["React", "Go", "AWS"],
    href: "#",
  },
  {
    id: 2,
    title: "Lumina Health",
    description: "Intuitive patient care and diagnostic tracking app designed for high-performance medical teams.",
    category: "Mobile Apps",
    image: "/projects/lumina.jpg",
    tags: ["Flutter", "Firebase", "Node.js"],
    href: "#",
  },
  {
    id: 3,
    title: "Aura Neural Engine",
    description: "Advanced machine learning infrastructure for automated visual quality control in manufacturing.",
    category: "AI & Data",
    image: "/projects/aura.jpg",
    tags: ["Python", "TensorFlow", "Kubernetes"],
    href: "#",
  },
  {
    id: 4,
    title: "Vortex Fintech",
    description: "Ultra-low latency trading dashboard featuring high-frequency data visualisation and risk management.",
    category: "Web Platforms",
    image: "/projects/vortex.jpg",
    tags: ["TypeScript", "Rust", "WebAssembly"],
    href: "#",
  },
  {
    id: 5,
    title: "Skyline Logistics",
    description: "Dynamic route optimisation and real-time fleet management tool for global distribution networks.",
    category: "Mobile Apps",
    image: "/projects/skyline.jpg",
    tags: ["React Native", "Google Maps API", "GraphQL"],
    href: "#",
  },
  {
    id: 6,
    title: "Quantum Brand Identity",
    description: "A complete visual system and digital brand strategy for a cutting-edge quantum computing startup.",
    category: "Branding",
    image: "/projects/quantum.jpg",
    tags: ["Strategy", "Figma", "Motion Design"],
    href: "#",
  },
];

const CATEGORY_STYLE: Record<Exclude<Category, "All Projects">, string> = {
  "Web Platforms": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Mobile Apps":   "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "AI & Data":     "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Branding:        "bg-pink-500/10 text-pink-400 border-pink-500/20",
};

export default function ProjectsPage() {
  const [active, setActive] = useState<Category>("All Projects");

  const filtered =
    active === "All Projects"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === active);

  return (
    <section className="relative overflow-hidden bg-white px-6 pb-24 pt-44 text-center md:px-10">

      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(59,130,246,0.08),transparent_55%)]"
        aria-hidden
      />

      <div className="mx-auto flex max-w-7xl flex-col items-center">

        {/* Badge */}
        <div className="mb-8 inline-flex items-center rounded-full border border-blue-100 bg-[#eef6ff] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#2563eb]">
          Our Work
        </div>

        {/* Heading */}
        <h1 className="mb-7 text-5xl font-black leading-[0.95] tracking-[-0.05em] text-[#111827] md:text-7xl">
          Pioneering Digital <br />
          <span className="bg-gradient-to-r from-[#3b82f6] via-[#60a5fa] to-[#22d3ee] bg-clip-text text-transparent">
            Excellence
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-12 max-w-xl text-sm font-medium leading-relaxed text-[#6b7280] md:text-base">
          Explore our curated gallery of software innovations, ranging from
          complex enterprise systems to intuitive consumer experiences, all
          crafted with precision and future-proof technology.
        </p>

        {/* Filter tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                active === cat
                  ? "border-[#2563eb] bg-[#2563eb] text-white shadow-md shadow-blue-200"
                  : "border-gray-200 bg-white text-gray-500 hover:border-blue-200 hover:text-[#2563eb]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count + hint */}
        <div className="mb-6 flex w-full max-w-6xl items-center justify-between px-1 text-xs text-gray-400">
          <span>
            Showing <strong className="text-gray-700">{filtered.length}</strong>{" "}
            {filtered.length === 1 ? "project" : "projects"}
          </span>
          <span>Scroll to explore</span>
        </div>

        {/* Grid */}
        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <Link
              key={project.id}
              href={project.href}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100/60"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Category badge */}
                <span
                  className={`absolute left-3 top-3 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm ${
                    CATEGORY_STYLE[project.category]
                  }`}
                >
                  {project.category}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-col gap-3 p-5 text-left">
                <h3 className="text-base font-bold text-gray-900 transition-colors group-hover:text-[#2563eb]">
                  {project.title}
                </h3>
                <p className="line-clamp-2 text-xs leading-relaxed text-gray-500">
                  {project.description}
                </p>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
          {/* CTA Section */}
<div className="mt-24 w-full rounded-2xl bg-[#f0f6ff] px-8 py-16 text-center">
  <h2 className="mb-4 text-3xl font-black tracking-[-0.03em] text-[#111827] md:text-4xl">
    Have a visionary project in mind?
  </h2>

  <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-[#6b7280]">
    We're ready to transform your complex challenges into elegant digital
    solutions. Let's collaborate to build the next frontier of your business.
  </p>

  <div className="flex flex-wrap items-center justify-center gap-4">
    <button className="rounded-full bg-[#2563eb] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all duration-200 hover:bg-[#1d4ed8] hover:shadow-lg">
      Start a Conversation
    </button>

    <button className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-blue-200 hover:text-[#2563eb]">
      Download Service Deck
      <svg
        xmlns=""
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</div>

      </div>
    </section>
  );
}