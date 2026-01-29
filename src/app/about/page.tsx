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

  const curtainHeight = useTransform(smoothProgress, [0, 0.6], ["100%", "0%"]);

  return (
    <main
      ref={containerRef}
      className="bg-[#fcfcfc] text-[#1a1a1a] selection:bg-secondary/20"
    >
      <div className="flex flex-col xl:flex-row min-h-screen">
        <div className="w-full xl:w-6/12 p-6 sm:p-12 lg:p-20 xl:p-24 flex justify-center items-center">
          <div className="max-w-2xl w-full space-y-20 lg:space-y-32">
            <section className="pt-10">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-secondary font-bold tracking-[0.3em] uppercase text-[10px] block mb-6"
              >
                Est. 2023 — The Art of Purity
              </motion.span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-8">
                Nature&apos;s Finest, <br />
                <span className="text-gray-400 font-light italic">Taste</span>
              </h1>

              <p className="text-lg lg:text-xl text-gray-500 leading-relaxed font-light">
                We believe that the most exquisite flavors are not
                manufactured—they are harvested. Our mission is to preserve that
                authenticity and bring it directly to your table through premium
                sauces defined by uncompromised quality, clarity, and respect
                for every ingredient.
              </p>
            </section>

            {/* THE GROWTH STORY */}
            <section className="relative">
              <div className="absolute -left-6 top-0 bottom-0 w-px bg-gray-100 hidden sm:block" />
              <h2 className="text-2xl lg:text-3xl font-bold mb-8">
                Our Evolution
              </h2>

              <div className="space-y-6 text-gray-600 text-base lg:text-lg leading-relaxed font-light">
                <p>
                  What began as a specialized pursuit of artisanal chocolate and
                  caramel has evolved into a regional benchmark for excellence.
                  Our early success was built on a simple promise:{" "}
                  <span className="text-black font-medium">
                    Seamless Perfection.
                  </span>
                </p>
                <p>
                  By 2025, we scaled our vision,we introduced a diverse line of
                  premium sauces crafted from carefully selected natural fruits,
                  delivering rich and genuine flavors.
                </p>
                <p>
                  Today, our network bridges governorates, connecting elite
                  distributors with a shared passion for setting new industry
                  standards through innovation and long-term integrity.
                </p>
              </div>

              {/*STATS */}
              <div className="grid grid-cols-2 gap-12 pt-12">
                <div className="group">
                  <h4 className="text-5xl lg:text-6xl font-black tracking-tighter group-hover:text-secondary transition-colors">
                    100%
                  </h4>
                  <div className="h-1 w-8 bg-secondary mb-3" />
                  <p className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">
                    Raw Natural Origins
                  </p>
                </div>

                <div className="group">
                  <h4 className="text-5xl lg:text-6xl font-black tracking-tighter group-hover:text-secondary transition-colors">
                    55+
                  </h4>
                  <div className="h-1 w-8 bg-secondary mb-3" />
                  <p className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">
                    Elite Distributors
                  </p>
                </div>
              </div>

              {/* DISTRIBUTION MAP */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="relative w-full aspect-square rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-2xl mt-16 p-4"
              >
                <Image
                  src="/images/map.webp"
                  alt="Distribution Map"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </section>

            {/* THE QUOTE */}
            <section className="pb-16 lg:pb-32">
              <div className="max-w-md">
                <h2 className="text-sm uppercase tracking-widest font-black text-black mb-6">
                  The Essence
                </h2>
                <blockquote className="text-2xl lg:text-3xl text-gray-800 font-serif italic leading-snug">
                  We don&apos;t just supply ingredients; we provide the{" "}
                  <span className="text-secondary">elemental soul</span> for
                  every drink and dessert masterpiece.
                </blockquote>
              </div>
            </section>
          </div>
        </div>

        <div className="w-full xl:w-6/12 bg-white xl:sticky xl:top-0 h-[60vh] sm:h-[80vh] xl:h-screen overflow-hidden flex items-center justify-center">
          <div className="relative w-full h-full p-6 sm:p-12 xl:p-0">
            <motion.div
              className="relative h-full w-full"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent z-10" />
              <Image
                src="/images/aboutimg.webp"
                alt="Premium Product Showcase"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            <motion.div
              style={{ height: curtainHeight }}
              className="hidden xl:flex absolute top-0 left-0 w-full bg-[#111] z-20 items-center justify-center overflow-hidden"
            >
              <motion.h2
                style={{ opacity: curtainHeight }}
                className="text-white text-3xl font-extralight tracking-[1.5em] uppercase pl-[1.5em]"
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
