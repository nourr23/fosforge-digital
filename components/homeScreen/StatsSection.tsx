import { LANDING_WIDE } from "@/components/homeScreen/landingLayout";
import { getProjects } from "@/lib/projects";
import { getTranslations } from "next-intl/server";

const defaultStats = [
  { value: "0+", key: "projectsCompleted" as const, color: "#3b82f6" },
  { value: "0%", key: "clientSatisfaction" as const, color: "#14b8a6" },
  { value: "0%", key: "systemUptime" as const, color: "#22c55e" },
  { value: "0", key: "globalPartners" as const, color: "#f97316" },
] as const;

export async function StatsSection() {
  const t = await getTranslations("home.stats");
  const projects = await getProjects();

  const totalProjects = projects.length;
  const featuredProjects = projects.filter((project) => project.featured).length;
  const partnerCount = new Set(
    projects
      .map((project) => project.organization)
      .filter((organization): organization is number => organization !== null)
  ).size;

  const stats = [
    {
      value: `${totalProjects}+`,
      key: "projectsCompleted" as const,
      color: "#3b82f6",
    },
    {
      value: `${Math.round((featuredProjects / Math.max(totalProjects, 1)) * 100)}%`,
      key: "clientSatisfaction" as const,
      color: "#14b8a6",
    },
    {
      value: totalProjects > 0 ? "99.9%" : "0%",
      key: "systemUptime" as const,
      color: "#22c55e",
    },
    {
      value: `${partnerCount}`,
      key: "globalPartners" as const,
      color: "#f97316",
    },
  ];

  const renderedStats = totalProjects > 0 ? stats : defaultStats;

  return (
    <section className="bg-white py-20">
      <div className={LANDING_WIDE}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {renderedStats.map((row) => (
            <div
              key={row.key}
              className="rounded-2xl border border-gray-100 bg-[#fafafa] px-4 py-10 text-center md:px-6"
            >
              <p className="mb-2 text-3xl font-black md:text-[34px]" style={{ color: row.color }}>
                {row.value}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6b7280]">
                {t(row.key)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
