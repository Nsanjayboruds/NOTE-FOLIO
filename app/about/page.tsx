import { NotebookShell } from "@/components/notebook/NotebookShell";

export const metadata = {
  title: "Nishant Borude — About",
  description:
    "The about page of Nishant's journal — builder in the tech/AI space, CS at Guelph, incoming at EY.",
};

export default function AboutRoute() {
  // Deep-link: skip the landing flip and open the notebook with the
  // About page already in the split view.
  return <NotebookShell initialView={{ kind: "about" }} />;
}
