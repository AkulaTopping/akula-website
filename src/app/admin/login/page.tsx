import React from "react";
import { redirect } from "next/navigation";
import { isAdminAuthConfigured, requireAdminSession } from "../../../lib/admin-auth";
import AdminLoginClient from "./AdminLoginClient";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const session = await requireAdminSession();
  if (session.authenticated) {
    redirect("/admin");
  }

  return <AdminLoginClient authConfigured={isAdminAuthConfigured()} />;
}
