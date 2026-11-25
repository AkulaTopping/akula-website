"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { useDetailModal } from "../../context/DetailModalContext";
import { productsData, flavourProfilesData, type ProductItem } from "../../utils/referenceData";

function toArDigits(n: number): string {
  return String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)] || d);
}

interface ProductsSectionProps {
  initialProducts?: ProductItem[];
}

export default function ProductsSection({ initialProducts }: ProductsSectionProps) {
  const { isAr } = useLanguage();
  const { openModal } = useDetailModal();
  const [activeCategory, setActiveCategory] = useState<"all" | "topping" | "fruit">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const products = initialProducts ?? productsData;

  const counts = useMemo(() => {
    const topping = products.filter((p) => p.category === "topping").length;
    const fruit = products.filter((p) => p.category === "fruit").length;
    return { total: products.length, topping, fruit };
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        activeCategory === "all" || p.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.nameAr.includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.descAr.includes(q) ||
        p.tag.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  function handleProductDetails(product: ProductItem) {
    const profile = product.profile ?? flavourProfilesData[product.slug];
    const title = isAr ? product.nameAr : product.name;
    const intro = profile
      ? isAr
        ? profile.introAr
        : profile.intro
      : isAr
        ? product.descAr
        : product.desc;
    const uses = profile
      ? (isAr ? profile.usesAr : profile.uses).map((u) => `• ${u}`).join("\n")
      : "";
    const method =
      profile && (isAr ? profile.methodAr : profile.method)
        ? isAr
          ? `طريقة التحضير:\n${profile.methodAr}`
          : `Preparation idea:\n${profile.method}`
        : "";
    const weight =
      profile && (isAr ? profile.weightAr : profile.weight)
        ? isAr
          ? `العبوة: ${profile.weightAr}`
          : `Weight: ${profile.weight}`
        : "";

    const bodyParts = [
      intro,
      uses ? `\n${isAr ? "الاستخدامات الموصى بها:" : "Recommended applications:"}\n${uses}` : "",
      method,
      weight,
    ].filter(Boolean);

    openModal({
      title,
      slug: product.slug,
      eyebrow: "AKULA TOPPING",
      image: product.image || `/assets/${product.slug}.jpg`,
      body: bodyParts.join("\n\n"),
      whatsappText: isAr
        ? `مرحبًا أكولة، استفسر عن مواصفات وتوريد: ${product.nameAr}`
        : `Hello Akula, I want to inquire about supply and specs for: ${product.name}`,
    });
  }

  return (
    <section className="section" id="products">
      <div className="section-head">
        <div>
          <span className="eyebrow" dir="ltr">
            {isAr ? "كتالوج المنتجات" : "FIND YOUR FLAVOUR"}
          </span>
          <h2>
            {isAr
              ? `${toArDigits(counts.total)} نكهة مميزة`
              : `${counts.total} signature flavours`}
          </h2>
        </div>
        <div style={{ maxWidth: "300px", width: "100%" }}>
          <input
            id="search"
            type="search"
            placeholder={isAr ? "ابحث عن نكهة..." : "Search flavours..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 14px",
              border: "1px solid #d9dfd7",
              borderRadius: "20px",
              fontSize: "13px",
              outline: "none",
            }}
          />
        </div>
      </div>

      <div className="categories" role="tablist">
        <button
          type="button"
          className={`category ${activeCategory === "all" ? "active" : ""}`}
          onClick={() => setActiveCategory("all")}
          aria-pressed={activeCategory === "all"}
        >
          {isAr
            ? `كل النكهات (${toArDigits(counts.total)})`
            : `All flavours (${counts.total})`}
        </button>
        <button
          type="button"
          className={`category ${activeCategory === "topping" ? "active" : ""}`}
          onClick={() => setActiveCategory("topping")}
          aria-pressed={activeCategory === "topping"}
        >
          {isAr
            ? `التوبينج (${toArDigits(counts.topping)})`
            : `Toppings (${counts.topping})`}
        </button>
        <button
          type="button"
          className={`category ${activeCategory === "fruit" ? "active" : ""}`}
          onClick={() => setActiveCategory("fruit")}
          aria-pressed={activeCategory === "fruit"}
        >
          {isAr
            ? `صوصات الفاكهة (${toArDigits(counts.fruit)})`
            : `Fruit sauces (${counts.fruit})`}
        </button>
      </div>

      <div className="flavors" id="catalog">
        {filteredProducts.length === 0 ? (
          <p className="empty" style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
            {isAr ? "لا توجد نتائج مطابقة. جرب نكهة أخرى." : "No results. Try another flavour."}
          </p>
        ) : (
          filteredProducts.map((p, index) => {
            const isFirstInGroup =
              activeCategory === "all" &&
              (index === 0 || p.category !== filteredProducts[index - 1].category);
            const imgSrc = p.image || `/assets/${p.slug}.jpg`;

            return (
              <React.Fragment key={p.slug}>
                {isFirstInGroup && (
                  <h3
                    className="catalog-group"
                    style={{
                      gridColumn: "1 / -1",
                      marginTop: index === 0 ? "0" : "30px",
                      marginBottom: "15px",
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "var(--green)",
                      borderBottom: "1px solid #e2e8f0",
                      paddingBottom: "8px",
                    }}
                  >
                    {p.category === "topping"
                      ? isAr
                        ? "التوبينج (شيكولاته، كراميل، وحليب)"
                        : "Toppings"
                      : isAr
                        ? "صوصات الفواكه الطبيعية"
                        : "Fruit sauces"}
                  </h3>
                )}
                <article className="flavor has-image">
                  <Link href={`/products/${p.slug}`} style={{ display: "block", color: "inherit", textDecoration: "none" }}>
                    <img
                      className="product-image"
                      src={imgSrc}
                      loading="lazy"
                      decoding="async"
                      alt={`Akula ${p.name}`}
                    />
                    <span>{p.tag}</span>
                    <h3>{isAr ? p.nameAr : p.name}</h3>
                    <p>{isAr ? p.descAr : p.desc}</p>
                  </Link>
                  <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "10px" }}>
                    <button
                      type="button"
                      onClick={() => handleProductDetails(p)}
                      data-product={p.id}
                    >
                      {isAr ? "نظرة سريعة" : "Quick preview"}
                    </button>
                    <Link
                      href={`/products/${p.slug}`}
                      style={{
                        fontSize: "12px",
                        color: "var(--green)",
                        borderBottom: "1px solid #d1d8cf",
                        padding: "5px",
                        fontWeight: 600,
                      }}
                    >
                      {isAr ? "صفحة المنتج ←" : "Full details →"}
                    </Link>
                  </div>
                </article>
              </React.Fragment>
            );
          })
        )}
      </div>
    </section>
  );
}
