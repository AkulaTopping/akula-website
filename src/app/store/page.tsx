"use client";

import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { productsData, contactDetails } from "../../utils/referenceData";

export default function StorePage() {
  const { isAr } = useLanguage();
  const [activeTab, setActiveTab] = useState<"all" | "topping" | "fruit">("all");

  const filtered = productsData.filter(
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
          {isAr ? "جميع المنتجات (١٥)" : "All products (15)"}
        </button>
        <button
          type="button"
          className={`category ${activeTab === "topping" ? "active" : ""}`}
          onClick={() => setActiveTab("topping")}
        >
          {isAr ? "التوبينج (٤)" : "Toppings (4)"}
        </button>
        <button
          type="button"
          className={`category ${activeTab === "fruit" ? "active" : ""}`}
          onClick={() => setActiveTab("fruit")}
        >
          {isAr ? "صوصات الفاكهة (١١)" : "Fruit sauces (11)"}
        </button>
      </div>

      <div className="flavors" style={{ marginTop: "30px" }}>
        {filtered.map((product) => (
          <article className="flavor has-image" key={product.slug} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <img
                className="product-image"
                src={`/assets/${product.slug}.jpg`}
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
        ))}
      </div>
    </main>
  );
}
