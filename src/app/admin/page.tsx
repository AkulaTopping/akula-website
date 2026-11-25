import React from "react";
import { redirect } from "next/navigation";
import { requireAdminSession } from "../../lib/admin-auth";
import { isSupabaseAdminConfigured } from "../../lib/supabase";
import { getAllAdminProducts } from "../../lib/products-repository";
import type { ProductItem } from "../../utils/referenceData";
import AdminDashboardClient from "./AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await requireAdminSession();
  if (!session.authenticated) {
    redirect("/admin/login");
  }

  const supabaseConfigured = isSupabaseAdminConfigured();
  let initialProducts: ProductItem[] = [];
  let initialError = "";

  if (supabaseConfigured) {
    try {
      initialProducts = await getAllAdminProducts();
    } catch (err) {
      initialError =
        err instanceof Error
          ? err.message
          : "Unable to query PostgreSQL products table.";
    }
  }

  return (
    <AdminDashboardClient
      adminEmail={session.email}
      supabaseConfigured={supabaseConfigured}
      initialProducts={initialProducts}
      initialError={initialError}
    />
  );
}
