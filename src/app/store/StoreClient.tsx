"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { contactDetails, type ProductItem } from "../../utils/referenceData";

function toArDigits(n: number): string {
  return String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)] || d);
}

export default function StoreClient({ initialProducts }: { initialProducts: ProductItem[] }) {
  const { isAr } = useLanguage();
  const [activeTab, setActiveTab] = useState<"all" | "topping" | "fruit">("all");

  const counts = useMemo(() => {
    const topping = initialProducts.filter((p) => p.category === "topping").length;
    const fruit = initialProducts.filter((p) => p.category === "fruit").length;
    return { total: initialProducts.length, topping, fruit };
  }, [initialProducts]);

  const filtered = initialProducts.filter(
    (p) => activeTab === "all" || p.category === activeTab
  );

  function handleOrder(productName: string) {
    const text = isAr
      ? `مرحبًا أكولة، أرغب في طلب كميات من: ${productName}`
      : `Hello Akula, I want to place an order for: ${productName}`;
    window.open(
      `https://wa.me/${contactDetails.whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  }

  return (
    <main className="section" style={{ minHeight: "80vh", paddingTop: "50px" }}>
      <div className="section-head">
        <div>
          <span className="eyebrow" dir="ltr">
            {isAr ? "متجر المبيعات والطلبات" : "AKULA SALES STORE"}
          </span>
          <h2>{isAr ? "الطلب والتوريد المباشر" : "Direct Orders & Supply"}</h2>
          <p className="sub" style={{ marginTop: "8px" }}>
            {isAr
              ? "اختر النكهات والكميات المطلوبة لكافيهك أو مشروعك، واطلب مباشرة عبر فريق مبيعات أكولة على واتساب."
              : "Select your desired toppings and fruit sauces, and order directly via Akula sales team on WhatsApp."}
          </p>
        </div>
      </div>

      <div className="categories" role="tablist">
        <button
          type="button"
          className={`category ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          {isAr
            ? `جميع المنتجات (${toArDigits(counts.total)})`
            : `All products (${counts.total})`}
        </button>
        <button
          type="button"
          className={`category ${activeTab === "topping" ? "active" : ""}`}
          onClick={() => setActiveTab("topping")}
        >
          {isAr
            ? `التوبينج (${toArDigits(counts.topping)})`
            : `Toppings (${counts.topping})`}
        </button>
        <button
          type="button"
          className={`category ${activeTab === "fruit" ? "active" : ""}`}
          onClick={() => setActiveTab("fruit")}
        >
          {isAr
            ? `صوصات الفاكهة (${toArDigits(counts.fruit)})`
            : `Fruit sauces (${counts.fruit})`}
        </button>
      </div>

      <div className="flavors" style={{ marginTop: "30px" }}>
        {filtered.length === 0 ? (
          <p className="empty" style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
            {isAr ? "لا توجد منتجات متاحة حاليًا." : "No products available at the moment."}
          </p>
        ) : (
          filtered.map((product) => (
            <article
              className="flavor has-image"
              key={product.slug}
              style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            >
              <div>
                <img
                  className="product-image"
                  src={product.image || `/assets/${product.slug}.jpg`}
                  loading="lazy"
                  decoding="async"
                  alt={isAr ? product.nameAr : product.name}
                />
                <span>{product.tag}</span>
                <h3>{isAr ? product.nameAr : product.name}</h3>
                <p>{isAr ? product.descAr : product.desc}</p>
              </div>
              <button
                type="button"
                className="btn"
                onClick={() => handleOrder(isAr ? product.nameAr : product.name)}
                style={{
                  width: "100%",
                  marginTop: "16px",
                  padding: "12px",
                  fontSize: "12px",
                  background: "var(--green)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
              >
                {isAr ? "اطلب عبر واتساب ↗" : "Order on WhatsApp ↗"}
              </button>
            </article>
          ))
        )}
      </div>
    </main>
  );
}
