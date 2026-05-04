import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nishant Borude — Journal",
    short_name: "Tsang Journal",
    description:
      "Nishant Borude's portfolio, rendered as a spiral-bound journal.",
    start_url: "/",
    display: "standalone",
    background_color: "rgb(250, 247, 240)",
    theme_color: "rgb(250, 247, 240)",
    orientation: "portrait",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
