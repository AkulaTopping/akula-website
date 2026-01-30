"use client";

import React from "react";
import { translations, type Lang } from "@/src/utils/i18n";

type Props = {
  id: string;
  brandElement: React.ReactNode;
  emphasisElement: React.ReactElement;
};

export default function LocalizedHeroTitle({
  id,
  brandElement,
  emphasisElement,
}: Props) {
  const [lang, setLang] = React.useState<Lang>(() => {
    if (typeof window === "undefined") return "en";

    const stored = localStorage.getItem("akula_lang") as Lang | null;
    const docLang = document.documentElement.lang as Lang | null;

    const candidate = stored || docLang || "en";

    return candidate in translations ? candidate : "en";
  });

  React.useEffect(() => {
    const syncLang = () => {
      const stored = localStorage.getItem("akula_lang") as Lang | null;
      const docLang = document.documentElement.lang as Lang | null;

      const candidate = stored || docLang || "en";

      setLang(candidate in translations ? candidate : "en");
    };

    const handleCustom = (e: Event) => {
      const detail = (e as CustomEvent<Lang>).detail;
      if (detail && detail in translations) {
        setLang(detail);
      } else {
        syncLang();
      }
    };

    window.addEventListener("storage", syncLang);
    window.addEventListener(
      "akula-lang-changed",
      handleCustom as EventListener,
    );

    return () => {
      window.removeEventListener("storage", syncLang);
      window.removeEventListener(
        "akula-lang-changed",
        handleCustom as EventListener,
      );
    };
  }, []);

  interface Dict {
    [key: string]: string;
  }
  const dict = translations[lang] as Dict ?? {};
  const template  = dict[id] ?? id;

  const parts = template.split(/(\{[^}]+\})/g);

  const tokens: Record<string, React.ReactNode> = {
    brand: brandElement,
    emphasis: React.cloneElement(emphasisElement),
  };

  return (
    <>
      {parts.map((part: string, i: number) => {
        const key = part.replace(/[{}]/g, "");

        if (key in tokens) {
          return (
            <React.Fragment key={`${key}-${i}`}>
              {tokens[key]}
            </React.Fragment>
          );
        }

        return <React.Fragment key={`text-${i}`}>{part}</React.Fragment>;
      })}
    </>
  );
}
