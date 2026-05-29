import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

const EASE = [0.22, 1, 0.36, 1] as const;

export function TestDriveBlock() {
  return (
    <section className="relative bg-[#070707] text-white py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative border border-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none" />
          <div className="relative grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 p-10 md:p-16 lg:p-20">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <p className="text-[10px] tracking-[0.45em] uppercase text-white/40 mb-6">VIII · Test Drive</p>
              <h2 className="font-serif text-4xl md:text-6xl leading-[1.02] mb-8">
                Rasakan sebelum <em className="italic text-white/60">memutuskan</em>.
              </h2>
              <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-xl">
                Jadwalkan sesi test drive privat. Tim concierge kami akan menyiapkan unit
                pilihan Anda, di waktu dan tempat yang paling nyaman.
              </p>

              <div className="mt-12 flex flex-wrap gap-4">
                <Link
                  to="/"
                  hash="kontak"
                  className="group relative inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-xs tracking-[0.3em] uppercase overflow-hidden"
                >
                  <span className="relative z-10">Jadwalkan Test Drive</span>
                  <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">→</span>
                </Link>
                <a
                  href="https://wa.me/6281266766698"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 border border-white/20 px-8 py-4 text-xs tracking-[0.3em] uppercase hover:border-white hover:bg-white/5 transition-all duration-500"
                >
                  Konsultasi WhatsApp
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              className="space-y-px bg-white/5"
            >
              {[
                { k: "Durasi sesi", v: "60 menit" },
                { k: "Lokasi", v: "Showroom / On-site" },
                { k: "Biaya", v: "Gratis" },
                { k: "Slot harian", v: "09.00 — 18.00" },
              ].map((row) => (
                <div key={row.k} className="bg-[#070707] flex items-baseline justify-between px-6 py-5">
                  <span className="text-[10px] tracking-[0.4em] uppercase text-white/40">{row.k}</span>
                  <span className="font-serif text-lg">{row.v}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
