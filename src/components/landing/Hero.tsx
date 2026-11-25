"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { heroSlides } from "../../utils/referenceData";

export default function Hero() {
  const { isAr } = useLanguage();
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentSlide = heroSlides[slideIndex];

  function prevSlide() {
    setSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }

  function nextSlide() {
    setSlideIndex((prev) => (prev + 1) % heroSlides.length);
  }

  return (
    <section className="hero cafe-hero" id="home">
      <img
        id="hero-photo"
        className="hero-photo"
        src={currentSlide.image}
        alt="Akula Topping hero background"
        loading="eager"
        decoding="async"
        key={currentSlide.image}
      />
      <div className="hero-copy">
        <span className="eyebrow" dir="ltr">
          AKULA TOPPING
        </span>
        <h1
          dangerouslySetInnerHTML={{
            __html: isAr ? currentSlide.titleAr : currentSlide.title,
          }}
        />
        <p>{isAr ? currentSlide.descAr : currentSlide.desc}</p>
        <div className="hero-actions">
          <Link className="btn" href="/products">
            {isAr ? "استكشف المنتجات" : "Explore products"}
          </Link>
          <Link className="btn outline ghost" href="/recipes">
            {isAr ? "أفكار التقديم" : "Serving inspiration"}
          </Link>
        </div>
      </div>

      <button
        type="button"
        className="hero-arrow prev"
        aria-label={isAr ? "الشريحة السابقة" : "Previous slide"}
        onClick={prevSlide}
      >
        {isAr ? "→" : "←"}
      </button>
      <button
        type="button"
        className="hero-arrow next"
        aria-label={isAr ? "الشريحة التالية" : "Next slide"}
        onClick={nextSlide}
      >
        {isAr ? "←" : "→"}
      </button>

      <div className="hero-dots" role="tablist" aria-label="Slides">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`hero-dot ${idx === slideIndex ? "active" : ""}`}
            aria-label={`Slide ${idx + 1}`}
            aria-current={idx === slideIndex ? "true" : undefined}
            onClick={() => setSlideIndex(idx)}
          />
        ))}
      </div>

      <div className="hero-controls">
        <button
          type="button"
          className="hero-motion-toggle"
          aria-pressed={isPaused}
          aria-label={isPaused ? "Play slide rotation" : "Pause slide rotation"}
          title={isPaused ? "Play slideshow" : "Pause slideshow"}
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? "▶" : "⏸"}
        </button>
      </div>
    </section>
  );
}
