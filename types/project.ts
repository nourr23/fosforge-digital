export type ProjectCategory = "web" | "mobile" | "ai" | "branding";

export interface Project {
  id: number;
  created_at: string;
  updated_at: string;
  slug: string;
  name: string;
  order: number;
  year: number | null;
  featured: boolean;
  category: ProjectCategory;
  tags: string[];
  cover_image: string | null;
  logo: string | null;
  title_i18n: { en?: string; fr?: string };
  description_i18n: { en?: string; fr?: string };
  technologies: string | null;
  front_end: string | null;
  back_end: string | null;
  database: string | null;
  url: string | null;
  href: string | null;
  mobile: boolean;
  playstore_url: string | null;
  appstore_url: string | null;
  imgs: string[];
  organization: number | null;
  title_en: string | null;
  title_fr: string | null;
  published: boolean;
}
