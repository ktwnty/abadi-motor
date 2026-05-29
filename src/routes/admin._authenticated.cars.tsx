import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Pencil, Trash2, ChevronDown, Search, ImageOff, Loader2 } from "lucide-react";
import { listCars, deleteCar, type CarRow } from "@/lib/cars-api";
import { CarFormModal } from "@/components/admin/CarFormModal";

export const Route = createFileRoute("/admin/_authenticated/cars")({
  head: () => ({ meta: [{ title: "Manajemen Mobil — Abadi Motors Admin" }] }),
  component: AdminCarsPage,
});

const statusStyle: Record<string, string> = {
  available: "bg-primary/15 text-primary ring-primary/30",
  reserved: "bg-accent/15 text-accent ring-accent/30",
  sold: "bg-destructive/15 text-destructive ring-destructive/30",
};

function AdminCarsPage() {
  const qc = useQueryClient();
  const { data: cars = [], isLoading } = useQuery({ queryKey: ["cars"], queryFn: listCars });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<CarRow | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = cars.filter((c) =>
    `${c.brand} ${c.name}`.toLowerCase().includes(query.toLowerCase().trim())
  );

  async function handleDelete(car: CarRow) {
    if (!confirm(`Hapus ${car.brand} ${car.name}? Aksi ini tidak bisa dibatalkan.`)) return;
    setDeleting(car.id);
    try {
      await deleteCar(car.id, car.images);
      qc.invalidateQueries({ queryKey: ["cars"] });
    } catch (e) {
      alert(e instanceof Error ? e.message : "Gagal menghapus");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Inventory</p>
          <h1 className="font-display mt-2 text-4xl">Manajemen Mobil</h1>
          <p className="mt-1 text-sm text-muted-foreground">{cars.length} unit terdaftar</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari brand atau model..."
              className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary/40 sm:w-72"
            />
          </div>
          <button
            onClick={() => { setEditing(null); setOpen(true); }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-[oklch(0.78_0.16_220)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_15px_40px_-15px_oklch(0.72_0.19_240/0.7)]"
          >
            <Plus className="h-4 w-4" /> Tambah Mobil
          </button>
        </div>
      </header>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-surface/60 backdrop-blur-xl">
        {/* Header */}
        <div className="hidden grid-cols-[1.5fr_1fr_1fr_1fr_auto] gap-4 border-b border-white/5 px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:grid">
          <span>Unit</span>
          <span>Tahun</span>
          <span>Harga</span>
          <span>Status</span>
          <span className="text-right">Aksi</span>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center gap-3 px-6 py-16 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Memuat data...
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <ImageOff className="mx-auto h-10 w-10 text-muted-foreground/50" />
            <p className="mt-4 text-sm text-muted-foreground">
              {cars.length === 0 ? "Belum ada mobil. Klik Tambah Mobil untuk memulai." : "Tidak ada hasil."}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-white/5">
            {filtered.map((car) => {
              const isOpen = expanded === car.id;
              const cover = car.images?.[0];
              return (
                <li key={car.id}>
                  <motion.div
                    layout
                    onClick={() => setExpanded(isOpen ? null : car.id)}
                    className="grid cursor-pointer grid-cols-1 items-center gap-4 px-6 py-4 transition-colors hover:bg-white/[0.03] md:grid-cols-[1.5fr_1fr_1fr_1fr_auto]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/40">
                        {cover ? (
                          <img src={cover} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="grid h-full w-full place-items-center text-muted-foreground">
                            <ImageOff className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{car.brand}</p>
                        <p className="font-display truncate text-base">{car.name}</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground"><span className="md:hidden">Tahun: </span>{car.year}</span>
                    <span className="font-display text-sm text-gradient-gold">{formatIDR(Number(car.price))}</span>
                    <span>
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] ring-1 ${statusStyle[car.status] ?? ""}`}>
                        {car.status}
                      </span>
                    </span>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); setEditing(car); setOpen(true); }}
                        className="rounded-full p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                        aria-label="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(car); }}
                        disabled={deleting === car.id}
                        className="rounded-full p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                        aria-label="Hapus"
                      >
                        {deleting === car.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                      </button>
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="ml-1 text-muted-foreground">
                        <ChevronDown className="h-4 w-4" />
                      </motion.span>
                    </div>
                  </motion.div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-6 border-t border-white/5 bg-black/20 px-6 py-6 md:grid-cols-[1fr_2fr]">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Spesifikasi</p>
                            <dl className="mt-3 space-y-2 text-sm">
                              <Row k="Transmisi" v={car.transmission} />
                              <Row k="Bahan Bakar" v={car.fuel} />
                              <Row k="Jarak Tempuh" v={`${car.km.toLocaleString("id-ID")} km`} />
                              <Row k="Badge" v={car.badge ?? "—"} />
                              <Row k="Slug" v={car.slug} />
                            </dl>
                            {car.description && (
                              <>
                                <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Deskripsi</p>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{car.description}</p>
                              </>
                            )}
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Galeri ({car.images?.length ?? 0})</p>
                            {car.images && car.images.length > 0 ? (
                              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                                {car.images.map((url) => (
                                  <div key={url} className="aspect-square overflow-hidden rounded-lg border border-white/10">
                                    <img src={url} alt="" className="h-full w-full object-cover transition-transform duration-500 hover:scale-110" />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="mt-3 text-sm text-muted-foreground">Belum ada foto.</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <CarFormModal
        open={open}
        car={editing}
        onClose={() => setOpen(false)}
        onSaved={() => qc.invalidateQueries({ queryKey: ["cars"] })}
      />
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/5 pb-1.5">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right text-foreground">{v}</dd>
    </div>
  );
}

function formatIDR(n: number) {
  if (n >= 1_000_000_000) return `Rp ${(n / 1_000_000_000).toFixed(2)} M`;
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(0)} Jt`;
  return `Rp ${n.toLocaleString("id-ID")}`;
}
