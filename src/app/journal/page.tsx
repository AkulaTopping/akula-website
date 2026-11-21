"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useDetailModal } from "../../context/DetailModalContext";
import { journalArticlesData, type JournalArticle } from "../../utils/referenceData";

export default function JournalPage() {
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
    <main className="journal-page" style={{ minHeight: "80vh", paddingTop: "50px", maxWidth: "1200px", margin: "0 auto", paddingInline: "6%" }}>
      <h1 style={{ fontSize: "36px", fontWeight: 600, margin: "0 0 10px" }}>
        {isAr ? "مجلة أكولة" : "Akula journal"}
      </h1>
      <p style={{ color: "#666", fontSize: "15px", marginBottom: "40px" }}>
        {isAr
          ? "أفكار لتقديم المشروبات والحلويات، مستوحاة من نكهات وتطبيقات أكولة."
          : "Serving ideas for drinks and desserts, inspired by Akula flavours."}
      </p>

      <div className="journal-track" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "25px" }}>
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
    </main>
  );
}
