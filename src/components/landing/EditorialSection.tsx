"use client";

import React, { useMemo } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useDetailModal } from "../../context/DetailModalContext";
import {
  editorialFlavours,
  productsData,
  flavourProfilesData,
  type ProductItem,
} from "../../utils/referenceData";

interface EditorialSectionProps {
  initialProducts?: ProductItem[];
}

export default function EditorialSection({ initialProducts }: EditorialSectionProps) {
  const { isAr } = useLanguage();
  const { openModal } = useDetailModal();

  const products = initialProducts ?? productsData;

  const visibleCards = useMemo(() => {
    return editorialFlavours
      .map((item) => {
        const matched = products.find((p) => p.slug === item.slug);
        if (initialProducts && !matched) {
          return null;
        }
        return {
          ...item,
          product: matched,
          title: matched?.name || item.title,
          titleAr: matched?.nameAr || item.titleAr,
          desc: matched?.desc || item.desc,
          descAr: matched?.descAr || item.descAr,
          image: matched?.image || item.image,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);
  }, [products, initialProducts]);

  function handleDiscover(slug: string) {
    const product = products.find((p) => p.slug === slug);
    if (!product) return;
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

    openModal({
      title,
      slug: product.slug,
      eyebrow: "THE FLAVOUR EDIT",
      image: product.image || `/assets/${product.slug}.jpg`,
      body: [
        intro,
        uses ? `\n${isAr ? "الاستخدامات الموصى بها:" : "Recommended applications:"}\n${uses}` : "",
        method,
      ]
        .filter(Boolean)
        .join("\n\n"),
      whatsappText: isAr
        ? `مرحبًا أكولة، استفسر عن مواصفات وتوريد: ${product.nameAr}`
        : `Hello Akula, I want to inquire about supply and specs for: ${product.name}`,
    });
  }

  if (visibleCards.length === 0) {
    return null;
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
        {visibleCards.map((item) => (
          <article className={`editorial-card ${item.accent}`} key={item.slug}>
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
                onClick={() => handleDiscover(item.slug)}
                data-product={item.product?.id ?? item.productId}
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
