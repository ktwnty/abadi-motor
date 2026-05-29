import { useState } from "react";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  { n: "01", title: "Pilih Mobil", desc: "Jelajahi koleksi terkurasi kami dan tentukan kendaraan impian Anda." },
  { n: "02", title: "Hubungi Kami", desc: "Konsultasi tanpa tekanan bersama kami." },
  { n: "03", title: "Survey Unit", desc: "Inspeksi menyeluruh, riwayat lengkap, transparan apa adanya." },
  { n: "04", title: "Test Drive", desc: "Rasakan kendaraan langsung di lingkungan yang Anda inginkan." },
  { n: "05", title: "Deal", desc: "Negosiasi adil, dokumen rapi, pembayaran fleksibel." },
  { n: "06", title: "Dibawa Pulang", desc: "Unit diserahkan dalam kondisi siap pakai dan terdokumentasi." },
];

export function PurchaseTimeline() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative bg-[#0a0a0a] text-white py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Sub-judul dengan Garis Horizontal */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="col-span-12 mb-6 flex items-center gap-4 text-[10px] tracking-[0.4em] uppercase text-white/40"
      >
        <span className="block h-px w-12 bg-white/30" />
        VI · Proses
      </motion.div>

      {/* Teks Utama Enam Langkah */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        className="col-span-12 mb-10"
      >
        <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] max-w-3xl">
          Enam langkah, <em className="italic text-white/60">tanpa tergesa</em>.
        </h2>
      </motion.div>

        

        {/* Desktop horizontal timeline */}
        <div className="hidden md:block relative">
          <div className="absolute top-[34px] left-0 right-0 h-px bg-white/10" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: (active + 1) / STEPS.length }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{ transformOrigin: "left" }}
            className="absolute top-[34px] left-0 right-0 h-px bg-white"
          />
          <div className="grid grid-cols-6 gap-4">
            {STEPS.map((s, i) => {
              const on = i <= active;
              return (
                <button
                  key={s.n}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="text-left group"
                >
                  <div className="flex justify-center mb-6 relative">
                    <span
                      className={`w-4 h-4 rounded-full border transition-all duration-700 ${
                        on ? "bg-white border-white scale-110" : "bg-[#0a0a0a] border-white/30 group-hover:border-white/60"
                      }`}
                    />
                  </div>
                  <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-2 text-center">{s.n}</p>
                  <h3 className={`font-serif text-lg text-center transition-colors ${on ? "text-white" : "text-white/50"}`}>
                    {s.title}
                  </h3>
                </button>
              );
            })}
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-16 max-w-2xl mx-auto text-center"
          >
            <p className="text-white/60 text-base md:text-lg leading-relaxed">{STEPS[active].desc}</p>
          </motion.div>
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden space-y-8">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex gap-5">
              <div className="flex flex-col items-center">
                <span className="w-3 h-3 rounded-full bg-white" />
                {i < STEPS.length - 1 && <span className="flex-1 w-px bg-white/15 my-2" />}
              </div>
              <div className="pb-6">
                <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-1">{s.n}</p>
                <h3 className="font-serif text-xl mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
