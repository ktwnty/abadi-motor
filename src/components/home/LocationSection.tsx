import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const ADDRESS_QUERY = "Abadi Motors Tanjungpinang Kepulauan Riau";
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  ADDRESS_QUERY,
)}&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ADDRESS_QUERY,
)}`;

const details = [
  { k: "Kota", v: "Tanjungpinang" },
  { k: "Provinsi", v: "Kepulauan Riau" },
  { k: "Negara", v: "Indonesia" },
  { k: "Koordinat", v: "0.918° N · 104.466° E" },
];

const hours = [
  { d: "Senin – Sabtu", t: "08.00 – 17.00 WIB" },
  { d: "Minggu", t: "08.00 - 12.00 WIB" },
];

export function LocationSection() {
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
          IX · LOKASI SHOWROOM
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
            Kunjungi kami di
            <span className="block pl-[5vw] italic text-white/55">Tanjungpinang.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.12 }}
            className="col-span-12 max-w-sm text-[15px] leading-relaxed text-white/55 md:col-span-4 md:text-right"
          >
            Showroom kami berlokasi di jantung Kepulauan Riau terbuka untuk inspeksi unit, konsultasi privat, dan uji berkendara.
          </motion.p>
        </div>

        {/* Map + meta */}
        <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-12 md:mt-28 md:gap-x-10">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: EASE }}
            className="col-span-12 md:col-span-7"
          >
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[4/3] overflow-hidden border border-white/10 bg-[#0a0a0a]"
            >
              <iframe
                title="Lokasi Abadi Motors — Tanjungpinang"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="pointer-events-none absolute inset-0 h-full w-full"
                allowFullScreen
              />
              {/* clickable overlay so the whole map opens in google maps */}
              <span className="absolute inset-0" aria-hidden />
              <span className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-sm transition-colors duration-500 group-hover:bg-black">
                Buka di Maps <span>→</span>
              </span>
            </a>
          </motion.div>

          {/* Right — details */}
          <div className="col-span-12 flex flex-col md:col-span-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/45">
              Alamat
            </div>
            <div className="mt-4 font-serif text-2xl leading-[1.15] tracking-[-0.015em] text-white/90 md:text-3xl">
              Tanjungpinang, Kepulauan Riau, Indonesia.
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6">
              {details.map((d) => (
                <div key={d.k}>
                  <dt className="text-[9px] font-semibold uppercase tracking-[0.32em] text-white/45">
                    {d.k}
                  </dt>
                  <dd className="mt-2 font-serif text-lg font-light tabular-nums tracking-[-0.01em] text-white/90">
                    {d.v}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 border-t border-white/10 pt-8">
              <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/45">
                Jam operasional
              </div>
              <dl className="mt-5 space-y-px">
                {hours.map((h) => (
                  <div
                    key={h.d}
                    className="flex items-baseline justify-between gap-6 border-t border-white/8 py-4 first:border-t-0"
                  >
                    <dt className="font-serif text-base font-light tracking-[-0.01em] text-white/90 md:text-lg">
                      {h.d}
                    </dt>
                    <dd className="text-sm tabular-nums tracking-[0.05em] text-white/55">
                      {h.t}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center justify-between gap-3 self-start rounded-full bg-white px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-black transition-colors duration-500 hover:bg-white/90"
            >
              Buka di Google Maps
              <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
