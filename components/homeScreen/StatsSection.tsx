import { LANDING_WIDE } from "@/components/homeScreen/landingLayout";

const stats = [
  { value: "250+", label: "Projects Completed", color: "#3b82f6" },
  { value: "99%", label: "Client Satisfaction", color: "#14b8a6" },
  { value: "99.9%", label: "System Uptime", color: "#22c55e" },
  { value: "85", label: "Global Partners", color: "#f97316" },
] as const;

export function StatsSection() {
  return (
    <section className="bg-white py-20">
      <div className={LANDING_WIDE}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((row) => (
            <div
              key={row.label}
              className="rounded-2xl border border-gray-100 bg-[#fafafa] px-4 py-10 text-center md:px-6"
            >
              <p className="mb-2 text-3xl font-black md:text-[34px]" style={{ color: row.color }}>
                {row.value}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6b7280]">
                {row.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}