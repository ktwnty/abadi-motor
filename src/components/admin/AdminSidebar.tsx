import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { LayoutDashboard, Car, LogOut, Home } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "@tanstack/react-router";

const items = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/cars", label: "Manajemen Mobil", icon: Car },
] as const;

export function AdminSidebar() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="fixed inset-y-4 left-4 z-40 hidden w-64 flex-col lg:flex">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex h-full flex-col rounded-3xl border border-white/10 bg-surface/70 p-5 backdrop-blur-2xl shadow-[0_30px_80px_-30px_oklch(0_0_0/0.6)]"
      >
        <Link to="/admin/dashboard" className="font-display flex items-center gap-2 px-2 text-xl">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">A</span>
          <span>Abadi <span className="text-primary">Admin</span></span>
        </Link>

        <nav className="mt-8 flex-1 space-y-1.5">
          {items.map((it) => {
            const active = path === it.to || path.startsWith(it.to + "/");
            return (
              <Link
                key={it.to}
                to={it.to}
                className={`group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-all ${
                  active
                    ? "bg-gradient-to-r from-primary/20 to-accent/10 text-foreground"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-gradient-to-b from-primary to-accent"
                  />
                )}
                <it.icon className="h-4 w-4" />
                {it.label}
              </Link>
            );
          })}
        </nav>

        <Link
          to="/"
          className="flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs text-muted-foreground hover:bg-white/5 hover:text-foreground"
        >
          <Home className="h-3.5 w-3.5" /> Lihat Situs
        </Link>

        <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
          <button
            onClick={async () => { await signOut(); navigate({ to: "/admin/login" }); }}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-3.5 w-3.5" /> Keluar
          </button>
        </div>
      </motion.div>
    </aside>
  );
}

export function AdminMobileBar() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 flex justify-around rounded-2xl border border-white/10 bg-surface/80 p-2 backdrop-blur-2xl lg:hidden">
      {items.map((it) => {
        const active = path === it.to || path.startsWith(it.to + "/");
        return (
          <Link
            key={it.to}
            to={it.to}
            className={`flex flex-1 flex-col items-center gap-1 rounded-xl px-3 py-2 text-[10px] uppercase tracking-wider ${
              active ? "bg-primary/20 text-foreground" : "text-muted-foreground"
            }`}
          >
            <it.icon className="h-4 w-4" />
            {it.label.split(" ")[0]}
          </Link>
        );
      })}
    </div>
  );
}
