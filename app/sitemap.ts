import type { MetadataRoute } from "next";
import { products, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/products", "/clients", "/quote", "/contact", "/privacy", "/terms", "/refund-policy"];
  return [
    ...pages.map((p) => ({ url: `${siteUrl}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...products.map((p) => ({ url: `${siteUrl}/products/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.9 })),
  ];
}
