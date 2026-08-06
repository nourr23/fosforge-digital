import { IconCpu, IconGlobe, IconLightning, IconShield } from "@/components/homeScreen/icons";
import { LANDING_WIDE } from "@/components/homeScreen/landingLayout";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import homepageImage from "@/public/projectAnalytics.jpg";

const featureKeys = [
  { key: "ai" as const, Icon: IconLightning },
  { key: "infrastructure" as const, Icon: IconGlobe },
  { key: "security" as const, Icon: IconShield },
];

export async function AboutSection() {
  const t = await getTranslations("home.about");

  return (
    <section className="bg-white py-20">
      <div className={LANDING_WIDE}>
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          <div className="relative w-full pb-12 lg:w-1/2 lg:pb-14">
            <div className="relative overflow-hidden rounded-3xl border border-gray-100 shadow-lg shadow-black/5">
              <Image
                alt={t("imageAlt")}
                src={homepageImage}
                width={640}
                height={800}
                className="aspect-[4/5] w-full object-cover object-center sm:aspect-[5/6]"
              />
            </div>
            <div className="absolute bottom-0 right-4 flex max-w-[calc(100%-2rem)] items-center gap-4 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-xl sm:right-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#3b82f6]">
                <IconCpu className="h-5 w-5" />
              </div>
              <div className="min-w-0 text-left">
                <p className="text-sm font-bold text-[#111827]">{t("innovationHub")}</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#9ca3af]">
                  {t("certifiedExcellence")}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full text-left lg:w-1/2">
            <h2 className="mb-6 text-4xl font-black leading-tight tracking-[-0.04em] text-[#111827] md:text-5xl">
              {t("titleLine1")}{" "}
              <span className="text-[#3b82f6]">{t("titleHighlight")}</span>
            </h2>
            <p className="mb-10 max-w-xl text-sm font-medium leading-relaxed text-[#374151] md:text-[15px]">
              {t("description")}
            </p>
            <ul className="space-y-4">
              {featureKeys.map(({ key, Icon }) => (
                <li key={key} className="flex items-center gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eff6ff] text-[#3b82f6]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold text-[#111827]">
                    {t(`features.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
