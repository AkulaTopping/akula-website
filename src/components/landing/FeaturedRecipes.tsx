"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { useDetailModal } from "../../context/DetailModalContext";
import { recipesData, type RecipeItem } from "../../utils/referenceData";

export default function FeaturedRecipes() {
  const { isAr } = useLanguage();
  const { openModal } = useDetailModal();

  // Show top featured recipes on homepage
  const featured = recipesData.slice(0, 3);

  function handleRecipeDetails(recipe: RecipeItem) {
    openModal({
      title: isAr ? recipe.titleAr : recipe.title,
      eyebrow: isAr ? "طريقة التحضير" : "SERVING INSPIRATION",
      image: recipe.image,
      body: `${isAr ? recipe.descAr : recipe.desc}\n\n${isAr ? "طريقة التحضير والتقديم:" : "Preparation & serving idea:"}\n${isAr ? recipe.methodAr : recipe.method}`,
      whatsappText: isAr
        ? `مرحبًا أكولة، استفسر عن وصفة: ${recipe.titleAr}`
        : `Hello Akula, I want to inquire about recipe: ${recipe.title}`,
    });
  }

  return (
    <section className="recipes" id="recipes">
      <div className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow" dir="ltr">
              {isAr ? "أفكار ووصفات" : "SERVING INSPIRATION"}
            </span>
            <h2>{isAr ? "من الزجاجة إلى الكوب" : "From bottle to cup"}</h2>
          </div>
          <Link className="btn light" href="/recipes">
            {isAr ? "جميع الوصفات ←" : "All recipes →"}
          </Link>
        </div>

        <div className="product-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {featured.map((recipe, idx) => (
            <article className="recipe" key={recipe.id}>
              <span className="num">{recipe.num || `0${idx + 1}`}</span>
              <img
                src={recipe.image}
                alt={isAr ? recipe.titleAr : recipe.title}
                className="recipe-bottle"
                loading="lazy"
                decoding="async"
              />
              <h3>{isAr ? recipe.titleAr : recipe.title}</h3>
              <p>{isAr ? recipe.descAr : recipe.desc}</p>
              <button
                type="button"
                onClick={() => handleRecipeDetails(recipe)}
                data-recipe={recipe.id}
              >
                {isAr ? "طريقة التقديم ←" : "View serving idea →"}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
