"use client";

import { products } from "@/src/utils/constants";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React from "react";
export default function ProductShowcase() {
  const [active, setActive] = React.useState(products[0]);

  return (
    <section className="relative min-h-screen bg-[#f7f7f7] flex-col items-center overflow-hidden">
      <div className="text-center mb-12 py-7">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Best Selling Sauces
        </h2>
        <p className="text-lg text-gray-600">Swipe through our collection</p>
      </div>
      <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-3 items-center gap-12">
        {/* LEFT TEXT */}
        <div className="space-y-6">
          <span className="uppercase tracking-widest text-sm text-gray-500">
            Premium Sauce
          </span>

          <h1 className="text-5xl font-bold leading-tight">{active.name}</h1>

          <p className="text-gray-500 max-w-md">
            Crafted from the finest ingredients to elevate every dish.
          </p>
        </div>

        {/* CENTER PRODUCT */}
        <div className="relative flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={active.image}
                alt={active.name}
                width={420}
                height={520}
                className=" drop-shadow-[0_40px_60px_rgba(0,0,0,0.2)]"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT FLOATING CARD */}
        <div className="hidden lg:block">
          <motion.div
            key={active.id + "-card"}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-6 w-72 ml-auto"
          >
            <Image
              src={active.image}
              alt={active.name}
              width={120}
              height={150}
              className="mx-auto mb-4"
            />

            <h3 className="font-semibold text-lg">{active.name}</h3>
            <p className="text-sm text-gray-500">{active.weight} GM</p>

            <div className="flex items-center justify-between mt-4">
              <span className="font-bold text-lg">{active.price} EG</span>
              <button className=" text-gray-500 cursor-pointer  rounded-full text-sm">
                View All..
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* BOTTOM PRODUCT SELECTOR */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-6 bg-white/70 backdrop-blur-md px-10 py-4 rounded-full shadow-lg">
        {products.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p)}
            className={`relative w-16 h-16 border transition ${
              p.id === active.id
                ? "border-black scale-110"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <Image src={p.image} alt={p.name} fill className="object-cover" />
          </button>
        ))}
      </div>
    </section>
  );
}
