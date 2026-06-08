"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const navLinks = [
  { key: "home" as const, href: "/" },
  { key: "projects" as const, href: "/projects" },
  { key: "contact" as const, href: "/contact" },
];

export default function Header() {
  const t = useTranslations("header");
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setHidden(currentY > lastY && currentY > 80);
      setLastY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 flex justify-center px-[4%] pt-[max(0.75rem,env(safe-area-inset-top))] transition-transform duration-300 ease-in-out ${
        hidden ? "-translate-y-[110%]" : "translate-y-0"
      }`}
    >
      <div className="w-full max-w-6xl rounded-2xl border border-gray-100 bg-white/95 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md">
        <nav className="relative flex items-center justify-between gap-3 px-5 py-3.5 md:gap-6 md:px-8 md:py-4">
          <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2.5 no-underline md:gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3b82f6] text-sm font-black text-white shadow-sm md:h-11 md:w-11 md:text-base">
              FF
            </span>
            <span className="min-w-0 text-[10px] font-black uppercase leading-none tracking-tight sm:text-xs md:text-base lg:text-lg">
              <span className="text-[#3b82f6]">FOSFORGE</span>{" "}
              <span className="text-[#818cf8]">DIGITAL</span>
            </span>
          </Link>

          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-10 md:flex">
            {navLinks.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`text-[0.95rem] font-semibold no-underline transition-colors ${
                    active ? "text-[#60a5fa]" : "text-[#6b7280] hover:text-[#3b82f6]"
                  }`}
                >
                  {t(link.key)}
                </Link>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center gap-2 md:gap-3">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="shrink-0 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#6366f1] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/25 transition-opacity hover:opacity-95 no-underline md:px-7 md:py-3 md:text-sm"
            >
              {t("letsTalk")}
            </Link>
          </div>
        </nav>

        <div className="flex justify-center gap-8 border-t border-gray-100 px-4 py-2 md:hidden">
          {navLinks.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={`m-${link.key}`}
                href={link.href}
                className={`text-sm font-semibold no-underline ${
                  active ? "text-[#60a5fa]" : "text-[#6b7280] hover:text-[#3b82f6]"
                }`}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
