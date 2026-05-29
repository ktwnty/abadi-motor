import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Opening Experience — fullscreen cinematic entrance.
 * Pure typography + light. Tidak ada foto mobil besar.
 */
export function Hero() {
  return (
    <section className="relative isolate -mt-24 flex min-h-[100svh] flex-col overflow-hidden bg-[oklch(0.035_0.003_240)]">
      {/* Base atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[linear-gradient(180deg,oklch(0.05_0.004_240)_0%,oklch(0.03_0.003_240)_60%,oklch(0.02_0.002_240)_100%)]" />

      {/* Soft single spotlight — like a gallery */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2, ease: EASE }}
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_72%_22%,oklch(0.14_0.012_240/0.85),transparent_58%)]"
      />

      {/* Quiet red whisper — corner only */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 2.4, ease: EASE, delay: 0.2 }}
        className="pointer-events-none absolute -right-40 top-[-6rem] -z-20 h-[38rem] w-[38rem] rounded-full bg-[oklch(0.45_0.22_22/0.22)] blur-[180px]"
      />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_55%,oklch(0.02_0.002_240)_100%)]" />

      {/* Editorial composition */}
      <div className="relative mx-auto grid w-full max-w-[1480px] flex-1 grid-cols-12 items-center gap-x-6 px-6 pt-32 pb-20 md:gap-x-10 md:px-12 md:pt-36">
        <div className="col-span-12 lg:col-span-10">

          <h1 className="font-display text-[clamp(2.5rem,8.5vw,8.5rem)] font-medium leading-[0.92] tracking-[-0.045em]">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.6 }}
              className="block"
            >
              Standar
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.75 }}
              className="block pl-[6vw] font-extralight italic text-foreground/65"
            >
              berbeda dalam
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.9 }}
              className="block"
            >
              memilih kendaraan<span className="text-primary">.</span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.15 }}
            className="mt-12 max-w-md text-[15px] leading-relaxed text-muted-foreground md:mt-16"
          >
            Kendaraan pilihan dengan kualitas terbaik untuk kenyamanan Anda.
          </motion.p>
        </div>
      </div>

      {/* Bottom — scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 1.3 }}
        className="relative mx-auto mb-10 flex w-full max-w-[1480px] items-end justify-between gap-8 border-t border-white/10 px-6 pt-7 text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground/75 md:px-12"
      >
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center gap-3 text-foreground/85"
        >
          <span className="block h-px w-8 bg-foreground/40" />
          Scroll untuk menjelajah
        </motion.span>
        <span className="hidden tabular-nums md:inline">I / VI</span>
      </motion.div>
    </section>
  );
}
