import { motion } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

const EASE = [0.22, 1, 0.36, 1] as const;
const reveal = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

const hours = [
  { day: "Senin – Jumat", time: "09.00 – 19.00 WIB" },
  { day: "Sabtu", time: "10.00 – 18.00 WIB" },
  { day: "Minggu", time: "Dengan reservasi" },
];

const channels = [
  { label: "WhatsApp Concierge", value: "+62 812 6676 6698", href: `https://wa.me/${WHATSAPP_NUMBER}` },
  { label: "Email", value: "abadimotortnj@gmail.com", href: "abadimotortnj@gmail.com" },
  { label: "Atelier", value: "TanjungPinang, Indonesia", href: null },
];

export function ContactExperience() {
  const waMsg = encodeURIComponent(
    "Halo Abadi Motor, saya ingin menjadwalkan sesi konsultasi privat.",
  );
  return (
    <section id="kontak" className="relative mx-auto w-full max-w-[1480px] scroll-mt-24 px-6 py-32 md:px-12 md:py-48">
      <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={reveal}
      transition={{ duration: 1, ease: EASE }}
      className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.34em] text-muted-foreground/70"
    >
      <span className="block h-px w-12 bg-white/30" />
      <span>VIII · kontak</span>
    </motion.div>

      <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-12 md:mt-20 md:gap-x-10">
        {/* Editorial headline */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          transition={{ duration: 1.2, ease: EASE, delay: 0.05 }}
          className="col-span-12 font-display text-[clamp(2.75rem,8vw,7rem)] font-medium leading-[0.9] tracking-[-0.04em] md:col-span-8"
        >
          Mari bicara 
          <span className="block pl-[6vw] font-extralight italic text-foreground/55">
            secara privat.
          </span>
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          transition={{ duration: 1.2, ease: EASE, delay: 0.12 }}
          className="col-span-12 max-w-md text-[15px] leading-relaxed text-muted-foreground md:col-span-4 md:pt-6 md:text-right"
        >
          Setiap percakapan dimulai dari satu pertanyaan: kendaraan seperti apa yang pantas mendampingi Anda? Kami akan merespons dalam waktu kurang dari 24 jam.
        </motion.p>
      </div>

      {/* Primary CTA — oversized whisper */}
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={reveal}
        transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
        className="group mt-24 flex flex-col gap-6 border-y border-white/10 py-12 transition-colors duration-700 hover:border-primary/40 md:mt-36 md:flex-row md:items-end md:justify-between md:py-16"
      >
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.34em] text-muted-foreground/70">
            hubungi kami
          </div>
          <div className="mt-5 font-display text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1] tracking-[-0.035em] transition-colors duration-700 group-hover:text-primary">
            Konsultasi via WhatsApp
          </div>
        </div>
        <div className="inline-flex items-center gap-3 self-start font-display text-base font-light tracking-[0.18em] text-foreground/85 md:self-end">
          <span>Mulai percakapan</span>
          <span className="inline-block transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
            →
          </span>
        </div>
      </motion.a>

    </section>
  );
}
