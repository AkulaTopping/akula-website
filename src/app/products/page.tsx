import ProductsClient from "@/src//components/ProductsClient";
import { products } from "@/src/utils/constants";
import LocalizedText from "@/src/components/LocalizedText";

export default function Page() {
  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      {/* HEADER */}
      <div className="relative overflow-hidden bg-linear-to-r from-main to-secondary">
        {/* Decorative shapes */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-20 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            <LocalizedText id="products_page_title" />
          </h1>

          <p className="mt-4 text-blue-100 max-w-2xl mx-auto text-sm sm:text-base">
            <LocalizedText id="products_page_subtitle" />
          </p>
        </div>

        {/* Wave bottom */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="white"
            d="M0,64L60,74.7C120,85,240,107,360,112C480,117,600,107,720,90.7C840,75,960,53,1080,48C1200,43,1320,53,1380,58.7L1440,64V120H0Z"
          />
        </svg>
      </div>

      {/* Client-rendered products area */}
      <ProductsClient products={products} />
    </main>
  );
}
