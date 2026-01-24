"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/src/utils/types";
import ProductCard from "@/src/components/ProductCard";

export default function ProductsClient({ products }: { products: Product[] }) {
  const [mainProduct, setMainProduct] = useState(products[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* HERO IMAGE */}
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
            <button className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Buy Now
            </button>

            <button className="flex-1 px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-900 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
              <Heart className="w-5 h-5" />
              Save
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
            <div
              key={product.id}
              onClick={() => setMainProduct(product)}
              className="cursor-pointer"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
