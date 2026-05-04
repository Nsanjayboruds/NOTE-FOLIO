import { NotebookShell } from "@/components/notebook/NotebookShell";

export const metadata = {
  title: "Tech Stack — Nishant's Skills",
  description:
    "Technologies, tools, and programming languages I use to build modern applications.",
};

export default function TechStackPage() {
  return <NotebookShell initialView={{ kind: "techstack" }} />;
}
