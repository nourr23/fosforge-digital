import Home from "@/components/homeScreen/Home";
import { getProjects } from "@/lib/projects";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const projects = await getProjects();
  console.log("[Supabase] projects:", projects);

  return <Home />;
}
