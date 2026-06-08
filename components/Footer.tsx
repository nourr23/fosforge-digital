"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-[#fcfcfc] border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h2 className="text-[#3b82f6] font-black text-xl mb-4">FOSFORGE</h2>
            <p className="text-[#64748b] leading-7 text-sm">{t("tagline")}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#0f172a] mb-5">{t("services")}</h3>
            <div className="flex flex-col gap-3 text-sm text-[#64748b]">
              <Link href="#">{t("webDevelopment")}</Link>
              <Link href="#">{t("mobileApps")}</Link>
              <Link href="#">{t("uiUxDesign")}</Link>
              <Link href="#">{t("aiSolutions")}</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#0f172a] mb-5">{t("company")}</h3>
            <div className="flex flex-col gap-3 text-sm text-[#64748b]">
              <Link href="#">{t("about")}</Link>
              <Link href="/projects">{t("projects")}</Link>
              <Link href="#">{t("careers")}</Link>
              <Link href="/contact">{t("contact")}</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#0f172a] mb-5">{t("connect")}</h3>
            <div className="flex gap-4 text-[#64748b]">
              <Link
                href="#"
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:border-gray-400 hover:text-[#0f172a] transition-colors"
                aria-label={t("github")}
              >
                <FaGithub size={18} />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:border-gray-400 hover:text-[#0f172a] transition-colors"
                aria-label={t("linkedin")}
              >
                <FaLinkedin size={18} />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#94a3b8] text-sm">{t("copyright")}</p>
          <div className="flex gap-6 text-sm text-[#64748b]">
            <Link href="#">{t("privacy")}</Link>
            <Link href="#">{t("terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
