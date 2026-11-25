import { NextRequest, NextResponse } from "next/server";
import { getSessionCookieConfig } from "../../../../lib/admin-auth";

export async function POST(req: NextRequest) {
  const forwardedProto = req.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const isHttps = forwardedProto === "https" || req.nextUrl.protocol === "https:";
  const response = NextResponse.json(
    { ok: true },
    { status: 200, headers: { "Cache-Control": "no-store" } }
  );
  response.cookies.set(getSessionCookieConfig("", 0, isHttps));
  return response;
}
