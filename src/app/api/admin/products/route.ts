import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "../../../../lib/admin-auth";
import { isSupabaseAdminConfigured } from "../../../../lib/supabase";
import {
  createAdminProduct,
  getAllAdminProducts,
  validateCreatePayload,
} from "../../../../lib/products-repository";
import { revalidateCatalogPaths } from "../../../../lib/revalidate";

export async function GET() {
  const session = await requireAdminSession();
  if (!session.authenticated) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json(
      {
        error:
          "Supabase database credentials (NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY) are not configured.",
      },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const products = await getAllAdminProducts();
    return NextResponse.json(
      { products },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch products.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await requireAdminSession();
  if (!session.authenticated) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json(
      {
        error:
          "Supabase database credentials (NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY) are not configured.",
      },
      { status: 503 }
    );
  }

  try {
    const body = (await req.json()) as Record<string, unknown>;
    const validation = validateCreatePayload(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const product = await createAdminProduct(validation.data);
    revalidateCatalogPaths(product.slug);

    return NextResponse.json(
      { product },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    const code = (err as { code?: string })?.code;
    if (code === "23505") {
      return NextResponse.json(
        { error: "A product with this slug already exists." },
        { status: 409 }
      );
    }
    const message = err instanceof Error ? err.message : "Failed to create product.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
