import type { Metadata } from "next";
import ProjectsGallery from "@/components/projects/ProjectsGallery";
import { getProjects } from "@/lib/projects";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  return {
    title: `${t("titleLine1")} ${t("titleHighlight")}`,
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}/projects`,
      languages: {
        en: "/en/projects",
        fr: "/fr/projects",
      },
    },
  };
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectsGallery projects={projects} />;
}
