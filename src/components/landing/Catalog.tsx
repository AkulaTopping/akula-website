"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { pages } from "@/src/utils/constants";
import LocalizedText from "@/src/components/LocalizedText";

export default function Catalog() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const flipDuration = 600;
  const autoSwipeDelay = 3000;
  const interactionPause = 5000;

  const registerInteraction = () => {
    setIsUserInteracting(true);
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, interactionPause);
  };

  useEffect(() => {
    if (isUserInteracting) return;

    const interval = setInterval(() => {
      if (isFlipping) return;

      setFlipDirection("next");
      setIsFlipping(true);

      setTimeout(() => {
        setCurrentPage((p) => (p + 1) % pages.length);
        setIsFlipping(false);
      }, flipDuration);
    }, autoSwipeDelay);

    return () => clearInterval(interval);
  }, [isFlipping, isUserInteracting]);

  const handleNext = () => {
    if (isFlipping) return;
    registerInteraction();
    setFlipDirection("next");
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((p) => (p + 1) % pages.length);
      setIsFlipping(false);
    }, flipDuration);
  };

  const handlePrev = () => {
    if (isFlipping) return;
    registerInteraction();
    setFlipDirection("prev");
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((p) => (p - 1 + pages.length) % pages.length);
      setIsFlipping(false);
    }, flipDuration);
  };

  return (
    <section
      id="catalog"
      aria-label="Product catalog"
      className="py-20 bg-gradient-to-b from-[#fbf9f4] to-white min-h-screen flex items-center justify-center border-t border-[#ede9df]/60"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <span className="inline-block uppercase tracking-[0.25em] text-xs font-bold text-[#c39b6e] mb-2">
            <LocalizedText id="explore_premium" fallback="Interactive Showcase" />
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#18261f] tracking-tight">
            <LocalizedText id="catalog_title" />
          </h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base font-light">
            <LocalizedText id="catalog_subtitle" />
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="pt-2">
            <div className="flex items-center justify-center" style={{ perspective: "1500px" }}>
              <div className="relative w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    className="relative bg-white rounded-2xl shadow-2xl shadow-black/15 overflow-hidden border border-gray-150"
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
                    onPointerDown={registerInteraction}
                  >
                    <div className="relative aspect-3/4 w-full">
                      <Image
                        src={pages[currentPage]}
                        alt={`Catalog page ${currentPage + 1}`}
                        fill
                        className="object-cover"
                        priority={currentPage === 0}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                        quality={85}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Dot Pagination */}
                <div className="flex justify-center gap-2 mt-8 mb-4" role="tablist" aria-label="Catalog pages">
                  {pages.map((_, index) => (
                    <button
                      key={index}
                      role="tab"
                      aria-selected={index === currentPage}
                      onClick={() => {
                        if (isFlipping || index === currentPage) return;
                        registerInteraction();
                        setFlipDirection(index > currentPage ? "next" : "prev");
                        setIsFlipping(true);
                        setTimeout(() => {
                          setCurrentPage(index);
                          setIsFlipping(false);
                        }, flipDuration);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        index === currentPage
                          ? "bg-[#124635] w-9"
                          : "bg-gray-300 w-2 hover:bg-[#c39b6e]"
                      }`}
                      aria-label={`Go to page ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-6 px-4">
                  <button
                    onClick={handlePrev}
                    disabled={isFlipping}
                    aria-label="Previous page"
                    className="bg-white p-3.5 rounded-full shadow-lg border border-gray-200 text-[#18261f] hover:bg-gray-50 hover:text-[#124635] disabled:opacity-30 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={isFlipping}
                    aria-label="Next page"
                    className="bg-white p-3.5 rounded-full shadow-lg border border-gray-200 text-[#18261f] hover:bg-gray-50 hover:text-[#124635] disabled:opacity-30 transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
