import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nishant Borude | Developer Portfolio",
   short_name: "Nishant Borude", 
   description:
"Portfolio of Nishant Borude, featuring software engineering, full-stack development, AI projects, and open-source contributions.",
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
