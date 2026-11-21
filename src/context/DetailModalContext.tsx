"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";

export interface ModalData {
  title: string;
  slug?: string;
  eyebrow?: string;
  image?: string;
  body: string;
  whatsappText?: string;
}

interface DetailModalContextType {
  openModal: (data: ModalData) => void;
  closeModal: () => void;
}

const DetailModalContext = createContext<DetailModalContextType>({
  openModal: () => {},
  closeModal: () => {},
});

export function DetailModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<ModalData | null>(null);
  const { isAr } = useLanguage();

  function openModal(modalData: ModalData) {
    setData(modalData);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const whatsappMessage = encodeURIComponent(
    data?.whatsappText ||
      (isAr
        ? `مرحبًا أكولة، استفسر عن: ${data?.title || ""}`
        : `Hello Akula, I want to enquire about: ${data?.title || ""}`)
  );
  const whatsappUrl = `https://wa.me/201050677740?text=${whatsappMessage}`;

  return (
    <DetailModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {isOpen && data && (
        <dialog
          className="dialog"
          id="detail"
          open
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
          style={{ display: "flex" }}
        >
          <div className="dialog-inner" onClick={(e) => e.stopPropagation()}>
            <button className="close" aria-label="Close" onClick={closeModal}>
              ×
            </button>
            <span className="eyebrow" dir="ltr">
              {data.eyebrow || "AKULA TOPPING"}
            </span>
            <h2 id="dialog-title">{data.title}</h2>
            {data.image && (
              <img
                id="dialog-photo"
                className="dialog-photo"
                src={data.image}
                alt={data.title}
                loading="lazy"
                decoding="async"
              />
            )}
            <p id="dialog-body" style={{ whiteSpace: "pre-line" }}>
              {data.body}
            </p>
            <div style={{ display: "flex", gap: "10px", marginTop: "16px", flexWrap: "wrap" }}>
              <a
                className="btn"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="dialog-contact"
                onClick={closeModal}
                style={{ flex: 1, minWidth: "160px" }}
              >
                {isAr ? "استفسر على واتساب" : "Enquire on WhatsApp"}
              </a>
              {data.slug && (
                <Link
                  href={`/products/${data.slug}`}
                  className="btn outline"
                  onClick={closeModal}
                  style={{ minWidth: "140px" }}
                >
                  {isAr ? "صفحة المنتج الكاملة ↗" : "Full product page ↗"}
                </Link>
              )}
            </div>
          </div>
        </dialog>
      )}
    </DetailModalContext.Provider>
  );
}

export function useDetailModal() {
  return useContext(DetailModalContext);
}
