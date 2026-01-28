"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/src/utils/types";
import ProductCard from "@/src/components/ProductCard";
import { FaFacebookMessenger, FaWhatsapp } from "react-icons/fa";
import { facebook, tel } from "@/src/utils/constants";

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
        ? `https://m.me/${facebook}?ref=${message}`
        : `https://wa.me/+20${tel}?text=${message}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div
          className={`rounded-xl border-2 ${mainProduct.borderColor} h-96 flex items-center justify-center`}
        >
          <div className="relative w-[90%] h-[90%]">
            <Image
              src={mainProduct.image}
              alt={mainProduct.name}
              fill
              className="object-contain"
              sizes="500px"
              priority
            />
          </div>
        </div>

        {/* DETAILS */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            {mainProduct.name}
          </h2>
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">
            {mainProduct.brand}
          </p>
          <p className="text-4xl font-bold text-primary mb-6">
            {mainProduct.price.toFixed(2)} EGP
          </p>

          <p className="text-gray-600 mb-8">
            Experience the refreshing taste of {mainProduct.flavor}. Our premium
            sauce is crafted with natural ingredients for maximum flavor and
            satisfaction.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => handleOrder(mainProduct, "whatsapp")}
              className="flex-1 text-xs h-9 px-3 rounded-md bg-green-600 hover:bg-green-700 text-white transition flex items-center justify-center gap-2"
            >
              <FaWhatsapp className="w-5 h-6" />
              Order on WhatsApp
            </button>

            <button
              onClick={() => handleOrder(mainProduct, "facebook")}
              className="flex-1 text-xs h-9 px-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition flex items-center justify-center gap-2"
            >
              <FaFacebookMessenger className="w-5 h-6" />
              Order on Facebook
            </button>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-8">
          Our Collection
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOrder={(social) => handleOrder(product, social)}
              onSelect={() => setMainProduct(product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
