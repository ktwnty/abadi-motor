import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Car, CheckCircle2, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { listCars } from "@/lib/cars-api";

export const Route = createFileRoute("/admin/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Abadi Motors Admin" }] }),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const { data: cars = [], isLoading } = useQuery({ queryKey: ["cars"], queryFn: listCars });

  const total = cars.length;
  const available = cars.filter((c) => c.status === "available").length;
  const reserved = cars.filter((c) => c.status === "reserved").length;
  const inventory = cars.reduce((s, c) => s + Number(c.price), 0);

  const stats = [
    { label: "Total Unit", value: total, icon: Car, accent: "from-primary/30 to-primary/5" },
    { label: "Tersedia", value: available, icon: CheckCircle2, accent: "from-emerald-500/30 to-emerald-500/5" },
    { label: "Dipesan", value: reserved, icon: Clock, accent: "from-accent/30 to-accent/5" },
    { label: "Nilai Inventaris", value: formatShort(inventory), icon: TrendingUp, accent: "from-gold/30 to-gold/5" },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header>
        <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Dashboard</p>
        <h1 className="font-display mt-2 text-4xl md:text-5xl">Selamat Datang Kembali</h1>
        <p className="mt-2 text-sm text-muted-foreground">Ringkasan showroom dan akses cepat ke modul utama.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface/60 p-6 backdrop-blur-xl"
          >
            <div className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${s.accent} blur-3xl`} />
            <div className="flex items-center justify-between">
              <s.icon className="h-5 w-5 text-primary" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{s.label}</span>
            </div>
            <p className="font-display mt-6 text-4xl">{isLoading ? "—" : s.value}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-3xl border border-white/10 bg-surface/60 p-8 backdrop-blur-xl"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl">Manajemen Mobil</h2>
            <p className="mt-1 text-sm text-muted-foreground">Tambah, edit, atau hapus unit dengan upload foto multi-gambar.</p>
          </div>
          <Link
            to="/admin/cars"
            className="inline-flex items-center gap-2 self-start rounded-full bg-gradient-to-r from-primary to-[oklch(0.78_0.16_220)] px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Buka Manajemen <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

function formatShort(n: number) {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)} M`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)} Jt`;
  return n.toLocaleString("id-ID");
}
