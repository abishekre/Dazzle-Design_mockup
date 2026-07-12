import type { MetadataRoute } from "next";
import { occasions } from "@/lib/content";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dazzledesigns.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/portfolio", "/about", "/faq", "/quote"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const occasionRoutes = occasions.map((o) => ({
    url: `${base}/services/${o.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...occasionRoutes];
}
