"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Video from "./Video";

export default function Catalog() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState("next");

  const pages = [
    "/images/catalog/1.png",
    "/images/catalog/2.png",
    "/images/catalog/3.png",
    "/images/catalog/4.png",
    "/images/catalog/5.png",
    "/images/catalog/6.png",
  ];

  const flipDuration = 600;

  const handleNext = () => {
    if (isFlipping) return;
    setFlipDirection("next");
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((p) => (p + 1) % pages.length);
      setIsFlipping(false);
    }, flipDuration);
  };

  const handlePrev = () => {
    if (isFlipping) return;
    setFlipDirection("prev");
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((p) => (p - 1 + pages.length) % pages.length);
      setIsFlipping(false);
    }, flipDuration);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-100 via-gray-50 to-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Product Catalog
          </h2>
          <p className="text-lg text-gray-600">Swipe through our collection</p>
        </div>

        {/* CATALOG WRAPPER */}
        <div className="relative max-w-5xl mx-auto">
          {/* VIDEO OVERLAY */}
          <div className="absolute top-0 left-0 w-full h-56 z-20 overflow-hidden rounded-lg">
            <Video />
          </div>

          {/* PUSH CONTENT DOWN SO IT'S NOT COVERED */}
          <div className="pt-56">
            <div className="perspective-container flex items-center justify-center">
              <div className="relative w-full max-w-4xl">
                {/* STACKED SHADOW */}
                <motion.div
                  className="absolute inset-0 -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="absolute inset-0 bg-white rounded-lg shadow-md translate-x-3 translate-y-3 opacity-30" />
                  <div className="absolute inset-0 bg-white rounded-lg shadow-md translate-x-1.5 translate-y-1.5 opacity-50" />
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    className="relative bg-white rounded-lg shadow-2xl overflow-hidden"
                    style={{ transformStyle: "preserve-3d" }}
                    initial={{
                      rotateY: flipDirection === "next" ? 90 : -90,
                      opacity: 0,
                    }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{
                      rotateY: flipDirection === "next" ? -90 : 90,
                      opacity: 0,
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    {/* GLOSS */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none z-10" />

                    {/* IMAGE */}
                    <div className="relative aspect-[3/4] w-full">
                      <Image
                        src={pages[currentPage]}
                        alt={`Page ${currentPage + 1}`}
                        fill
                        className="object-cover"
                        quality={100}
                        priority
                      />
                    </div>

                    {/* EDGE SHADING */}
                    <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-black/5 to-transparent pointer-events-none" />
                    <div className="absolute left-0 top-0 right-0 h-4 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
                  </motion.div>
                </AnimatePresence>

              
                <div className="flex justify-center gap-2 mt-10 mb-8">
                  {pages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (isFlipping || index === currentPage) return;
                        setFlipDirection(index > currentPage ? "next" : "prev");
                        setIsFlipping(true);
                        setTimeout(() => {
                          setCurrentPage(index);
                          setIsFlipping(false);
                        }, flipDuration);
                      }}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        index === currentPage
                          ? "bg-gray-800 w-10"
                          : "bg-gray-300 w-2.5 hover:bg-gray-500"
                      }`}
                      aria-label={`Go to page ${index + 1}`}
                    />
                  ))}
                </div>

              
                <div className="flex justify-between items-center mt-8 px-4">
                  <button
                    onClick={handlePrev}
                    disabled={isFlipping}
                    className="bg-white p-4 rounded-full shadow-lg border disabled:opacity-40"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={isFlipping}
                    className="bg-white p-4 rounded-full shadow-lg border disabled:opacity-40"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <style jsx>{`
            .perspective-container {
              perspective: 1500px;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
