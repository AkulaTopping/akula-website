"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { partnershipsData, contactDetails } from "../../utils/referenceData";

export default function PartnersPage() {
  const { isAr } = useLanguage();

  return (
    <main className="partner-page" style={{ minHeight: "80vh", paddingTop: "50px" }}>
      <section className="partner-intro">
        <span className="eyebrow" dir="ltr">
          {isAr ? partnershipsData.eyebrowAr : partnershipsData.eyebrow}
        </span>
        <h1>{isAr ? partnershipsData.titleAr : partnershipsData.title}</h1>
        <p>{isAr ? partnershipsData.descAr : partnershipsData.desc}</p>
        <div className="partner-actions">
          <Link className="btn" href="/contact">
            {isAr ? "كن شريكًا لنا ←" : "Become a partner →"}
          </Link>
          <Link className="btn outline" href="/products">
            {isAr ? "استكشف المنتجات" : "Explore products"}
          </Link>
        </div>
      </section>

      <div className="partner-benefits">
        {partnershipsData.benefits.map((benefit, idx) => (
          <article key={idx}>
            <span>{`0${idx + 1}`}</span>
            <h2>{isAr ? benefit.titleAr : benefit.title}</h2>
            <p>{isAr ? benefit.descAr : benefit.desc}</p>
          </article>
        ))}
      </div>

      <section className="partner-contact-strip">
        <h2>{isAr ? "دعنا نتحدث عن مشروعك واحتياجاتك" : "Let’s discuss your project"}</h2>
        <a
          href={`https://wa.me/${contactDetails.whatsappNumber}?text=${encodeURIComponent(
            isAr
              ? "مرحبًا أكولة، أرغب في الاستفسار عن الشراكة وتوريد المنتجات"
              : "Hello Akula, I want to discuss partnership and supply opportunities."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {isAr ? (
            <>
              تواصل معنا على واتساب · <bdi>{contactDetails.tel}</bdi> ↗
            </>
          ) : (
            <>
              Contact us on WhatsApp · <bdi>{contactDetails.tel}</bdi> ↗
            </>
          )}
        </a>
      </section>
    </main>
  );
}
