import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { routing } from "@/i18n";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t("title");
  const description = t("description");
  const keywords = t("keywords");

  return {
    title: {
      default: title,
      template: "%s | FosForge Digital",
    },
    description,
    keywords: keywords.split(",").map((k) => k.trim()),
    authors: [{ name: "FosForge Digital" }],
    creator: "FosForge Digital",
    publisher: "FosForge Digital",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fr: "/fr",
        "x-default": "/fr",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      url: `/${locale}`,
      siteName: "FosForge Digital",
      title,
      description,
      images: [
        {
          url: "/logo.png",
          width: 1195,
          height: 182,
          alt: "FosForge Digital",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logo.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      <div className="min-w-0 flex-1 px-4 md:px-6 lg:px-8">{children}</div>
      <Footer />
      <Chatbot />
    </NextIntlClientProvider>
  );
}
