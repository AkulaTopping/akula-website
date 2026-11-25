"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useDetailModal } from "../../context/DetailModalContext";
import { recipesData } from "../../utils/referenceData";

export default function RecipesPage() {
  const { isAr } = useLanguage();
  const { openModal } = useDetailModal();

  function handleRecipeClick(recipeId: string) {
    const r = recipesData.find((x) => x.id === recipeId);
    if (!r) return;
    openModal({
      title: isAr ? r.titleAr : r.title,
      eyebrow: isAr ? "وصفات أكولة" : "AKULA RECIPES",
      image: r.image,
      body: `${isAr ? r.descAr : r.desc}\n\n${isAr ? "طريقة التحضير والتقديم:" : "Preparation & serving idea:"}\n${isAr ? r.methodAr : r.method}`,
      whatsappText: isAr
        ? `مرحبًا أكولة، استفسر عن وصفة: ${r.titleAr}`
        : `Hello Akula, I want to inquire about recipe: ${r.title}`,
    });
  }

  return (
    <main className="recipe-page">
      <section className="recipe-page-section">
        <h1>{isAr ? "وصفات المشروبات الأكثر طلبًا" : "Popular drink recipes"}</h1>

        {/* Featured 2 latest cards */}
        <div className="recipe-latest">
          <button
            className="serving-card"
            type="button"
            onClick={() => handleRecipeClick("cocktail")}
          >
            <img
              src="/assets/recipe-8662.webp"
              alt={isAr ? "كوكتيل الفواكه" : "Fruit cocktail"}
              loading="lazy"
              decoding="async"
            />
            <h2>{isAr ? "كوكتيل الفواكه المنعش" : "Fruit cocktail"}</h2>
            <span>{isAr ? "عرض الوصفة ←" : "View recipe →"}</span>
          </button>

          <button
            className="serving-card"
            type="button"
            onClick={() => handleRecipeClick("frappe")}
          >
            <img
              src="/assets/recipe-8665.webp"
              alt={isAr ? "فرابيه الشيكولاته" : "Chocolate frappe"}
              loading="lazy"
              decoding="async"
            />
            <h2>{isAr ? "فرابيه الشيكولاته الغني" : "Chocolate frappe"}</h2>
            <span>{isAr ? "عرض الوصفة ←" : "View recipe →"}</span>
          </button>
        </div>

        {/* Drink Categories Grid */}
        <h2 className="recipe-category-heading">{isAr ? "تصنيفات المشروبات" : "Recipes"}</h2>
        <div className="recipe-category-grid">
          <button
            className="serving-card"
            type="button"
            onClick={() => handleRecipeClick("caramel")}
          >
            <img
              src="/assets/recipe-8663.webp"
              alt={isAr ? "المشروبات الساخنة" : "Hot drinks"}
              loading="lazy"
              decoding="async"
            />
            <h3>{isAr ? "المشروبات الساخنة واللاتيه" : "Hot drinks"}</h3>
            <span>{isAr ? "استكشف الوصفة ←" : "Explore →"}</span>
          </button>

          <button
            className="serving-card"
            type="button"
            onClick={() => handleRecipeClick("berry")}
          >
            <img
              src="/assets/recipe-8660.webp"
              alt={isAr ? "السموذي" : "Smoothies"}
              loading="lazy"
              decoding="async"
            />
            <h3>{isAr ? "السموذي والمشروبات المثلجة" : "Smoothies"}</h3>
            <span>{isAr ? "استكشف الوصفة ←" : "Explore →"}</span>
          </button>

          <button
            className="serving-card"
            type="button"
            onClick={() => handleRecipeClick("cocktail")}
          >
            <img
              src="/assets/recipe-8661.webp"
              alt={isAr ? "الموكتيل والعصائر" : "Cocktails"}
              loading="lazy"
              decoding="async"
            />
            <h3>{isAr ? "الموكتيلات المنعشة" : "Cocktails"}</h3>
            <span>{isAr ? "استكشف الوصفة ←" : "Explore →"}</span>
          </button>

          <button
            className="serving-card"
            type="button"
            onClick={() => handleRecipeClick("frappe")}
          >
            <img
              src="/assets/recipe-8665.webp"
              alt={isAr ? "الفرابيه والميلك شيك" : "Frappes"}
              loading="lazy"
              decoding="async"
            />
            <h3>{isAr ? "الفرابيه والميلك شيك" : "Frappes"}</h3>
            <span>{isAr ? "استكشف الوصفة ←" : "Explore →"}</span>
          </button>
        </div>

        {/* Dessert Inspiration */}
        <h2 className="recipe-category-heading">
          {isAr ? "إلهام الحلويات والمخبوزات" : "Dessert inspiration"}
        </h2>
        <div className="recipe-dessert-grid">
          <button
            className="serving-card"
            type="button"
            onClick={() => handleRecipeClick("fruitcream")}
          >
            <img
              src="/assets/recipe-8666.webp"
              loading="lazy"
              decoding="async"
              alt={isAr ? "كريم الفراولة" : "Strawberry fruit cream"}
            />
            <h3>{isAr ? "كريم الفراولة والزبادي" : "Strawberry fruit cream"}</h3>
            <span>{isAr ? "عرض الوصفة ←" : "View recipe →"}</span>
          </button>

          <button
            className="serving-card"
            type="button"
            onClick={() => handleRecipeClick("blueberrycream")}
          >
            <img
              src="/assets/recipe-8667.webp"
              loading="lazy"
              decoding="async"
              alt={isAr ? "كاسات حلويات البلوبيري" : "Blueberry dessert cups"}
            />
            <h3>{isAr ? "كاسات حلويات البلوبيرى" : "Blueberry dessert cups"}</h3>
            <span>{isAr ? "عرض الوصفة ←" : "View recipe →"}</span>
          </button>

          <button
            className="serving-card"
            type="button"
            onClick={() => handleRecipeClick("choccream")}
          >
            <img
              src="/assets/recipe-8668.webp"
              loading="lazy"
              decoding="async"
              alt={isAr ? "كريم الشيكولاته" : "Chocolate cream"}
            />
            <h3>{isAr ? "كريم الشيكولاته والآيس كريم" : "Chocolate cream"}</h3>
            <span>{isAr ? "عرض الوصفة ←" : "View recipe →"}</span>
          </button>

          <button
            className="serving-card"
            type="button"
            onClick={() => handleRecipeClick("cheesecakeflavours")}
          >
            <img
              src="/assets/cheesecake-akula-flavours.webp"
              width={1254}
              height={1254}
              loading="lazy"
              decoding="async"
              alt={
                isAr
                  ? "تشيز كيك بنكهات أكولة المتنوعة"
                  : "Akula flavour cheesecake — each slice with a different sauce"
              }
            />
            <h3>{isAr ? "تشيز كيك نكهات أكولة المتعددة" : "Akula flavour cheesecake"}</h3>
            <span>{isAr ? "عرض فكرة التقديم ←" : "View serving idea →"}</span>
          </button>
        </div>
      </section>
    </main>
  );
}

