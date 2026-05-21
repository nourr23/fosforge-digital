import type { ComponentType } from "react";
import {
  IconChart,
  IconCloud,
  IconCode,
  IconCpu,
  IconMobile,
  IconPalette,
} from "@/components/homeScreen/icons";
import { LANDING_WIDE } from "@/components/homeScreen/landingLayout";

type Accent = "blue" | "teal" | "green" | "orange" | "indigo" | "sky";

const accentColor: Record<Accent, string> = {
  blue: "#3b82f6",
  teal: "#14b8a6",
  green: "#22c55e",
  orange: "#f97316",
  indigo: "#4f46e5",
  sky: "#0ea5e9",
};

const accentIcon: Record<Accent, string> = {
  blue: "text-[#3b82f6]",
  teal: "text-[#14b8a6]",
  green: "text-[#22c55e]",
  orange: "text-[#f97316]",
  indigo: "text-[#4f46e5]",
  sky: "text-[#0ea5e9]",
};

const services: {
  title: string;
  accent: Accent;
  Icon: ComponentType<{ className?: string }>;
}[] = [
  { title: "Web Development", accent: "blue", Icon: IconCode },
  { title: "Mobile Applications", accent: "teal", Icon: IconMobile },
  { title: "UI/UX Strategy", accent: "green", Icon: IconPalette },
  { title: "AI & Automation", accent: "orange", Icon: IconCpu },
  { title: "Cloud Architecture", accent: "indigo", Icon: IconCloud },
  { title: "Branding & Growth", accent: "sky", Icon: IconChart },
];

export function ExpertiseSection() {
  return (
    <section className="bg-white py-20">
      <div className={LANDING_WIDE}>
        <header className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-black tracking-[-0.04em] text-[#111827] md:text-5xl">
            Our Core Expertise
          </h2>
          <p className="mx-auto max-w-2xl text-sm font-medium text-[#374151] md:text-base">
            Cutting-edge solutions tailored to propel your business into the future.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ title, accent, Icon }) => (
            <article
              key={title}
              className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              style={{ borderLeftWidth: 4, borderLeftColor: accentColor[accent] }}
            >
              <div
                className={`mb-6 inline-flex rounded-lg bg-gray-100 p-3 ${accentIcon[accent]}`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-black text-[#111827]">{title}</h3>
              <p className="mb-8 text-sm font-medium leading-relaxed text-[#6b7280]">
                Bespoke digital solutions engineered for performance, scalability, and elegant user
                experiences.
              </p>
              <button
                type="button"
                className="text-xs font-bold uppercase tracking-[0.12em] text-[#3b82f6]"
              >
                Learn More &gt;
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
