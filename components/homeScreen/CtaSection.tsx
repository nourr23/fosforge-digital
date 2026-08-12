import { IconArrowRight } from "@/components/homeScreen/icons";
import { LANDING_WIDE } from "@/components/homeScreen/landingLayout";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";

export async function CtaSection() {
  const t = await getTranslations("home.cta");

  return (
    <section className="bg-white py-24">
      <div className={`${LANDING_WIDE} flex justify-center`}>
        <div className="relative w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-gray-100 bg-gradient-to-br from-sky-100 via-white to-emerald-50 px-6 py-16 text-center shadow-sm md:px-12 md:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-90 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.95),transparent_40%),radial-gradient(circle_at_85%_70%,rgba(191,219,254,0.5),transparent_45%)]"
            aria-hidden
          />
          <div className="relative z-20 mx-auto flex max-w-3xl flex-col items-center">
            <h2 className="mb-6 text-4xl font-black leading-tight tracking-[-0.04em] text-[#111827] md:text-6xl">
              {t("titleLine1")} <br className="hidden sm:block" />
              {t("titleLine2")}
            </h2>
            <p className="mb-10 text-base font-medium leading-relaxed text-[#6b7280]">
              {t("description")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#3b82f6] px-10 py-4 text-[15px] font-semibold text-white shadow-lg shadow-blue-500/20 transition-colors hover:bg-[#2563eb] no-underline"
            >
              {t("button")}
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
