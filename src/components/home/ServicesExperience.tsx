import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

const EASE = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    num: "I",
    title: "Test Drive",
    body: "Rasakan setiap unit secara langsung sebelum mengambil keputusan.",
  },
  {
    num: "II",
    title: "Trade In",
    body: "Tukar kendaraan lama Anda dengan penilaian wajar dan proses yang ringkas.",
  },
  {
    num: "III",
    title: "Konsultasi Kendaraan",
    body: "Diskusikan kebutuhan, gaya berkendara, dan preferensi Anda bersama kami.",
  },
  {
    num: "IV",
    title: "Bantuan Pembiayaan",
    body: "Skema cicilan fleksibel bersama mitra perbankan tepercaya, disesuaikan dengan profil Anda.",
  },
  {
    num: "V",
    title: "Reservasi Unit",
    body: "Tahan unit pilihan Anda secara privat selama proses pertimbangan berlangsung.",
  },
  {
    num: "VI",
    title: "Pencarian Kendaraan",
    body: "Beritahu kami kendaraan ideal Anda kami akan mencarinya untuk Anda.",
  },
];

export function ServicesExperience() {
  const waMsg = encodeURIComponent(
    "Halo, saya tertarik dengan layanan Anda.",
  );
  return (
    <section className="relative bg-[#070707] text-white py-32 md:py-44 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 mb-24 md:mb-36">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="col-span-12 mb-10 flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase text-white/40"
          >
            <span className="block h-px w-12 bg-white/30" />
            IV ·layanan
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.05 }}
            className="col-span-12 md:col-span-9 font-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.03em]"
          >
            Lebih dari sekadar
            <span className="block pl-[8vw] italic text-white/55">membeli mobil.</span>
          </motion.h2>
        </div>

        {/* Clean grid layout — 3 cols desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-white/10">
          {services.map((s, i) => (
            <motion.article
              key={s.num}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.04 * i }}
              className="group relative border-b border-white/10 p-8 md:p-12 transition-colors duration-700 hover:bg-white/[0.02] sm:[&:nth-child(even)]:border-l lg:[&:nth-child(3n+2)]:border-l lg:[&:nth-child(3n+3)]:border-l sm:[&:nth-child(even)]:border-l-white/10 lg:[&:nth-child(3n+2)]:border-l-white/10 lg:[&:nth-child(3n+3)]:border-l-white/10"
            >
              <div className="font-serif text-sm tabular-nums text-white/35">
                {s.num}
              </div>
              <h3 className="mt-8 font-serif text-2xl md:text-3xl leading-[1.1] tracking-[-0.02em] transition-colors duration-700 group-hover:text-white">
                {s.title}
              </h3>
              <p className="mt-5 text-[14px] leading-relaxed text-white/55">
                {s.body}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: EASE }}
          className="mt-24 md:mt-32 flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-t border-white/10 pt-12"
        >
          <p className="font-serif text-2xl md:text-3xl leading-[1.15] tracking-[-0.02em] max-w-xl text-white/80">
            Beritahu kami apa yang Anda cari,
            <span className="italic text-white/50"> kami siapkan sisanya.</span>
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-xs tracking-[0.3em] uppercase hover:bg-white/90 transition"
            >
              Mulai Konsultasi <span>→</span>
            </a>
            <Link
              to="/"
              hash="koleksi"
              className="inline-flex items-center gap-3 border border-white/20 px-8 py-4 text-xs tracking-[0.3em] uppercase hover:border-white hover:bg-white/5 transition"
            >
              Lihat Koleksi
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
