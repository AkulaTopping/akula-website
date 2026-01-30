"use client";

import Image from "next/image";
import { FaFacebookMessenger, FaWhatsapp } from "react-icons/fa";
import { Product } from "@/src/utils/types";
import LocalizedText from "@/src/components/LocalizedText";

export default function ProductCard({
  product,
  onOrder,
  onSelect,
}: {
  product: Product;
  onOrder: (social: "whatsapp" | "facebook") => void;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
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
      </div>

      <div className="relative z-10 p-4 sm:p-5 bg-white">
        <h3 className="font-semibold text-gray-800 text-xs sm:text-sm uppercase tracking-wide line-clamp-2">
          <LocalizedText
            id={`product_${product.id}_name`}
            fallback={product.name}
          />
        </h3>

        <p className="text-[10px] sm:text-xs text-gray-500 mb-2 uppercase">
          <LocalizedText
            id={`product_${product.id}_brand`}
            fallback={product.brand}
          />
        </p>

        <p className="text-base sm:text-lg font-bold text-primary mb-3">
          {product.price.toFixed(2)}{" "}
          <small className="text-xs">
            <LocalizedText id="currency" fallback="EGP" />
          </small>
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOrder("facebook");
            }}
            className="flex-1 text-xs h-9 px-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition flex items-center justify-center gap-2"
          >
            <FaFacebookMessenger className="w-5 h-6" />
            <LocalizedText id="order_facebook" />
          </button>

          {/* WHATSAPP */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOrder("whatsapp");
            }}
            className="flex-1 text-xs h-9 px-3 rounded-md bg-green-600 hover:bg-green-700 text-white transition flex items-center justify-center gap-2"
          >
            <FaWhatsapp className="w-5 h-6" />
            <LocalizedText id="order_whatsapp" />
          </button>
        </div>
      </div>
    </div>
  );
}
