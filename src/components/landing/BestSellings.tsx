"use client";
import { sellingProducts } from "@/src/utils/constants";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LocalizedText from "@/src/components/LocalizedText";

export default function ProductShowcase() {
  const [active, setActive] = React.useState(sellingProducts[0]);

  return (
    <div className="w-full flex flex-col bg-secondary p-6 min-h-[calc(100svh-64px)]">
      <div className="text-center mb-8 lg:mb-4">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
          <LocalizedText id="bestSelling_title" />
        </h2>
        <p className="text-gray-600 mt-2">
          <LocalizedText id="bestSelling_subtitle" />
        </p>
      </div>

      <div className="grow grid grid-cols-1 lg:grid-cols-3 items-center md:gap-10 lg:gap-4">
        {/* LEFT TEXT */}
        <div className="order-2 lg:order-1 text-center lg:text-left z-10">
          <span className="uppercase tracking-[0.2em] text-xs font-bold text-main">
            <LocalizedText id="explore_premium" />
          </span>
          <h1 className="text-3xl md:text-6xl font-black text-gray-900 mt-2 mb-4 leading-none">
            {active.name}
          </h1>
          <p className="text-white max-w-sm mx-auto lg:mx-0 text-sm md:text-2xl">
            <LocalizedText id="bestSelling_description" />
          </p>
        </div>

        {/* CENTER PRODUCT */}
        <div className="order-1 lg:order-2 relative h-87.5 md:h-62.5 lg:h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -30 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <div className="relative h-full w-full flex items-center justify-center">
                <Image
                  src={active.image}
                  alt={active.name}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT CARD*/}
        <div className="hidden md:flex md:justify-center order-3 justify-end">
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
              {active.weight} <LocalizedText id="weight_unit" />
            </p>
            <h3 className="font-bold text-xl text-gray-800">{active.name}</h3>
            <div className="flex items-center justify-between mt-6">
              <span className="text-2xl font-black text-gray-900">
                {active.price}{" "}
                <small className="text-xs">
                  <LocalizedText id="currency" />
                </small>
              </span>
              <Link href="/products">
                <button className="bg-black text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-orange-600 transition-colors">
                  <LocalizedText id="viewAll" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* BOTTOM SELECTOR */}
      <div className="py-4 flex justify-center mt-auto">
        <div className="flex gap-2 p-2 bg-white/50 backdrop-blur-xl rounded-4xl border border-white/50 shadow-lg">
          {sellingProducts.map((p) => (
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
  );
}
