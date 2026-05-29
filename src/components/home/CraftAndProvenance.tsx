import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const stages = [
  {
    n: "01",
    k: "Pemilihan",
    v: "Setiap unit yang masuk koleksi melewati seleksi awal — usia, jarak tempuh, dan kondisi mekanis menjadi syarat dasar.",
  },
  {
    n: "02",
    k: "Inspeksi",
    v: "Tim teknis melakukan pemeriksaan menyeluruh — mesin, transmisi, kelistrikan, hingga detail kabin yang sering terabaikan.",
  },
  {
    n: "03",
    k: "Verifikasi",
    v: "Dokumen, riwayat servis, dan keaslian nomor rangka diperiksa silang sebelum unit diberi status siap koleksi.",
  },
  {
    n: "04",
    k: "Persiapan",
    v: "Detailing menyeluruh, perawatan ringan bila perlu, lalu unit difoto dan dicatat untuk presentasi yang jujur.",
  },
];

export function CraftAndProvenance() {
  return (
    <section className="relative bg-[#070707] text-white overflow-hidden">
      <div className="relative mx-auto max-w-[1480px] px-6 py-32 md:px-12 md:py-44">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.34em] text-white/45"
        >
          <span className="block h-px w-12 bg-white/30" />
          V · Craft & Provenance
        </motion.div>

        {/* Editorial header */}
        <div className="mt-14 grid grid-cols-12 items-end gap-x-6 gap-y-10 md:mt-20 md:gap-x-10">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.05 }}
            className="col-span-12 font-serif text-[clamp(2.5rem,6.5vw,6rem)] leading-[0.95] tracking-[-0.035em] md:col-span-8"
          >
            Empat tahap, sebelum
            <span className="block pl-[5vw] italic text-white/55">
              sampai ke tangan Anda.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.12 }}
            className="col-span-12 max-w-sm text-[15px] leading-relaxed text-white/55 md:col-span-4 md:text-right"
          >
            Setiap kendaraan dalam koleksi kami melewati proses yang sama —
            tidak ada jalan pintas, tidak ada pengecualian.
          </motion.p>
        </div>

        {/* Process — vertical editorial stages */}
        <div className="mt-20 flex flex-col md:mt-28">
          {stages.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease: EASE, delay: 0.04 + i * 0.05 }}
              className="group grid grid-cols-12 items-baseline gap-x-6 gap-y-4 border-t border-white/10 py-10 transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] last:border-b md:gap-x-10 md:py-14"
            >
              {/* Index */}
              <div className="col-span-2 md:col-span-1">
                <span className="font-serif text-xs tabular-nums tracking-[0.25em] text-white/35">
                  {s.n}
                </span>
              </div>

              {/* Title */}
              <div className="col-span-10 md:col-span-5">
                <h3 className="font-serif text-[clamp(1.75rem,4vw,3rem)] leading-[1] tracking-[-0.025em] transition-colors duration-700 group-hover:text-white">
                  {s.k}
                </h3>
              </div>

              {/* Description */}
              <div className="col-span-12 md:col-span-6">
                <p className="max-w-md text-[15px] leading-relaxed text-white/55 md:ml-auto md:text-right">
                  {s.v}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Closing pull-quote */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: EASE }}
          className="mt-28 grid grid-cols-12 md:mt-40"
        >
          <p className="col-span-12 font-serif text-[clamp(1.5rem,3vw,2.5rem)] italic leading-[1.2] tracking-[-0.015em] text-white/70 md:col-span-9 md:col-start-3 md:text-center">
            "Yang kami jual bukan sekadar kendaraan — melainkan keyakinan
            bahwa pilihan Anda telah dipertimbangkan dengan baik."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
