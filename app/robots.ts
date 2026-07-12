import type { MetadataRoute } from "next";

// Set NEXT_PUBLIC_SITE_URL to your domain in production for absolute URLs.
const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dazzledesign.example";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
    sitemap: `${base}/sitemap.xml`,
  };
}
