"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { type Locale, locales } from "@/i18n";

const LOCALE_STORAGE_KEY = "locale";

function persistLocale(locale: Locale) {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
}

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    persistLocale(newLocale);
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex shrink-0 items-center gap-0.5 rounded-full border border-gray-200 bg-gray-50 p-0.5">
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchLocale(loc)}
          aria-label={loc === "fr" ? "Passer en français" : "Switch to English"}
          className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide transition-all md:px-3 md:py-1.5 md:text-xs ${
            locale === loc
              ? "bg-white text-[#3b82f6] shadow-sm"
              : "text-[#6b7280] hover:text-[#3b82f6]"
          }`}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
