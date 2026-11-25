import type { MetadataRoute } from "next";
import { getPublishedProducts } from "../lib/products-repository";

export const dynamic = "force-dynamic";

const BASE_URL = "https://akulatopping.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/products",
    "/about",
    "/contact",
    "/recipes",
    "/journal",
    "/partners",
    "/store",
  ];

  const { products } = await getPublishedProducts();
  const productRoutes = products.map((p) => `/products/${p.slug}`);
  const allRoutes = [...staticRoutes, ...productRoutes];

  return allRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/products/") ? 0.8 : 0.7,
  }));
}
