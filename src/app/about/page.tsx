"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { aboutContent } from "../../utils/referenceData";

export default function AboutPage() {
  const { isAr } = useLanguage();

  return (
    <main className="about-page">
      <div className="about-layout">
        <div className="about-copy">
          <section className="about-intro">
            <span className="eyebrow">
              {isAr ? aboutContent.eyebrowAr : aboutContent.eyebrow}
            </span>
            <h1>
              {isAr ? (
                <>
                  {aboutContent.headingPrimaryAr}
                  <br />
                  <em>{aboutContent.headingSecondaryAr}</em>
                </>
              ) : (
                <>
                  {aboutContent.headingPrimary}
                  <br />
                  <em>{aboutContent.headingSecondary}</em>
                </>
              )}
            </h1>
            <p>{isAr ? aboutContent.introAr : aboutContent.intro}</p>
          </section>

          <section className="about-evolution">
            <h2>{isAr ? aboutContent.evolutionTitleAr : aboutContent.evolutionTitle}</h2>
            <p>{isAr ? aboutContent.evolutionP1Ar : aboutContent.evolutionP1}</p>
            <p>{isAr ? aboutContent.evolutionP2Ar : aboutContent.evolutionP2}</p>
            <p>{isAr ? aboutContent.evolutionP3Ar : aboutContent.evolutionP3}</p>

            <div className="about-stats">
              <div>
                <strong dir="ltr">{aboutContent.stat1Num}</strong>
                <span>{isAr ? aboutContent.stat1LabelAr : aboutContent.stat1Label}</span>
              </div>
              <div>
                <strong dir="ltr">{aboutContent.stat2Num}</strong>
                <span>{isAr ? aboutContent.stat2LabelAr : aboutContent.stat2Label}</span>
              </div>
            </div>

            <figure className="distribution" style={{ maxWidth: "760px", marginInline: "auto" }}>
              <a
                href="https://wa.me/201050677740"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={isAr ? "تواصل مع مبيعات أكولة على واتساب" : "Contact Akula sales on WhatsApp"}
                style={{ display: "block" }}
              >
                <img
                  src={aboutContent.mapImage}
                  width="1024"
                  height="1536"
                  alt={
                    isAr
                      ? "أكولة أقرب لك في كل محافظة — خريطة محافظات مصر السبع والعشرين"
                      : "Akula is closer to you across all 27 Egypt governorates"
                  }
                  loading="lazy"
                  decoding="async"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "auto",
                    maxHeight: "none",
                    objectFit: "contain",
                  }}
                />
              </a>
            </figure>
          </section>

          <section className="about-essence">
            <span className="eyebrow">
              {isAr ? aboutContent.essenceTitleAr : aboutContent.essenceTitle}
            </span>
            <blockquote>
              {isAr ? aboutContent.essenceQuoteAr : aboutContent.essenceQuote}
            </blockquote>
          </section>
        </div>

        <aside className="about-visual">
          <img
            data-image-slot="asset:about-showcase.webp"
            src={aboutContent.showcaseImage}
            width="2688"
            height="1536"
            alt="Akula Topping surrounded by fruit, chocolate and caramel flavours"
            loading="lazy"
            decoding="async"
          />
          <div className="about-visual-caption">
            <span dir="ltr">AKULA TOPPING</span>
            <p>
              {isAr ? (
                <>
                  من وحي الطبيعة.
                  <br />
                  بأعلى معايير الجودة.
                </>
              ) : (
                <>
                  Defined by nature.
                  <br />
                  Refined by quality.
                </>
              )}
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
