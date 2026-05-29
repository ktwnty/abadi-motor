import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const points = [
  {
    num: "01",
    title: "Unit Pilihan",
    body: "Setiap kendaraan dipilih melalui proses seleksi ketat kondisi, histori, dan kelayakan diperiksa sebelum masuk koleksi kami.",
  },
  {
    num: "02",
    title: "Transparan",
    body: "Informasi kendaraan dibuka apa adanya. Tidak ada detail yang disembunyikan, dari dokumen hingga catatan servis.",
  },
  {
    num: "03",
    title: "Konsultasi Personal",
    body: "kami membantu Anda menemukan kendaraan yang benar-benar sesuai kebutuhan tanpa tekanan, tanpa terburu-buru.",
  },
  {
    num: "04",
    title: "Pengalaman Nyaman",
    body: "Proses pembelian dirancang sederhana, aman, dan terpercaya dari pertanyaan pertama sampai serah terima kunci.",
  },
];

export function ExperienceTrust() {
  return (
    <section className="relative bg-[#0a0a0a] text-white py-32 md:py-44 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Editorial header */}
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 mb-24 md:mb-36">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="col-span-12 mb-10 flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase text-white/40"
          >
            <span className="block h-px w-12 bg-white/30" />
            IV · Pengalaman & Kepercayaan
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.05 }}
            className="col-span-12 md:col-span-8 font-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.03em]"
          >
            Mengapa banyak pelanggan
            <span className="block pl-[6vw] italic text-white/55">memilih kami.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.12 }}
            className="col-span-12 md:col-span-4 md:pt-6 md:text-right max-w-md text-[15px] leading-relaxed text-white/55"
          >
            Empat prinsip cara kami melayani bukan janji pemasaran, melainkan standar kerja sehari-hari.
          </motion.p>
        </div>

        {/* Asymmetric editorial points */}
        <div className="grid grid-cols-12 gap-y-20 md:gap-x-10">
          {points.map((p, i) => {
            // alternating asymmetric column placement
            const placement = [
              "md:col-span-7 md:col-start-1",
              "md:col-span-6 md:col-start-7",
              "md:col-span-6 md:col-start-2",
              "md:col-span-7 md:col-start-6",
            ][i];
            return (
              <motion.article
                key={p.num}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, ease: EASE, delay: 0.05 + i * 0.05 }}
                className={`col-span-12 ${placement} group`}
              >
                <div className="flex items-baseline gap-6 mb-6">
                  <span className="font-serif text-sm tabular-nums text-white/30">
                    {p.num}
                  </span>
                  <span className="block h-px flex-1 bg-white/10 transition-colors duration-700 group-hover:bg-white/30" />
                </div>
                <h3 className="font-serif text-3xl md:text-4xl leading-[1.05] tracking-[-0.02em] mb-5">
                  {p.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-white/55 max-w-lg">
                  {p.body}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
