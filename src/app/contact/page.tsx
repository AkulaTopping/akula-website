"use client";

import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { contactDetails } from "../../utils/referenceData";

export default function ContactPage() {
  const { isAr } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const text = isAr
      ? `*طلب استفسار جديد - موقع أكولة*\n\nالاسم: ${fullName}\nالهاتف: ${formData.phone}\nالبريد: ${formData.email || "غير محدد"}\nالجهة/المشروع: ${formData.company || "غير محدد"}\nالرسالة:\n${formData.message}`
      : `*New Enquiry - Akula Website*\n\nName: ${fullName}\nPhone: ${formData.phone}\nEmail: ${formData.email || "N/A"}\nCompany/Project: ${formData.company || "N/A"}\nMessage:\n${formData.message}`;

    window.open(
      `https://wa.me/${contactDetails.whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  }

  return (
    <main className="contact-page">
      <div className="contact-page-inner">
        <form className="professional-contact" id="inquiry-form" onSubmit={handleSubmit}>
          <span className="eyebrow" dir="ltr">
            {isAr ? "تواصل معنا" : "LET’S TALK"}
          </span>
          <h1>{isAr ? "استفسارات التوريد والشراكة" : "Contact us"}</h1>
          <p>
            {isAr
              ? "أخبرنا عن مشروعك واحتياجاتك من التوبينج وصوصات الفواكه، ودعنا نساعدك في اختيار الأنسب لقائمتك."
              : "Tell us about your project and let us help you choose your Akula flavours."}
          </p>

          <div className="name-fields">
            <div>
              <label htmlFor="first-name">{isAr ? "الاسم الأول *" : "First name *"}</label>
              <input
                id="first-name"
                name="first"
                required
                autoComplete="given-name"
                placeholder={isAr ? "أدخل اسمك الأول" : "Enter your first name"}
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="last-name">{isAr ? "اسم العائلة *" : "Last name *"}</label>
              <input
                id="last-name"
                name="last"
                required
                autoComplete="family-name"
                placeholder={isAr ? "أدخل اسم العائلة" : "Enter your last name"}
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>

          <label htmlFor="inquiry-email">{isAr ? "البريد الإلكتروني" : "Email address"}</label>
          <input
            id="inquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={isAr ? "أدخل بريدك الإلكتروني" : "Enter your email address"}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <label htmlFor="inquiry-phone">{isAr ? "رقم الهاتف / الواتساب *" : "Phone number *"}</label>
          <input
            id="inquiry-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            placeholder={isAr ? "رقم هاتفك للتواصل" : "Your phone number"}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <label htmlFor="company-name">{isAr ? "اسم الكافيه أو الشركة" : "Company or project name"}</label>
          <input
            id="company-name"
            name="company"
            placeholder={isAr ? "مثال: مقهى، حلواني، شركة توزيع" : "Cafe, restaurant, or distributor name"}
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />

          <label htmlFor="inquiry-text">{isAr ? "تفاصيل رسالتك أو طلبك *" : "Your message *"}</label>
          <textarea
            id="inquiry-text"
            name="message"
            required
            rows={4}
            placeholder={isAr ? "اكتب استفسارك هنا، الكميات المطلوبة أو النكهات..." : "Write your enquiry here"}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />

          <button className="btn" type="submit">
            {isAr ? "المتابعة عبر واتساب ←" : "Continue on WhatsApp →"}
          </button>
          <small>
            {isAr
              ? "راجع رسالتك على واتساب واضغط إرسال لبدء المحادثة الفورية."
              : "Review your message in WhatsApp and tap Send."}
          </small>
        </form>

        <aside className="professional-address">
          <h2>{isAr ? "أكولة توبينج" : "Akula Topping"}</h2>
          <h3>{isAr ? "العنوان والمصنع" : "Address"}</h3>
          <address>
            {isAr ? contactDetails.addressAr : contactDetails.addressEn}
          </address>
          <div style={{ marginTop: "12px", marginBottom: "25px" }}>
            <a
              href={contactDetails.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
              style={{ fontSize: "12px", color: "var(--green)" }}
            >
              {isAr ? "عرض الموقع على خرائط Google ↗" : "View on Google Maps ↗"}
            </a>
          </div>

          <h3>{isAr ? "بيانات الاتصال المباشر" : "Contact details"}</h3>
          <a href={`mailto:${contactDetails.email}`} dir="ltr">
            {contactDetails.email}
          </a>
          <a href={`tel:+20${contactDetails.tel}`}>
            {isAr ? "الطلبات والمبيعات: " : "Orders: "}
            <bdi>{contactDetails.tel}</bdi>
          </a>
          <a href={`tel:+20${contactDetails.support}`}>
            {isAr ? "خدمة العملاء والشكاوى: " : "Complaints: "}
            <bdi>{contactDetails.support}</bdi>
          </a>
        </aside>
      </div>
    </main>
  );
}
