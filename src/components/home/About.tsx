import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const reveal = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

const metrics = [
  { value: "500+", label: "Unit Premium", note: "Tersedia & terkurasi" },
  { value: "10+", label: "Brand Tersedia", note: "Eropa · Jepang · Amerika" },
  { value: "98%", label: "Customer Satisfaction", note: "Survei pasca-pengiriman" },
  { value: "24/7", label: "Consultation Support", note: "Concierge spesialis brand" },
];

const values = [
  { num: "I", title: "Transparansi", desc: "Dokumentasi lengkap, histori terbuka, tanpa biaya tersembunyi." },
  { num: "II", title: "Kualitas", desc: "Inspeksi 120 titik oleh teknisi bersertifikat brand." },
  { num: "III", title: "Kepercayaan", desc: "Hubungan jangka panjang dibangun melalui integritas." },
  { num: "IV", title: "Pengalaman Premium", desc: "Setiap detail dirancang untuk mereka yang menghargai presisi." },
];

export function About() {
  return (
    <section id="tentang" className="relative mx-auto w-full max-w-[1480px] scroll-mt-24 px-6 py-32 md:px-12 md:py-48">
      {/* Chapter */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={reveal}
        transition={{ duration: 1, ease: EASE }}
        className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.34em] text-muted-foreground/70"
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_oklch(0.63_0.27_22/0.7)]" />
        <span>Hall II · Who we are</span>
      </motion.div>

      {/* Headline statement */}
      <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-20 md:gap-x-10">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          transition={{ duration: 1.2, ease: EASE, delay: 0.05 }}
          className="col-span-12 font-display text-[clamp(2.5rem,7vw,6.25rem)] font-medium leading-[0.92] tracking-[-0.04em] md:col-span-9"
        >
          Lebih dari sekadar showroom —
          <span className="block pl-[6vw] font-extralight italic text-foreground/55">
            sebuah maison otomotif.
          </span>
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
          className="col-span-12 max-w-md text-[15px] leading-relaxed text-muted-foreground md:col-span-3 md:pt-6"
        >
          Kami menghadirkan pengalaman otomotif premium untuk mereka yang
          menghargai kualitas, presisi, dan eksklusivitas — bukan sekadar
          kepemilikan, melainkan ekspresi gaya hidup.
        </motion.div>
      </div>

      {/* Metrics — luxury statistics */}
      <div className="mt-28 grid grid-cols-12 gap-y-12 border-t border-white/8 pt-14 md:mt-40 md:gap-x-10 md:pt-20">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={reveal}
            transition={{ duration: 1, ease: EASE, delay: 0.05 + i * 0.06 }}
            className="col-span-6 md:col-span-3"
          >
            <div className="font-display text-[clamp(2.75rem,5.5vw,4.75rem)] font-extralight tabular-nums leading-none tracking-[-0.04em] text-foreground">
              {m.value}
            </div>
            <div className="mt-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-foreground/85">
              {m.label}
            </div>
            <div className="mt-2 text-xs leading-relaxed text-muted-foreground/80">
              {m.note}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Values */}
      <div className="mt-32 grid grid-cols-12 gap-y-12 md:mt-44 md:gap-x-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          transition={{ duration: 1, ease: EASE }}
          className="col-span-12 md:col-span-4"
        >
          <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.34em] text-muted-foreground/70">
            <span className="block h-px w-10 bg-foreground/30" />
            Maison values
          </div>
          <h3 className="mt-6 font-display text-3xl font-medium leading-[1] tracking-[-0.03em] md:text-4xl">
            Empat prinsip yang
            <span className="block font-extralight italic text-foreground/60">
              tidak dikompromikan.
            </span>
          </h3>
        </motion.div>

        <div className="col-span-12 grid grid-cols-1 gap-y-px md:col-span-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={reveal}
              transition={{ duration: 1, ease: EASE, delay: 0.05 + i * 0.06 }}
              className="grid grid-cols-12 items-baseline gap-x-6 border-t border-white/8 py-7 first:border-t-0 md:gap-x-10 md:py-9"
            >
              <span className="col-span-2 font-display text-sm font-light tracking-[0.25em] text-foreground/55 md:col-span-1">
                {v.num}
              </span>
              <h4 className="col-span-10 font-display text-xl font-medium leading-[1.1] tracking-[-0.02em] md:col-span-4 md:text-2xl">
                {v.title}
              </h4>
              <p className="col-span-12 text-[14px] leading-relaxed text-muted-foreground md:col-span-7">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
