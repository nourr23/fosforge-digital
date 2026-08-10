import { Inter } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} flex min-h-screen flex-col font-sans antialiased bg-[#f9fafb]`}
      >
        {children}
      </body>
    </html>
  );
}
