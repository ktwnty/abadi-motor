import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { type Car, formatIDR } from "@/data/cars";

export function RelatedCars({ cars }: { cars: Car[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const scrollBy = (dx: number) => scroller.current?.scrollBy({ left: dx, behavior: "smooth" });

  if (cars.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Pilihan Lainnya</p>
          <h2 className="font-display mt-2 text-3xl md:text-4xl">Mungkin Anda Juga Suka</h2>
        </div>
        <div className="hidden gap-2 md:flex">
          <button
            onClick={() => scrollBy(-360)}
            className="rounded-full border border-white/10 bg-white/5 p-2.5 hover:border-primary/40 hover:bg-primary/10"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scrollBy(360)}
            className="rounded-full border border-white/10 bg-white/5 p-2.5 hover:border-primary/40 hover:bg-primary/10"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cars.map((car, i) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="group relative w-[300px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-surface/60 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_30px_80px_-30px_oklch(0.72_0.19_240/0.5)]"
          >
            <Link to="/katalog/$slug" params={{ slug: car.slug }} className="block">
              <div className="relative aspect-[16/11] overflow-hidden">
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.name}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              </div>
              <div className="space-y-3 p-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{car.brand}</p>
                  <h3 className="font-display mt-1 text-xl">{car.name}</h3>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-3">
                  <p className="font-display text-base text-gradient-gold">{formatIDR(car.price)}</p>
                  <ArrowUpRight className="h-4 w-4 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
