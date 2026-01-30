"use client";

import React from "react";
import { translations, type Lang } from "@/src/utils/i18n";

export default function LocalizedText({
  id,
  fallback,
}: {
  id: string;
  fallback?: string;
}) {
  const [lang, setLang] = React.useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    return (
      (localStorage.getItem("akula_lang") as Lang) ||
      (document.documentElement.lang as Lang) ||
      "en"
    );
  });

  React.useEffect(() => {
    const handleStorage = () => {
      const l =
        (localStorage.getItem("akula_lang") as Lang) ||
        (document.documentElement.lang as Lang) ||
        "en";
      setLang(l);
    };
    const handleCustom = (e: Event) => {
      const detail = (e as CustomEvent<string>)?.detail;
      if (detail) setLang(detail as Lang);
      else handleStorage();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(
      "akula-lang-changed",
      handleCustom as EventListener,
    );
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(
        "akula-lang-changed",
        handleCustom as EventListener,
      );
    };
  }, []);

  const t =
    (translations as unknown as Record<string, Record<string, string>>)[lang] ||
    {};
  return <>{t[id] ?? fallback ?? id}</>;
}
