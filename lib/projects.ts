import { supabase } from "@/lib/supabase";
import type { Project } from "@/types/project";

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("order", { ascending: true });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data ?? [];
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .eq("featured", true)
    .order("order", { ascending: true });

  if (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }

  return data ?? [];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    console.error("Error fetching project:", error);
    return null;
  }

  return data;
}

export async function getProjectGalleryImages(project: Project): Promise<string[]> {
  const storedImages = [project.cover_image, ...project.imgs].filter(
    (image): image is string => Boolean(image)
  );

  const { data: files, error } = await supabase.storage.from("projects").list(project.slug, {
    limit: 100,
    sortBy: { column: "name", order: "asc" },
  });

  if (error) {
    console.error("Error fetching project gallery:", error);
    return Array.from(new Set(storedImages));
  }

  const storageImages = (files ?? [])
    .filter((file) => file.name && file.id)
    .map((file) => supabase.storage.from("projects").getPublicUrl(`${project.slug}/${file.name}`).data.publicUrl);

  return Array.from(new Set([...storedImages, ...storageImages]));
}
