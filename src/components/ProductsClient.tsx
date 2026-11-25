"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/src/utils/types";
import ProductCard from "@/src/components/ProductCard";
import { FaFacebookMessenger, FaWhatsapp } from "react-icons/fa";
import { tel, facebookMessages } from "@/src/utils/constants";
import LocalizedText from "@/src/components/LocalizedText";

export default function ProductsClient({ products }: { products: Product[] }) {
  const [mainProduct, setMainProduct] = useState(products[0]);

  const handleOrder = (product: Product, social: "whatsapp" | "facebook") => {
    const message = encodeURIComponent(
      `I want to order:\n\n` +
        `Product: ${product.name}\n` +
        `Brand: ${product.brand}\n` +
        `Price: ${product.price} EGP\n`,
    );
    const url =
      social === "facebook"
        ? `${facebookMessages}`
        : `https://wa.me/+20${tel}?text=${message}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
      {/* FEATURED PRODUCT SHOWCASE CARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20 bg-white p-7 sm:p-10 rounded-3xl border border-[#ede9df] shadow-lg shadow-black/[0.02]">
        <div className="rounded-2xl border border-[#f0ede6] h-80 sm:h-96 flex items-center justify-center bg-[#fbf9f4] p-6">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={mainProduct.image}
              alt={mainProduct.name}
              fill
              className="object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.1)]"
              sizes="(max-width: 768px) 90vw, 500px"
              priority
            />
          </div>
        </div>

        {/* DETAILS */}
        <div className="flex flex-col justify-center">
          <span className="text-[11px] text-[#c39b6e] uppercase tracking-[0.25em] font-bold mb-2">
            <LocalizedText
              id={`product_${mainProduct.id}_brand`}
              fallback={mainProduct.brand}
            />
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#18261f] mb-3 tracking-tight">
            <LocalizedText
              id={`product_${mainProduct.id}_name`}
              fallback={mainProduct.name}
            />
          </h2>

          <p className="text-3xl sm:text-4xl font-bold text-[#124635] mb-8">
            {mainProduct.price.toFixed(2)}{" "}
            <small className="text-sm font-semibold text-gray-500">
              <LocalizedText id="currency" fallback="EGP" />
            </small>
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5">
            <button
              onClick={() => handleOrder(mainProduct, "whatsapp")}
              className="flex-1 text-xs sm:text-sm font-semibold h-11 px-5 rounded-full bg-[#124635] hover:bg-[#0c2b20] text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FaWhatsapp className="w-5 h-5 text-[#25D366]" />
              <LocalizedText id="order_whatsapp" />
            </button>

            <button
              onClick={() => handleOrder(mainProduct, "facebook")}
              className="flex-1 text-xs sm:text-sm font-semibold h-11 px-5 rounded-full bg-[#0084ff] hover:bg-[#0073e6] text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FaFacebookMessenger className="w-5 h-5" />
              <LocalizedText id="order_facebook" />
            </button>
          </div>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div>
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#ede9df]">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#18261f] tracking-tight">
            <LocalizedText id="collection_title" />
          </h3>
          <span className="text-xs uppercase tracking-widest text-[#c39b6e] font-semibold">
            {products.length} Flavours
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOrder={(social) => handleOrder(product, social)}
              onSelect={() => {
                setMainProduct(product);
                window.scrollTo({ top: 120, behavior: "smooth" });
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
