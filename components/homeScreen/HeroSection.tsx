import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import avatar1 from "@/public/avatar1.jpg";
import avatar2 from "@/public/avatar2.jpg";
import avatar3 from "@/public/avatar3.jpg";
import avatar4 from "@/public/avatar4.jpg";

const avatars = [avatar1, avatar2, avatar3, avatar4] as const;

export async function HeroSection() {
  const t = await getTranslations("home.hero");

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
            {t("titleHighlight")}
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-xl text-sm font-medium leading-relaxed text-[#6b7280] md:text-base">
          {t("description")}
        </p>

        <div className="mb-14 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-xl bg-[#3b82f6] px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-colors hover:bg-[#2563eb] no-underline"
          >
            {t("getStarted")}
          </Link>

          <Link
            href="/projects"
            className="rounded-xl border border-gray-200 bg-white px-8 py-3.5 text-sm font-semibold text-[#111827] shadow-sm transition-colors hover:bg-gray-50 no-underline"
          >
            {t("viewWork")}
          </Link>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9ca3af]">
            {t("trustedBy")}
          </p>

          <div className="flex -space-x-2">
            {avatars.map((src, i) => (
              <Image
                key={i}
                alt=""
                src={src}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full border-2 border-white object-cover"
              />
            ))}

            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#3b82f6] text-[10px] font-bold text-white">
              +250
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
