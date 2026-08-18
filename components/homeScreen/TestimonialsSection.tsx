import Image from "next/image";
import { LANDING_WIDE } from "@/components/homeScreen/landingLayout";
import { getTranslations } from "next-intl/server";

export async function TestimonialsSection() {
  const t = await getTranslations("home.testimonials");

  const testimonials = [
    {
      name: "Denis Bouclon",
      role: t("items.denis.role"),
      project: t("items.denis.project"),
      quote: t("items.denis.quote"),
      image: "/testimonials/denis.jpeg",
    },
    {
      name: "Olivier Gregoire",
      role: t("items.olivier.role"),
      project: t("items.olivier.project"),
      quote: t("items.olivier.quote"),
      image: "/testimonials/olivier.jpeg",
    },
    {
      name: "Estelle Drion",
      role: t("items.estelle.role"),
      project: t("items.estelle.project"),
      quote: t("items.estelle.quote"),
      image: "/testimonials/estelle.jpeg",
    },
  ];

  return (
    <section className="bg-[#f8fafc] py-20">
      <div className={LANDING_WIDE}>
        <div className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3b82f6]">
            {t("badge")}
          </p>
          <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.04em] text-[#111827] md:text-5xl">
            {t("titleLine1")} <span className="text-[#3b82f6]">{t("titleHighlight")}</span>
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(59,130,246,0.12)] lg:p-6"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white bg-slate-200 shadow-[0_10px_20px_rgba(15,23,42,0.12)]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-cover object-center"
                    style={{ objectPosition: "center 18%" }}
                  />
                </div>

                <div className="ml-auto flex items-center gap-1 text-[#fbbf24]" aria-label="5 star review">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg key={`${item.name}-star-${index}`} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.922-.755 1.688-1.538 1.118L10 18.75l-2.79 1.87c-.784.57-1.839-.196-1.538-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L3.58 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 0 0 .95-.69l1.07-3.292Z" />
                    </svg>
                  ))}
                </div>
              </div>

              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eff6ff] text-xl font-black text-[#3b82f6]">
                  “
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#94a3b8]">
                  Client feedback
                </span>
              </div>

              <p className="mb-5 flex-1 text-[14px] leading-relaxed text-[#374151] lg:text-[15px]">
                {item.quote}
              </p>

              <div className="border-t border-slate-200 pt-4">
                <p className="text-base font-black text-[#111827]">{item.name}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6b7280]">
                  {item.role}
                </p>
                <p className="mt-3 inline-flex rounded-full bg-[#eff6ff] px-2.5 py-1 text-xs font-semibold text-[#3b82f6]">
                  {item.project}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
