"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function WhatsAppFAB() {
  const { isAr } = useLanguage();

  return (
    <a
      className="floating-wa"
      href="https://api.whatsapp.com/send?phone=201050677740"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={isAr ? "محادثة مع أكولة عبر واتساب" : "Chat with Akula on WhatsApp"}
      title="WhatsApp"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: "24px", height: "24px", display: "inline-block", verticalAlign: "middle" }}
      >
        <path d="M20.5 11.7a8.5 8.5 0 0 1-12.8 7.4L3 20.5l1.4-4.6A8.5 8.5 0 1 1 20.5 11.7Z" />
        <path
          fill="currentColor"
          stroke="none"
          d="M8.1 7.2c-.4-.3-1.2.1-1.4.6-.8 2 2.3 6.6 6 8 1.8.7 3.1.1 3.5-.8.2-.5.2-.8-.1-1l-2-1c-.3-.2-.5-.1-.7.2l-.6.7c-.2.2-.4.2-.7.1-1.2-.5-2.5-1.7-3.1-2.8-.2-.3-.2-.5 0-.7l.5-.6c.2-.3.3-.5.1-.8l-.9-1.9c-.2-.2-.4-.2-.6-.2Z"
        />
      </svg>
    </a>
  );
}
