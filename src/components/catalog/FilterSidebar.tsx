import { Slider } from "@/components/ui/slider";
import { BRANDS, PRICE_MIN, PRICE_MAX, STATUSES, TRANSMISSIONS, formatIDR, statusLabel, type CarStatus, type CarTransmission } from "@/data/cars";
import { Check, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

// Tipe data filter katalog disesuaikan dengan database Supabase
export interface CatalogFilters {
  search: string;
  brands: string[];
  transmissions: string[]; // Menggunakan string[] agar fleksibel membaca data Supabase
  statuses: string[];      // Menggunakan string[] agar klop dengan konversi status kita nanti
  price: [number, number];
}

export const initialFilters: CatalogFilters = {
  search: "",
  brands: [],
  transmissions: [],
  statuses: [],
  price: [PRICE_MIN, PRICE_MAX], // Membaca batas aman 0 - 2M dari cars.ts yang baru
};

interface Props {
  filters: CatalogFilters;
  onChange: (next: CatalogFilters) => void;
  onReset: () => void;
}

export function FilterSidebar({ filters, onChange, onReset }: Props) {
  const toggle = <T extends string>(arr: T[], v: T): T[] =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  return (
    <aside className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl text-foreground">Filter</h2>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* 1. Filter Brand */}
      <Group label="Brand">
        <div className="grid grid-cols-2 gap-2">
          {BRANDS.map((b) => (
            <ChipToggle
              key={b}
              active={filters.brands.includes(b)}
              onClick={() => onChange({ ...filters, brands: toggle(filters.brands, b) })}
            >
              {b}
            </ChipToggle>
          ))}
        </div>
      </Group>

      {/* 2. Filter Transmisi */}
      <Group label="Transmisi">
        <div className="flex flex-wrap gap-2">
          {TRANSMISSIONS.map((t) => (
            <ChipToggle
              key={t}
              active={filters.transmissions.includes(t)}
              onClick={() => onChange({ ...filters, transmissions: toggle(filters.transmissions, t) })}
            >
              {t}
            </ChipToggle>
          ))}
        </div>
      </Group>

      {/* 3. Filter Status */}
      <Group label="Status">
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <ChipToggle
              key={s}
              active={filters.statuses.includes(s)}
              onClick={() => onChange({ ...filters, statuses: toggle(filters.statuses, s) })}
            >
              {statusLabel[s]}
            </ChipToggle>
          ))}
        </div>
      </Group>

      {/* 4. Filter Slider Rentang Harga */}
      <Group label="Rentang Harga">
        <div className="px-1">
          <Slider
            value={filters.price}
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={50_000_000}
            onValueChange={(v) => onChange({ ...filters, price: [v[0], v[1]] as [number, number] })}
            className="my-4"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
              {formatIDR(filters.price[0])}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
              {formatIDR(filters.price[1])}
            </span>
          </div>
        </div>
      </Group>
    </aside>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </h3>
      {children}
    </section>
  );
}

function ChipToggle({
  children, active, onClick,
}: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300",
        active
          ? "border-primary/50 bg-primary/15 text-primary shadow-[0_0_24px_-8px_oklch(0.72_0.19_240/0.7)]"
          : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground",
      )}
    >
      {active && <Check className="h-3 w-3" />}
      {children}
    </button>
  );
}