import { NextResponse } from "next/server";
import { getPublishedProducts } from "../../../lib/products-repository";

export const dynamic = "force-dynamic";

export async function GET() {
  const { products, source, error } = await getPublishedProducts();
  return NextResponse.json(
    { products, source, ...(error ? { warning: error } : {}) },
    { status: 200, headers: { "Cache-Control": "no-store" } }
  );
}
