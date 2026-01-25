/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const AboutPage = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const curtainHeight = useTransform(smoothProgress, [0, 0.7], ["100%", "0%"]);
  const bottleScale = useTransform(smoothProgress, [0, 0.5], [0.95, 1]);
  const bottleOpacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.5],
    [0, 0.5, 1],
  );

  return (
    <main ref={containerRef} className="bg-[#fcfcfc] text-[#1a1a1a]">
      <div className="flex flex-col md:flex-row">
        {/* LEFT SIDE */}
        <div className="w-full md:w-6/12 p-8 md:p-16 lg:p-24 space-y-16 lg:space-y-24">
          <section>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-secondary font-semibold tracking-widest uppercase mb-4 block text-xs"
            >
              since 2020
            </motion.span>

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-8">
              The Purest Taste <br /> of Nature.
            </h1>

            <p className="text-lg lg:text-xl text-gray-500 max-w-md leading-relaxed">
              We believe the most exquisite flavors are already written in the
              soil. Our journey is about bringing that authentic taste of nature
              to your table through a premium sauce defined by quality, clarity,
              and respect for the ingredient.
            </p>
          </section>

          <section>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Growth</h2>

            <p className="text-base lg:text-lg text-gray-600 mb-10 max-w-md leading-relaxed">
              Born from a love for authentic flavor, our journey has been
              defined by a commitment to the perfect pour. Our signature blends
              have become the secret ingredient for the region's finest cafes,
              elevating every glass and scoop they touch.
            </p>

            <div className="grid grid-cols-1 gap-10 border-l-2 border-secondary pl-8">
              <div>
                <h4 className="text-5xl font-bold tracking-tighter">100%</h4>
                <p className="text-gray-400 uppercase tracking-[0.2em] text-[10px] mt-1">
                  Natural Origins
                </p>
              </div>

              <div>
                <h4 className="text-5xl font-bold tracking-tighter">55</h4>
                <p className="text-gray-400 uppercase tracking-[0.2em] text-[10px] mt-1">
                  Elite Distributors
                </p>
              </div>
            </div>
          </section>

          <section className="pb-20">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">The Essence</h2>

            <p className="text-lg lg:text-xl text-gray-600 italic border-l-4 border-gray-100 pl-6 leading-relaxed">
              We don't just sell sauce; we deliver the essential element for
              every drink and dessert masterpiece.
            </p>
          </section>
        </div>

        <div
          className="
    w-full md:w-6/12 flex items-center justify-center bg-white h-auto md:h-screen md:sticky md:top-0 py-16 md:py-0"
        >
          <div className="relative w-full h-full px-6 md:px-0">
            <motion.div
              style={{ scale: bottleScale, opacity: bottleOpacity }}
              className="relative w-full h-[420px] sm:h-[480px] md:h-full z-10"
            >
              <Image
                src="/images/aboutimg.webp"
                alt="Premium Quality Display"
                fill
                className="object-contain rounded-none md:rounded-xl shadow-2xl"
                priority
              />
            </motion.div>

            <motion.div
              style={{ height: curtainHeight }}
              className="absolute top-0 left-0 w-full bg-main z-20 flex items-center justify-center overflow-hidden rounded-none md:rounded-xl "
            >
              <motion.h2
                style={{ opacity: curtainHeight }}
                className="text-white text-xl md:text-2xl font-light tracking-[1.2em] uppercase"
              >
                Discover
              </motion.h2>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
