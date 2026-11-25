import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function noStoreFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  return fetch(input, { ...init, cache: "no-store" });
}

function readRuntimeEnv(key: string): string {
  return (process.env[key] ?? "").trim();
}

export function getSupabaseUrl(): string {
  return (
    readRuntimeEnv("SUPABASE_URL") ||
    readRuntimeEnv("NEXT_PUBLIC_SUPABASE_URL")
  );
}

export function getSupabaseBucket(): string {
  return readRuntimeEnv("SUPABASE_STORAGE_BUCKET") || "product-images";
}

export function isSupabasePublicConfigured(): boolean {
  const url = getSupabaseUrl();
  const anonKey =
    readRuntimeEnv("SUPABASE_ANON_KEY") ||
    readRuntimeEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  return Boolean(url.startsWith("http") && anonKey);
}

export function isSupabaseAdminConfigured(): boolean {
  if (typeof window !== "undefined") return false;
  const url = getSupabaseUrl();
  const serviceRoleKey = readRuntimeEnv("SUPABASE_SERVICE_ROLE_KEY");
  return Boolean(url.startsWith("http") && serviceRoleKey);
}

export function createSupabasePublicClient(): SupabaseClient {
  const url = getSupabaseUrl();
  const anonKey =
    readRuntimeEnv("SUPABASE_ANON_KEY") ||
    readRuntimeEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  if (!url || !anonKey) {
    throw new Error("Supabase public configuration (NEXT_PUBLIC_SUPABASE_URL / ANON_KEY) is missing.");
  }

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      fetch: noStoreFetch,
    },
  });
}

export function createSupabaseAdminClient(): SupabaseClient {
  if (typeof window !== "undefined") {
    throw new Error("Supabase admin client must only be created on the server.");
  }
  const url = getSupabaseUrl();
  const serviceRoleKey = readRuntimeEnv("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase admin configuration (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY) is missing."
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      fetch: noStoreFetch,
    },
  });
}
