import { HeroSection } from "@/components/homeScreen/HeroSection";
import { AboutSection } from "@/components/homeScreen/AboutSection";
import { ExpertiseSection } from "@/components/homeScreen/ExpertiseSection";
import { StatsSection } from "@/components/homeScreen/StatsSection";
import { ProjectsSection } from "@/components/homeScreen/ProjectsSection";
import { TestimonialsSection } from "@/components/homeScreen/TestimonialsSection";
import { CtaSection } from "@/components/homeScreen/CtaSection";

export default function Home() {
  return (
    <main className="min-w-0 w-full overflow-x-hidden bg-white">
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <ProjectsSection />
      <StatsSection />
      <TestimonialsSection />
      <CtaSection />
    </main>
  );
}
