import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const testimonials = [
  {
    quote: "Pengalaman beli mobil paling mulus yang pernah saya rasakan. Tim Abadi sangat detail dari konsultasi hingga delivery.",
    name: "Adrian Wirawan",
    role: "Founder, Atelier Studio",
    index: "I",
  },
  {
    quote: "Showroom-nya elegan, tapi yang lebih impresif adalah transparansi histori unit dan kecepatan respon timnya.",
    name: "Karina Halim",
    role: "Managing Director",
    index: "II",
  },
  {
    quote: "Trade-in Porsche lama, ambil Lucid baru — semua diurus end-to-end. Concierge service-nya luar biasa.",
    name: "Reza Pratama",
    role: "Investor & Car Enthusiast",
    index: "III",
  },
];

const reveal = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

export function Testimonials() {
  return (
    <section className="relative mx-auto w-full max-w-[1400px] px-6 py-32 md:px-10 md:py-44">
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          transition={{ duration: 1, ease: EASE }}
          className="col-span-12 mb-14 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground/70 md:mb-20"
        >
          <span className="block h-px w-12 bg-foreground/30" />
          Chapter 04 · Client Stories
        </motion.div>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          transition={{ duration: 1.1, ease: EASE }}
          className="col-span-12 mb-20 font-display text-[clamp(2.5rem,5.5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.035em] md:col-span-9 md:mb-28"
        >
          Dipercaya oleh
          <span className="block pl-[6vw] italic text-muted-foreground/70">kolektor &amp; profesional.</span>
        </motion.h2>
      </div>

      {/* Editorial quotes — stacked, asymmetric indentation */}
      <div className="flex flex-col gap-16 md:gap-24">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.1, ease: EASE }}
            className={[
              "grid grid-cols-12 gap-x-6 border-t border-white/10 pt-10 md:gap-x-10 md:pt-12",
              i === 1 ? "md:pl-[8vw]" : i === 2 ? "md:pl-[16vw]" : "",
            ].join(" ")}
          >
            <div className="col-span-12 mb-6 font-display text-3xl font-light italic tabular-nums text-muted-foreground/60 md:col-span-2 md:mb-0 md:text-4xl">
              {t.index}
            </div>
            <div className="col-span-12 md:col-span-10">
              <blockquote className="font-display text-balance text-[clamp(1.5rem,2.8vw,2.5rem)] font-light leading-[1.25] tracking-[-0.02em] text-foreground/95">
                <span className="text-primary">"</span>{t.quote}<span className="text-primary">"</span>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.25em]">
                <span className="block h-px w-8 bg-foreground/40" />
                <span className="text-foreground">{t.name}</span>
                <span className="text-muted-foreground/70">· {t.role}</span>
              </figcaption>
            </div>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
