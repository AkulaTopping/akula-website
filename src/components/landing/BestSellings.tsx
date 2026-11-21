"use client";
import { sellingProducts } from "@/src/utils/constants";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LocalizedText from "@/src/components/LocalizedText";

export default function ProductShowcase() {
  const [active, setActive] = React.useState(sellingProducts[0]);
  const sellingKey = (name: string) =>
    `selling_${name
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "")}_name`;

  return (
    <section aria-label="Best selling products" className="w-full flex flex-col bg-[#fbf9f4] py-16 px-6 lg:px-12 min-h-[calc(100svh-80px)] border-t border-[#ede9df]/60">
      {/* Section Head */}
      <div className="text-center mb-10 lg:mb-6">
        <span className="inline-block uppercase tracking-[0.25em] text-xs font-bold text-[#c39b6e] mb-2">
          <LocalizedText id="explore_premium" fallback="Signature Selection" />
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-[#18261f] tracking-tight">
          <LocalizedText id="bestSelling_title" />
        </h2>
        <p className="text-gray-500 mt-2 text-sm md:text-base font-light">
          <LocalizedText id="bestSelling_subtitle" />
        </p>
      </div>

      <div className="grow grid grid-cols-1 lg:grid-cols-3 items-center md:gap-10 lg:gap-8 max-w-7xl mx-auto w-full">
        {/* LEFT TEXT */}
        <div className="order-2 lg:order-1 text-center lg:text-start z-10 py-6 lg:py-0">
          <span className="inline-block uppercase tracking-[0.25em] text-xs font-bold text-[#c39b6e] mb-2">
            <LocalizedText id="premium_note" fallback="100% Natural" />
          </span>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#18261f] mt-1 mb-4 leading-none">
            <LocalizedText
              id={sellingKey(active.name)}
              fallback={active.name}
            />
          </h3>
          <p className="text-gray-600 max-w-sm mx-auto lg:mx-0 text-sm md:text-base leading-relaxed font-light">
            <LocalizedText id="bestSelling_description" />
          </p>
        </div>

        {/* CENTER PRODUCT */}
        <div className="order-1 lg:order-2 relative h-80 sm:h-96 lg:h-full flex items-center justify-center">
          {/* Subtle warm glow behind the bottle */}
          <div className="absolute w-64 h-64 sm:w-80 sm:h-80 bg-[#c39b6e]/15 rounded-full blur-2xl pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -20 }}
              transition={{ type: "spring", stiffness: 110, damping: 20 }}
              className="relative w-full h-full flex items-center justify-center drop-shadow-[0_20px_25px_rgba(0,0,0,0.15)]"
            >
              <div className="relative h-full w-full flex items-center justify-center">
                <Image
                  src={active.image}
                  alt={active.name}
                  fill
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT CARD */}
        <div className="hidden md:flex md:justify-center order-3 justify-end">
          <motion.div
            key={active.id + "-card"}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-7 rounded-3xl shadow-xl shadow-black/[0.04] border border-[#ede9df] w-72"
          >
            <div className="aspect-square relative mb-4 bg-[#fbf9f4] rounded-2xl p-4 border border-[#f0ede6]">
              <Image
                src={active.image}
                alt={active.name}
                fill
                sizes="256px"
                className="object-contain"
              />
            </div>
            <p className="text-[11px] text-[#c39b6e] font-bold tracking-wider mb-1 uppercase">
              {active.weight} <LocalizedText id="weight_unit" />
            </p>
            <h4 className="font-bold text-xl text-[#18261f]">
              <LocalizedText
                id={sellingKey(active.name)}
                fallback={active.name}
              />
            </h4>
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
              <span className="text-2xl font-bold text-[#124635]">
                {active.price}{" "}
                <small className="text-xs font-semibold text-gray-500">
                  <LocalizedText id="currency" />
                </small>
              </span>
              <Link href="/products">
                <button className="bg-[#124635] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[#0c2b20] transition-colors shadow-xs cursor-pointer">
                  <LocalizedText id="viewAll" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* BOTTOM SELECTOR */}
      <div className="py-6 flex justify-center mt-auto" role="tablist" aria-label="Select product flavor">
        <div className="flex gap-2.5 p-2.5 bg-white/80 backdrop-blur-md rounded-full border border-gray-200/80 shadow-md">
          {sellingProducts.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p)}
              role="tab"
              aria-selected={p.id === active.id}
              aria-label={p.name}
              className={`relative w-14 h-14 md:w-18 md:h-18 rounded-2xl transition-all duration-300 p-2 cursor-pointer ${
                p.id === active.id
                  ? "bg-white shadow-md scale-110 ring-2 ring-[#c39b6e]"
                  : "opacity-40 hover:opacity-100 hover:bg-white/60"
              }`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 56px, 72px"
                  className="object-contain"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
