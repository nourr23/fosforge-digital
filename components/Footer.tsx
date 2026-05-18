"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#fcfcfc] border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div>
            <h2 className="text-[#3b82f6] font-black text-xl mb-4">
              FOSFORGE
            </h2>

            <p className="text-[#64748b] leading-7 text-sm">
              Pioneering the digital frontier through innovative software
              development and futuristic design.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold text-[#0f172a] mb-5">
              Services
            </h3>

            <div className="flex flex-col gap-3 text-sm text-[#64748b]">
              <Link href="#">Web Development</Link>
              <Link href="#">Mobile Apps</Link>
              <Link href="#">UI/UX Design</Link>
              <Link href="#">AI Solutions</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold text-[#0f172a] mb-5">
              Company
            </h3>

            <div className="flex flex-col gap-3 text-sm text-[#64748b]">
              <Link href="#">About</Link>
              <Link href="#">Projects</Link>
              <Link href="#">Careers</Link>
              <Link href="#">Contact</Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-bold text-[#0f172a] mb-5">
              Connect
            </h3>

            <div className="flex gap-4 text-[#64748b]">
              <div className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center">
                ✦
              </div>

              <div className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center">
                ✦
              </div>

              <div className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center">
                ✦
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#94a3b8] text-sm">
            © 2026 FOSFORGE DIGITAL. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-[#64748b]">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}