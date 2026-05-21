"use client";

import { useState } from "react";

type Category = "Web App" | "Mobile" | "AI Solution" | "Full Strategy";

const CATEGORIES: Category[] = ["Web App", "Mobile", "AI Solution", "Full Strategy"];

export default function ContactPage() {
  const [selected, setSelected] = useState<Category[]>([]);

  const toggle = (cat: Category) =>
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  return (
    <section className="relative overflow-hidden bg-white px-6 pb-24 pt-44 text-center md:px-10">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(59,130,246,0.08),transparent_55%)]"
        aria-hidden
      />

      <div className="mx-auto flex max-w-7xl flex-col items-center">

        {/* Badge */}
        <div className="mb-8 inline-flex items-center rounded-full border border-blue-100 bg-[#eef6ff] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#2563eb]">
          Contact Engineering
        </div>

        {/* Heading */}
        <h1 className="mb-7 text-5xl font-black leading-[0.95] tracking-[-0.05em] text-[#111827] md:text-7xl">
          Let's Build the <br />
          <span className="bg-gradient-to-r from-[#3b82f6] via-[#60a5fa] to-[#22d3ee] bg-clip-text text-transparent">
            <em>Next</em> Generation
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-16 max-w-xl text-sm font-medium leading-relaxed text-[#6b7280] md:text-base">
          Ready to transform your vision into a digital reality? Our team of
          innovators and engineers is waiting to transmit your ideas into
          production.
        </p>

        {/* ── Two column layout ── */}
        <div className="grid w-full max-w-6xl grid-cols-1 gap-10 text-left lg:grid-cols-2">

          {/* ── LEFT: Connection Points ── */}
          <div className="flex flex-col gap-8">

            <div>
              <div className="mb-6 flex items-center gap-2">
                <div className="h-6 w-1 rounded-full bg-[#2563eb]" />
                <h2 className="text-lg font-bold text-[#111827]">Connection Points</h2>
              </div>

              {/* Contact info grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "", label: "DIRECT TRANSMIT", value: "hello@fosforge.digital" },
                  { icon: "", label: "VOICE LINK", value: "+216 123 456 789" },
                  { icon: "", label: "GLOBAL NODE", value: "Silicon Valley, CA" },
                  { icon: "", label: "ENCRYPTED CHAT", value: "@fosforge_digital" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <span className="mt-0.5 text-base">{item.icon}</span>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{item.label}</p>
                      <p className="text-xs font-semibold text-[#111827]">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-blue-100 bg-[#f0f6ff]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(59,130,246,0.07),transparent)]" />
              {[
                { top: "30%", left: "20%" }, { top: "50%", left: "50%" },
                { top: "70%", left: "30%" }, { top: "40%", left: "70%" },
                { top: "60%", left: "80%" },
              ].map((pos, i) => (
                <div key={i} className="absolute h-1.5 w-1.5 rounded-full bg-blue-400" style={pos} />
              ))}
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">
                Global Innovation Network
              </p>
            </div>

            {/* Digital Channels */}
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Digital Channels
              </p>
              <div className="flex gap-4">
                {["", "", ""].map((icon) => (
                  <button
                    key={icon}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-bold text-gray-600 transition hover:border-blue-200 hover:text-[#2563eb]"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Response Latency */}
            <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-[#f0f6ff] p-4">
              <span className="text-lg"></span>
              <div>
                <p className="text-sm font-bold text-[#111827]">Response Latency</p>
                <p className="text-xs leading-relaxed text-gray-500">
                  Our average response time for new project inquiries is{" "}
                  <strong className="text-[#111827]">under 4 hours</strong> during
                  business cycles.
                </p>
              </div>
            </div>

          </div>

          {/* ── RIGHT: Project Inquiry Form ── */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg shadow-blue-50">
            <h2 className="mb-1 text-xl font-black text-[#111827]">Project Inquiry</h2>
            <p className="mb-6 text-xs text-gray-400">
              Securely transmit your project details to our strategy department.
            </p>

            <div className="flex flex-col gap-5">

              {/* Name + Email */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name Surname"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs text-gray-700 outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs text-gray-700 outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Innovation Category */}
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Innovation Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => toggle(cat)}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-200 ${
                        selected.includes(cat)
                          ? "border-[#2563eb] bg-[#2563eb] text-white"
                          : "border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:text-[#2563eb]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Message / Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your digital frontier..."
                  className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs text-gray-700 outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Submit */}
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563eb] py-3 text-sm font-bold text-white shadow-md shadow-blue-200 transition hover:bg-[#1d4ed8]">
                Transmit Message
                <svg xmlns="" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>

              

            </div>
          </div>

        </div>

        {/* ── Stats row — full width below both columns ── */}
        <div className="mt-12 grid w-full max-w-6xl grid-cols-4 gap-4 border-t border-gray-100 pt-8">
          {[
            { value: "99.9%", label: "UPTIME PROTOCOL" },
            { value: "24",    label: "ACTIVE PROJECTS" },
            { value: "100%",  label: "CLIENT RETENTION" },
            { value: "12",    label: "NODES WORLDWIDE" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-black text-[#111827]">{s.value}</p>
              <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}