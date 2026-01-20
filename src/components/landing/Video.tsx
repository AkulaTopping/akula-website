"use client";

export default function IntroVideoSection() {
  return (
<section className="py-24">
  <div className="mx-auto max-w-370 h-96 px-4">
    <div className="aspect-video overflow-hidden rounded-2xl">
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/video/intro.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</section>
  );
}
