import ProjectsGallery from "@/components/projects/ProjectsGallery";
import { getProjects } from "@/lib/projects";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectsGallery projects={projects} />;
}
