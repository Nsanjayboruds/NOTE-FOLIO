import { NotebookShell } from "@/components/notebook/NotebookShell";

export const metadata = {
  title: "Nishant Borude — Projects",
  description:
    "Full-stack projects, open-source contributions, and side experiments by Nishant Borude.",
};

export default function ProjectsRoute() {
  return <NotebookShell initialView={{ kind: "projects" }} />;
}
