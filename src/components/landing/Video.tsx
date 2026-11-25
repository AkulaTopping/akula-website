"use client";

export default function IntroVideoSection() {
  return (
    <section aria-label="Brand film" className="py-20 lg:py-28 bg-[#fbf9f4] border-t border-[#ede9df]/60">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <div className="text-center mb-10">
          <span className="inline-block uppercase tracking-[0.25em] text-xs font-bold text-[#c39b6e] mb-2">
            Artisanal Excellence
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#18261f] tracking-tight">
            Crafted for Signature Creations
          </h2>
        </div>

        <div className="aspect-video overflow-hidden rounded-3xl shadow-2xl shadow-[#124635]/10 border border-[#ede9df] bg-black">
          <video
            className="h-full w-full object-cover"
            controls
            playsInline
            preload="metadata"
          >
            <source src="/video/akula-video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
