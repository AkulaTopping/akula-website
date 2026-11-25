import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "akula_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

interface SessionPayload {
  email: string;
  exp: number;
}

export class AdminConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AdminConfigError";
  }
}

function getEnvConfig() {
  if (typeof window !== "undefined") {
    throw new Error("admin-auth must only run on the server");
  }
  const email = process.env.ADMIN_EMAIL?.trim() || "";
  const passwordHash = process.env.ADMIN_PASSWORD_HASH?.trim() || "";
  const sessionSecret = process.env.ADMIN_SESSION_SECRET?.trim() || "";
  return { email, passwordHash, sessionSecret };
}

export function isAdminAuthConfigured(): boolean {
  const { email, passwordHash, sessionSecret } = getEnvConfig();
  return Boolean(email && passwordHash && sessionSecret.length >= 32);
}

function sha256Equal(a: string, b: string): boolean {
  const hashA = crypto.createHash("sha256").update(a).digest();
  const hashB = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

function verifyScryptHash(password: string, encodedHash: string): boolean {
  const parts = encodedHash.split(/[:$]/);
  if (parts.length !== 3 || parts[0] !== "scrypt") {
    return false;
  }
  const [, saltHex, hashHex] = parts;
  if (!saltHex || !hashHex || !/^[0-9a-f]+$/i.test(hashHex)) {
    return false;
  }
  const expected = Buffer.from(hashHex, "hex");
  const actual = crypto.scryptSync(password, saltHex, expected.length);
  if (actual.length !== expected.length) {
    return false;
  }
  return crypto.timingSafeEqual(actual, expected);
}

export function verifyAdminCredentials(emailInput: string, passwordInput: string): boolean {
  const { email, passwordHash, sessionSecret } = getEnvConfig();
  if (!email || !passwordHash || sessionSecret.length < 32) {
    throw new AdminConfigError(
      "Server admin authentication environment variables are not configured."
    );
  }

  const normalizedInput = emailInput.trim().toLowerCase();
  const normalizedExpected = email.toLowerCase();

  const emailMatches = sha256Equal(normalizedInput, normalizedExpected);
  const passwordMatches = verifyScryptHash(passwordInput, passwordHash);

  return emailMatches && passwordMatches;
}

export function signSessionToken(email: string): string {
  const { sessionSecret } = getEnvConfig();
  if (sessionSecret.length < 32) {
    throw new AdminConfigError("ADMIN_SESSION_SECRET is missing or too short.");
  }

  const payload: SessionPayload = {
    email: email.trim().toLowerCase(),
    exp: Date.now() + SESSION_TTL_MS,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signature = crypto
    .createHmac("sha256", sessionSecret)
    .update(encodedPayload)
    .digest("base64url");

  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string | undefined | null): SessionPayload | null {
  if (!token) return null;
  const { email: configuredEmail, sessionSecret } = getEnvConfig();
  if (!configuredEmail || sessionSecret.length < 32) {
    return null;
  }

  const dotIndex = token.indexOf(".");
  if (dotIndex <= 0) return null;

  const encodedPayload = token.slice(0, dotIndex);
  const providedSig = token.slice(dotIndex + 1);
  if (!encodedPayload || !providedSig) return null;

  const expectedSig = crypto
    .createHmac("sha256", sessionSecret)
    .update(encodedPayload)
    .digest("base64url");

  const sigBufA = Buffer.from(providedSig, "utf8");
  const sigBufB = Buffer.from(expectedSig, "utf8");
  if (sigBufA.length !== sigBufB.length || !crypto.timingSafeEqual(sigBufA, sigBufB)) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as SessionPayload;

    if (!parsed || typeof parsed.email !== "string" || typeof parsed.exp !== "number") {
      return null;
    }
    if (parsed.exp <= Date.now()) {
      return null;
    }
    if (!sha256Equal(parsed.email.toLowerCase(), configuredEmail.toLowerCase())) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export async function requireAdminSession(): Promise<
  { authenticated: true; email: string } | { authenticated: false }
> {
  if (!isAdminAuthConfigured()) {
    return { authenticated: false };
  }
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const session = verifySessionToken(token);
  if (!session) {
    return { authenticated: false };
  }
  return { authenticated: true, email: session.email };
}

export function getSessionCookieConfig(
  value: string,
  maxAgeSeconds = SESSION_TTL_MS / 1000,
  isHttps = process.env.NODE_ENV === "production"
) {
  return {
    name: ADMIN_SESSION_COOKIE,
    value,
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure: isHttps,
    maxAge: maxAgeSeconds,
  };
}

// Lightweight per-process rate limiting against brute-force attempts
const failedLoginStore = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 15 * 60 * 1000;

export function checkLoginRateLimit(ipKey: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const entry = failedLoginStore.get(ipKey);
  if (!entry || entry.resetAt <= now) {
    return { allowed: true, retryAfterSec: 0 };
  }
  if (entry.count >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }
  return { allowed: true, retryAfterSec: 0 };
}

export function recordFailedLogin(ipKey: string): void {
  const now = Date.now();
  const entry = failedLoginStore.get(ipKey);
  if (!entry || entry.resetAt <= now) {
    failedLoginStore.set(ipKey, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    entry.count += 1;
  }
}

export function clearFailedLogin(ipKey: string): void {
  failedLoginStore.delete(ipKey);
}
