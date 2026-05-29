import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

const EASE = [0.22, 1, 0.36, 1] as const;
const reveal = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

export function CTA() {
  return (
    <section className="relative mx-auto w-full max-w-[1400px] px-6 py-32 md:px-10 md:py-44">
      <div className="grid grid-cols-12 gap-x-6 border-t border-white/10 pt-20 md:gap-x-10 md:pt-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          transition={{ duration: 1, ease: EASE }}
          className="col-span-12 mb-12 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground/70 md:col-span-4 md:mb-0"
        >
          <span className="block h-px w-12 bg-foreground/30" />
          Reservasi Privat
        </motion.div>

        <div className="col-span-12 md:col-span-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={reveal}
            transition={{ duration: 1.1, ease: EASE }}
            className="font-display text-[clamp(2.5rem,6vw,6rem)] font-semibold leading-[0.92] tracking-[-0.04em]"
          >
            Temukan mobil
            <span className="block pl-[4vw] italic text-muted-foreground/70">impian Anda —</span>
            <span className="block">hari ini juga.</span>
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={reveal}
            transition={{ duration: 1.1, ease: EASE, delay: 0.08 }}
            className="mt-10 max-w-md text-[15px] leading-relaxed text-muted-foreground"
          >
            Jadwalkan kunjungan showroom privat atau konsultasi virtual bersama spesialis kami.
            Tanpa tekanan, tanpa biaya.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={reveal}
            transition={{ duration: 1.1, ease: EASE, delay: 0.14 }}
            className="mt-12 flex flex-wrap gap-3"
          >
            <Link
              to="/katalog"
              className="group inline-flex items-center gap-3 rounded-full border border-foreground bg-foreground px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-background transition-[background-color,color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              Jelajahi katalog
              <span className="inline-block text-base leading-none transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/katalog"
              className="inline-flex items-center gap-3 rounded-full border border-white/15 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/85 transition-colors duration-500 hover:border-white/40 hover:text-foreground"
            >
              Book test drive
              <span className="inline-block text-base leading-none">▸</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
