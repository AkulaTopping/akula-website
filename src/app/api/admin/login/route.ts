import { NextRequest, NextResponse } from "next/server";
import {
  AdminConfigError,
  checkLoginRateLimit,
  clearFailedLogin,
  getSessionCookieConfig,
  recordFailedLogin,
  signSessionToken,
  verifyAdminCredentials,
} from "../../../../lib/admin-auth";

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  const ipKey = getClientIp(req);
  const limit = checkLoginRateLimit(ipKey);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: `Too many failed attempts. Try again in ${limit.retryAfterSec}s.` },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
    );
  }

  try {
    const body = (await req.json()) as { email?: unknown; password?: unknown };
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const password = typeof body?.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const valid = verifyAdminCredentials(email, password);
    if (!valid) {
      recordFailedLogin(ipKey);
      await new Promise((resolve) => setTimeout(resolve, 250));
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    clearFailedLogin(ipKey);
    const token = signSessionToken(email);
    const forwardedProto = req.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
    const isHttps = forwardedProto === "https" || req.nextUrl.protocol === "https:";
    const response = NextResponse.json(
      { ok: true, email: email.toLowerCase() },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
    response.cookies.set(getSessionCookieConfig(token, undefined, isHttps));
    return response;
  } catch (err) {
    if (err instanceof AdminConfigError) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    return NextResponse.json(
      { error: "Unable to process login request." },
      { status: 400 }
    );
  }
}
