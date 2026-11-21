"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { useDetailModal } from "../../context/DetailModalContext";
import { journalArticlesData, type JournalArticle } from "../../utils/referenceData";

export default function JournalSection() {
  const { isAr } = useLanguage();
  const { openModal } = useDetailModal();

  function handleReadArticle(article: JournalArticle) {
    openModal({
      title: isAr ? article.titleAr : article.title,
      eyebrow: isAr ? article.categoryAr : article.category,
      image: article.image,
      body: `${isAr ? article.excerptAr : article.excerpt}\n\n${isAr ? article.contentAr : article.content}`,
      whatsappText: isAr
        ? `مرحبًا أكولة، استفسر عن مقال: ${article.titleAr}`
        : `Hello Akula, I want to inquire about article: ${article.title}`,
    });
  }

  return (
    <section className="journal-section">
      <div className="section-head" style={{ maxWidth: "1440px", margin: "0 auto 38px", padding: "0 6%" }}>
        <div>
          <span className="eyebrow" dir="ltr">
            {isAr ? "مجلة أكولة" : "THE AKULA JOURNAL"}
          </span>
          <h2>{isAr ? "أحدث المقالات والأفكار" : "Latest from Akula"}</h2>
        </div>
        <Link className="btn outline" href="/journal">
          {isAr ? "جميع المقالات ←" : "All articles →"}
        </Link>
      </div>

      <div className="journal-track" style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 6%" }}>
        {journalArticlesData.map((article) => (
          <article className="journal-card" key={article.id}>
            <img
              src={article.image}
              alt={isAr ? article.titleAr : article.title}
              loading="lazy"
              decoding="async"
            />
            <div className="journal-card-copy">
              <span className="eyebrow">
                {isAr ? article.categoryAr : article.category}
              </span>
              <h3>{isAr ? article.titleAr : article.title}</h3>
              <p>{isAr ? article.excerptAr : article.excerpt}</p>
              <button
                type="button"
                onClick={() => handleReadArticle(article)}
                data-blog={article.id}
              >
                {isAr ? "اقرأ المزيد ←" : "Read more →"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
