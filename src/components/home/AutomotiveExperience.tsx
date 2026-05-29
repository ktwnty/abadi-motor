import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const reveal = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

const experiences = [
  {
    num: "01",
    title: "Premium Consultation",
    sub: "Sesi privat 1-on-1",
    desc: "Spesialis brand memandu Anda menemukan unit yang sesuai gaya hidup, dari Porsche hingga Lucid.",
    duration: "60 menit",
  },
  {
    num: "02",
    title: "Test Drive Experience",
    sub: "Showroom & on-site",
    desc: "Rasakan karakter setiap unit di jalur pilihan — bukan sekadar mengelilingi parkiran showroom.",
    duration: "By appointment",
  },
  {
    num: "03",
    title: "Trade-In Program",
    sub: "Apresiasi nilai terbaik",
    desc: "Penilaian transparan oleh tim appraiser bersertifikat. Selesaikan dalam satu kunjungan.",
    duration: "Same-day quote",
  },
  {
    num: "04",
    title: "Vehicle Inspection",
    sub: "120 titik pemeriksaan",
    desc: "Laporan kondisi menyeluruh oleh teknisi brand-trained sebelum unit memasuki koleksi.",
    duration: "Setiap unit",
  },
];

export function AutomotiveExperience() {
  return (
    <section className="relative mx-auto w-full max-w-[1480px] px-6 py-32 md:px-12 md:py-48">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={reveal}
        transition={{ duration: 1, ease: EASE }}
        className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.34em] text-muted-foreground/70"
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_oklch(0.63_0.27_22/0.7)]" />
        <span>Hall III · Automotive experience</span>
      </motion.div>

      <div className="mt-12 grid grid-cols-12 items-end gap-x-6 gap-y-8 md:mt-20 md:gap-x-10">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          transition={{ duration: 1.2, ease: EASE, delay: 0.05 }}
          className="col-span-12 font-display text-[clamp(2.5rem,6.5vw,5.75rem)] font-medium leading-[0.92] tracking-[-0.04em] md:col-span-8"
        >
          Empat pengalaman,
          <span className="block pl-[5vw] font-extralight italic text-foreground/55">
            satu standar maison.
          </span>
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          transition={{ duration: 1.2, ease: EASE, delay: 0.12 }}
          className="col-span-12 max-w-md text-[15px] leading-relaxed text-muted-foreground md:col-span-4 md:text-right"
        >
          Setiap langkah perjalanan dirancang seperti layanan butik —
          terukur, personal, dan tanpa terburu.
        </motion.p>
      </div>

      {/* Asymmetric editorial spread */}
      <div className="mt-24 grid grid-cols-12 gap-y-px md:mt-36">
        {experiences.map((e, i) => {
          const offset = i % 2 === 0 ? "md:pl-0" : "md:pl-[8vw]";
          return (
            <motion.article
              key={e.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={reveal}
              transition={{ duration: 1.1, ease: EASE, delay: 0.05 + i * 0.07 }}
              className={`group col-span-12 grid grid-cols-12 items-baseline gap-x-6 border-t border-white/8 py-10 md:gap-x-10 md:py-14 ${offset}`}
            >
              <span className="col-span-2 font-display text-sm font-light tabular-nums tracking-[0.2em] text-foreground/50 md:col-span-1">
                {e.num}
              </span>

              <div className="col-span-10 md:col-span-5">
                <h3 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1] tracking-[-0.03em] transition-colors duration-700 group-hover:text-primary/95">
                  {e.title}
                </h3>
                <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground/70">
                  {e.sub}
                </div>
              </div>

              <p className="col-span-12 mt-4 text-[14px] leading-relaxed text-muted-foreground md:col-span-5 md:mt-0">
                {e.desc}
              </p>

              <div className="col-span-12 mt-3 text-right font-display text-xs font-light tabular-nums tracking-[0.18em] text-foreground/60 md:col-span-1 md:mt-0">
                {e.duration}
              </div>
            </motion.article>
          );
        })}
        <div className="col-span-12 border-t border-white/8" />
      </div>
    </section>
  );
}
