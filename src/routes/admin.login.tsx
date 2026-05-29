import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Lock, Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin Login — Abadi Motors" }] }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const { signIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate({ to: "/admin/dashboard", replace: true });
  }, [isAuthenticated, navigate]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
      navigate({ to: "/admin/dashboard", replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login gagal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_30%,oklch(0.72_0.19_240/0.18),transparent_70%)]" />
      <div className="pointer-events-none absolute -left-32 top-1/3 -z-10 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md space-y-7 rounded-3xl border border-white/10 bg-surface/70 p-8 backdrop-blur-2xl shadow-[0_40px_120px_-40px_oklch(0_0_0/0.7)]"
      >
        <div>
          <Link to="/" className="font-display flex items-center gap-2 text-xl">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">A</span>
            Abadi <span className="text-primary">Motors</span>
          </Link>
          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-primary">
            <Lock className="h-3 w-3" /> Admin Access
          </div>
          <h1 className="font-display mt-4 text-3xl">Masuk ke Dashboard</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Kelola showroom premium Anda.</p>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </motion.div>
        )}

        <div className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Email</span>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-primary/50 focus:bg-white/[0.07]"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Password</span>
            <input
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-primary/50 focus:bg-white/[0.07]"
            />
          </label>
        </div>

        <button
          type="submit" disabled={loading}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-[oklch(0.78_0.16_220)] px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_20px_60px_-20px_oklch(0.72_0.19_240/0.7)] disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Masuk <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>}
        </button>

        <p className="text-center text-xs text-muted-foreground">
          Belum punya akun admin? Buat lewat panel Lovable Cloud (Users).
        </p>
      </motion.form>
    </div>
  );
}
