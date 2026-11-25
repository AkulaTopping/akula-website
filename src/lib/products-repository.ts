import {
  productsData,
  flavourProfilesData,
  type ProductItem,
  type ProductStatus,
  type FlavourProfile,
} from "../utils/referenceData";
import {
  createSupabasePublicClient,
  createSupabaseAdminClient,
  isSupabasePublicConfigured,
  isSupabaseAdminConfigured,
  getSupabaseUrl,
  getSupabaseBucket,
} from "./supabase";

export interface ProductRow {
  id: string;
  legacy_id: number | null;
  slug: string;
  name_en: string;
  name_ar: string;
  tag: string;
  category: "topping" | "fruit";
  description_en: string;
  description_ar: string;
  image_url: string;
  image_path: string | null;
  status: ProductStatus;
  intro_en: string | null;
  intro_ar: string | null;
  uses_en: string[] | null;
  uses_ar: string[] | null;
  method_en: string | null;
  method_ar: string | null;
  weight_en: string | null;
  weight_ar: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProductMutationInput {
  slug: string;
  name: string;
  nameAr: string;
  tag: string;
  category: "topping" | "fruit";
  desc: string;
  descAr: string;
  image: string;
  imagePath?: string | null;
  status: ProductStatus;
  intro?: string;
  introAr?: string;
  uses?: string[];
  usesAr?: string[];
  method?: string;
  methodAr?: string;
  weight?: string;
  weightAr?: string;
  sortOrder?: number;
}

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidUuid(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

export function normalizeSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function isSupabaseStorageImageUrl(
  url: string,
  imagePath?: string | null
): boolean {
  const trimmed = url.trim();
  const pathTrimmed = (imagePath || "").trim();
  if (!trimmed || !pathTrimmed) return false;
  if (!pathTrimmed.startsWith("products/") || pathTrimmed.includes("..")) {
    return false;
  }
  const baseUrl = getSupabaseUrl().replace(/\/+$/, "");
  const bucket = getSupabaseBucket();
  if (!baseUrl) return false;
  const expectedPrefix = `${baseUrl}/storage/v1/object/public/${bucket}/products/`;
  return trimmed === `${baseUrl}/storage/v1/object/public/${bucket}/${pathTrimmed}` &&
    trimmed.startsWith(expectedPrefix);
}

export function isManagedImageUrl(
  url: string,
  imagePath?: string | null
): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("/assets/") && !trimmed.includes("..")) {
    return true;
  }
  return isSupabaseStorageImageUrl(trimmed, imagePath);
}

function getFallbackSeedProducts(): ProductItem[] {
  return productsData.map((item, idx) => ({
    ...item,
    status: "published" as const,
    sortOrder: idx,
    profile: flavourProfilesData[item.slug],
  }));
}

export function mapRowToProductItem(row: ProductRow, fallbackNumericId = 0): ProductItem {
  const legacyProfile = flavourProfilesData[row.slug];
  const hasDbProfile =
    Boolean(row.intro_en || row.intro_ar || row.method_en || row.method_ar || row.weight_en || row.weight_ar) ||
    Boolean(row.uses_en && row.uses_en.length > 0) ||
    Boolean(row.uses_ar && row.uses_ar.length > 0);

  let profile: FlavourProfile | undefined;
  if (hasDbProfile) {
    profile = {
      title: row.name_en,
      titleAr: row.name_ar,
      intro: row.intro_en || row.description_en,
      introAr: row.intro_ar || row.description_ar,
      uses: row.uses_en || [],
      usesAr: row.uses_ar || [],
      method: row.method_en || "",
      methodAr: row.method_ar || "",
      weight: row.weight_en || "",
      weightAr: row.weight_ar || "",
    };
  } else if (legacyProfile) {
    profile = legacyProfile;
  }

  return {
    id: row.legacy_id ?? fallbackNumericId,
    dbId: row.id,
    slug: row.slug,
    name: row.name_en,
    nameAr: row.name_ar,
    tag: row.tag,
    category: row.category,
    desc: row.description_en,
    descAr: row.description_ar,
    image: row.image_url,
    imagePath: row.image_path,
    status: row.status,
    sortOrder: row.sort_order,
    profile,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getPublishedProducts(): Promise<{
  products: ProductItem[];
  source: "supabase" | "fallback";
  error?: string;
}> {
  if (!isSupabasePublicConfigured()) {
    return { products: getFallbackSeedProducts(), source: "fallback" };
  }

  try {
    const supabase = createSupabasePublicClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("status", "published")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      console.error("[products-repository] Supabase read error:", error.message);
      return {
        products: getFallbackSeedProducts(),
        source: "fallback",
        error: error.message,
      };
    }

    const rows = (data || []) as ProductRow[];
    return {
      products: rows.map((row, idx) => mapRowToProductItem(row, idx)),
      source: "supabase",
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown database error";
    console.error("[products-repository] Unexpected read error:", message);
    return {
      products: getFallbackSeedProducts(),
      source: "fallback",
      error: message,
    };
  }
}

export async function getPublishedProductBySlug(slug: string): Promise<{
  product: ProductItem | null;
  related: ProductItem[];
  source: "supabase" | "fallback";
}> {
  const { products, source } = await getPublishedProducts();
  const product = products.find((p) => p.slug === slug) || null;
  if (!product) {
    return { product: null, related: [], source };
  }
  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  return { product, related, source };
}

export async function getAllAdminProducts(): Promise<ProductItem[]> {
  if (!isSupabaseAdminConfigured()) {
    throw new Error("Supabase service role credentials are not configured.");
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Failed to load products from PostgreSQL: ${error.message}`);
  }

  return ((data || []) as ProductRow[]).map((row, idx) => mapRowToProductItem(row, idx));
}

function sanitizeStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean)
      .slice(0, 20);
  }
  if (typeof value === "string") {
    return value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 20);
  }
  return [];
}

export function validateCreatePayload(body: Record<string, unknown>): {
  valid: true;
  data: ProductMutationInput;
} | {
  valid: false;
  error: string;
} {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const nameAr = typeof body.nameAr === "string" ? body.nameAr.trim() : "";
  const rawSlug = typeof body.slug === "string" && body.slug.trim() ? body.slug : name;
  const slug = normalizeSlug(rawSlug);
  const category = body.category === "topping" || body.category === "fruit" ? body.category : null;
  const desc = typeof body.desc === "string" ? body.desc.trim() : "";
  const descAr = typeof body.descAr === "string" ? body.descAr.trim() : "";
  const image = typeof body.image === "string" ? body.image.trim() : "";
  const imagePath = typeof body.imagePath === "string" ? body.imagePath.trim() : null;
  const status: ProductStatus =
    body.status === "draft" || body.status === "published" || body.status === "archived"
      ? body.status
      : "draft";
  const tagRaw = typeof body.tag === "string" && body.tag.trim() ? body.tag.trim() : name;
  const tag = tagRaw.toUpperCase().slice(0, 60);

  if (!name || name.length > 120) {
    return { valid: false, error: "English product name is required (max 120 chars)." };
  }
  if (!nameAr || nameAr.length > 120) {
    return { valid: false, error: "Arabic product name is required (max 120 chars)." };
  }
  if (!slug || !SLUG_REGEX.test(slug) || slug.length > 80) {
    return { valid: false, error: "Slug must contain lowercase letters, numbers, and hyphens only." };
  }
  if (!category) {
    return { valid: false, error: "Category must be either 'topping' or 'fruit'." };
  }
  if (!desc || desc.length > 600) {
    return { valid: false, error: "English description is required (max 600 chars)." };
  }
  if (!descAr || descAr.length > 600) {
    return { valid: false, error: "Arabic description is required (max 600 chars)." };
  }
  if (!isSupabaseStorageImageUrl(image, imagePath)) {
    return {
      valid: false,
      error: "Please upload a product image via Supabase Storage.",
    };
  }

  const sortOrderNum = Number(body.sortOrder);
  const sortOrder = Number.isFinite(sortOrderNum)
    ? Math.max(0, Math.min(9999, Math.trunc(sortOrderNum)))
    : 100;

  return {
    valid: true,
    data: {
      slug,
      name,
      nameAr,
      tag,
      category,
      desc,
      descAr,
      image,
      imagePath: imagePath || null,
      status,
      intro: typeof body.intro === "string" ? body.intro.trim() : "",
      introAr: typeof body.introAr === "string" ? body.introAr.trim() : "",
      uses: sanitizeStringList(body.uses),
      usesAr: sanitizeStringList(body.usesAr),
      method: typeof body.method === "string" ? body.method.trim() : "",
      methodAr: typeof body.methodAr === "string" ? body.methodAr.trim() : "",
      weight: typeof body.weight === "string" ? body.weight.trim() : "",
      weightAr: typeof body.weightAr === "string" ? body.weightAr.trim() : "",
      sortOrder,
    },
  };
}

export function validatePatchPayload(body: Record<string, unknown>): {
  valid: true;
  updates: Record<string, unknown>;
} | {
  valid: false;
  error: string;
} {
  const updates: Record<string, unknown> = {};

  if ("slug" in body) {
    const slug = normalizeSlug(String(body.slug || ""));
    if (!slug || !SLUG_REGEX.test(slug) || slug.length > 80) {
      return { valid: false, error: "Invalid product slug." };
    }
    updates.slug = slug;
  }

  if ("name" in body) {
    const name = String(body.name || "").trim();
    if (!name || name.length > 120) {
      return { valid: false, error: "English name is required (max 120 chars)." };
    }
    updates.name_en = name;
  }

  if ("nameAr" in body) {
    const nameAr = String(body.nameAr || "").trim();
    if (!nameAr || nameAr.length > 120) {
      return { valid: false, error: "Arabic name is required (max 120 chars)." };
    }
    updates.name_ar = nameAr;
  }

  if ("tag" in body) {
    const tag = String(body.tag || "").trim().toUpperCase().slice(0, 60);
    if (!tag) return { valid: false, error: "Tag cannot be empty." };
    updates.tag = tag;
  }

  if ("category" in body) {
    if (body.category !== "topping" && body.category !== "fruit") {
      return { valid: false, error: "Category must be 'topping' or 'fruit'." };
    }
    updates.category = body.category;
  }

  if ("desc" in body) {
    const desc = String(body.desc || "").trim();
    if (!desc || desc.length > 600) {
      return { valid: false, error: "English description is required (max 600 chars)." };
    }
    updates.description_en = desc;
  }

  if ("descAr" in body) {
    const descAr = String(body.descAr || "").trim();
    if (!descAr || descAr.length > 600) {
      return { valid: false, error: "Arabic description is required (max 600 chars)." };
    }
    updates.description_ar = descAr;
  }

  if ("image" in body) {
    const image = String(body.image || "").trim();
    const candidatePath =
      typeof body.imagePath === "string" ? body.imagePath.trim() : null;
    if (!isManagedImageUrl(image, candidatePath)) {
      return {
        valid: false,
        error: "Image must be uploaded via Supabase Storage or reference a bundled /assets image.",
      };
    }
    updates.image_url = image;
  }

  if ("imagePath" in body) {
    updates.image_path = typeof body.imagePath === "string" && body.imagePath.trim()
      ? body.imagePath.trim()
      : null;
  }

  if ("status" in body) {
    if (
      body.status !== "draft" &&
      body.status !== "published" &&
      body.status !== "archived"
    ) {
      return { valid: false, error: "Status must be 'draft', 'published', or 'archived'." };
    }
    updates.status = body.status;
  }

  if ("intro" in body) updates.intro_en = String(body.intro || "").trim() || null;
  if ("introAr" in body) updates.intro_ar = String(body.introAr || "").trim() || null;
  if ("uses" in body) updates.uses_en = sanitizeStringList(body.uses);
  if ("usesAr" in body) updates.uses_ar = sanitizeStringList(body.usesAr);
  if ("method" in body) updates.method_en = String(body.method || "").trim() || null;
  if ("methodAr" in body) updates.method_ar = String(body.methodAr || "").trim() || null;
  if ("weight" in body) updates.weight_en = String(body.weight || "").trim() || null;
  if ("weightAr" in body) updates.weight_ar = String(body.weightAr || "").trim() || null;

  if ("sortOrder" in body) {
    const sortOrderNum = Number(body.sortOrder);
    if (!Number.isFinite(sortOrderNum)) {
      return { valid: false, error: "Sort order must be a valid number." };
    }
    updates.sort_order = Math.max(0, Math.min(9999, Math.trunc(sortOrderNum)));
  }

  if (Object.keys(updates).length === 0) {
    return { valid: false, error: "No valid fields provided for update." };
  }

  return { valid: true, updates };
}

export async function createAdminProduct(input: ProductMutationInput): Promise<ProductItem> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("products")
    .insert({
      slug: input.slug,
      name_en: input.name,
      name_ar: input.nameAr,
      tag: input.tag,
      category: input.category,
      description_en: input.desc,
      description_ar: input.descAr,
      image_url: input.image,
      image_path: input.imagePath || null,
      status: input.status,
      intro_en: input.intro || null,
      intro_ar: input.introAr || null,
      uses_en: input.uses || [],
      uses_ar: input.usesAr || [],
      method_en: input.method || null,
      method_ar: input.methodAr || null,
      weight_en: input.weight || null,
      weight_ar: input.weightAr || null,
      sort_order: input.sortOrder ?? 100,
    })
    .select("*")
    .single();

  if (error) {
    const err = new Error(error.message) as Error & { code?: string };
    err.code = error.code;
    throw err;
  }

  return mapRowToProductItem(data as ProductRow);
}

async function removeStorageObjectQuietly(imagePath: string | null | undefined) {
  if (!imagePath) return;
  try {
    const supabase = createSupabaseAdminClient();
    const bucket = getSupabaseBucket();
    await supabase.storage.from(bucket).remove([imagePath]);
  } catch (err) {
    console.warn("[products-repository] Failed to clean up old storage object:", err);
  }
}

export async function updateAdminProduct(
  dbId: string,
  updates: Record<string, unknown>
): Promise<{ product: ProductItem; previousSlug: string }> {
  const supabase = createSupabaseAdminClient();

  const { data: existing, error: fetchError } = await supabase
    .from("products")
    .select("*")
    .eq("id", dbId)
    .single();

  if (fetchError || !existing) {
    const err = new Error("Product not found.") as Error & { status?: number };
    err.status = 404;
    throw err;
  }

  const prevRow = existing as ProductRow;

  const { data: updated, error: updateError } = await supabase
    .from("products")
    .update(updates)
    .eq("id", dbId)
    .select("*")
    .single();

  if (updateError) {
    const err = new Error(updateError.message) as Error & { code?: string };
    err.code = updateError.code;
    throw err;
  }

  const imageChanged =
    ("image_url" in updates && updates.image_url !== prevRow.image_url) ||
    ("image_path" in updates && updates.image_path !== prevRow.image_path);

  if (prevRow.image_path && imageChanged && updates.image_path !== prevRow.image_path) {
    await removeStorageObjectQuietly(prevRow.image_path);
  }

  return {
    product: mapRowToProductItem(updated as ProductRow),
    previousSlug: prevRow.slug,
  };
}

export async function deleteAdminProduct(dbId: string): Promise<{ deletedSlug: string }> {
  const supabase = createSupabaseAdminClient();

  const { data: existing, error: fetchError } = await supabase
    .from("products")
    .select("id, slug, image_path")
    .eq("id", dbId)
    .single();

  if (fetchError || !existing) {
    const err = new Error("Product not found.") as Error & { status?: number };
    err.status = 404;
    throw err;
  }

  const { error: deleteError } = await supabase.from("products").delete().eq("id", dbId);
  if (deleteError) {
    throw new Error(deleteError.message);
  }

  await removeStorageObjectQuietly((existing as { image_path?: string | null }).image_path);
  return { deletedSlug: (existing as { slug: string }).slug };
}
