import { motion } from "framer-motion";
import { CARS } from "@/data/cars";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ShowroomWalk() {
  return (
    <section className="relative bg-[#070707] text-white py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p className="text-[10px] tracking-[0.45em] uppercase text-white/40 mb-6">VI · Walk the Floor</p>
          <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] max-w-3xl">
            Berjalan menyusuri <em className="italic text-white/60">lantai showroom</em>.
          </h2>
        </motion.div>
      </div>

      <div
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-12 px-6 md:px-12"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {CARS.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.04 * i }}
            className="snap-center shrink-0 w-[80vw] md:w-[55vw] lg:w-[42vw] relative group"
          >
            <div className="aspect-[16/10] overflow-hidden bg-white/5 relative">
              <img
                src={c.image}
                alt={c.name}
                className="w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="absolute top-6 left-6 text-[10px] tracking-[0.4em] uppercase text-white/70">
                Bay · {String(i + 1).padStart(2, "0")}
              </span>
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.4em] uppercase text-white/50 mb-2">{c.brand}</p>
                  <h3 className="font-serif text-2xl md:text-3xl">{c.name}</h3>
                </div>
                <span className="text-xs tracking-wider text-white/60">{c.year}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-6">
        <p className="text-[10px] tracking-[0.45em] uppercase text-white/30">↔ Geser untuk berjalan</p>
      </div>
    </section>
  );
}
