"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "/hero/IMG_3777.JPG",
    alt: "Mobile bar setup",
    position: "object-bottom",
    zoom: "scale-[1.40] md:scale-[1.05]",
  },
  {
    src: "/hero/actionShot.jpg",
    alt: "Cocktail details",
    position: "object-center",
  },
  { src: "/hero/margarita.jpg", alt: "Event pour", position: "object-center" },
];

export default function HeroSlideshow({
  intervalMs = 4000,
}: {
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return (
    <div className="absolute inset-0">
      {slides.map((s, i) => (
        <div
          key={s.src}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover ${s.position}  ${s.zoom ?? ""}`}
          />
        </div>
      ))}

      {/* Overlay to keep text readable while staying minimal/elevated */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black/10" />
      <div className="absolute inset-0 bg-[#f8f5ef]/10" />
    </div>
  );
}
