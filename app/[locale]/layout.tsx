import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { routing } from "@/i18n";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

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

  return {
    title: t("title"),
    description: t("description"),
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
    <html lang={locale}>
      <body
        className={`${inter.variable} flex min-h-screen flex-col font-sans antialiased bg-[#f9fafb]`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <div className="min-w-0 flex-1 px-4 md:px-6 lg:px-8">{children}</div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
