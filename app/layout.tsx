import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FosForge Digital",
  description: "Modern software agency website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} flex min-h-screen flex-col font-sans antialiased bg-[#f9fafb]`}
      >
        <Header />
        <div className="min-w-0 flex-1 px-4 md:px-6 lg:px-8">{children}</div>
        <Footer />
      </body>
    </html>
  );
}