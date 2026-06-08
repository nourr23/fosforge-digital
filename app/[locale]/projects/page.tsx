"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

type CategoryKey = "all" | "web" | "mobile" | "ai" | "branding";
type ProjectCategory = Exclude<CategoryKey, "all">;

interface Project {
  id: string;
  category: ProjectCategory;
  image: string;
  tags: string[];
  href: string;
}

const CATEGORY_KEYS: CategoryKey[] = ["all", "web", "mobile", "ai", "branding"];

const PROJECTS: Project[] = [
  { id: "nexgen", category: "web", image: "/projects/nexgen.jpg", tags: ["React", "Go", "AWS"], href: "#" },
  { id: "lumina", category: "mobile", image: "/projects/lumina.jpg", tags: ["Flutter", "Firebase", "Node.js"], href: "#" },
  { id: "aura", category: "ai", image: "/projects/aura.jpg", tags: ["Python", "TensorFlow", "Kubernetes"], href: "#" },
  { id: "vortex", category: "web", image: "/projects/vortex.jpg", tags: ["TypeScript", "Rust", "WebAssembly"], href: "#" },
  { id: "skyline", category: "mobile", image: "/projects/skyline.jpg", tags: ["React Native", "Google Maps API", "GraphQL"], href: "#" },
  { id: "quantum", category: "branding", image: "/projects/quantum.jpg", tags: ["Strategy", "Figma", "Motion Design"], href: "#" },
];

const CATEGORY_STYLE: Record<ProjectCategory, string> = {
  web: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  mobile: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  ai: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  branding: "bg-pink-500/10 text-pink-400 border-pink-500/20",
};

export default function ProjectsPage() {
  const t = useTranslations("projects");
  const [active, setActive] = useState<CategoryKey>("all");

  const filtered =
    active === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <section className="relative overflow-hidden bg-white px-6 pb-24 pt-44 text-center md:px-10">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(59,130,246,0.08),transparent_55%)]"
        aria-hidden
      />

      <div className="mx-auto flex max-w-7xl flex-col items-center">
        <div className="mb-8 inline-flex items-center rounded-full border border-blue-100 bg-[#eef6ff] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#2563eb]">
          {t("badge")}
        </div>

        <h1 className="mb-7 text-5xl font-black leading-[0.95] tracking-[-0.05em] text-[#111827] md:text-7xl">
          {t("titleLine1")} <br />
          <span className="bg-gradient-to-r from-[#3b82f6] via-[#60a5fa] to-[#22d3ee] bg-clip-text text-transparent">
            {t("titleHighlight")}
          </span>
        </h1>

        <p className="mx-auto mb-12 max-w-xl text-sm font-medium leading-relaxed text-[#6b7280] md:text-base">
          {t("subtitle")}
        </p>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {CATEGORY_KEYS.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                active === cat
                  ? "border-[#2563eb] bg-[#2563eb] text-white shadow-md shadow-blue-200"
                  : "border-gray-200 bg-white text-gray-500 hover:border-blue-200 hover:text-[#2563eb]"
              }`}
            >
              {t(`categories.${cat}`)}
            </button>
          ))}
        </div>

        <div className="mb-6 flex w-full max-w-6xl items-center justify-between px-1 text-xs text-gray-400">
          <span>
            {t("showing")}{" "}
            <strong className="text-gray-700">{filtered.length}</strong>{" "}
            {filtered.length === 1 ? t("project") : t("projects")}
          </span>
          <span>{t("scrollHint")}</span>
        </div>

        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <Link
              key={project.id}
              href={project.href}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100/60"
            >
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                <Image
                  src={project.image}
                  alt={t(`items.${project.id}.title`)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className={`absolute left-3 top-3 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm ${
                    CATEGORY_STYLE[project.category]
                  }`}
                >
                  {t(`categories.${project.category}`)}
                </span>
              </div>

              <div className="flex flex-col gap-3 p-5 text-left">
                <h3 className="text-base font-bold text-gray-900 transition-colors group-hover:text-[#2563eb]">
                  {t(`items.${project.id}.title`)}
                </h3>
                <p className="line-clamp-2 text-xs leading-relaxed text-gray-500">
                  {t(`items.${project.id}.description`)}
                </p>
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

        <div className="mt-24 w-full rounded-2xl bg-[#f0f6ff] px-8 py-16 text-center">
          <h2 className="mb-4 text-3xl font-black tracking-[-0.03em] text-[#111827] md:text-4xl">
            {t("cta.title")}
          </h2>

          <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-[#6b7280]">
            {t("cta.description")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              className="rounded-full bg-[#2563eb] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all duration-200 hover:bg-[#1d4ed8] hover:shadow-lg"
            >
              {t("cta.startConversation")}
            </button>

            <button
              type="button"
              className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-blue-200 hover:text-[#2563eb]"
            >
              {t("cta.downloadDeck")}
              <svg
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
