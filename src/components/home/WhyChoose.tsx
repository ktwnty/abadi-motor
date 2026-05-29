import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Wrench, HandCoins, ScanSearch, Headphones } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const features = [
  { num: "01", icon: ShieldCheck, title: "120 Titik Inspeksi", desc: "Setiap unit diperiksa menyeluruh oleh teknisi bersertifikat sebelum dipajang." },
  { num: "02", icon: ScanSearch, title: "Histori Transparan", desc: "Akses penuh ke riwayat servis, kepemilikan, dan dokumen legal kendaraan." },
  { num: "03", icon: HandCoins, title: "Pembiayaan Fleksibel", desc: "Skema cicilan dan trade-in bersama bank premium dengan persetujuan singkat." },
  { num: "04", icon: Wrench, title: "After-Sales Premium", desc: "Garansi mesin, service berkala, dan pickup di Jakarta dan sekitarnya." },
  { num: "05", icon: Sparkles, title: "Private Showroom", desc: "Reservasi sesi privat dengan spesialis brand sesuai preferensi Anda." },
  { num: "06", icon: Headphones, title: "Concierge 24/7", desc: "Tim concierge siap dari konsultasi hingga pengiriman ke pintu rumah." },
];

const reveal = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

export function WhyChoose() {
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
          Chapter 02 · Why Abadi
        </motion.div>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          transition={{ duration: 1.1, ease: EASE }}
          className="col-span-12 mb-4 font-display text-[clamp(2.5rem,5.5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.035em] md:col-span-7"
        >
          Presisi otomotif Eropa,
          <span className="block pl-[5vw] italic text-muted-foreground/70">hospitality bintang lima.</span>
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          transition={{ duration: 1.1, ease: EASE, delay: 0.08 }}
          className="col-span-12 max-w-md self-end text-[15px] leading-relaxed text-muted-foreground md:col-span-5 md:text-right"
        >
          Enam komitmen yang membentuk pengalaman beli mobil premium di Abadi —
          tanpa kompromi, tanpa gimmick.
        </motion.p>
      </div>

      {/* Editorial spec table — not a card grid */}
      <div className="mt-20 grid grid-cols-1 border-t border-white/10 md:mt-28 md:grid-cols-2">
        {features.map(({ num, icon: Icon, title, desc }, i) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: EASE, delay: (i % 3) * 0.06 }}
            className="group relative grid grid-cols-12 gap-x-6 border-b border-white/10 py-10 md:gap-x-8 md:py-14 md:[&:nth-child(even)]:border-l md:[&:nth-child(even)]:border-l-white/10 md:[&:nth-child(even)]:pl-12"
          >
            <div className="col-span-2 font-display text-lg font-light tabular-nums text-muted-foreground/60 md:text-xl">
              {num}
            </div>
            <div className="col-span-10 flex flex-col gap-3">
              <Icon className="h-5 w-5 text-foreground/70 transition-colors duration-500 group-hover:text-primary" />
              <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.02em] md:text-3xl">
                {title}
              </h3>
              <p className="max-w-md text-[14px] leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
