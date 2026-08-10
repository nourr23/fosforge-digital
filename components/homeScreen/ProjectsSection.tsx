import Image from "next/image";
import { getFeaturedProjects } from "@/lib/projects";
import { LANDING_WIDE } from "@/components/homeScreen/landingLayout";
import { Link } from "@/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import type { Project } from "@/types/project";

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

function formatTechnologies(project: Project): string {
  if (project.technologies) return project.technologies;
  if (project.tags?.length) return project.tags.join(", ");
  return [project.front_end, project.back_end, project.database]
    .filter(Boolean)
    .join(", ");
}

function getProjectLink(project: Project): string | null {
  return project.url ?? project.href ?? null;
}

function IconExternalLink({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function IconPlayStore({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3.6 1.8A1.4 1.4 0 0 0 2 3.2v17.6a1.4 1.4 0 0 0 2.1 1.2l13.8-8.8a1.4 1.4 0 0 0 0-2.4L3.6 1.8z" />
    </svg>
  );
}

function IconAppStore({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function ProjectCard({
  project,
  locale,
  websiteLabel,
  mobileAppLabel,
  yearLabel,
}: {
  project: Project;
  locale: string;
  websiteLabel: string;
  mobileAppLabel: string;
  yearLabel: string | null;
}) {
  const title = getProjectTitle(project, locale);
  const description = getProjectDescription(project, locale);
  const technologies = formatTechnologies(project);
  const isMobile = project.mobile;
  const platformLabel = isMobile ? mobileAppLabel : websiteLabel;
  const link = getProjectLink(project);

  const cardClassName =
    "group flex w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md hover:shadow-blue-100/60";

  const body = (
    <>
      <div className="flex gap-4 p-5 sm:p-6">
        <div className="min-w-0 flex-1">
          <h3 className="mb-1 text-lg font-bold leading-tight text-[#3b82f6] sm:text-xl">
            {title}
          </h3>
          {yearLabel ? (
            <p className="mb-3 text-xs font-medium text-[#9ca3af]">{yearLabel}</p>
          ) : null}
          {description ? (
            <p className="line-clamp-4 text-sm leading-relaxed text-[#4b5563]">
              {description}
            </p>
          ) : null}
        </div>

        {project.logo ? (
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white sm:h-28 sm:w-28">
            <Image
              src={project.logo}
              alt={title}
              fill
              unoptimized
              className="object-contain p-2"
              sizes="112px"
            />
          </div>
        ) : null}
      </div>

      <div className="relative mt-auto shrink-0 bg-[#3b82f6] px-5 py-5 text-center sm:px-6 sm:py-6">
        <div className="absolute right-4 top-4 flex items-center gap-1.5 text-white/90">
          {isMobile ? (
            <>
              {project.playstore_url ? (
                <IconPlayStore className="h-4 w-4" />
              ) : null}
              {project.appstore_url ? (
                <IconAppStore className="h-4 w-4" />
              ) : null}
              {!project.playstore_url && !project.appstore_url ? (
                <IconPlayStore className="h-4 w-4" />
              ) : null}
            </>
          ) : (
            <IconExternalLink className="h-4 w-4" />
          )}
        </div>

        <p className="text-base font-bold text-white sm:text-lg">{platformLabel}</p>
        {technologies ? (
          <p className="mt-1 text-xs text-blue-100 sm:text-sm">({technologies})</p>
        ) : null}
      </div>
    </>
  );

  if (link) {
    const isExternal = link.startsWith("http");
    const interactiveClassName = `${cardClassName} transition-transform duration-200 hover:-translate-y-1`;

    if (isExternal) {
      return (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={interactiveClassName}
        >
          {body}
        </a>
      );
    }

    return (
      <Link href={link} className={interactiveClassName}>
        {body}
      </Link>
    );
  }

  return <article className={cardClassName}>{body}</article>;
}

const FALLBACK_PROJECTS: Project[] = [
  {
    id: 1,
    created_at: "",
    updated_at: "",
    slug: "sawer-bel-akhdher",
    name: "Sawer Bel Akhdher",
    order: 1,
    year: 2023,
    featured: true,
    category: "mobile",
    tags: ["Supabase", "React Native", "Expo"],
    cover_image: null,
    logo: "https://zlluslwjyjbrcnjokgkw.supabase.co/storage/v1/object/public/logos/sawer-bel-akhdher.jpg",
    title_i18n: {
      en: "Sawer Bel Akhdher",
      fr: "Sawer Bel Akhdher",
    },
    description_i18n: {
      en: "Mobile application for environmental awareness and sustainable agriculture education.",
      fr: "Application mobile pour la sensibilisation environnementale et l'éducation à l'agriculture durable.",
    },
    technologies: "Supabase, React Native (Expo)",
    front_end: "React Native (Expo)",
    back_end: null,
    database: "Supabase",
    url: null,
    href: null,
    mobile: true,
    playstore_url: null,
    appstore_url: null,
    imgs: [],
    organization: null,
    title_en: "Sawer Bel Akhdher",
    title_fr: "Sawer Bel Akhdher",
    published: true,
  },
  {
    id: 2,
    created_at: "",
    updated_at: "",
    slug: "fnac-for-environment",
    name: "FNAC For Environment",
    order: 2,
    year: 2023,
    featured: true,
    category: "web",
    tags: ["Supabase", "Next.js"],
    cover_image: null,
    logo: "https://lyzvefshrducncjfdukz.supabase.co/storage/v1/object/public/logo/fnac-for-environment.jpeg",
    title_i18n: {
      en: "FNAC For Environment",
      fr: "FNAC For Environment",
    },
    description_i18n: {
      en: "Digital platform promoting environmental initiatives and sustainable community projects.",
      fr: "Plateforme numérique promouvant les initiatives environnementales et les projets communautaires durables.",
    },
    technologies: "Supabase, Next.js",
    front_end: "Next.js",
    back_end: null,
    database: "Supabase",
    url: null,
    href: null,
    mobile: false,
    playstore_url: null,
    appstore_url: null,
    imgs: [],
    organization: null,
    title_en: "FNAC For Environment",
    title_fr: "FNAC For Environment",
    published: true,
  },
  {
    id: 3,
    created_at: "",
    updated_at: "",
    slug: "genup-2050",
    name: "Genup 2050",
    order: 3,
    year: 2024,
    featured: true,
    category: "web",
    tags: ["Next.js", "Supabase"],
    cover_image: null,
    logo: "https://lyzvefshrducncjfdukz.supabase.co/storage/v1/object/public/logo/genup-2050.jpeg",
    title_i18n: { en: "Genup 2050", fr: "Genup 2050" },
    description_i18n: {
      en: "Innovation hub platform connecting youth with future-focused education and career pathways.",
      fr: "Plateforme hub d'innovation connectant les jeunes à l'éducation orientée vers l'avenir et aux parcours professionnels.",
    },
    technologies: "Next.js, Supabase",
    front_end: "Next.js",
    back_end: null,
    database: "Supabase",
    url: null,
    href: null,
    mobile: false,
    playstore_url: null,
    appstore_url: null,
    imgs: [],
    organization: null,
    title_en: "Genup 2050",
    title_fr: "Genup 2050",
    published: true,
  },
  {
    id: 4,
    created_at: "",
    updated_at: "",
    slug: "la-fayette-education",
    name: "La Fayette Education",
    order: 4,
    year: 2023,
    featured: true,
    category: "web",
    tags: ["Next.js", "Supabase"],
    cover_image: null,
    logo: "https://lyzvefshrducncjfdukz.supabase.co/storage/v1/object/public/logo/la-fayette-education.jpeg",
    title_i18n: {
      en: "La Fayette Education",
      fr: "La Fayette Education",
    },
    description_i18n: {
      en: "Educational group website showcasing programs, campuses, and academic excellence.",
      fr: "Site web du groupe éducatif présentant les programmes, campus et l'excellence académique.",
    },
    technologies: "Next.js, Supabase",
    front_end: "Next.js",
    back_end: null,
    database: "Supabase",
    url: null,
    href: null,
    mobile: false,
    playstore_url: null,
    appstore_url: null,
    imgs: [],
    organization: null,
    title_en: "La Fayette Education",
    title_fr: "La Fayette Education",
    published: true,
  },
  {
    id: 5,
    created_at: "",
    updated_at: "",
    slug: "spotbulle",
    name: "SpotBulle",
    order: 5,
    year: 2024,
    featured: true,
    category: "mobile",
    tags: ["React Native", "Supabase"],
    cover_image: null,
    logo: "https://lyzvefshrducncjfdukz.supabase.co/storage/v1/object/public/logo/SpotBulle.jpeg",
    title_i18n: { en: "SpotBulle", fr: "SpotBulle" },
    description_i18n: {
      en: "Creative mobile experience for discovering events and local community hotspots.",
      fr: "Expérience mobile créative pour découvrir les événements et les lieux communautaires locaux.",
    },
    technologies: "React Native, Supabase",
    front_end: "React Native",
    back_end: null,
    database: "Supabase",
    url: null,
    href: null,
    mobile: true,
    playstore_url: null,
    appstore_url: null,
    imgs: [],
    organization: null,
    title_en: "SpotBulle",
    title_fr: "SpotBulle",
    published: true,
  },
];

const TOP_PROJECT_SLUGS = [
  "la-fayette-education",
  "genup-2050",
  "fnac-for-environment",
];

export async function ProjectsSection() {
  const t = await getTranslations("home.projects");
  const locale = await getLocale();

  const fetched = await getFeaturedProjects();
  const projects =
    fetched.length > 0
      ? TOP_PROJECT_SLUGS.map((slug) => fetched.find((project) => project.slug === slug)).filter(
          Boolean
        )
      : FALLBACK_PROJECTS.filter((project) => TOP_PROJECT_SLUGS.includes(project.slug));

  return (
    <section className="bg-white py-20 md:py-24">
      <div className={LANDING_WIDE}>
        <h2 className="mb-12 text-4xl font-black uppercase tracking-[-0.04em] text-[#111827] md:mb-16 md:text-5xl">
          <span className="bg-gradient-to-r from-[#3b82f6] via-[#60a5fa] to-[#22d3ee] bg-clip-text text-transparent">
            {t("title")}
          </span>
        </h2>

        <div className="grid auto-rows-max grid-cols-1 content-start items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              locale={locale}
              websiteLabel={t("website")}
              mobileAppLabel={t("mobileApp")}
              yearLabel={project.year != null ? t("createdIn", { year: project.year }) : null}
            />
          ))}
        </div>

        <div className="mt-12 text-center md:mt-16">
          <Link
            href="/projects"
            className="text-sm font-semibold text-[#3b82f6] transition-colors hover:text-[#2563eb] md:text-base"
          >
            {t("viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
