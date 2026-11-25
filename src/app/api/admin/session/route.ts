import { NextResponse } from "next/server";
import { isAdminAuthConfigured, requireAdminSession } from "../../../../lib/admin-auth";
import { isSupabaseAdminConfigured } from "../../../../lib/supabase";

export async function GET() {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { authenticated: false, configured: false },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  const session = await requireAdminSession();
  if (!session.authenticated) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  return NextResponse.json(
    {
      authenticated: true,
      email: session.email,
      supabaseConfigured: isSupabaseAdminConfigured(),
    },
    { status: 200, headers: { "Cache-Control": "no-store" } }
  );
}
