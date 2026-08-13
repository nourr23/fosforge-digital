"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type CategoryKey = "webApp" | "mobile" | "aiSolution" | "fullStrategy";

type ContactStats = {
  uptime: string;
  activeProjects: string;
  clientRetention: string;
  nodesWorldwide: string;
};

type FormState = {
  fullName: string;
  email: string;
  message: string;
  categories: CategoryKey[];
};

const CATEGORY_KEYS: CategoryKey[] = ["webApp", "mobile", "aiSolution", "fullStrategy"];
const initialFormState: FormState = {
  fullName: "",
  email: "",
  message: "",
  categories: [],
};

export function ContactInquiryForm({ stats }: { stats: ContactStats }) {
  const t = useTranslations("contact");
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const toggle = (cat: CategoryKey) =>
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          message: form.message,
          categories: form.categories,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send inquiry");
      }

      setForm(initialFormState);
      setStatus({ type: "success", message: "Your inquiry was sent successfully." });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_30px_95px_-45px_rgba(37,99,235,0.55)] md:p-8">
      <div className="mb-6">
        <h2 className="mb-1 text-2xl font-black text-[#111827]">{t("form.title")}</h2>
        <p className="text-sm text-slate-500">{t("form.subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              {t("form.fullName")}
            </label>
            <input
              type="text"
              value={form.fullName}
              onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
              placeholder={t("form.fullNamePlaceholder")}
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-700 outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              {t("form.email")}
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              placeholder={t("form.emailPlaceholder")}
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-700 outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            {t("form.category")}
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_KEYS.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => toggle(cat)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  form.categories.includes(cat)
                    ? "border-[#2563eb] bg-[#2563eb] text-white shadow-md shadow-blue-200"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-[#2563eb]"
                }`}
              >
                {t(`form.categories.${cat}`)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            {t("form.message")}
          </label>
          <textarea
            rows={5}
            value={form.message}
            onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
            placeholder={t("form.messagePlaceholder")}
            required
            className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs text-slate-700 outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {status && (
          <p
            className={`text-sm ${
              status.type === "success" ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {status.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2563eb] py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_-10px_rgba(37,99,235,0.7)] transition hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : t("form.submit")}
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
      </form>

      <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 md:grid-cols-4">
        {[
          { value: stats.uptime, key: "uptime" },
          { value: stats.activeProjects, key: "activeProjects" },
          { value: stats.clientRetention, key: "clientRetention" },
          { value: stats.nodesWorldwide, key: "nodesWorldwide" },
        ].map((item) => (
          <div key={item.key} className="rounded-2xl bg-slate-50 px-3 py-4 text-center ring-1 ring-slate-100">
            <p className="text-lg font-black text-[#111827] md:text-2xl">{item.value}</p>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
              {t(`stats.${item.key}`)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
