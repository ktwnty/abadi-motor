import { motion } from "framer-motion";

/**
 * Luxury showroom ambient layer — 70% deep carbon, 10% red accent.
 * Slow, cinematic, GPU-accelerated. Heavy layers hidden on mobile.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      {/* Base deep carbon */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.10_0.005_240),oklch(0.04_0.003_240)_70%)]" />

      {/* Slow drifting neutral light (very subtle, depth only) */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
        className="ambient-heavy absolute -left-40 top-1/4 h-[40rem] w-[40rem] rounded-full bg-[oklch(0.20_0.006_240/0.55)] blur-[160px] will-change-transform"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 42, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="ambient-heavy absolute right-[-10rem] top-2/3 h-[36rem] w-[36rem] rounded-full bg-[oklch(0.16_0.005_240/0.5)] blur-[160px] will-change-transform"
      />

      {/* Single subtle red accent glow (≤10% presence) */}
      <motion.div
        animate={{ opacity: [0.18, 0.32, 0.18] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="ambient-heavy absolute left-1/2 top-[35%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[oklch(0.50_0.26_22/0.18)] blur-[160px]"
      />

      {/* Architectural grid — neutral, automotive precision feel */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 0.5) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 25%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 25%, transparent 75%)",
        }}
      />

      {/* Top + bottom vignette for cinematic framing */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.04_0.003_240/0.7),transparent_25%,transparent_75%,oklch(0.04_0.003_240/0.9))]" />
    </div>
  );
}
