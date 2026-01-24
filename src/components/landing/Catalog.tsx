"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Catalog() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const pages = [
    "/images/catalog/1-Picsart-AiImageEnhancer.jpg",
    "/images/catalog/catalogue-D (1)_page-0002.jpg",
    "/images/catalog/catalogue-D (1)_page-0003.jpg",
    "/images/catalog/catalogue-D (1)_page-0004.jpg",
    "/images/catalog/catalogue-D (1)_page-0005.jpg",
    "/images/catalog/catalogue-D (1)_page-0006.jpg",
    "/images/catalog/catalogue-D (1)_page-0007.jpg",
  ];

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
  }, [isFlipping, isUserInteracting, pages.length]);

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
    <section id="catalog" className="py-2 from-gray-100 via-gray-50 to-white min-h-screen flex items-center justify-center ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Product Catalog
          </h2>
          <p className="text-lg text-gray-600">Swipe through our collection</p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="pt-6">
            <div className="perspective-container flex items-center justify-center">
              <div className="relative w-full max-w-4xl">
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
                    onPointerDown={registerInteraction}
                  >
                    <div className="relative aspect-[3/4] w-full">
                      <Image
                        src={pages[currentPage]}
                        alt={`Page ${currentPage + 1}`}
                        fill
                        className="object-cover"
                        quality={100}
                       
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-center gap-2 mt-10 mb-8">
                  {pages.map((_, index) => (
                    <button
                      key={index}
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
