"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../../../context/LanguageContext";
import {
  contactDetails,
  type ProductItem,
  type FlavourProfile,
} from "../../../utils/referenceData";

interface ProductDetailClientProps {
  product: ProductItem;
  profile?: FlavourProfile;
  relatedProducts: ProductItem[];
}

export default function ProductDetailClient({
  product,
  profile,
  relatedProducts,
}: ProductDetailClientProps) {
  const { isAr } = useLanguage();

  const title = isAr ? product.nameAr : product.name;
  const desc = profile
    ? isAr
      ? profile.introAr
      : profile.intro
    : isAr
      ? product.descAr
      : product.desc;
  const uses = profile ? (isAr ? profile.usesAr : profile.uses) : [];
  const method = profile ? (isAr ? profile.methodAr : profile.method) : "";
  const weight = profile ? (isAr ? profile.weightAr : profile.weight) : (isAr ? "١٫٢٥٠ كجم" : "1.25 KG");
  const categoryLabel =
    product.category === "topping"
      ? isAr
        ? "توبينج فاخر"
        : "PREMIUM TOPPING"
      : isAr
        ? "صوص فاكهة طبيعي"
        : "NATURAL FRUIT SAUCE";

  const waMessage = encodeURIComponent(
    isAr
      ? `مرحبًا أكولة، استفسر عن مواصفات وتوريد: ${product.nameAr} (${weight}) والأسعار المتاحة.`
      : `Hello Akula, I want to enquire about supply and pricing for: ${product.name} (${weight}).`
  );
  const waUrl = `https://wa.me/${contactDetails.whatsappNumber}?text=${waMessage}`;

  return (
    <main className="section" style={{ minHeight: "85vh", paddingTop: "40px" }}>
      {/* Breadcrumbs Navigation */}
      <nav
        aria-label="Breadcrumb"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "12px",
          color: "#6e7770",
          marginBottom: "35px",
        }}
      >
        <Link href="/#home" style={{ color: "var(--green)", fontWeight: 500 }}>
          {isAr ? "الرئيسية" : "Home"}
        </Link>
        <span>/</span>
        <Link href="/products" style={{ color: "var(--green)", fontWeight: 500 }}>
          {isAr ? "المنتجات" : "Products"}
        </Link>
        <span>/</span>
        <Link
          href={`/products?category=${product.category}`}
          style={{ color: "var(--green)", fontWeight: 500 }}
        >
          {product.category === "topping"
            ? isAr
              ? "التوبينج"
              : "Toppings"
            : isAr
              ? "صوصات الفاكهة"
              : "Fruit Sauces"}
        </Link>
        <span>/</span>
        <span style={{ color: "var(--ink)", fontWeight: 600 }}>{title}</span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "48px",
          alignItems: "start",
          background: "#fff",
          border: "1px solid #eee",
          borderRadius: "4px",
          padding: "36px",
          marginBottom: "60px",
        }}
      >
        {/* Left Column: Image & Badges */}
        <div style={{ textAlign: "center", position: "relative" }}>
          <div
            style={{
              background: "var(--cream)",
              padding: "30px",
              borderRadius: "4px",
              border: "1px solid #ebe9df",
            }}
          >
            <img
              src={`/assets/${product.slug}.jpg`}
              alt={title}
              style={{
                width: "100%",
                maxHeight: "440px",
                objectFit: "contain",
                display: "block",
                margin: "0 auto",
                transition: "transform 0.3s ease",
              }}
              loading="eager"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              marginTop: "16px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                padding: "4px 10px",
                background: "var(--green)",
                color: "#fff",
                borderRadius: "2px",
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              {categoryLabel}
            </span>
            <span
              style={{
                fontSize: "11px",
                padding: "4px 10px",
                background: "#f0f4ee",
                color: "var(--green)",
                borderRadius: "2px",
                fontWeight: 600,
                border: "1px solid #d5dfd3",
              }}
            >
              {isAr ? "مكونات طبيعية ١٠٠٪" : "100% Natural Origins"}
            </span>
            <span
              style={{
                fontSize: "11px",
                padding: "4px 10px",
                background: "#fdf8ef",
                color: "var(--gold)",
                borderRadius: "2px",
                fontWeight: 600,
                border: "1px solid #e7d8be",
              }}
            >
              {weight}
            </span>
          </div>
        </div>

        {/* Right Column: Information, Specs, Recipe & CTAs */}
        <div>
          <span
            className="eyebrow"
            dir="ltr"
            style={{ marginBottom: "8px", display: "inline-block" }}
          >
            {product.tag} · AKULA TOPPING
          </span>

          <h1
            style={{
              fontSize: "clamp(26px, 3.5vw, 40px)",
              fontWeight: 600,
              color: "var(--ink)",
              margin: "0 0 16px",
              lineHeight: 1.3,
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: "15px",
              lineHeight: 2,
              color: "#556056",
              marginBottom: "28px",
            }}
          >
            {desc}
          </p>

          {/* Recommended Applications */}
          {uses.length > 0 && (
            <div style={{ marginBottom: "28px" }}>
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--green)",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "12px",
                }}
              >
                {isAr ? "الاستخدامات الموصى بها في القائمة:" : "Recommended Applications:"}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {uses.map((useItem, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: "12px",
                      padding: "6px 14px",
                      background: "var(--cream)",
                      color: "var(--ink)",
                      borderRadius: "20px",
                      border: "1px solid #e6e3d7",
                    }}
                  >
                    ✓ {useItem}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Serving / Recipe Box */}
          {method && (
            <div
              style={{
                background: "var(--cream)",
                borderLeft: isAr ? "none" : "4px solid var(--gold)",
                borderRight: isAr ? "4px solid var(--gold)" : "none",
                padding: "16px 20px",
                borderRadius: "2px",
                marginBottom: "28px",
              }}
            >
              <h4
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--ink)",
                  margin: "0 0 8px",
                }}
              >
                {isAr ? "فكرة تحضير وتقديم المقاهي:" : "Serving & Preparation Idea:"}
              </h4>
              <p
                style={{
                  fontSize: "13px",
                  lineHeight: 1.8,
                  color: "#647166",
                  margin: 0,
                }}
              >
                {method}
              </p>
            </div>
          )}

          {/* Specifications Table */}
          <div
            style={{
              borderTop: "1px solid #eee",
              borderBottom: "1px solid #eee",
              padding: "16px 0",
              marginBottom: "32px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px",
              fontSize: "12px",
            }}
          >
            <div>
              <span style={{ color: "#8a968a", display: "block" }}>
                {isAr ? "العبوة والوزن الصافي" : "Net Weight / Volume"}
              </span>
              <strong style={{ color: "var(--ink)", fontSize: "14px" }}>{weight}</strong>
            </div>
            <div>
              <span style={{ color: "#8a968a", display: "block" }}>
                {isAr ? "نوع العبوة" : "Packaging Format"}
              </span>
              <strong style={{ color: "var(--ink)", fontSize: "14px" }}>
                {isAr ? "زجاجة ضغط مع فوهة دقيقة" : "Squeeze Bottle w/ Nozzle"}
              </strong>
            </div>
            <div>
              <span style={{ color: "#8a968a", display: "block" }}>
                {isAr ? "مدة الصلاحية" : "Shelf Life"}
              </span>
              <strong style={{ color: "var(--ink)", fontSize: "14px" }}>
                {isAr ? "١٨ شهرًا من تاريخ الإنتاج" : "18 Months"}
              </strong>
            </div>
            <div>
              <span style={{ color: "#8a968a", display: "block" }}>
                {isAr ? "بلد المنشأ" : "Country of Origin"}
              </span>
              <strong style={{ color: "var(--ink)", fontSize: "14px" }}>
                {isAr ? "جمهورية مصر العربية" : "Egypt"}
              </strong>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <a
              className="btn"
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ flex: 1, minWidth: "200px" }}
            >
              {isAr ? "اطلب عبر واتساب ↗" : "Order on WhatsApp ↗"}
            </a>
            <Link
              className="btn outline"
              href="/contact"
              style={{ minWidth: "160px" }}
            >
              {isAr ? "استفسار توريد وتوزيع" : "Distribution enquiry"}
            </Link>
          </div>

          <div style={{ marginTop: "20px" }}>
            <Link
              href="/products"
              className="text-link"
              style={{ fontSize: "12px", color: "var(--green)" }}
            >
              {isAr ? "← العودة إلى قائمة المنتجات الكاملة" : "← Back to all products"}
            </Link>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section style={{ marginTop: "40px" }}>
          <div className="section-head" style={{ marginBottom: "25px" }}>
            <div>
              <span className="eyebrow" dir="ltr">
                {product.category === "topping" ? "TOPPINGS" : "FRUIT SAUCES"}
              </span>
              <h2>{isAr ? "منتجات مشابهة من نفس المجموعة" : "Related Flavours"}</h2>
            </div>
            <Link className="btn outline" href={`/products?category=${product.category}`}>
              {isAr ? "عرض كل المجموعة ←" : "View collection →"}
            </Link>
          </div>

          <div className="flavors">
            {relatedProducts.map((rel) => (
              <article className="flavor has-image" key={rel.slug}>
                <Link href={`/products/${rel.slug}`} style={{ display: "block" }}>
                  <img
                    className="product-image"
                    src={`/assets/${rel.slug}.jpg`}
                    loading="lazy"
                    decoding="async"
                    alt={`Akula ${rel.name}`}
                  />
                  <span>{rel.tag}</span>
                  <h3>{isAr ? rel.nameAr : rel.name}</h3>
                  <p>{isAr ? rel.descAr : rel.desc}</p>
                </Link>
                <div style={{ marginTop: "12px" }}>
                  <Link
                    href={`/products/${rel.slug}`}
                    className="text-link"
                    style={{ fontSize: "12px", color: "var(--green)" }}
                  >
                    {isAr ? "عرض التفاصيل الكاملة ←" : "View details →"}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
