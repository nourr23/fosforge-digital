"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/navigation";
import type { Project, ProjectCategory } from "@/types/project";

type CategoryKey = "all" | ProjectCategory;

const CATEGORY_KEYS: CategoryKey[] = ["all", "web", "mobile", "ai", "branding"];

function getProjectTitle(project: Project, locale: string): string {
  if (locale === "fr") {
    return (
      project.title_fr ??
      project.title_i18n?.fr ??
      project.title_en ??
      project.name
    );
  }

  return (
    project.title_en ??
    project.title_i18n?.en ??
    project.title_fr ??
    project.name
  );
}

function getProjectDescription(project: Project, locale: string): string {
  if (locale === "fr") {
    return project.description_i18n?.fr ?? project.description_i18n?.en ?? "";
  }

  return project.description_i18n?.en ?? project.description_i18n?.fr ?? "";
}

function normalizeCategory(project: Project): ProjectCategory {
  if (project.category) return project.category;
  return project.mobile ? "mobile" : "web";
}

function formatTechnologies(project: Project): string {
  if (project.technologies) return project.technologies;
  if (project.tags?.length) return project.tags.join(", ");
  return [project.front_end, project.back_end, project.database]
    .filter(Boolean)
    .join(", ");
}

const CATEGORY_STYLE: Record<ProjectCategory, string> = {
  web: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  mobile: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  ai: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  branding: "bg-pink-500/10 text-pink-500 border-pink-500/20",
};

export default function ProjectsGallery({ projects }: { projects: Project[] }) {
  const t = useTranslations("projects");
  const locale = useLocale();
  const [active, setActive] = useState<CategoryKey>("all");

  const filteredProjects = useMemo(() => {
    if (active === "all") return projects;
    return projects.filter((project) => normalizeCategory(project) === active);
  }, [active, projects]);

  return (
    <section className="relative overflow-hidden bg-white px-6 pb-24 pt-28 text-center md:px-10 lg:px-12">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(59,130,246,0.10),transparent_58%)]"
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

        <p className="mx-auto mb-12 max-w-2xl text-sm font-medium leading-relaxed text-[#6b7280] md:text-base">
          {t("subtitle")}
        </p>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {CATEGORY_KEYS.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                active === category
                  ? "border-[#2563eb] bg-[#2563eb] text-white shadow-md shadow-blue-200"
                  : "border-gray-200 bg-white text-gray-500 hover:border-blue-200 hover:text-[#2563eb]"
              }`}
            >
              {t(`categories.${category}`)}
            </button>
          ))}
        </div>

        <div className="mb-6 flex w-full max-w-6xl items-center justify-between px-1 text-xs text-gray-400">
          <span>
            {t("showing")} <strong className="text-gray-700">{filteredProjects.length}</strong>{" "}
            {filteredProjects.length === 1 ? t("project") : t("projects")}
          </span>
          <span>{t("scrollHint")}</span>
        </div>

        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const category = normalizeCategory(project);
            const title = getProjectTitle(project, locale);
            const description = getProjectDescription(project, locale);
            const technologies = formatTechnologies(project);
            const imageSrc = project.logo ?? project.cover_image;
            const card = (
              <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(37,99,235,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_-36px_rgba(37,99,235,0.55)]">
                <div className="relative flex h-60 items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#eff6ff_0%,#dbeafe_55%,#f8fbff_100%)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_52%)]" />
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(37,99,235,0.12))]" />
                  <div className="relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-[24px] border border-white/80 bg-white shadow-[0_18px_45px_-20px_rgba(37,99,235,0.7)] transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.03] group-hover:shadow-[0_24px_55px_-18px_rgba(37,99,235,0.85)]">
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : null}
                  </div>
                  <span
                    className={`absolute left-3 top-3 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm ${CATEGORY_STYLE[category]}`}
                  >
                    {t(`categories.${category}`)}
                  </span>
                  {project.featured ? (
                    <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#2563eb] shadow-sm">
                      Featured
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col gap-4 p-5 text-left">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="mb-2 text-lg font-black leading-tight text-[#111827] transition-colors group-hover:text-[#2563eb]">
                        {title}
                      </h3>
                      {project.year ? (
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                          {project.year}
                        </p>
                      ) : null}
                    </div>
                    <span className="rounded-full bg-[#eff6ff] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#2563eb]">
                      Case
                    </span>
                  </div>

                  <p className="line-clamp-3 text-sm leading-relaxed text-[#6b7280]">
                    {description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tags?.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#f6faff] px-3 py-2.5 ring-1 ring-blue-100/70">
                    {technologies ? (
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2563eb]">
                        {technologies}
                      </p>
                    ) : (
                      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2563eb]">
                        Case Study
                      </span>
                    )}
                    <span className="text-[11px] font-bold text-slate-400">↗</span>
                  </div>
                </div>
              </article>
            );

            return (
              <Link key={project.id} href={`/projects/${project.slug}`} className="block h-full">
                {card}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
