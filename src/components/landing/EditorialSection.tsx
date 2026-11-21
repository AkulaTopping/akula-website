"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useDetailModal } from "../../context/DetailModalContext";
import { editorialFlavours, productsData, flavourProfilesData } from "../../utils/referenceData";

export default function EditorialSection() {
  const { isAr } = useLanguage();
  const { openModal } = useDetailModal();

  function handleDiscover(productId: number) {
    const product = productsData.find((p) => p.id === productId);
    if (!product) return;
    const profile = flavourProfilesData[product.slug];
    const title = isAr ? product.nameAr : product.name;
    const intro = profile ? (isAr ? profile.introAr : profile.intro) : (isAr ? product.descAr : product.desc);
    const uses = profile
      ? (isAr ? profile.usesAr : profile.uses).map((u) => `• ${u}`).join("\n")
      : "";
    const method = profile
      ? (isAr ? `طريقة التحضير:\n${profile.methodAr}` : `Preparation idea:\n${profile.method}`)
      : "";

    openModal({
      title,
      slug: product.slug,
      eyebrow: "THE FLAVOUR EDIT",
      image: `/assets/${product.slug}.jpg`,
      body: [intro, uses ? `\n${isAr ? "الاستخدامات الموصى بها:" : "Recommended applications:"}\n${uses}` : "", method].filter(Boolean).join("\n\n"),
      whatsappText: isAr
        ? `مرحبًا أكولة، استفسر عن مواصفات وتوريد: ${product.nameAr}`
        : `Hello Akula, I want to inquire about supply and specs for: ${product.name}`,
    });
  }

  return (
    <section className="editorial section">
      <span className="eyebrow">
        {isAr ? "اختيارات من أكولة" : "THE FLAVOUR EDIT"}
      </span>
      <h2>
        {isAr
          ? "نكهات تستحق أن تكون في قائمتك"
          : "Flavours for your signature menu"}
      </h2>
      <p className="sub editorial-intro">
        {isAr
          ? "اكتشف النكهة واستخداماتها، واختر اللمسة المناسبة لوصفاتك."
          : "Explore each flavour and its applications to find your next finishing touch."}
      </p>

      <div className="editorial-grid">
        {editorialFlavours.map((item) => (
          <article className={`editorial-card ${item.accent}`} key={item.productId}>
            <img
              src={item.image}
              alt={isAr ? item.titleAr : item.title}
              loading="lazy"
              decoding="async"
            />
            <div>
              <h3>{isAr ? item.titleAr : item.title}</h3>
              <p>{isAr ? item.descAr : item.desc}</p>
              <button
                type="button"
                onClick={() => handleDiscover(item.productId)}
                data-product={item.productId}
              >
                {isAr ? "اكتشف النكهة ←" : "Discover the flavour →"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

