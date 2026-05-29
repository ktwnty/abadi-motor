import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { CARS, formatIDR } from "@/data/cars";

const EASE = [0.22, 1, 0.36, 1] as const;

const BRANDS = ["Honda", "Toyota", "Mitsubishi"] as const;

export function CollectionAtlas() {
  const [active, setActive] = useState<(typeof BRANDS)[number]>("Toyota");

  const units = CARS.filter((c) => c.brand === active);
  const minPrice = Math.min(...units.map((u) => u.price));
  const maxPrice = Math.max(...units.map((u) => u.price));

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
          V · Collection Atlas
        </motion.div>

        {/* Header */}
        <div className="mt-14 grid grid-cols-12 items-end gap-x-6 gap-y-10 md:mt-20 md:gap-x-10">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.05 }}
            className="col-span-12 font-serif text-[clamp(2.5rem,6.5vw,6rem)] leading-[0.95] tracking-[-0.035em] md:col-span-8"
          >
            Jelajahi koleksi
            <span className="block pl-[5vw] italic text-white/55">menurut brand.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.12 }}
            className="col-span-12 max-w-sm text-[15px] leading-relaxed text-white/55 md:col-span-4 md:text-right"
          >
            Tiga marka pilihan — setiap brand dengan karakter, kenyamanan,
            dan reputasi yang berbeda.
          </motion.p>
        </div>

        {/* Brand selector — oversized typographic tabs */}
        <div className="mt-20 flex flex-col gap-px border-t border-b border-white/10 md:mt-28">
          {BRANDS.map((b) => {
            const isActive = b === active;
            const count = CARS.filter((c) => c.brand === b).length;
            return (
              <button
                key={b}
                type="button"
                onMouseEnter={() => setActive(b)}
                onFocus={() => setActive(b)}
                onClick={() => setActive(b)}
                className={`group grid grid-cols-12 items-center gap-x-6 border-t border-white/5 py-6 md:py-8 transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] first:border-t-0 ${
                  isActive ? "text-white" : "text-white/40 hover:text-white/75"
                }`}
              >
                <span className="col-span-2 font-serif text-xs tabular-nums tracking-[0.25em] text-white/35 md:col-span-1">
                  0{BRANDS.indexOf(b) + 1}
                </span>
                <span className="col-span-7 text-left font-serif text-[clamp(1.75rem,4.5vw,3.75rem)] leading-[1] tracking-[-0.03em] md:col-span-8">
                  {b}
                </span>
                <span className="col-span-3 text-right text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45 tabular-nums">
                  {count} unit
                </span>
              </button>
            );
          })}
        </div>

        {/* Atlas panel — image + meta */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="mt-16 grid grid-cols-12 gap-x-6 gap-y-12 md:mt-24 md:gap-x-10"
          >
            {/* Hero image */}
            <div className="col-span-12 md:col-span-7">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#0a0a0a]">
                <img
                  src={units[0]?.image}
                  alt={`${active} koleksi`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-x-5 top-5 flex items-start justify-between text-[10px] font-semibold uppercase tracking-[0.3em] text-white/85">
                  <span>{active}</span>
                  <span className="tabular-nums">
                    {units.length.toString().padStart(2, "0")} / koleksi
                  </span>
                </div>
                <div className="pointer-events-none absolute inset-x-5 bottom-5 flex items-end justify-between text-[10px] font-semibold uppercase tracking-[0.3em] text-white/80">
                  <span>Indonesia</span>
                  <span>Ready</span>
                </div>
              </div>
            </div>

            {/* Right meta */}
            <div className="col-span-12 flex flex-col md:col-span-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/45">
                Rentang harga
              </div>
              <div className="mt-4 font-serif text-3xl tracking-[-0.02em] tabular-nums md:text-4xl">
                {formatIDR(minPrice)}{" "}
                <span className="text-white/35">—</span>{" "}
                {formatIDR(maxPrice)}
              </div>

              <ul className="mt-12 flex flex-col">
                {units.slice(0, 4).map((u, i) => (
                  <li key={u.id} className="border-t border-white/8 last:border-b">
                    <Link
                      to="/katalog/$slug"
                      params={{ slug: u.slug }}
                      className="group flex items-baseline gap-4 py-4 text-left transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-white"
                    >
                      <span className="w-8 shrink-0 font-serif text-[11px] tabular-nums tracking-[0.18em] text-white/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-serif text-base tracking-[-0.01em] md:text-lg">
                        {u.name}
                      </span>
                      <span className="text-[11px] tabular-nums tracking-[0.12em] text-white/55">
                        {formatIDR(u.price)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                to="/katalog/"
                className="group mt-10 inline-flex items-center justify-between gap-3 self-start rounded-full bg-white px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-black transition-colors duration-500 hover:bg-white/90"
              >
                Lihat koleksi {active}
                <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
