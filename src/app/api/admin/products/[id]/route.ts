import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "../../../../../lib/admin-auth";
import { isSupabaseAdminConfigured } from "../../../../../lib/supabase";
import {
  deleteAdminProduct,
  isValidUuid,
  updateAdminProduct,
  validatePatchPayload,
} from "../../../../../lib/products-repository";
import { revalidateCatalogPaths } from "../../../../../lib/revalidate";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  const session = await requireAdminSession();
  if (!session.authenticated) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json(
      { error: "Supabase service role credentials are not configured." },
      { status: 503 }
    );
  }

  const { id } = await context.params;
  if (!isValidUuid(id)) {
    return NextResponse.json({ error: "Invalid product ID format." }, { status: 400 });
  }

  try {
    const body = (await req.json()) as Record<string, unknown>;
    const validation = validatePatchPayload(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { product, previousSlug } = await updateAdminProduct(id, validation.updates);
    revalidateCatalogPaths(previousSlug, product.slug);

    return NextResponse.json(
      { product },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    const status = (err as { status?: number })?.status;
    const code = (err as { code?: string })?.code;
    if (status === 404) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }
    if (code === "23505") {
      return NextResponse.json(
        { error: "A product with this slug already exists." },
        { status: 409 }
      );
    }
    const message = err instanceof Error ? err.message : "Failed to update product.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, context: RouteContext) {
  const session = await requireAdminSession();
  if (!session.authenticated) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json(
      { error: "Supabase service role credentials are not configured." },
      { status: 503 }
    );
  }

  const { id } = await context.params;
  if (!isValidUuid(id)) {
    return NextResponse.json({ error: "Invalid product ID format." }, { status: 400 });
  }

  try {
    const { deletedSlug } = await deleteAdminProduct(id);
    revalidateCatalogPaths(deletedSlug);

    return NextResponse.json(
      { ok: true },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    const status = (err as { status?: number })?.status;
    if (status === 404) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }
    const message = err instanceof Error ? err.message : "Failed to delete product.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
