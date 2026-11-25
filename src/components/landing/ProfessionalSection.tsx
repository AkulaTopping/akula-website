"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { professionalApplications } from "../../utils/referenceData";

export default function ProfessionalSection() {
  const { isAr } = useLanguage();

  return (
    <section className="akula-professional">
      <div className="akula-professional-inner">
        <div className="akula-professional-heading">
          <div>
            <span className="eyebrow" dir="ltr">
              FOR THE PROFESSIONALS
            </span>
            <h2
              dangerouslySetInnerHTML={{
                __html: isAr
                  ? "شريك النكهة.<br>لكل تفاصيل قائمتك."
                  : "A flavour partner.<br>For every part of your menu.",
              }}
            />
          </div>
          <p>
            {isAr
              ? "اختر النكهة حسب الاستخدام، من أول فنجان قهوة إلى آخر لمسة على الحلوى."
              : "Explore the collection by application, from your morning coffee to the final touch on dessert."}
          </p>
        </div>

        <div className="akula-applications">
          {professionalApplications.map((app, idx) => (
            <Link className="akula-application" href={app.link} key={idx}>
              <img
                src={app.image}
                loading="lazy"
                decoding="async"
                alt={isAr ? app.titleAr : app.title}
              />
              <small dir="ltr">{`${app.num} · ${app.tag}`}</small>
              <h3>{isAr ? app.titleAr : app.title}</h3>
              <p>{isAr ? app.descAr : app.desc}</p>
              <span>{isAr ? "اكتشف أفكار التقديم ↖" : "Explore the possibilities ↗"}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
