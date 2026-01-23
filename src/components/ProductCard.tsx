"use client";

import Image from "next/image";
import { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/src/utils/types";

export default function ProductCard({ product }: { product: Product }) {
  const [isLiked, setIsLiked] = useState(product.liked);
  const [showIcon, setShowIcon] = useState<"heart" | "cart" | null>(null);

  const toggleHeart = () => {
    setShowIcon("heart");
    setIsLiked(!isLiked);
    setTimeout(() => setShowIcon(null), 500);
  };

  const toggleCart = () => {
    setShowIcon("cart");
    setTimeout(() => setShowIcon(null), 500);
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
              {showIcon === "heart" ? "❤️" : "🛒"}
            </span>
          </div>
        )}
      </div>

      {/* DETAILS */}
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
            onClick={toggleHeart}
            className="flex-1 text-xs h-9 px-3 rounded-md border border-gray-300 hover:bg-gray-50 transition flex items-center justify-center gap-2"
          >
            <Heart
              className={`w-4 h-4 ${
                isLiked ? "fill-red-500 text-red-500" : ""
              }`}
            />
            {isLiked ? "Liked" : "Like"}
          </button>

          <button
            onClick={toggleCart}
            className="flex-1 text-xs h-9 px-3 rounded-md bg-purple-600 hover:bg-purple-700 text-white transition flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
