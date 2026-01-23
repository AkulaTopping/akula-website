"use client";

import { products } from "@/src/utils/constants";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React from "react";

export default function ProductShowcase() {
  const [active, setActive] = React.useState(products[0]);

  return (
    <section className="relative w-full h-[calc(100vh-64px)]  bg-secondary flex flex-col justify-center items-center p-6 overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col h-full">
        <div className="text-center mb-8 lg:mb-4">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
            Best Selling Sauces
          </h2>
          <p className="text-gray-600 mt-2">Swipe through our collection</p>
        </div>

        <div className="grow grid grid-cols-1 lg:grid-cols-3 items-center md:gap-10 lg:gap-4">
          {/* LEFT TEXT */}
          <div className="order-2 lg:order-1 text-center lg:text-left z-10">
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#e65b3c]">
              Premium Sauce
            </span>
            <h1 className="text-3xl md:text-6xl font-black text-gray-900 mt-2 mb-4 leading-none">
              {active.name}
            </h1>
            <p className="text-white max-w-sm mx-auto lg:mx-0 text-sm md:text-2xl">
              Crafted from the finest ingredients to elevate every dish.
              Inspired by traditional recipes with a modern twist.
            </p>
          </div>

          {/* CENTER PRODUCT */}
          <div className="order-1 lg:order-2 relative h-[350px] md:h-[500px] lg:h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -30 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <div className="relative h-[40vh] md:h-[50vh] lg:h-full w-full flex items-center justify-center">
                  <Image
                    src={active.image}
                    alt={active.name}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT CARD*/}
          <div className="hidden lg:flex order-3 justify-end">
            <motion.div
              key={active.id + "-card"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-3xl shadow-2xl border border-white w-64"
            >
              <div className="aspect-square relative mb-4 bg-gray-50 rounded-2xl p-4">
                <Image
                  src={active.image}
                  alt={active.name}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-xs text-gray-400 font-bold mb-1">
                {active.weight} GM
              </p>
              <h3 className="font-bold text-xl text-gray-800">{active.name}</h3>
              <div className="flex items-center justify-between mt-6">
                <span className="text-2xl font-black text-gray-900">
                  {active.price} <small className="text-xs">EGP</small>
                </span>
                <button className="bg-black text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-orange-600 transition-colors">
                  View All
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM SELECTOR */}
        <div className="py-4 flex justify-center mt-auto">
          <div className="flex gap-4 p-2 bg-white/50 backdrop-blur-xl rounded-4xl border border-white/50 shadow-lg">
            {products.map((p) => (
              <button
                key={p.id}
                onClick={() => setActive(p)}
                className={`relative w-14 h-14 md:w-20 md:h-20 rounded-3xl transition-all duration-300 p-2 ${
                  p.id === active.id
                    ? "bg-white shadow-md scale-110 ring-2 ring-orange-500/20"
                    : "opacity-40 hover:opacity-100 hover:bg-white/50"
                }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
