"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroVideoMontage({
  src = "/hero/montage.mp4",
  poster,
  bottomBandClass = "bottom-8 md:bottom-8", // mirrors your slideshow band idea
  showControls = false,
}: {
  src?: string;
  poster?: string;
  bottomBandClass?: string;
  showControls?: boolean;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    // Best effort autoplay; muted + playsInline covers most cases
    v.play().catch(() => {});
  }, []);

  return (
    <div className="absolute inset-0">
      {/* Video area (stops early to leave a linen band) */}
      <div className={`absolute inset-x-0 top-0 ${bottomBandClass}`}>
        <div className="relative h-full w-full overflow-hidden">
          <video
            ref={ref}
            className="
              h-full w-full object-cover transform-gpu
              scale-[1.05] sm:scale-100 lg:scale-[1.00]
              object-[50%_40%] lg:object-[50%_5%]
            "
            src={src}
            poster={poster}
            muted
            playsInline
            autoPlay
            loop
            preload="metadata"
            controls={showControls}
            onCanPlay={() => setReady(true)}
          />

          {/* minimal overlays */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-black/15 to-black/10" />
          <div className="pointer-events-none absolute inset-0 bg-[var(--color-linen)]/10" />

          {/* subtle veil until ready */}
          {!ready && (
            <div className="pointer-events-none absolute inset-0 bg-[var(--color-linen)]/25" />
          )}
        </div>
      </div>

      {/* Linen band at bottom */}
      <div
        className={`absolute inset-x-0 ${bottomBandClass} bg-[var(--color-linen)]`}
      />
    </div>
  );
}
