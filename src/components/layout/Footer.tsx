"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { contactDetails } from "../../utils/referenceData";

export default function Footer() {
  const { isAr } = useLanguage();
  const [email, setEmail] = useState("");
  const currentYear = new Date().getFullYear();

  function handleCatalogRequest(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    const msg = isAr
      ? `مرحبًا أكولة، أرجو إرسال الكتالوج إلى البريد الإلكتروني: ${email}`
      : `Hello Akula, please send me the product catalogue for: ${email}`;
    window.open(`https://wa.me/201050677740?text=${encodeURIComponent(msg)}`, "_blank");
    setEmail("");
  }

  return (
    <footer className="contact-footer" id="contact">
      <div className="akula-company-footer">
        <div>
          <strong>
            {isAr ? "شركة أكولة للصناعات الغذائية" : "Akula Food Processing Company"}
          </strong>
          <small>
            {isAr
              ? "أكولة توبينج · نكهات للمشروبات والحلويات"
              : "AKULA TOPPING"}
          </small>
        </div>
      </div>

      <div className="contact-footer-grid">
        {/* Column 1: Exclusive Akula & Catalogue */}
        <section className="footer-exclusive">
          <h2>{isAr ? "حصري لأكولة" : "Exclusively Akula"}</h2>
          <h3>{isAr ? "اكتشف جديدنا" : "Discover what is new"}</h3>
          <p>
            {isAr
              ? "اطلب الكتالوج وتعرّف على النكهات والعبوات المتاحة."
              : "Request our catalogue and explore available flavours and packaging."}
          </p>
          <form id="catalog-request" onSubmit={handleCatalogRequest}>
            <label className="sr-only" htmlFor="catalog-email">
              {isAr ? "بريدك الإلكتروني" : "Your email address"}
            </label>
            <div className="footer-email-box">
              <input
                id="catalog-email"
                type="email"
                required
                placeholder={isAr ? "بريدك الإلكتروني" : "Your email address"}
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label={isAr ? "بريدك الإلكتروني" : "Your email address"}
              />
              <button
                type="submit"
                aria-label={isAr ? "طلب الكتالوج على واتساب" : "Request catalogue on WhatsApp"}
              >
                {isAr ? "←" : "→"}
              </button>
            </div>
            <small>
              {isAr
                ? "متابعة طلب الكتالوج على واتساب"
                : "Continue your catalogue request on WhatsApp"}
            </small>
          </form>
        </section>

        {/* Column 2: Help & Contacts */}
        <section className="footer-help">
          <h2>{isAr ? "المساعدة" : "Help"}</h2>
          <address>
            {isAr ? (
              <>
                المنطقة الصناعية الثالثة،
                <br />
                طريق القاهرة الإسكندرية الزراعي،
                <br />
                بنها، مصر
              </>
            ) : (
              <>
                Third Industrial Zone,
                <br />
                Cairo–Alexandria Agricultural Road,
                <br />
                Banha, Egypt
              </>
            )}
          </address>
          <a href={`mailto:${contactDetails.email}`} className="footer-email" dir="ltr">
            {contactDetails.email}
          </a>
          <a href={`tel:+20${contactDetails.tel}`}>
            <bdi>{contactDetails.tel}</bdi>
          </a>
          <a className="complaint-phone" href={`tel:+20${contactDetails.support}`}>
            {isAr ? "الشكاوى: " : "Complaints: "}
            <bdi>{contactDetails.support}</bdi>
          </a>
        </section>

        {/* Column 3: Useful Links */}
        <nav className="footer-quick" aria-label={isAr ? "روابط تهمك" : "Useful links"}>
          <h2>{isAr ? "روابط تهمك" : "Useful links"}</h2>
          <Link href="/about">{isAr ? "من نحن" : "About us"}</Link>
          <Link href="/products">{isAr ? "مجموعة المنتجات" : "Product collection"}</Link>
          <Link href="/recipes">{isAr ? "أفكار ووصفات" : "Ideas & recipes"}</Link>
          <a
            href="https://wa.me/201050677740?text=I%20am%20interested%20in%20distribution%20and%20partnerships%20with%20Akula"
            target="_blank"
            rel="noopener noreferrer"
          >
            {isAr ? "التوزيع والشراكات" : "Distribution & partnerships"}
          </a>
          <Link href="/contact">{isAr ? "تواصل معنا" : "Contact us"}</Link>
        </nav>

        {/* Column 4: Channels & QR */}
        <section className="footer-channels">
          <h2>
            {isAr ? (
              <>قنوات التواصل<br />الاجتماعي</>
            ) : (
              <>Social<br />channels</>
            )}
          </h2>
          <div className="footer-qr-brand">
            <div className="footer-qr-column">
              <p className="footer-qr-caption">
                {isAr ? "امسح رمز QR لعرض الكتالوج" : "Scan the QR code to view the catalogue"}
              </p>
              <a
                href="/assets/qr.jpg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={isAr ? "عرض رمز الكتالوج" : "View catalogue QR code"}
              >
                <img
                  data-image-slot="asset:qr.jpg"
                  src="/assets/qr.jpg"
                  width={180}
                  height={180}
                  loading="lazy"
                  decoding="async"
                  alt={isAr ? "رمز QR كتالوج أكولة" : "Akula catalogue QR code"}
                />
              </a>
            </div>
            <span className="footer-company-logo">
              <img
                data-image-slot="asset:akula-company-logo-v2.jpg"
                src="/assets/akula-company-logo-v2.jpg"
                alt={isAr ? "شعار شركة أكولة للصناعات الغذائية" : "Akula Food Processing Company logo"}
                width={1254}
                height={1254}
                loading="lazy"
                decoding="async"
              />
            </span>
          </div>
          <div className="footer-social">
            <a
              href={contactDetails.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: "24px", height: "24px" }}>
                <circle cx="12" cy="12" r="10" fill="currentColor" />
                <path
                  fill="#000"
                  d="M13.5 21v-7.8H16l.4-3h-2.9V8.4c0-.9.3-1.5 1.6-1.5h1.5V4.2c-.3 0-1.2-.1-2.2-.1-2.3 0-3.9 1.4-3.9 4v2.1H8v3h2.5V21z"
                />
              </svg>
            </a>
            <a
              href={`https://wa.me/${contactDetails.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ width: "24px", height: "24px" }}
              >
                <path d="M20.5 11.7a8.5 8.5 0 0 1-12.8 7.4L3 20.5l1.4-4.6A8.5 8.5 0 1 1 20.5 11.7Z" />
                <path
                  fill="currentColor"
                  stroke="none"
                  d="M8.1 7.2c-.4-.3-1.2.1-1.4.6-.8 2 2.3 6.6 6 8 1.8.7 3.1.1 3.5-.8.2-.5.2-.8-.1-1l-2-1c-.3-.2-.5-.1-.7.2l-.6.7c-.2.2-.4.2-.7.1-1.2-.5-2.5-1.7-3.1-2.8-.2-.3-.2-.5 0-.7l.5-.6c.2-.3.3-.5.1-.8l-.9-1.9c-.2-.2-.4-.2-.6-.2Z"
                />
              </svg>
            </a>
            <a
              href={contactDetails.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
                style={{ width: "24px", height: "24px" }}
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.6" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </section>
      </div>

      <div className="contact-footer-copyright">
        {isAr ? (
          <>
            أكولة توبينج <span id="year">{currentYear}</span>. جميع الحقوق محفوظة ©
          </>
        ) : (
          <>
            Akula Topping <span id="year">{currentYear}</span>. All rights reserved ©
          </>
        )}
      </div>
    </footer>
  );
}
