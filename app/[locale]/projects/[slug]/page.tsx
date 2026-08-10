import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import {
  getProjectBySlug as fetchProjectBySlug,
  getProjectGalleryImages,
} from "@/lib/projects";
import { Link } from "@/navigation";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

function getProjectTitle(
  project: Awaited<ReturnType<typeof fetchProjectBySlug>>,
  locale: string
): string {
  if (!project) return "";
  if (locale === "fr") {
    return project.title_fr ?? project.title_i18n?.fr ?? project.title_en ?? project.name;
  }
  return project.title_en ?? project.title_i18n?.en ?? project.title_fr ?? project.name;
}

function getProjectDescription(
  project: Awaited<ReturnType<typeof fetchProjectBySlug>>,
  locale: string
): string {
  if (!project) return "";
  if (locale === "fr") {
    return project.description_i18n?.fr ?? project.description_i18n?.en ?? "";
  }
  return project.description_i18n?.en ?? project.description_i18n?.fr ?? "";
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();
  const project = await fetchProjectBySlug(slug);
  const t = await getTranslations("home.projectDetail");

  if (!project) notFound();

  const title = getProjectTitle(project, locale);
  const description = getProjectDescription(project, locale);
  const imageSrc = project.logo ?? project.cover_image;
  const website = project.url ?? project.href;
  const technologies = project.technologies ?? project.tags?.join(", ") ?? "";
  const galleryImages = await getProjectGalleryImages(project);

  return (
    <main className="min-h-screen bg-white px-5 pb-24 pt-32 sm:px-8 md:px-10 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/projects"
          className="mb-12 inline-flex text-sm font-semibold text-[#3b82f6] hover:text-[#2563eb]"
        >
          {t("back")}
        </Link>

        <section className="border-b border-gray-100 pb-16">
          <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-start">
            <div>
              <div className="mb-6 flex items-center gap-4">
                {imageSrc ? (
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                    <Image
                      src={imageSrc}
                      alt=""
                      fill
                      unoptimized
                      className="object-contain p-2"
                      sizes="64px"
                    />
                  </div>
                ) : null}
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#3b82f6]">
                  {project.category}
                </p>
              </div>
              <h1 className="mb-6 max-w-3xl text-4xl font-black tracking-tight text-[#111827] md:text-6xl">
                {title}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-[#4b5563]">{description}</p>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-gray-100 pt-6 md:border-t-0 md:pt-2">
              {technologies ? (
                <div>
                  <h2 className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#6b7280]">
                    {t("technologies")}
                  </h2>
                  <p className="text-sm text-[#4b5563]">{technologies}</p>
                </div>
              ) : null}
              {project.front_end ? (
                <div>
                  <h2 className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#6b7280]">
                    {t("frontend")}
                  </h2>
                  <p className="text-sm text-[#4b5563]">{project.front_end}</p>
                </div>
              ) : null}
              {project.back_end ? (
                <div>
                  <h2 className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#6b7280]">
                    {t("backend")}
                  </h2>
                  <p className="text-sm text-[#4b5563]">{project.back_end}</p>
                </div>
              ) : null}
              {project.database ? (
                <div>
                  <h2 className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#6b7280]">
                    {t("database")}
                  </h2>
                  <p className="text-sm text-[#4b5563]">{project.database}</p>
                </div>
              ) : null}
              {project.year ? (
                <div>
                  <h2 className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#6b7280]">
                    {t("yearLabel")}
                  </h2>
                  <p className="text-sm text-[#4b5563]">{project.year}</p>
                </div>
              ) : null}
              {website ? (
                <div className="col-span-2 pt-2">
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-md bg-[#2563eb] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#1d4ed8]"
                  >
                    {t("viewProject")}
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {galleryImages.length > 0 ? (
          <section className="pt-12">
            <h2 className="mb-6 text-2xl font-black text-[#111827]">{t("gallery")}</h2>
            <div className="flex snap-x gap-5 overflow-x-auto pb-4">
              {galleryImages.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="relative flex h-[320px] min-w-[min(72vw,560px)] snap-start items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:h-[380px] sm:min-w-[520px] sm:p-6"
                >
                  <Image
                    src={image}
                    alt={`${title} ${index + 1}`}
                    fill
                    unoptimized
                    className="object-contain p-4 sm:p-6"
                    sizes="(max-width: 640px) 72vw, 520px"
                  />
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}