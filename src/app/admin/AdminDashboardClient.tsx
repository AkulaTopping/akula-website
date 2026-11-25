"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";
import type { ProductItem, ProductStatus } from "../../utils/referenceData";

interface AdminDashboardClientProps {
  adminEmail: string;
  supabaseConfigured: boolean;
  initialProducts: ProductItem[];
  initialError?: string;
}

interface ProductFormState {
  dbId?: string;
  slug: string;
  name: string;
  nameAr: string;
  tag: string;
  category: "topping" | "fruit";
  desc: string;
  descAr: string;
  image: string;
  imagePath: string | null;
  status: ProductStatus;
  intro: string;
  introAr: string;
  uses: string;
  usesAr: string;
  method: string;
  methodAr: string;
  weight: string;
  weightAr: string;
  sortOrder: number;
}

const EMPTY_FORM: ProductFormState = {
  slug: "",
  name: "",
  nameAr: "",
  tag: "",
  category: "topping",
  desc: "",
  descAr: "",
  image: "",
  imagePath: null,
  status: "draft",
  intro: "",
  introAr: "",
  uses: "",
  usesAr: "",
  method: "",
  methodAr: "",
  weight: "",
  weightAr: "",
  sortOrder: 100,
};

function slugifyClient(val: string): string {
  return val
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatStatusBadge(status: ProductStatus | undefined, isAr: boolean) {
  switch (status) {
    case "published":
      return {
        label: isAr ? "منشور" : "Published",
        bg: "#e6f4ea",
        color: "#137333",
        border: "#b7dfc2",
      };
    case "archived":
      return {
        label: isAr ? "مؤرشف" : "Archived",
        bg: "#f1f3f4",
        color: "#5f6368",
        border: "#dadce0",
      };
    default:
      return {
        label: isAr ? "مسودة" : "Draft",
        bg: "#fef7e0",
        color: "#b06000",
        border: "#f6dba1",
      };
  }
}

export default function AdminDashboardClient({
  adminEmail,
  supabaseConfigured,
  initialProducts,
  initialError = "",
}: AdminDashboardClientProps) {
  const { isAr } = useLanguage();
  const router = useRouter();

  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [statusFilter, setStatusFilter] = useState<"all" | ProductStatus>("all");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "topping" | "fruit">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [banner, setBanner] = useState<{ type: "error" | "success"; text: string } | null>(
    initialError ? { type: "error", text: initialError } : null
  );
  const [busyId, setBusyId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Form modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [slugLocked, setSlugLocked] = useState(false);
  const [form, setForm] = useState<ProductFormState>(EMPTY_FORM);
  const [uploading, setUploading] = useState(false);
  const [savingForm, setSavingForm] = useState(false);
  const [formError, setFormError] = useState("");

  // Delete confirmation modal
  const [deleteTarget, setDeleteTarget] = useState<ProductItem | null>(null);

  const stats = useMemo(() => {
    const published = products.filter((p) => p.status === "published").length;
    const draft = products.filter((p) => p.status === "draft").length;
    const archived = products.filter((p) => p.status === "archived").length;
    return { total: products.length, published, draft, archived };
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.nameAr.includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q)
      );
    });
  }, [products, statusFilter, categoryFilter, searchQuery]);

  async function refreshProducts() {
    setRefreshing(true);
    try {
      const res = await fetch("/api/admin/products", { cache: "no-store" });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = (await res.json()) as { products?: ProductItem[]; error?: string };
      if (!res.ok) {
        setBanner({ type: "error", text: data.error || "Failed to refresh products." });
        return;
      }
      setProducts(data.products || []);
    } catch {
      setBanner({ type: "error", text: "Network error while refreshing products." });
    } finally {
      setRefreshing(false);
    }
  }

  async function handleSignOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function openCreateModal() {
    setEditingId(null);
    setSlugLocked(false);
    setForm({
      ...EMPTY_FORM,
      sortOrder: products.length,
    });
    setFormError("");
    setModalOpen(true);
  }

  function openEditModal(product: ProductItem) {
    setEditingId(product.dbId || null);
    setSlugLocked(true);
    setForm({
      dbId: product.dbId,
      slug: product.slug,
      name: product.name,
      nameAr: product.nameAr,
      tag: product.tag,
      category: product.category,
      desc: product.desc,
      descAr: product.descAr,
      image: product.image,
      imagePath: product.imagePath || null,
      status: product.status || "published",
      intro: product.profile?.intro || "",
      introAr: product.profile?.introAr || "",
      uses: (product.profile?.uses || []).join(", "),
      usesAr: (product.profile?.usesAr || []).join(", "),
      method: product.profile?.method || "",
      methodAr: product.profile?.methodAr || "",
      weight: product.profile?.weight || "",
      weightAr: product.profile?.weightAr || "",
      sortOrder: product.sortOrder ?? 100,
    });
    setFormError("");
    setModalOpen(true);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormError("");
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setFormError(
        isAr
          ? "يُسمح فقط بصور JPG أو PNG أو WebP."
          : "Only JPG, PNG, and WebP images are allowed."
      );
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setFormError(
        isAr
          ? "حجم الصورة يجب ألا يتجاوز ٤ ميجابايت."
          : "Image size must not exceed 4 MB."
      );
      return;
    }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("slug", form.slug || form.name || "product");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = (await res.json()) as {
        imageUrl?: string;
        imagePath?: string;
        error?: string;
      };
      if (!res.ok || !data.imageUrl) {
        setFormError(data.error || "Image upload failed.");
        return;
      }
      setForm((prev) => ({
        ...prev,
        image: data.imageUrl!,
        imagePath: data.imagePath || null,
      }));
    } catch {
      setFormError(isAr ? "تعذر رفع الصورة." : "Network error during upload.");
    } finally {
      setUploading(false);
    }
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");

    if (!form.image) {
      setFormError(
        isAr
          ? "يرجى رفع صورة المنتج أولًا (JPG أو PNG أو WebP)."
          : "Please upload a product image first (JPG, PNG, or WebP)."
      );
      return;
    }

    setSavingForm(true);

    const payload = {
      slug: form.slug || slugifyClient(form.name),
      name: form.name,
      nameAr: form.nameAr,
      tag: form.tag || form.name.toUpperCase(),
      category: form.category,
      desc: form.desc,
      descAr: form.descAr,
      image: form.image,
      imagePath: form.imagePath,
      status: form.status,
      intro: form.intro,
      introAr: form.introAr,
      uses: form.uses,
      usesAr: form.usesAr,
      method: form.method,
      methodAr: form.methodAr,
      weight: form.weight,
      weightAr: form.weightAr,
      sortOrder: Number(form.sortOrder) || 0,
    };

    try {
      const endpoint = editingId
        ? `/api/admin/products/${editingId}`
        : "/api/admin/products";
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }

      const data = (await res.json()) as { product?: ProductItem; error?: string };
      if (!res.ok || !data.product) {
        setFormError(data.error || "Failed to save product.");
        return;
      }

      setModalOpen(false);
      await refreshProducts();
      setBanner({
        type: "success",
        text: editingId
          ? isAr
            ? `تم تحديث "${data.product.nameAr}" بنجاح.`
            : `Updated "${data.product.name}" in live catalog.`
          : isAr
            ? `تمت إضافة "${data.product.nameAr}" بنجاح.`
            : `Created "${data.product.name}".`,
      });
    } catch {
      setFormError(isAr ? "حدث خطأ أثناء الحفظ." : "Network error while saving.");
    } finally {
      setSavingForm(false);
    }
  }

  async function handleStatusChange(product: ProductItem, nextStatus: ProductStatus) {
    if (!product.dbId) return;
    setBusyId(product.dbId);
    setBanner(null);

    try {
      const res = await fetch(`/api/admin/products/${product.dbId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }

      const data = (await res.json()) as { product?: ProductItem; error?: string };
      if (!res.ok || !data.product) {
        setBanner({ type: "error", text: data.error || "Status update failed." });
        return;
      }

      setProducts((prev) =>
        prev.map((p) => (p.dbId === product.dbId ? data.product! : p))
      );
      setBanner({
        type: "success",
        text: isAr
          ? `تم تغيير حالة "${product.nameAr}".`
          : `Status updated to "${nextStatus}" for "${product.name}".`,
      });
    } catch {
      setBanner({ type: "error", text: "Network error while changing status." });
    } finally {
      setBusyId(null);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget?.dbId) return;
    const id = deleteTarget.dbId;
    setBusyId(id);
    setBanner(null);

    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setBanner({ type: "error", text: data.error || "Failed to delete product." });
        setDeleteTarget(null);
        return;
      }
      setProducts((prev) => prev.filter((p) => p.dbId !== id));
      setDeleteTarget(null);
      setBanner({
        type: "success",
        text: isAr
          ? `تم حذف "${deleteTarget.nameAr}" نهائيًا.`
          : `Permanently deleted "${deleteTarget.name}".`,
      });
    } catch {
      setBanner({ type: "error", text: "Network error while deleting product." });
    } finally {
      setBusyId(null);
    }
  }

  return (
    <main style={{ background: "var(--cream)", minHeight: "82vh", padding: "40px 5% 80px" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        {/* Header Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "28px",
            paddingBottom: "20px",
            borderBottom: "1px solid #dedfd5",
          }}
        >
          <div>
            <span className="eyebrow" dir="ltr" style={{ marginBottom: "6px" }}>
              AKULA ADMIN · {adminEmail}
            </span>
            <h1 style={{ fontSize: "30px", fontWeight: 600, color: "var(--green)", margin: 0 }}>
              {isAr ? "لوحة إدارة المنتجات" : "Centralized Product Management"}
            </h1>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              type="button"
              className="btn"
              onClick={openCreateModal}
              disabled={!supabaseConfigured}
              style={{
                padding: "11px 18px",
                fontSize: "13px",
                opacity: supabaseConfigured ? 1 : 0.55,
              }}
            >
              {isAr ? "＋ إضافة منتج جديد" : "＋ Create Product"}
            </button>
            <button
              type="button"
              className="btn outline"
              onClick={refreshProducts}
              disabled={!supabaseConfigured || refreshing}
              style={{ padding: "11px 16px", fontSize: "13px" }}
            >
              {refreshing ? (isAr ? "تحديث..." : "Refreshing...") : isAr ? "تحديث" : "Refresh"}
            </button>
            <Link
              href="/products"
              className="btn outline"
              style={{ padding: "11px 16px", fontSize: "13px" }}
            >
              {isAr ? "معاينة الكتالوج ↗" : "Public Catalog ↗"}
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              style={{
                padding: "11px 16px",
                fontSize: "13px",
                background: "#fff",
                border: "1px solid #d5dcd4",
                borderRadius: "2px",
                color: "#7a2e2e",
                fontWeight: 600,
              }}
            >
              {isAr ? "تسجيل الخروج" : "Sign Out"}
            </button>
          </div>
        </div>

        {/* Setup Reminder if Supabase missing */}
        {!supabaseConfigured && (
          <div
            role="alert"
            style={{
              background: "#fff6eb",
              border: "1px solid #e6c697",
              color: "#7c4a03",
              padding: "18px 22px",
              borderRadius: "4px",
              marginBottom: "24px",
              fontSize: "14px",
              lineHeight: 1.7,
            }}
          >
            <strong>
              {isAr ? "يلزم ربط Supabase لتفعيل قاعدة البيانات وتخزين الصور:" : "Supabase Configuration Required:"}
            </strong>{" "}
            {isAr
              ? "أضف بيانات اتصال Supabase المطلوبة في إعدادات البيئة الخاصة بالخادم ثم شغّل ملفات الترحيل في supabase/migrations/."
              : "Configure your Supabase database URL and keys in server environment variables (.env.local / Vercel), then run the SQL migrations in supabase/migrations/."}
          </div>
        )}

        {banner && (
          <div
            role="status"
            style={{
              background: banner.type === "error" ? "#fdf2f2" : "#edf7f0",
              border: `1px solid ${banner.type === "error" ? "#e7baba" : "#b7dfc2"}`,
              color: banner.type === "error" ? "#9b1c1c" : "#135d2d",
              padding: "13px 16px",
              borderRadius: "4px",
              marginBottom: "22px",
              fontSize: "13px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span>{banner.text}</span>
            <button
              type="button"
              onClick={() => setBanner(null)}
              aria-label="Dismiss"
              style={{ background: "none", border: 0, fontSize: "18px", color: "inherit" }}
            >
              ×
            </button>
          </div>
        )}

        {/* Stats Strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
            gap: "14px",
            marginBottom: "24px",
          }}
        >
          {[
            { label: isAr ? "إجمالي المنتجات" : "Total Products", value: stats.total, color: "var(--green)" },
            { label: isAr ? "منشور للزوار" : "Published", value: stats.published, color: "#137333" },
            { label: isAr ? "مسودات" : "Drafts", value: stats.draft, color: "#b06000" },
            { label: isAr ? "مؤرشف" : "Archived", value: stats.archived, color: "#5f6368" },
          ].map((stat, idx) => (
            <div
              key={idx}
              style={{
                background: "#fff",
                border: "1px solid #e1e2d9",
                borderRadius: "4px",
                padding: "16px 20px",
              }}
            >
              <div style={{ fontSize: "11px", color: "#68746b", marginBottom: "6px" }}>
                {stat.label}
              </div>
              <div style={{ fontSize: "26px", fontWeight: 700, color: stat.color }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Filters Bar */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e1e2d9",
            borderRadius: "4px",
            padding: "16px 20px",
            marginBottom: "22px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {(["all", "published", "draft", "archived"] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`category ${statusFilter === st ? "active" : ""}`}
                style={{ padding: "8px 14px", fontSize: "12px" }}
              >
                {st === "all"
                  ? isAr
                    ? "الكل"
                    : "All statuses"
                  : st === "published"
                    ? isAr
                      ? "منشور"
                      : "Published"
                    : st === "draft"
                      ? isAr
                        ? "مسودة"
                        : "Draft"
                      : isAr
                        ? "مؤرشف"
                        : "Archived"}
              </button>
            ))}

            <select
              aria-label={isAr ? "تصفية حسب القسم" : "Filter by category"}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as "all" | "topping" | "fruit")}
              style={{
                padding: "8px 12px",
                border: "1px solid #d5dcd4",
                borderRadius: "4px",
                fontSize: "12px",
                background: "#fff",
              }}
            >
              <option value="all">{isAr ? "كل الأقسام" : "All categories"}</option>
              <option value="topping">{isAr ? "التوبينج" : "Toppings"}</option>
              <option value="fruit">{isAr ? "صوصات الفاكهة" : "Fruit sauces"}</option>
            </select>
          </div>

          <input
            type="search"
            placeholder={isAr ? "بحث بالاسم أو الرابط..." : "Search name or slug..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: "9px 14px",
              border: "1px solid #d5dcd4",
              borderRadius: "4px",
              fontSize: "13px",
              minWidth: "240px",
              flex: "1 1 240px",
              maxWidth: "340px",
            }}
          />
        </div>

        {/* Product List */}
        {filteredProducts.length === 0 ? (
          <div
            style={{
              background: "#fff",
              border: "1px solid #e1e2d9",
              borderRadius: "4px",
              padding: "48px 20px",
              textAlign: "center",
              color: "#68746b",
              fontSize: "14px",
            }}
          >
            {supabaseConfigured
              ? isAr
                ? "لا توجد منتجات مطابقة للتصفية الحالية."
                : "No products match the current filter."
              : isAr
                ? "بانتظار إكمال إعداد Supabase لعرض المنتجات."
                : "Configure Supabase and run migrations to manage live products."}
          </div>
        ) : (
          <div style={{ display: "grid", gap: "14px" }}>
            {filteredProducts.map((product) => {
              const badge = formatStatusBadge(product.status, isAr);
              const isBusy = busyId === product.dbId;

              return (
                <article
                  key={product.dbId || product.slug}
                  style={{
                    background: "#fff",
                    border: "1px solid #e1e2d9",
                    borderRadius: "4px",
                    padding: "16px 20px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "18px",
                    alignItems: "center",
                    justifyContent: "space-between",
                    opacity: isBusy ? 0.65 : 1,
                  }}
                >
                  <img
                    src={product.image || `/assets/${product.slug}.jpg`}
                    alt={product.name}
                    style={{
                      width: "82px",
                      height: "82px",
                      objectFit: "contain",
                      background: "var(--cream)",
                      borderRadius: "4px",
                      border: "1px solid #eceae0",
                      padding: "4px",
                    }}
                  />

                  <div style={{ minWidth: "240px", flex: "1 1 260px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        flexWrap: "wrap",
                        marginBottom: "6px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          padding: "3px 9px",
                          borderRadius: "12px",
                          background: badge.bg,
                          color: badge.color,
                          border: `1px solid ${badge.border}`,
                        }}
                      >
                        {badge.label}
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          color: "var(--gold)",
                          fontWeight: 600,
                          letterSpacing: "0.8px",
                        }}
                      >
                        {product.category === "topping"
                          ? isAr
                            ? "توبينج"
                            : "TOPPING"
                          : isAr
                            ? "صوص فاكهة"
                            : "FRUIT SAUCE"}
                      </span>
                      <code
                        dir="ltr"
                        style={{
                          fontSize: "11px",
                          background: "#f5f5f0",
                          padding: "2px 6px",
                          borderRadius: "3px",
                          color: "#556056",
                        }}
                      >
                        /{product.slug}
                      </code>
                    </div>

                    <h2 style={{ fontSize: "17px", fontWeight: 600, margin: "0 0 4px", color: "var(--ink)" }}>
                      {product.name} · <span dir="rtl">{product.nameAr}</span>
                    </h2>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#68746b",
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      {isAr ? product.descAr : product.desc}
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                    {product.status === "published" && (
                      <Link
                        href={`/products/${product.slug}`}
                        style={{
                          padding: "8px 12px",
                          fontSize: "12px",
                          border: "1px solid #d5dcd4",
                          borderRadius: "3px",
                          color: "var(--green)",
                          background: "#fcfcfa",
                        }}
                      >
                        {isAr ? "عرض ↗" : "View ↗"}
                      </Link>
                    )}

                    {product.status !== "published" && (
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => handleStatusChange(product, "published")}
                        style={{
                          padding: "8px 12px",
                          fontSize: "12px",
                          background: "#137333",
                          color: "#fff",
                          border: "1px solid #137333",
                          borderRadius: "3px",
                          fontWeight: 600,
                        }}
                      >
                        {isAr ? "نشر" : "Publish"}
                      </button>
                    )}

                    {product.status === "published" && (
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => handleStatusChange(product, "draft")}
                        style={{
                          padding: "8px 12px",
                          fontSize: "12px",
                          background: "#fff",
                          color: "#8a5300",
                          border: "1px solid #e6c697",
                          borderRadius: "3px",
                        }}
                      >
                        {isAr ? "إرجاع لمسودة" : "Unpublish"}
                      </button>
                    )}

                    {product.status !== "archived" && (
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => handleStatusChange(product, "archived")}
                        style={{
                          padding: "8px 12px",
                          fontSize: "12px",
                          background: "#fff",
                          color: "#5f6368",
                          border: "1px solid #dadce0",
                          borderRadius: "3px",
                        }}
                      >
                        {isAr ? "أرشفة" : "Archive"}
                      </button>
                    )}

                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => openEditModal(product)}
                      style={{
                        padding: "8px 12px",
                        fontSize: "12px",
                        background: "var(--green)",
                        color: "#fff",
                        border: "1px solid var(--green)",
                        borderRadius: "3px",
                      }}
                    >
                      {isAr ? "تعديل" : "Edit"}
                    </button>

                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => setDeleteTarget(product)}
                      style={{
                        padding: "8px 12px",
                        fontSize: "12px",
                        background: "#fff8f8",
                        color: "#9b1c1c",
                        border: "1px solid #e7baba",
                        borderRadius: "3px",
                      }}
                    >
                      {isAr ? "حذف" : "Delete"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="admin-product-modal-title"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(12, 27, 20, 0.55)",
            zIndex: 1200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "6px",
              width: "100%",
              maxWidth: "740px",
              maxHeight: "92vh",
              overflowY: "auto",
              padding: "28px",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2
                id="admin-product-modal-title"
                style={{ fontSize: "22px", fontWeight: 600, color: "var(--green)", margin: 0 }}
              >
                {editingId
                  ? isAr
                    ? "تعديل المنتج"
                    : "Edit Product"
                  : isAr
                    ? "إضافة منتج جديد"
                    : "Create New Product"}
              </h2>
              <button
                type="button"
                aria-label={isAr ? "إغلاق" : "Close"}
                onClick={() => !savingForm && setModalOpen(false)}
                style={{ background: "var(--cream)", border: 0, width: "34px", height: "34px", fontSize: "20px" }}
              >
                ×
              </button>
            </div>

            {formError && (
              <div
                role="alert"
                style={{
                  background: "#fdf2f2",
                  border: "1px solid #e7baba",
                  color: "#9b1c1c",
                  padding: "10px 14px",
                  borderRadius: "4px",
                  fontSize: "13px",
                  marginBottom: "16px",
                }}
              >
                {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} style={{ display: "grid", gap: "14px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "5px" }}>
                    {isAr ? "الاسم بالإنجليزية *" : "Product Name (English) *"}
                  </label>
                  <input
                    required
                    maxLength={120}
                    dir="ltr"
                    value={form.name}
                    onChange={(e) => {
                      const val = e.target.value;
                      setForm((prev) => ({
                        ...prev,
                        name: val,
                        slug: slugLocked ? prev.slug : slugifyClient(val),
                        tag: prev.tag || val.toUpperCase(),
                      }));
                    }}
                    style={{ width: "100%", padding: "10px", border: "1px solid #d5dcd4", borderRadius: "3px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "5px" }}>
                    {isAr ? "الاسم بالعربية *" : "Product Name (Arabic) *"}
                  </label>
                  <input
                    required
                    maxLength={120}
                    dir="rtl"
                    value={form.nameAr}
                    onChange={(e) => setForm({ ...form, nameAr: e.target.value })}
                    style={{ width: "100%", padding: "10px", border: "1px solid #d5dcd4", borderRadius: "3px" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "5px" }}>
                    {isAr ? "الرابط (Slug) *" : "URL Slug *"}
                  </label>
                  <input
                    required
                    maxLength={80}
                    dir="ltr"
                    value={form.slug}
                    onChange={(e) => {
                      setSlugLocked(true);
                      setForm({ ...form, slug: slugifyClient(e.target.value) });
                    }}
                    style={{ width: "100%", padding: "10px", border: "1px solid #d5dcd4", borderRadius: "3px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "5px" }}>
                    {isAr ? "القسم *" : "Category *"}
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value as "topping" | "fruit" })
                    }
                    style={{ width: "100%", padding: "10px", border: "1px solid #d5dcd4", borderRadius: "3px" }}
                  >
                    <option value="topping">{isAr ? "توبينج (Topping)" : "Topping"}</option>
                    <option value="fruit">{isAr ? "صوص فاكهة (Fruit)" : "Fruit sauce"}</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "5px" }}>
                    {isAr ? "الحالة" : "Status"}
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as ProductStatus })}
                    style={{ width: "100%", padding: "10px", border: "1px solid #d5dcd4", borderRadius: "3px" }}
                  >
                    <option value="published">{isAr ? "منشور" : "Published"}</option>
                    <option value="draft">{isAr ? "مسودة" : "Draft"}</option>
                    <option value="archived">{isAr ? "مؤرشف" : "Archived"}</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "5px" }}>
                    {isAr ? "الوسم (TAG) *" : "Badge Tag *"}
                  </label>
                  <input
                    required
                    maxLength={60}
                    dir="ltr"
                    value={form.tag}
                    onChange={(e) => setForm({ ...form, tag: e.target.value.toUpperCase() })}
                    style={{ width: "100%", padding: "10px", border: "1px solid #d5dcd4", borderRadius: "3px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "5px" }}>
                    {isAr ? "ترتيب العرض" : "Display Sort Order"}
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={9999}
                    value={form.sortOrder}
                    onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
                    style={{ width: "100%", padding: "10px", border: "1px solid #d5dcd4", borderRadius: "3px" }}
                  />
                </div>
              </div>

              {/* Image Upload Section (Supabase Storage — Upload Only) */}
              <div
                style={{
                  background: "var(--cream)",
                  border: "1px solid #e1dfd3",
                  borderRadius: "4px",
                  padding: "14px",
                }}
              >
                <label
                  htmlFor="admin-product-image-upload"
                  style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "8px" }}
                >
                  {isAr ? "رفع صورة المنتج *" : "Upload Product Image *"}
                </label>
                <div style={{ display: "flex", gap: "14px", alignItems: "center", flexWrap: "wrap" }}>
                  {form.image ? (
                    <img
                      src={form.image}
                      alt={form.name || "Product preview"}
                      style={{
                        width: "84px",
                        height: "84px",
                        objectFit: "contain",
                        background: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "84px",
                        height: "84px",
                        background: "#fff",
                        border: "1px dashed #c8cfc6",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        color: "#7a867b",
                        textAlign: "center",
                        padding: "6px",
                      }}
                    >
                      {isAr ? "لا توجد صورة" : "No image"}
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: "220px" }}>
                    <input
                      id="admin-product-image-upload"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      style={{ fontSize: "13px", marginBottom: "6px", display: "block" }}
                    />
                    <small style={{ color: "#647166", display: "block", fontSize: "11px" }}>
                      {isAr
                        ? "الصيغ المدعومة: JPG أو PNG أو WebP (الحد الأقصى ٤ ميجابايت). تُحفظ الصورة تلقائيًا في Supabase Storage."
                        : "Accepted formats: JPG, PNG, or WebP (max 4 MB). Uploaded directly to Supabase Storage."}
                    </small>
                    {uploading && (
                      <small style={{ color: "var(--green)", display: "block", marginTop: "6px", fontWeight: 600 }}>
                        {isAr ? "جاري رفع الصورة..." : "Uploading image..."}
                      </small>
                    )}
                    {!uploading && form.imagePath && (
                      <small style={{ color: "#137333", display: "block", marginTop: "6px", fontWeight: 600 }}>
                        {isAr ? "✓ تم رفع الصورة وحفظها" : "✓ Image uploaded"}
                      </small>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "5px" }}>
                    {isAr ? "الوصف المختصر بالإنجليزية *" : "Short Description (English) *"}
                  </label>
                  <textarea
                    required
                    rows={2}
                    dir="ltr"
                    value={form.desc}
                    onChange={(e) => setForm({ ...form, desc: e.target.value })}
                    style={{ width: "100%", padding: "10px", border: "1px solid #d5dcd4", borderRadius: "3px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "5px" }}>
                    {isAr ? "الوصف المختصر بالعربية *" : "Short Description (Arabic) *"}
                  </label>
                  <textarea
                    required
                    rows={2}
                    dir="rtl"
                    value={form.descAr}
                    onChange={(e) => setForm({ ...form, descAr: e.target.value })}
                    style={{ width: "100%", padding: "10px", border: "1px solid #d5dcd4", borderRadius: "3px" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "5px" }}>
                    {isAr ? "نبذة تفصيلية بالإنجليزية" : "Detailed Intro (English)"}
                  </label>
                  <textarea
                    rows={2}
                    dir="ltr"
                    value={form.intro}
                    onChange={(e) => setForm({ ...form, intro: e.target.value })}
                    style={{ width: "100%", padding: "10px", border: "1px solid #d5dcd4", borderRadius: "3px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "5px" }}>
                    {isAr ? "نبذة تفصيلية بالعربية" : "Detailed Intro (Arabic)"}
                  </label>
                  <textarea
                    rows={2}
                    dir="rtl"
                    value={form.introAr}
                    onChange={(e) => setForm({ ...form, introAr: e.target.value })}
                    style={{ width: "100%", padding: "10px", border: "1px solid #d5dcd4", borderRadius: "3px" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "5px" }}>
                    {isAr ? "الاستخدامات بالإنجليزية (مفصولة بفاصلة)" : "Applications EN (comma separated)"}
                  </label>
                  <input
                    dir="ltr"
                    value={form.uses}
                    onChange={(e) => setForm({ ...form, uses: e.target.value })}
                    placeholder="Milkshakes, Lattes, Cheesecakes"
                    style={{ width: "100%", padding: "10px", border: "1px solid #d5dcd4", borderRadius: "3px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "5px" }}>
                    {isAr ? "الاستخدامات بالعربية (مفصولة بفاصلة)" : "Applications AR (comma separated)"}
                  </label>
                  <input
                    dir="rtl"
                    value={form.usesAr}
                    onChange={(e) => setForm({ ...form, usesAr: e.target.value })}
                    style={{ width: "100%", padding: "10px", border: "1px solid #d5dcd4", borderRadius: "3px" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "5px" }}>
                    {isAr ? "فكرة التحضير والتقديم بالإنجليزية" : "Preparation Idea (English)"}
                  </label>
                  <textarea
                    rows={2}
                    dir="ltr"
                    value={form.method}
                    onChange={(e) => setForm({ ...form, method: e.target.value })}
                    style={{ width: "100%", padding: "10px", border: "1px solid #d5dcd4", borderRadius: "3px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "5px" }}>
                    {isAr ? "فكرة التحضير والتقديم بالعربية" : "Preparation Idea (Arabic)"}
                  </label>
                  <textarea
                    rows={2}
                    dir="rtl"
                    value={form.methodAr}
                    onChange={(e) => setForm({ ...form, methodAr: e.target.value })}
                    style={{ width: "100%", padding: "10px", border: "1px solid #d5dcd4", borderRadius: "3px" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "5px" }}>
                    {isAr ? "الوزن بالإنجليزية (اختياري)" : "Net Weight EN (optional)"}
                  </label>
                  <input
                    dir="ltr"
                    value={form.weight}
                    onChange={(e) => setForm({ ...form, weight: e.target.value })}
                    placeholder="e.g. 1.25 KG"
                    style={{ width: "100%", padding: "10px", border: "1px solid #d5dcd4", borderRadius: "3px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "5px" }}>
                    {isAr ? "الوزن بالعربية (اختياري)" : "Net Weight AR (optional)"}
                  </label>
                  <input
                    dir="rtl"
                    value={form.weightAr}
                    onChange={(e) => setForm({ ...form, weightAr: e.target.value })}
                    placeholder="مثال: ١٫٢٥٠ كجم"
                    style={{ width: "100%", padding: "10px", border: "1px solid #d5dcd4", borderRadius: "3px" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "10px" }}>
                <button
                  type="button"
                  className="btn outline"
                  disabled={savingForm}
                  onClick={() => setModalOpen(false)}
                >
                  {isAr ? "إلغاء" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="btn"
                  disabled={savingForm || uploading}
                >
                  {savingForm
                    ? isAr
                      ? "جاري الحفظ..."
                      : "Saving..."
                    : editingId
                      ? isAr
                        ? "حفظ التعديلات"
                        : "Save Changes"
                      : isAr
                        ? "إنشاء المنتج"
                        : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="admin-delete-title"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(12, 27, 20, 0.55)",
            zIndex: 1300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "6px",
              width: "100%",
              maxWidth: "440px",
              padding: "28px",
            }}
          >
            <h2 id="admin-delete-title" style={{ margin: "0 0 10px", fontSize: "20px", color: "#9b1c1c" }}>
              {isAr ? "تأكيد الحذف النهائي" : "Confirm Permanent Deletion"}
            </h2>
            <p style={{ fontSize: "13px", color: "#556056", lineHeight: 1.7, marginBottom: "22px" }}>
              {isAr
                ? `هل أنت متأكد من حذف المنتج "${deleteTarget.nameAr}" نهائيًا من قاعدة البيانات؟ يمكنك استخدام خيار الأرشفة لإخفائه مؤقتًا بدل الحذف.`
                : `Are you sure you want to permanently delete "${deleteTarget.name}" from PostgreSQL and Storage? You can Archive it instead if you want to keep it recoverable.`}
            </p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                type="button"
                className="btn outline"
                onClick={() => setDeleteTarget(null)}
              >
                {isAr ? "إلغاء" : "Cancel"}
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={busyId === deleteTarget.dbId}
                style={{
                  padding: "12px 18px",
                  background: "#9b1c1c",
                  color: "#fff",
                  border: "1px solid #9b1c1c",
                  borderRadius: "2px",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                {busyId === deleteTarget.dbId
                  ? isAr
                    ? "جاري الحذف..."
                    : "Deleting..."
                  : isAr
                    ? "حذف نهائي"
                    : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
