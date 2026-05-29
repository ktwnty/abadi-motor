import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Expand, X, ChevronLeft, ChevronRight } from "lucide-react";

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  const next = () => setActive((i) => (i + 1) % images.length);
  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="space-y-4">
      <div className="group relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-surface/60">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={images[active]}
            alt={alt}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        {/* Cinematic overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_60%_at_50%_0%,transparent_40%,oklch(0_0_0/0.45))]" />

        {/* Controls */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/40 p-3 text-white opacity-0 backdrop-blur transition hover:bg-black/60 group-hover:opacity-100"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/40 p-3 text-white opacity-0 backdrop-blur transition hover:bg-black/60 group-hover:opacity-100"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <button
          onClick={() => setZoom(true)}
          aria-label="Zoom"
          className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/40 p-2.5 text-white backdrop-blur transition hover:bg-black/60"
        >
          <Expand className="h-4 w-4" />
        </button>

        <div className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-xs text-white/80 backdrop-blur">
          {active + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`group relative aspect-[16/11] overflow-hidden rounded-xl border transition-all ${
              i === active
                ? "border-primary shadow-[0_0_0_2px_oklch(0.72_0.19_240/0.4)]"
                : "border-white/10 opacity-60 hover:opacity-100"
            }`}
          >
            <img src={src} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </button>
        ))}
      </div>

      {/* Fullscreen zoom */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-6 backdrop-blur-xl"
            onClick={() => setZoom(false)}
          >
            <button
              className="absolute right-6 top-6 rounded-full border border-white/20 bg-white/10 p-3 text-white hover:bg-white/20"
              onClick={() => setZoom(false)}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              key={active}
              src={images[active]}
              alt={alt}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-h-full max-w-full rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
