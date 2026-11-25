"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { worldCards } from "../../utils/referenceData";

export default function WorldPreview() {
  const { isAr } = useLanguage();

  return (
    <section className="world-preview">
      <span className="eyebrow">{isAr ? "عالم أكولة" : "The Akula world"}</span>
      <h2>
        {isAr
          ? "مجموعتان. عالم من النكهات."
          : "Two collections. A world of flavour."}
      </h2>
      <p>
        {isAr
          ? "توبينج للقهوة والحلويات، وصوصات فاكهة للمشروبات الباردة. اختر المجموعة المناسبة لقائمتك."
          : "Toppings for coffee and desserts. Fruit sauces for cold drinks. Find the collection for your menu."}
      </p>
      <Link className="btn outline" href="/products">
        {isAr ? "عرض كل المنتجات ←" : "View all products →"}
      </Link>

      <div className="world-cards">
        {worldCards.map((card, idx) => (
          <Link href={card.link} key={idx}>
            <img
              src={card.image}
              alt={isAr ? card.altAr : card.alt}
              loading="lazy"
              decoding="async"
            />
            <span>{isAr ? card.titleAr : card.title}</span>
            <small>{isAr ? card.subtitleAr : card.subtitle}</small>
          </Link>
        ))}
      </div>
    </section>
  );
}
