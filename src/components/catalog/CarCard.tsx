import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Calendar, Cog, Fuel } from "lucide-react";
import { formatIDR } from "@/data/cars"; 
import { cn } from "@/lib/utils";

interface Car {
  id: string;
  name: string;
  brand: string | null;
  price: number;
  year: number | null;
  cc: string | null;
  transmission: string | null;
  fuel_type: string | null;
  color: string | null;
  description: string | null;
  thumbnail: string | null;
  is_sold: boolean;
  created_at: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function CarCard({ car }: { car: Car }) {
  const statusKey = car.is_sold ? "sold" : "available";
  const statusText = car.is_sold ? "Terjual" : "Tersedia";
  
  const statusStyle = {
    available: "bg-primary/10 text-primary ring-primary/25",
    sold: "bg-white/5 text-muted-foreground ring-white/10",
  };

  // Proteksi Gambar: Jika thumbnail null, undefined, atau string kosong "", gunakan placeholder estetik ini
  const validThumbnail = car.thumbnail && car.thumbnail.trim() !== "" 
    ? car.thumbnail 
    : "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800";

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="group relative isolate overflow-hidden rounded-2xl border border-white/8 bg-[oklch(0.075_0.005_240/0.7)] backdrop-blur-xl shadow-[0_20px_50px_-25px_oklch(0_0_0/0.8)] transition-[border-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:border-white/15 hover:shadow-[0_30px_80px_-30px_oklch(0_0_0/0.9),0_0_0_1px_oklch(0.63_0.27_22/0.15)]"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={validThumbnail} // <-- MENGGUNAKAN VARIABEL PROTEKSI GAMBAR
          alt={`${car.brand ?? ""} ${car.name}`}
          loading="lazy"
          width={1280}
          height={800}
          className="h-full w-full object-cover transition-transform duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-card via-card/60 to-transparent" />

        {/* Status */}
        <span
          className={cn(
            "absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] ring-1 backdrop-blur-md",
            statusStyle[statusKey],
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {statusText}
        </span>

        {/* Tampilkan badge brand jika ada */}
        {car.brand && (
          <span className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-foreground shadow-[0_8px_24px_-8px_oklch(0.63_0.27_22/0.5)]">
            {car.brand}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="relative space-y-5 p-6">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{car.brand ?? "Koleksi"}</p>
            <h3 className="font-display mt-1 truncate text-xl font-semibold text-foreground">{car.name}</h3>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Mulai dari</p>
            <p className="font-display text-base font-semibold text-foreground">{formatIDR(car.price ?? 0)}</p>
          </div>
        </div>

        {/* Spec chips */}
        <div className="flex flex-wrap gap-2 border-t border-white/5 pt-4">
          <Spec icon={Calendar} label={car.year ? String(car.year) : "-"} />
          <Spec icon={Cog} label={car.transmission ?? "-"} />
          <Spec icon={Fuel} label={car.fuel_type ?? "-"} /> 
        </div>

        <Link
          to="/katalog/$id"
          params={{ id: car.id }} 
          className="group/btn flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-foreground transition-[background-color,border-color,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
        >
          Lihat Detail
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}

function Spec({ icon: Icon, label }: { icon: typeof Calendar; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[11px] text-muted-foreground">
      <Icon className="h-3.5 w-3.5 text-foreground/70" /> {label}
    </span>
  );
}