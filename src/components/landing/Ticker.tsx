"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";

export default function Ticker() {
  const { isAr } = useLanguage();

  return (
    <div className="ticker">
      {isAr ? (
        <>
          <span>جودة فائقة ومكونات طبيعية</span>
          <span>·</span>
          <span>مُصمم خصيصًا للمقاهي وصُنّاع الحلويات</span>
          <span>·</span>
          <span>توريد وتوزيع لجميع محافظات مصر</span>
        </>
      ) : (
        <>
          <span>Premium quality & natural ingredients</span>
          <span>·</span>
          <span>Crafted for cafés and dessert creators</span>
          <span>·</span>
          <span>Distributed across all Egypt governorates</span>
        </>
      )}
    </div>
  );
}
