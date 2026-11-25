"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../context/LanguageContext";

export default function AdminLoginClient({ authConfigured }: { authConfigured: boolean }) {
  const { isAr } = useLanguage();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok) {
        setError(
          data.error ||
            (isAr ? "بيانات الدخول غير صحيحة." : "Invalid admin credentials.")
        );
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError(
        isAr
          ? "تعذر الاتصال بالخادم. حاول مرة أخرى."
          : "Network error while signing in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "78vh",
        background: "var(--cream)",
        padding: "64px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#fff",
          border: "1px solid #e1e2d9",
          borderRadius: "6px",
          padding: "36px",
          boxShadow: "0 12px 32px rgba(18, 70, 53, 0.08)",
        }}
      >
        <span className="eyebrow" dir="ltr" style={{ marginBottom: "10px" }}>
          AKULA ADMIN CONSOLE
        </span>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 600,
            color: "var(--green)",
            margin: "0 0 10px",
          }}
        >
          {isAr ? "تسجيل دخول الإدارة" : "Administrator Sign In"}
        </h1>
        <p style={{ fontSize: "13px", color: "#5e6a5f", lineHeight: 1.7, marginBottom: "24px" }}>
          {isAr
            ? "دخول مخصص لمسؤول الموقع لإدارة المنتجات والصور وحالة النشر."
            : "Restricted access for the website administrator to manage products, images, and publication state."}
        </p>

        {!authConfigured && (
          <div
            role="alert"
            style={{
              background: "#fff6eb",
              border: "1px solid #e6c697",
              color: "#7c4a03",
              padding: "12px 14px",
              borderRadius: "4px",
              fontSize: "12px",
              lineHeight: 1.6,
              marginBottom: "18px",
            }}
          >
            {isAr
              ? "إعدادات مصادقة الإدارة على الخادم غير مكتملة بعد."
              : "Server administrator authentication is not configured yet. See SETUP.md."}
          </div>
        )}

        {error && (
          <div
            role="alert"
            style={{
              background: "#fdf2f2",
              border: "1px solid #e7baba",
              color: "#9b1c1c",
              padding: "12px 14px",
              borderRadius: "4px",
              fontSize: "13px",
              marginBottom: "18px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="admin-email"
              style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}
            >
              {isAr ? "البريد الإلكتروني للمسؤول" : "Admin Email"}
            </label>
            <input
              id="admin-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid #d5dcd4",
                borderRadius: "3px",
                fontSize: "14px",
                background: "#fcfcfa",
              }}
            />
          </div>

          <div style={{ marginBottom: "22px" }}>
            <label
              htmlFor="admin-password"
              style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}
            >
              {isAr ? "كلمة المرور" : "Password"}
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid #d5dcd4",
                borderRadius: "3px",
                fontSize: "14px",
                background: "#fcfcfa",
              }}
            />
          </div>

          <button
            type="submit"
            className="btn"
            disabled={loading || !authConfigured}
            style={{ width: "100%", opacity: loading || !authConfigured ? 0.6 : 1 }}
          >
            {loading
              ? isAr
                ? "جاري التحقق..."
                : "Signing in..."
              : isAr
                ? "تسجيل الدخول"
                : "Sign In"}
          </button>
        </form>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Link href="/" style={{ fontSize: "12px", color: "var(--green)" }}>
            {isAr ? "← العودة إلى الموقع العام" : "← Back to public website"}
          </Link>
        </div>
      </div>
    </main>
  );
}
