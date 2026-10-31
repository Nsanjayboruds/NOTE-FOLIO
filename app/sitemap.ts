import type { MetadataRoute } from "next";

const SITE_URL = "https://note-folio.onrender.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/blog",
    "/contact",
    "/experience",
    "/projects",
    "/techstack",
    "/linkedin",
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
