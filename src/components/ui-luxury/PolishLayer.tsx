import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useMotionValue } from "framer-motion";

/**
 * Premium polish overlay:
 * - Scroll progress indicator (top bar)
 * - Subtle cursor glow (desktop only)
 * - Noise texture overlay
 */
export function PolishLayer() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 60, damping: 28, mass: 0.4 });

  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  // Ultra-smooth interpolated cursor follow
  const sx = useSpring(mx, { stiffness: 50, damping: 24, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 50, damping: 24, mass: 0.6 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <>
      {/* Scroll progress — subtle red accent */}
      <motion.div
        aria-hidden
        style={{ scaleX }}
        className="fixed left-0 right-0 top-0 z-[100] h-[2px] origin-left bg-primary/80"
      />

      {/* Cursor glow — soft neutral with red whisper */}
      {enabled && (
        <motion.div
          aria-hidden
          style={{ x: sx, y: sy }}
          className="pointer-events-none fixed left-0 top-0 z-[1] -translate-x-1/2 -translate-y-1/2 mix-blend-screen will-change-transform"
        >
          <div className="h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,oklch(0.63_0.27_22/0.10),transparent_65%)] blur-3xl" />
        </motion.div>
      )}


      {/* Noise texture */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.8 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "160px 160px",
        }}
      />
    </>
  );
}
