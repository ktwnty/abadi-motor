import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Save, Loader2 } from "lucide-react";
import { createCar, updateCar, slugify, type CarRow } from "@/lib/cars-api";
import { ImageDropzone } from "./ImageDropzone";

interface Props {
  open: boolean;
  car: CarRow | null;
  onClose: () => void;
  onSaved: () => void;
}

const empty = {
  name: "", brand: "", year: new Date().getFullYear(), price: 0,
  transmission: "Automatic", status: "available", km: 0, fuel: "Bensin",
  badge: "", description: "", images: [] as string[],
};

export function CarFormModal({ open, car, onClose, onSaved }: Props) {
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (car) {
      setForm({
        name: car.name, brand: car.brand, year: car.year, price: Number(car.price),
        transmission: car.transmission, status: car.status, km: car.km, fuel: car.fuel,
        badge: car.badge ?? "", description: car.description ?? "", images: car.images ?? [],
      });
    } else {
      setForm(empty);
    }
    setError(null);
  }, [car, open]);

  const slug = slugify(`${form.brand} ${form.name}`);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        name: form.name.trim(),
        brand: form.brand.trim(),
        year: Number(form.year),
        price: Number(form.price),
        transmission: form.transmission,
        status: form.status,
        km: Number(form.km),
        fuel: form.fuel,
        badge: form.badge.trim() || null,
        description: form.description.trim() || null,
        images: form.images,
        slug,
      };
      if (car) await updateCar(car.id, payload);
      else await createCar(payload);
      onSaved();
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-0 backdrop-blur-md sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-surface/95 backdrop-blur-2xl sm:rounded-3xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary">{car ? "Edit" : "Tambah"} Mobil</p>
                <h2 className="font-display mt-1 text-xl">{car ? `${car.brand} ${car.name}` : "Unit Baru"}</h2>
              </div>
              <button type="button" onClick={onClose} className="rounded-full border border-white/10 p-2 hover:bg-white/5" aria-label="Tutup">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              {error && <div className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</div>}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Brand"><Input value={form.brand} onChange={(v) => setForm({ ...form, brand: v })} required /></Field>
                <Field label="Nama Model"><Input value={form.name} onChange={(v) => setForm({ ...form, name: v })} required /></Field>
                <Field label="Tahun"><Input type="number" value={form.year} onChange={(v) => setForm({ ...form, year: Number(v) })} required /></Field>
                <Field label="Harga (IDR)"><Input type="number" value={form.price} onChange={(v) => setForm({ ...form, price: Number(v) })} required /></Field>
                <Field label="Jarak Tempuh (km)"><Input type="number" value={form.km} onChange={(v) => setForm({ ...form, km: Number(v) })} /></Field>
                <Field label="Bahan Bakar">
                  <Select value={form.fuel} onChange={(v) => setForm({ ...form, fuel: v })}
                    options={["Bensin", "Diesel", "Electric", "Hybrid"]} />
                </Field>
                <Field label="Transmisi">
                  <Select value={form.transmission} onChange={(v) => setForm({ ...form, transmission: v })}
                    options={["Automatic", "Manual", "Dual Clutch"]} />
                </Field>
                <Field label="Status">
                  <Select value={form.status} onChange={(v) => setForm({ ...form, status: v })}
                    options={["available", "reserved", "sold"]} />
                </Field>
                <Field label="Badge (opsional)" full><Input value={form.badge} onChange={(v) => setForm({ ...form, badge: v })} placeholder="cth: New Arrival" /></Field>
                <Field label="Deskripsi" full>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={4}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-primary/50 focus:bg-white/[0.07]"
                  />
                </Field>
              </div>

              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Galeri Foto</p>
                <ImageDropzone
                  slug={slug || "unsorted"}
                  images={form.images}
                  onChange={(images) => setForm({ ...form, images })}
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-black/20 px-6 py-4">
              <p className="text-xs text-muted-foreground">Slug: <span className="text-foreground">{slug || "—"}</span></p>
              <div className="flex gap-2">
                <button type="button" onClick={onClose} className="rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/5">Batal</button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-[oklch(0.78_0.16_220)] px-5 py-2 text-sm font-semibold text-primary-foreground shadow-[0_15px_40px_-15px_oklch(0.72_0.19_240/0.7)] disabled:opacity-60"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Simpan
                </button>
              </div>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function Input({ value, onChange, type = "text", required, placeholder }: { value: string | number; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <input
      type={type}
      value={value}
      required={required}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none transition focus:border-primary/50 focus:bg-white/[0.07]"
    />
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none transition focus:border-primary/50 focus:bg-white/[0.07]"
    >
      {options.map((o) => <option key={o} value={o} className="bg-background">{o}</option>)}
    </select>
  );
}
