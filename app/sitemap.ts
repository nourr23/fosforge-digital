import type { MetadataRoute } from "next";
import { routing } from "@/i18n";
import { getProjects } from "@/lib/projects";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://fosforge-digital.com";

const staticPaths = ["", "/projects", "/contact"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [locale, `${siteUrl}/${locale}${path}`])
    );

    return {
      url: `${siteUrl}/${routing.defaultLocale}${path}`,
      lastModified,
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: {
          ...languages,
          "x-default": `${siteUrl}/${routing.defaultLocale}${path}`,
        },
      },
    };
  });

  let projectEntries: MetadataRoute.Sitemap = [];
  try {
    const projects = await getProjects();
    projectEntries = projects.flatMap((project) => {
      if (!project.slug) return [];
      const path = `/projects/${project.slug}`;
      const languages = Object.fromEntries(
        routing.locales.map((locale) => [locale, `${siteUrl}/${locale}${path}`])
      );

      return [
        {
          url: `${siteUrl}/${routing.defaultLocale}${path}`,
          lastModified: project.updated_at ? new Date(project.updated_at) : lastModified,
          changeFrequency: "monthly" as const,
          priority: 0.6,
          alternates: {
            languages: {
              ...languages,
              "x-default": `${siteUrl}/${routing.defaultLocale}${path}`,
            },
          },
        },
      ];
    });
  } catch {
    projectEntries = [];
  }

  return [...staticEntries, ...projectEntries];
}
