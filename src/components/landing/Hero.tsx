"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import LocalizedText from "@/src/components/LocalizedText";
import LocalizedHeroTitle from "@/src/components/LocalizedHeroTitle";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100svh-64px)] flex items-center bg-main overflow-hidden transition-all">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <h2 className="text-[20vw] font-black text-white/3 leading-none">
          AKULA
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-4">
        {/* Left content */}
        <div className="flex-1 text-center lg:text-left py-12 lg:py-0">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-8xl font-black mb-6 leading-[0.95] text-white tracking-tighter">
              <LocalizedHeroTitle
                id="hero_title_full"
                brandElement={<span className="text-secondary">Akula</span>}
                emphasisElement={
                  <span className="bg-linear-to-r from-secondary to-orange-300 bg-clip-text text-transparent">
                    {/* emphasis text will be injected */}
                  </span>
                }
              />
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg mx-auto lg:mx-0 leading-tight">
              <LocalizedText id="hero_subtitle" />
            </p>

            <div className="flex flex-col sm:flex-row gap-4 p-4 justify-center lg:justify-start">
              <Link href="/products">
                <button className="bg-secondary text-white px-10 py-4 rounded-full font-bold hover:shadow-[0_0_20px_rgba(245,158,37,0.5)] transition-all text-lg group overflow-hidden relative">
                  <span className="relative z-10">
                    <LocalizedText id="hero_cta" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right image */}
        <div className="flex-1 flex justify-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-xl"
          >
            <div className="absolute -top-4 -right-4 z-20 animate-bounce-slow hidden lg:block">
              <div className="bg-white text-main px-6 py-3 rounded-2xl shadow-2xl border-b-4 border-gray-200 flex flex-col items-center rotate-12">
                <span className="text-[10px] uppercase tracking-[0.2em] font-black opacity-60">
                  Premium
                </span>
                <span className="text-lg font-black italic">100% Natural</span>
              </div>
            </div>

            <div className="relative z-10 drop-shadow-[0_35px_35px_rgba(0,0,0,0.4)]">
              <Image
                src="/images/HeroImage.webp"
                width={700}
                height={700}
                loading="eager"
                alt="Akula Topping Collection"
                className="w-full h-auto object-contain"
                priority
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 w-full h-16 bg-[#f7f7f7]"
        style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)" }}
      />
    </section>
  );
}
