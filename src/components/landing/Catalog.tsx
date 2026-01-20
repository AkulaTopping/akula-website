"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Catalog() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState("next");

  const pages = [
    "/images/1.png",
    "/images/2.png",
    "/images/3.png",
    "/images/4.png",
    "/images/5.png",
    "/images/6.png",
  ];

  const handleNext = () => {
    if (isFlipping) return;
    setFlipDirection("next");
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((prev) => (prev + 1) % pages.length);
      setIsFlipping(false);
    }, 600);
  };

  const handlePrev = () => {
    if (isFlipping) return;
    setFlipDirection("prev");
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length);
      setIsFlipping(false);
    }, 600);
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

      
        <div className="relative max-w-5xl mx-auto">
          <div className="perspective-container flex items-center justify-center">
            <div className="relative w-full max-w-4xl">
             
              <motion.div 
                className="absolute inset-0 -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="absolute inset-0 bg-white rounded-lg shadow-md transform translate-y-3 translate-x-3 opacity-30"></div>
                <div className="absolute inset-0 bg-white rounded-lg shadow-md transform translate-y-1.5 translate-x-1.5 opacity-50"></div>
              </motion.div>

        
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  className="relative bg-white rounded-lg shadow-2xl overflow-hidden"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  initial={{
                    rotateY: flipDirection === "next" ? 90 : -90,
                    opacity: 0,
                  }}
                  animate={{
                    rotateY: 0,
                    opacity: 1,
                  }}
                  exit={{
                    rotateY: flipDirection === "next" ? -90 : 90,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                >
               
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none z-10"></div>

               
                  <div className="relative aspect-3/4 w-full">
                    <Image
                      src={pages[currentPage] || "/images/placeholder.png"}
                      alt={`Page ${currentPage + 1}`}
                      
                     
                      fill
                      className="object-cover rounded-l-4xl"
                      quality={100}
                      priority
                    />
                  </div>

                
                  <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-black/5 to-transparent pointer-events-none"></div>
                  <div className="absolute left-0 top-0 right-0 h-4 bg-gradient-to-b from-black/5 to-transparent pointer-events-none"></div>
                  
               
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.05) 100%)",
                    }}
                  />
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
                      }, 600);
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
                  className="bg-white text-gray-700 p-4 rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

           
                <button
                  onClick={handleNext}
                  disabled={isFlipping}
                  className="bg-white text-gray-700 p-4 rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
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