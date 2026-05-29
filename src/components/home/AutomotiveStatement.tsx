import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function AutomotiveStatement() {
  return (
    <section className="relative bg-[#070707] text-white overflow-hidden">
      <div className="relative mx-auto max-w-[1480px] px-6 py-32 md:px-12 md:py-48">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.34em] text-white/45"
        >
          <span className="block h-px w-12 bg-white/30" />
          II · Statement
        </motion.div>

        {/* Editorial split */}
        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-14 md:mt-24 md:gap-x-10">
          {/* Big statement */}
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.05 }}
            className="col-span-12 font-serif text-[clamp(2.75rem,7.5vw,7rem)] leading-[0.92] tracking-[-0.04em] md:col-span-8"
          >
            Mobil yang baik dipilih
            <span className="block pl-[6vw] italic text-white/55">
              dengan tenang.
            </span>
          </motion.h2>

          {/* Right-side prose */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.12 }}
            className="col-span-12 max-w-md text-[15px] leading-relaxed text-white/55 md:col-span-4 md:pt-8 md:text-right"
          >
            Memilih kendaraan tidak seharusnya terburu-buru. Setiap unit kami seleksi dengan hati, setiap percakapan dibangun atas kepercayaan.
          </motion.div>
        </div>

        {/* Three pillars — editorial spec sheet */}
        <div className="mt-28 grid grid-cols-12 gap-y-14 border-t border-white/10 pt-16 md:mt-40 md:gap-x-10">
          {[
            {
              n: "01",
              k: "Kurasi",
              v: "Tidak semua mobil masuk koleksi kami hanya yang memenuhi standar.",
            },
            {
              n: "02",
              k: "Transparansi",
              v: "Riwayat, dokumen, dan kondisi disampaikan apa adanya.",
            },
            {
              n: "03",
              k: "Ketenangan",
              v: "Tanpa tekanan, tanpa pengejaran target hanya percakapan.",
            },
          ].map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: EASE, delay: 0.05 + i * 0.06 }}
              className="col-span-12 md:col-span-4"
            >
              <div className="font-serif text-sm tabular-nums text-white/35">{p.n}</div>
              <div className="mt-5 font-serif text-2xl tracking-[-0.02em] md:text-3xl">
                {p.k}
              </div>
              <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-white/55">
                {p.v}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
