import Image from "next/image";
import Link from "next/link";
import { IconPhoto } from "@/components/homeScreen/icons";
import { LANDING_WIDE } from "@/components/homeScreen/landingLayout";
import projectAnalytics from "@/public/projectAnalytics.jpg";
import projectWarehouse from "@/public/projectWarehouse.jpg";

export function ProjectsSection() {
  return (
    <section className="bg-[#f8f9fa] py-20">
      <div className={`${LANDING_WIDE} flex flex-col`}>
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mb-3 text-4xl font-black tracking-[-0.04em] text-[#111827] md:text-5xl">
              Flagship Projects
            </h2>
            <p className="max-w-xl text-sm font-medium text-[#6b7280] md:text-[15px]">
              A glimpse into the digital marvels we&apos;ve engineered for our partners.
            </p>
          </div>
          <Link
            href="/projects"
            className="shrink-0 text-sm font-semibold text-[#3b82f6] no-underline transition-opacity hover:opacity-80"
          >
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-[#e8eaed]">
            <IconPhoto className="h-14 w-14 text-gray-400" />
          </div>
          <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <Image
              alt="Warehouse logistics"
              src={projectWarehouse}
              width={800}
              height={500}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <Image
              alt="Analytics dashboard on laptop"
              src={projectAnalytics}
              width={800}
              height={500}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-[#e8eaed]">
            <IconPhoto className="h-14 w-14 text-gray-400" />
          </div>
        </div>
      </div>
    </section>
  );
}