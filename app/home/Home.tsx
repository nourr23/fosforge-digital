"use client";

import { HeroSection } from "@/app/home/HeroSection";
import { AboutSection } from "@/app/home/AboutSection";
import { ExpertiseSection } from "@/app/home/ExpertiseSection";
import { StatsSection } from "@/app/home/StatsSection";
import { ProjectsSection } from "@/app/home/ProjectsSection";
import { CtaSection } from "@/app/home/CtaSection";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden bg-white">
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <ProjectsSection />
      <StatsSection />
      <CtaSection />
    </main>
  );
}
