"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "ar";

interface LanguageContextType {
  lang: Lang;
  dir: "ltr" | "rtl";
  isAr: boolean;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  dir: "ltr",
  isAr: false,
  setLang: () => {},
  toggleLang: () => {},
});

const LANG_KEY = "akula_lang";

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  if (window.location.pathname.startsWith("/en")) return "en";
  try {
    const stored = localStorage.getItem(LANG_KEY) as Lang | null;
    if (stored === "ar" || stored === "en") return stored;
  } catch {
    // ignore
  }
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  function applyLanguage(targetLang: Lang) {
    if (typeof document === "undefined") return;
    const dir = targetLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = targetLang;
    document.documentElement.dir = dir;
    if (dir === "rtl") {
      document.documentElement.classList.add("rtl");
    } else {
      document.documentElement.classList.remove("rtl");
    }
  }

  useEffect(() => {
    applyLanguage(lang);

    function onStorage(e: StorageEvent) {
      if (e.key === LANG_KEY && (e.newValue === "ar" || e.newValue === "en")) {
        setLangState(e.newValue);
        applyLanguage(e.newValue);
      }
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [lang]);

  function setLang(newLang: Lang) {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem(LANG_KEY, newLang);
      applyLanguage(newLang);
      try {
        window.dispatchEvent(new CustomEvent("akula-lang-changed", { detail: newLang }));
      } catch {
        // ignore
      }
    }
  }

  function toggleLang() {
    setLang(lang === "en" ? "ar" : "en");
  }

  const dir = lang === "ar" ? "rtl" : "ltr";
  const isAr = lang === "ar";

  return (
    <LanguageContext.Provider value={{ lang, dir, isAr, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

