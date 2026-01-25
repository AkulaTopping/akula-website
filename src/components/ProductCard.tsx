"use client";

import Image from "next/image";
import { useState } from "react";
import { FaFacebookMessenger, FaWhatsapp } from "react-icons/fa";
import { Product } from "@/src/utils/types";

export default function ProductCard({ product }: { product: Product }) {
  const [showIcon, setShowIcon] = useState<"facebook" | "whatsapp" | null>(
    null,
  );

 const orderFromFacebook = () => {
  setShowIcon("facebook");
  setTimeout(() => setShowIcon(null), 500);

  const message = encodeURIComponent(
    `I want to order:\n\n` +
      `Product: ${product.name}\n` +
      `Brand: ${product.brand}\n` +
      `Price: ${product.price} EGP\n` +
      `Image: ${product.image}`
  );

  window.open(
    `https://m.me/mohamedanwer741?ref=${message}`,
    "_blank"
  );
};

  const orderFromWhatsapp = () => {
    setShowIcon("whatsapp");
    setTimeout(() => setShowIcon(null), 500);

    const message = encodeURIComponent(
      `I want to order:\n\n` +
        `Product: ${product.name}\n` +
        `Brand: ${product.brand}\n` +
        `Price: ${product.price} EGP\n`+
         `Image: ${product.image}`

    );

    window.open(`https://wa.me/201011286690?text=${message}`, "_blank");
  };

  return (
    <div
      className={`relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border-2 ${product.borderColor}`}
    >
      {/* IMAGE */}
      <div className="relative aspect-square w-full p-4 sm:p-6">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="object-contain transition-transform duration-300 hover:scale-105"
        />

        {showIcon && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <span className="text-4xl animate-ping">
              {showIcon === "facebook" ? "💬" : "📱"}
            </span>
          </div>
        )}
      </div>

      <div className="relative z-10 p-4 sm:p-5 bg-white">
        <h3 className="font-semibold text-gray-800 text-xs sm:text-sm uppercase tracking-wide line-clamp-2">
          {product.name}
        </h3>

        <p className="text-[10px] sm:text-xs text-gray-500 mb-2 uppercase">
          {product.brand}
        </p>

        <p className="text-base sm:text-lg font-bold text-primary mb-3">
          {product.price.toFixed(2)} EGP
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={orderFromFacebook}
            className="flex-1 text-xs h-9 px-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition flex items-center justify-center gap-2"
          >
            <FaFacebookMessenger className="w-5 h-6" />
            Order on Facebook
          </button>

          {/* WHATSAPP */}
          <button
            onClick={orderFromWhatsapp}
            className="flex-1 text-xs h-9 px-3 rounded-md bg-green-600 hover:bg-green-700 text-white transition flex items-center justify-center gap-2"
          >
            <FaWhatsapp className="w-5 h-6" />
            Order on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
