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
      className="group relative bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-[#ede9df] hover:border-[#c39b6e] hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
    >
      {/* IMAGE CONTAINER */}
      <div className="relative aspect-square w-full p-6 bg-[#fbf9f4] border-b border-[#f0ede6] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-106"
        />
      </div>

      {/* CONTENT */}
      <div className="relative p-5 bg-white space-y-2">
        <p className="text-[10px] text-[#c39b6e] uppercase tracking-[0.2em] font-semibold">
          <LocalizedText
            id={`product_${product.id}_brand`}
            fallback={product.brand}
          />
        </p>

        <h3 className="font-bold text-sm sm:text-base text-[#18261f] tracking-tight line-clamp-1">
          <LocalizedText
            id={`product_${product.id}_name`}
            fallback={product.name}
          />
        </h3>

        <p className="text-lg font-bold text-[#124635] pt-1">
          {product.price.toFixed(2)}{" "}
          <small className="text-xs font-semibold text-gray-500">
            <LocalizedText id="currency" fallback="EGP" />
          </small>
        </p>

        <div className="flex gap-2 pt-2">
          {/* WHATSAPP */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOrder("whatsapp");
            }}
            className="flex-1 text-xs font-semibold h-9 px-3 rounded-full bg-[#124635] hover:bg-[#0c2b20] text-white transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
            <span><LocalizedText id="order_whatsapp" /></span>
          </button>

          {/* MESSENGER */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOrder("facebook");
            }}
            className="flex-1 text-xs font-semibold h-9 px-3 rounded-full bg-[#0084ff] hover:bg-[#0073e6] text-white transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <FaFacebookMessenger className="w-4 h-4" />
            <span><LocalizedText id="order_facebook" /></span>
          </button>
        </div>
      </div>
    </div>
  );
}
