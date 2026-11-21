"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { comingSoonItems, comingSoonLines } from "../../utils/referenceData";

export default function ComingSoonSection() {
  const { isAr } = useLanguage();

  const comingSoonDescriptions: Record<string, { en: string; ar: string }> = {
    "Pistachio topping": {
      en: "A pistachio touch for drinks and desserts.",
      ar: "لمسة فستق للمشروبات والحلويات.",
    },
    "Espresso topping": {
      en: "Coffee flavour for new menu ideas.",
      ar: "نكهة قهوة لأفكار جديدة في قائمتك.",
    },
    "White chocolate topping": {
      en: "A white chocolate touch for drinks and desserts.",
      ar: "لمسة شيكولاتة بيضاء للمشروبات والحلوى.",
    },
    "Lotus topping": {
      en: "Lotus flavour for milkshakes and desserts.",
      ar: "نكهة اللوتس للميلك شيك والحلويات.",
    },
  };

  return (
    <section className="akula-coming" id="coming-soon" aria-label="Coming soon from Akula">
      <div className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow" lang="en" dir="ltr">
              THE NEXT CHAPTER
            </span>
            <h2>{isAr ? "قريبًا من أكولة" : "Coming soon from Akula"}</h2>
            <p className="coming-intro">
              {isAr
                ? "نكهات جديدة، ومساحة أكبر للإبداع. اكتشف التوبينج القادم، وترقّب مجموعات البودر والسيرب من أكولة."
                : "New flavours. More ways to create. Discover our upcoming toppings, with powder and syrup ranges on the way."}
            </p>
          </div>
        </div>

        <div className="coming-grid">
          {comingSoonItems.map((item, idx) => {
            const desc = comingSoonDescriptions[item.title];
            return (
              <article className="coming-card" key={idx}>
                <span className="coming-badge">{isAr ? "قريبًا" : "Coming soon"}</span>
                <img
                  src={item.image}
                  alt={isAr ? item.titleAr : item.title}
                  width="900"
                  height="900"
                  loading="lazy"
                  decoding="async"
                />
                <h3>{isAr ? item.titleAr : item.title}</h3>
                <p>{desc ? (isAr ? desc.ar : desc.en) : ""}</p>
              </article>
            );
          })}
        </div>

        <div className="coming-lines">
          {comingSoonLines.map((line, idx) => (
            <article className="coming-line" key={idx}>
              <span className="coming-badge">{isAr ? line.badgeAr : line.badge}</span>
              <h3>{isAr ? line.titleAr : line.title}</h3>
              <p>{isAr ? line.descAr : line.desc}</p>
              <small lang="en" dir="ltr">
                {line.sub}
              </small>
            </article>
          ))}
        </div>

        <p className="coming-note">
          {isAr
            ? "سيتم الإعلان عن تفاصيل الإطلاق وتوافر المنتجات قريبًا."
            : "Launch details and availability will be announced soon."}
        </p>
      </div>
    </section>
  );
}
