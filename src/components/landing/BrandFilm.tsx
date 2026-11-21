"use client";

import React, { useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function BrandFilm() {
  const { isAr } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  function toggleSound() {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(videoRef.current.muted);
    }
  }

  return (
    <section className="akula-brand-film" aria-label="Akula new bottle collection">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        controls
        preload="metadata"
      >
        <source src="/assets/akula-new-bottles-film.mp4" type="video/mp4" />
        Your browser does not support video.
      </video>
      <div style={{ textAlign: "center", marginTop: "12px" }}>
        <button
          className="btn outline film-sound"
          type="button"
          aria-pressed={!muted}
          onClick={toggleSound}
        >
          {muted
            ? isAr
              ? "تشغيل الصوت 🔈"
              : "Play with sound 🔈"
            : isAr
              ? "كتم الصوت 🔇"
              : "Mute sound 🔇"}
        </button>
      </div>
    </section>
  );
}
