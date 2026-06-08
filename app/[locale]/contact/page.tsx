"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type CategoryKey = "webApp" | "mobile" | "aiSolution" | "fullStrategy";

const CATEGORY_KEYS: CategoryKey[] = ["webApp", "mobile", "aiSolution", "fullStrategy"];
const CONTACT_INFO_KEYS = ["email", "phone", "location", "chat"] as const;
const STAT_KEYS = [
  { value: "99.9%", key: "uptime" as const },
  { value: "24", key: "activeProjects" as const },
  { value: "100%", key: "clientRetention" as const },
  { value: "12", key: "nodesWorldwide" as const },
];

export default function ContactPage() {
  const t = useTranslations("contact");
  const [selected, setSelected] = useState<CategoryKey[]>([]);

  const toggle = (cat: CategoryKey) =>
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

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
            <em>{t("titleHighlight")}</em>
          </span>
        </h1>

        <p className="mx-auto mb-16 max-w-xl text-sm font-medium leading-relaxed text-[#6b7280] md:text-base">
          {t("subtitle")}
        </p>

        <div className="grid w-full max-w-6xl grid-cols-1 gap-10 text-left lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <div>
              <div className="mb-6 flex items-center gap-2">
                <div className="h-6 w-1 rounded-full bg-[#2563eb]" />
                <h2 className="text-lg font-bold text-[#111827]">{t("connectionPoints")}</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {CONTACT_INFO_KEYS.map((key) => (
                  <div
                    key={key}
                    className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4"
                  >
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                        {t(`contactInfo.${key}.label`)}
                      </p>
                      <p className="text-xs font-semibold text-[#111827]">
                        {t(`contactInfo.${key}.value`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-blue-100 bg-[#f0f6ff]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(59,130,246,0.07),transparent)]" />
              {[
                { top: "30%", left: "20%" },
                { top: "50%", left: "50%" },
                { top: "70%", left: "30%" },
                { top: "40%", left: "70%" },
                { top: "60%", left: "80%" },
              ].map((pos, i) => (
                <div
                  key={i}
                  className="absolute h-1.5 w-1.5 rounded-full bg-blue-400"
                  style={pos}
                />
              ))}
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">
                {t("globalNetwork")}
              </p>
            </div>

            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                {t("digitalChannels")}
              </p>
              <div className="flex gap-4">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-bold text-gray-600 transition hover:border-blue-200 hover:text-[#2563eb]"
                  />
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-[#f0f6ff] p-4">
              <div>
                <p className="text-sm font-bold text-[#111827]">{t("responseLatency")}</p>
                <p className="text-xs leading-relaxed text-gray-500">
                  {t("responseLatencyText")}{" "}
                  <strong className="text-[#111827]">{t("responseLatencyHighlight")}</strong>{" "}
                  {t("responseLatencySuffix")}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg shadow-blue-50">
            <h2 className="mb-1 text-xl font-black text-[#111827]">{t("form.title")}</h2>
            <p className="mb-6 text-xs text-gray-400">{t("form.subtitle")}</p>

            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    {t("form.fullName")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("form.fullNamePlaceholder")}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs text-gray-700 outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    {t("form.email")}
                  </label>
                  <input
                    type="email"
                    placeholder={t("form.emailPlaceholder")}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs text-gray-700 outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  {t("form.category")}
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORY_KEYS.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggle(cat)}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-200 ${
                        selected.includes(cat)
                          ? "border-[#2563eb] bg-[#2563eb] text-white"
                          : "border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:text-[#2563eb]"
                      }`}
                    >
                      {t(`form.categories.${cat}`)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  {t("form.message")}
                </label>
                <textarea
                  rows={4}
                  placeholder={t("form.messagePlaceholder")}
                  className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs text-gray-700 outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563eb] py-3 text-sm font-bold text-white shadow-md shadow-blue-200 transition hover:bg-[#1d4ed8]"
              >
                {t("form.submit")}
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 grid w-full max-w-6xl grid-cols-4 gap-4 border-t border-gray-100 pt-8">
          {STAT_KEYS.map((s) => (
            <div key={s.key} className="text-center">
              <p className="text-2xl font-black text-[#111827]">{s.value}</p>
              <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                {t(`stats.${s.key}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
