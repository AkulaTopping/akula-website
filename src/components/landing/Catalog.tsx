'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Catalog() {
  const [currentPage, setCurrentPage] = useState(0)

  const pages = [
    {
      title: 'Blue Berry',
      subtitle: 'Premium Blue Berry Flavor',
      details: 'Nutrition Facts per 100 ml: Energy 330 kcal, Fat 0g, Protein 0.5g, Carbohydrates 74.6g',
    },
    {
      title: 'Strawberry',
      subtitle: 'Fresh Strawberry Flavor',
      details: 'Nutrition Facts per 100 ml: Energy 320 kcal, Fat 0g, Protein 0.3g, Carbohydrates 73.8g',
    },
    {
      title: 'Mango',
      subtitle: 'Tropical Mango Flavor',
      details: 'Nutrition Facts per 100 ml: Energy 340 kcal, Fat 0g, Protein 0.4g, Carbohydrates 78.2g',
    },
    {
      title: 'Chocolate',
      subtitle: 'Rich Chocolate Flavor',
      details: 'Nutrition Facts per 100 ml: Energy 350 kcal, Fat 1g, Protein 2g, Carbohydrates 76.5g',
    },
  ]

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % pages.length)
  }

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length)
  }

  const currentPageData = pages[currentPage]

  return (
    <section id="catalog" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Product Catalog
          </h2>
          <p className="text-lg text-foreground/60">
            Browse our complete collection of natural toppings
          </p>
        </div>

        {/* Book/Catalog Swipper */}
        <div className="relative max-w-4xl mx-auto">
          {/* Flip Card Container */}
          <div className="perspective min-h-96 flex items-center justify-center">
            <div className="relative w-full max-w-2xl">
              {/* Book-like appearance with shadow */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-8 border-secondary/30">
                {/* Content with flip animation */}
                <div
                  className="relative transition-all duration-500 ease-out"
                  style={{
                    transformStyle: 'preserve-3d',
                    minHeight: '400px',
                  }}
                >
                  <div className="p-12 flex flex-col justify-center h-full bg-gradient-to-br from-secondary/10 to-accent/10">
                    {/* Page number indicator */}
                    <div className="absolute top-6 right-6 text-sm text-foreground/40">
                      Page {currentPage + 1} of {pages.length}
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-5xl font-bold text-primary mb-2">
                          {currentPageData.title}
                        </h3>
                        <p className="text-2xl text-secondary font-semibold">
                          {currentPageData.subtitle}
                        </p>
                      </div>

                      {/* Product image placeholder */}
                      <div className="flex justify-center py-8">
                        <div className="w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center text-6xl">
                          🍾
                        </div>
                      </div>

                      {/* Nutrition details */}
                      <div className="bg-white/50 rounded-lg p-6 border border-secondary/20">
                        <p className="text-foreground/70 font-medium">
                          {currentPageData.details}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Page indicators */}
              <div className="flex justify-center gap-2 mt-8 mb-8">
                {pages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`h-3 rounded-full transition-all ${
                      index === currentPage
                        ? 'bg-primary w-8'
                        : 'bg-border w-3 hover:bg-primary/50'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between items-center -mx-16">
                <button
                  onClick={handlePrev}
                  className="bg-primary text-primary-foreground p-3 rounded-full hover:opacity-90 transition shadow-lg hover:shadow-xl active:scale-95"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={handleNext}
                  className="bg-primary text-primary-foreground p-3 rounded-full hover:opacity-90 transition shadow-lg hover:shadow-xl active:scale-95"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Transition animation CSS */}
          <style jsx>{`
            @keyframes pageFlip {
              0% {
                transform: rotateY(0deg);
                opacity: 1;
              }
              50% {
                opacity: 0;
              }
              100% {
                transform: rotateY(0deg);
                opacity: 1;
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  )
}
