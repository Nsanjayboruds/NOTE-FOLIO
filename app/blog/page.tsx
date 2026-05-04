import { NotebookShell } from "@/components/notebook/NotebookShell";

export const metadata = {
  title: "Blog — Nishant's Journal",
  description:
    "Articles about web development, AI integration, open source, and building products.",
};

export default function BlogPage() {
  return <NotebookShell initialView={{ kind: "blog" }} />;
}
