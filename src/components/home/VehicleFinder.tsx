import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CARS, formatIDR, TRANSMISSIONS, type CarTransmission } from "@/data/cars";

const EASE = [0.22, 1, 0.36, 1] as const;

const ENGINES = ["Semua", "1.2L", "1.3L", "1.5L", "2.0L"] as const;
const BUDGETS = [
  { label: "≤ 120 Jt", max: 120_000_000 },
  { label: "≤ 150 Jt", max: 150_000_000 },
  { label: "≤ 200 Jt", max: 200_000_000 },
  { label: "Semua", max: Infinity },
] as const;

export function VehicleFinder() {
  const [trans, setTrans] = useState<CarTransmission | "Semua">("Semua");
  const [engine, setEngine] = useState<(typeof ENGINES)[number]>("Semua");
  const [budgetIdx, setBudgetIdx] = useState(3);

  const results = useMemo(() => {
    const max = BUDGETS[budgetIdx].max;
    return CARS.filter((c) => {
      if (trans !== "Semua" && c.transmission !== trans) return false;
      if (engine !== "Semua" && c.engine !== engine) return false;
      if (c.price > max) return false;
      return true;
    });
  }, [trans, engine, budgetIdx]);

  return (
    <section className="relative bg-[#0a0a0a] text-white py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-16"
        >
          <p className="text-[10px] tracking-[0.45em] uppercase text-white/40 mb-6">V · Concierge Finder</p>
          <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] max-w-3xl">
            Temukan kendaraan <em className="italic text-white/60">yang sesuai</em>.
          </h2>
          <p className="mt-6 text-white/50 max-w-xl text-sm md:text-base leading-relaxed">
            Pilih preferensi Anda. Koleksi akan menyesuaikan secara langsung.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-12">
          {/* Filters */}
          <div className="space-y-10">
            <FilterGroup label="Transmisi">
              {(["Semua", ...TRANSMISSIONS] as const).map((t) => (
                <Chip key={t} active={trans === t} onClick={() => setTrans(t)}>{t}</Chip>
              ))}
            </FilterGroup>

            <FilterGroup label="Kapasitas Mesin">
              {ENGINES.map((e) => (
                <Chip key={e} active={engine === e} onClick={() => setEngine(e)}>{e}</Chip>
              ))}
            </FilterGroup>

            <FilterGroup label="Budget">
              {BUDGETS.map((b, i) => (
                <Chip key={b.label} active={budgetIdx === i} onClick={() => setBudgetIdx(i)}>{b.label}</Chip>
              ))}
            </FilterGroup>

            <div className="pt-6 border-t border-white/10">
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-2">Ditemukan</p>
              <p className="font-serif text-5xl">{String(results.length).padStart(2, "0")}</p>
              <p className="text-white/40 text-xs mt-1">unit cocok</p>
            </div>
          </div>

          {/* Results */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {results.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex items-center justify-center text-white/40 text-sm border border-white/10 rounded-sm py-32"
                >
                  Tidak ada unit dengan preferensi ini.
                </motion.div>
              ) : (
                <motion.div layout className="grid sm:grid-cols-2 gap-px bg-white/5">
                  {results.map((c, i) => (
                    <motion.article
                      key={c.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5, ease: EASE, delay: i * 0.03 }}
                      className="group bg-[#0a0a0a] p-6 hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-white/5 mb-5">
                        <img
                          src={c.image}
                          alt={c.name}
                          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                        />
                      </div>
                      <div className="flex items-baseline justify-between text-[10px] tracking-[0.35em] uppercase text-white/40 mb-2">
                        <span>{c.brand}</span><span>{c.year}</span>
                      </div>
                      <h3 className="font-serif text-2xl mb-3">{c.name}</h3>
                      <div className="flex items-baseline justify-between border-t border-white/10 pt-3">
                        <span className="text-white/50 text-xs">{c.transmission} · {c.engine}</span>
                        <span className="font-serif text-lg">{formatIDR(c.price)}</span>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-4">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-xs tracking-wider uppercase border transition-all duration-500 ${
        active
          ? "border-white bg-white text-black"
          : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
