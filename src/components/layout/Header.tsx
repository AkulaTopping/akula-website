"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";

export default function Header() {
  const { isAr, toggleLang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [langPickerOpen, setLangPickerOpen] = useState(false);
  const langRef = useRef<HTMLDetailsElement>(null);
  const productsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-is-open");
    } else {
      document.body.classList.remove("menu-is-open");
    }
    return () => {
      document.body.classList.remove("menu-is-open");
    };
  }, [menuOpen]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangPickerOpen(false);
      }
      if (productsRef.current && !productsRef.current.contains(event.target as Node)) {
        setProductsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleNavClick() {
    setMenuOpen(false);
    setProductsOpen(false);
  }

  return (
    <header className="header">
      <nav className="nav" aria-label={isAr ? "القائمة الرئيسية" : "Main navigation"}>
        <Link href="/#home" aria-label={isAr ? "أكولة الرئيسية" : "Akula home"} onClick={handleNavClick}>
          <img
            data-image-slot="asset:akula-topping-logo-new.jpg"
            className="logo"
            src="/assets/akula-topping-logo-new.jpg"
            alt="Akula Topping"
          />
        </Link>

        <div className={`links ${menuOpen ? "open" : ""}`} id="navlinks">
          <div className="mobile-menu-head">
            <span>{isAr ? "القائمة" : "Menu"}</span>
            <button
              id="menu-close"
              aria-label={isAr ? "إغلاق القائمة" : "Close menu"}
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>
          </div>

          <Link href="/#home" onClick={handleNavClick}>
            <span className="nav-icon">⌂</span>
            {isAr ? "الرئيسية" : "Home"}
          </Link>

          <details
            ref={productsRef}
            className="nav-products"
            open={productsOpen}
            onToggle={(e) => setProductsOpen((e.target as HTMLDetailsElement).open)}
          >
            <summary>
              <span className="nav-icon">⊕</span>
              {isAr ? "المنتجات" : "Products"}
            </summary>
            <div>
              <Link href="/products" onClick={handleNavClick}>
                {isAr ? "كل المنتجات" : "All products"}
              </Link>
              <Link href="/products?category=topping" onClick={handleNavClick}>
                {isAr ? "التوبينج" : "Toppings"}
              </Link>
              <Link href="/products?category=fruit" onClick={handleNavClick}>
                {isAr ? "صوصات الفاكهة" : "Fruit sauces"}
              </Link>
            </div>
          </details>

          <Link href="/store" onClick={handleNavClick}>
            <span className="nav-icon">▣</span>
            {isAr ? "متجر المبيعات" : "Sales store"}
          </Link>

          <Link href="/about" onClick={handleNavClick}>
            <span className="nav-icon">ⓘ</span>
            {isAr ? "من نحن" : "About us"}
          </Link>

          <Link href="/recipes" onClick={handleNavClick}>
            <span className="nav-icon">▤</span>
            {isAr ? "وصفاتنا" : "Recipes"}
          </Link>

          <Link href="/contact" onClick={handleNavClick}>
            <span className="nav-icon">✉</span>
            {isAr ? "تواصل معنا" : "Contact us"}
          </Link>

          <Link href="/journal" onClick={handleNavClick}>
            <span className="nav-icon">▧</span>
            {isAr ? "المجلة" : "Journal"}
          </Link>

          <Link href="/partners" onClick={handleNavClick}>
            <span className="nav-icon">♧</span>
            {isAr ? "الشراكات" : "Partnerships"}
          </Link>
        </div>

        <Link className="btn" href="/contact" onClick={handleNavClick}>
          {isAr ? "استفسر عن التوريد ↗" : "Supply enquiries ↗"}
        </Link>

        <details
          ref={langRef}
          className="language-picker"
          open={langPickerOpen}
          onToggle={(e) => setLangPickerOpen((e.target as HTMLDetailsElement).open)}
        >
          <summary>
            <span className="flag" aria-hidden="true">
              {isAr ? "🇪🇬" : "🇬🇧"}
            </span>
            {isAr ? "العربية" : "English"}
          </summary>
          <button
            type="button"
            className="language-switch"
            onClick={() => {
              toggleLang();
              setLangPickerOpen(false);
            }}
            aria-label={isAr ? "التبديل إلى الإنجليزية" : "Switch to Arabic"}
            style={{
              background: "none",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              width: "100%",
              padding: "8px 12px",
              color: "inherit",
              font: "inherit",
              textAlign: "start",
            }}
          >
            <span className="flag" aria-hidden="true">
              {isAr ? "🇬🇧" : "🇪🇬"}
            </span>
            <span>{isAr ? "English" : "العربية"}</span>
          </button>
        </details>

        <button
          className="menu"
          aria-label={isAr ? "فتح القائمة" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="navlinks"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </nav>
    </header>
  );
}
