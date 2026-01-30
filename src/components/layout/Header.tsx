"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { translations, type Lang } from "../../utils/i18n";

const LANG_KEY = "akula_lang";

export default function Header() {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const stored = localStorage.getItem(LANG_KEY) as Lang | null;
    return stored || "en";
  });

  function applyLang(l: Lang) {
    if (typeof document === "undefined") return;
    const dir = l === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = l;
    document.documentElement.dir = dir;
    if (dir === "rtl") document.documentElement.classList.add("rtl");
    else document.documentElement.classList.remove("rtl");
  }

  useEffect(() => {
    applyLang(lang);
  }, [lang]);

  function toggleLang() {
    const next: Lang = lang === "en" ? "ar" : "en";
    setLang(next);
    localStorage.setItem(LANG_KEY, next);
    try {
      window.dispatchEvent(
        new CustomEvent("akula-lang-changed", { detail: next }),
      );
    } catch {
      /* ignore */
    }
  }

  const t = translations[lang];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={"/images/logo.png"}
            alt="Logo"
            width={110}
            height={40}
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="relative text-sm font-medium text-foreground transition hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            {t.home}
          </Link>
          <Link
            href="/products"
            className="relative text-sm font-medium text-foreground transition hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            {t.products}
          </Link>

          <Link
            href="/about"
            className="relative text-sm font-medium text-foreground transition hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            {t.about}
          </Link>

          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="ml-2 rounded border px-3 py-1 text-sm"
          >
            {lang === "en" ? "العربية" : "EN"}
          </button>
        </nav>

        {/* Mobile: hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen((s) => !s)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="p-2 rounded-md border"
          >
            {!menuOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur z-40 border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium"
            >
              {t.home}
            </Link>
            <Link
              href="/products"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium"
            >
              {t.products}
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium"
            >
              {t.about}
            </Link>

            <div className="pt-2 border-t mt-2 flex items-center justify-between">
              <button
                onClick={() => {
                  toggleLang();
                  setMenuOpen(false);
                }}
                className="rounded border px-3 py-1 text-sm"
              >
                {lang === "en" ? "العربية" : "EN"}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
