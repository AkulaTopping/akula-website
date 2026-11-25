import { revalidatePath } from "next/cache";

export function revalidateCatalogPaths(...slugs: Array<string | undefined | null>) {
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/store");
  revalidatePath("/sitemap.xml");
  for (const slug of slugs) {
    if (slug) {
      revalidatePath(`/products/${slug}`);
    }
  }
}
