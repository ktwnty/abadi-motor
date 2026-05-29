import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const FAQS = [
  { q: "Apakah unit bisa dicek langsung?", a: "Tentu. Kami menyambut inspeksi langsung di showroom, Anda bebas membawa mekanik kepercayaan atau menggunakan tim teknis kami." },
  { q: "Apakah bisa tukar tambah?", a: "Ya. Kami menerima trade-in dengan penilaian transparan berdasarkan kondisi unit, riwayat, dan harga pasar terkini." },
  { q: "Apakah tersedia opsi kredit?", a: "Kami bekerja sama dengan beberapa lembaga pembiayaan terpercaya. Tim kami akan membantu Anda memilih skema yang paling sesuai." },
  { q: "Bagaimana dengan kelengkapan dokumen?", a: "Setiap unit dilengkapi BPKB, STNK, faktur, dan riwayat servis. Semua dokumen kami verifikasi sebelum unit masuk koleksi." },
  { q: "Bisakah saya booking unit terlebih dahulu?", a: "Bisa. Booking dapat dilakukan dengan tanda jadi, dan unit akan kami tahan eksklusif untuk Anda sesuai kesepakatan." },
  { q: "Apakah ada garansi setelah pembelian?", a: "Kami menyertakan garansi mesin dan transmisi untuk periode tertentu, dengan ketentuan yang akan disampaikan saat konsultasi." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative bg-[#0a0a0a] text-white py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Sub-judul dengan Garis Horizontal */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="col-span-12 mb-6 flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase text-white/40"
      >
        <span className="block h-px w-12 bg-white/30" />
        VII · Pertanyaan
      </motion.div>

      {/* Teks Utama Pertanyaan */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        className="col-span-12 mb-16"
      >
        <h2 className="font-serif text-4xl md:text-6xl leading-[1.05]">
          Pertanyaan yang <em className="italic text-white/60">sering diajukan</em>.
        </h2>
      </motion.div>

        <div className="border-t border-white/10">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-white/10">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-7 text-left group"
                >
                  <span className="flex items-baseline gap-6">
                    <span className="text-[10px] tracking-[0.4em] text-white/30">{String(i + 1).padStart(2, "0")}</span>
                    <span className={`font-serif text-xl md:text-2xl transition-colors ${isOpen ? "text-white" : "text-white/70 group-hover:text-white"}`}>
                      {f.q}
                    </span>
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="text-2xl text-white/50 shrink-0"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 pl-[3.75rem] pr-12 text-white/55 text-base leading-relaxed max-w-3xl">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
