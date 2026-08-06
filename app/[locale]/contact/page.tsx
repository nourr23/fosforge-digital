import { ContactInquiryForm } from "@/components/contact/ContactInquiryForm";
import { getProjects } from "@/lib/projects";
import { getTranslations } from "next-intl/server";

const CONTACT_INFO_KEYS = ["email", "phone", "location", "chat"] as const;

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const projects = await getProjects();

  const totalProjects = projects.length;
  const featuredProjects = projects.filter((project) => project.featured).length;
  const partnerCount = new Set(
    projects
      .map((project) => project.organization)
      .filter((organization): organization is number => organization !== null)
  ).size;

  const stats = {
    uptime: totalProjects > 0 ? "99.9%" : "0%",
    activeProjects: `${totalProjects}`,
    clientRetention: `${Math.round((featuredProjects / Math.max(totalProjects, 1)) * 100)}%`,
    nodesWorldwide: `${partnerCount}`,
  };

  return (
    <section className="relative overflow-hidden bg-white px-6 pb-24 pt-44 text-center md:px-10">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(59,130,246,0.10),transparent_55%)]"
        aria-hidden
      />

      <div className="mx-auto flex max-w-7xl flex-col items-center">
        <div className="mb-8 inline-flex items-center rounded-full border border-blue-100 bg-[#eef6ff] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#2563eb]">
          {t("badge")}
        </div>

        <h1 className="mb-7 text-5xl font-black leading-[0.95] tracking-[-0.05em] text-[#111827] md:text-7xl">
          {t("titleLine1")} <br />
          <span className="bg-gradient-to-r from-[#3b82f6] via-[#60a5fa] to-[#22d3ee] bg-clip-text text-transparent">
            <em>{t("titleHighlight")}</em>
          </span>
        </h1>

        <p className="mx-auto mb-16 max-w-2xl text-sm font-medium leading-relaxed text-[#6b7280] md:text-base">
          {t("subtitle")}
        </p>

        <div className="grid w-full max-w-6xl grid-cols-1 gap-8 text-left lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col gap-6">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-40px_rgba(37,99,235,0.45)]">
              <div className="mb-5 flex items-center gap-2">
                <div className="h-6 w-1 rounded-full bg-[#2563eb]" />
                <h2 className="text-lg font-black text-[#111827]">{t("connectionPoints")}</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {CONTACT_INFO_KEYS.map((key) => (
                  <div
                    key={key}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-200 hover:border-blue-200 hover:bg-[#f7fbff]"
                  >
                    <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      {t(`contactInfo.${key}.label`)}
                    </p>
                    <p className="text-sm font-semibold text-[#111827]">
                      {t(`contactInfo.${key}.value`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-blue-100 bg-[linear-gradient(135deg,#f0f6ff_0%,#e7f1ff_55%,#f9fbff_100%)] p-6 shadow-[0_24px_80px_-46px_rgba(37,99,235,0.6)]">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2563eb]">
                  {t("globalNetwork")}
                </p>
                <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 shadow-sm">
                  Live
                </span>
              </div>

              <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-white/70 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.16),transparent_65%)]">
                {[
                  { top: "25%", left: "18%" },
                  { top: "54%", left: "45%" },
                  { top: "68%", left: "32%" },
                  { top: "40%", left: "72%" },
                  { top: "60%", left: "78%" },
                  { top: "24%", left: "60%" },
                ].map((pos, i) => (
                  <div
                    key={i}
                    className="absolute h-2.5 w-2.5 rounded-full bg-[#2563eb] shadow-[0_0_0_6px_rgba(37,99,235,0.12)]"
                    style={pos}
                  />
                ))}
                <div className="absolute inset-x-10 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
                <div className="absolute inset-y-8 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-blue-300 to-transparent" />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400/90">
                  {t("globalNetwork")}
                </p>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-50px_rgba(37,99,235,0.4)]">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  {t("digitalChannels")}
                </p>
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <button
                      key={i}
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-bold text-slate-600 transition hover:border-blue-200 hover:text-[#2563eb]"
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-[#f6faff] p-4 ring-1 ring-blue-100">
                <p className="text-sm font-black text-[#111827]">{t("responseLatency")}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  {t("responseLatencyText")} <strong className="text-[#111827]">{t("responseLatencyHighlight")}</strong> {t("responseLatencySuffix")}
                </p>
              </div>
            </div>
          </div>

          <ContactInquiryForm stats={stats} />
        </div>
      </div>
    </section>
  );
}
