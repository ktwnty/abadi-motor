import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Facebook, MapPin, Phone, Mail } from "lucide-react";

const groups = [
  {
    title: "Showroom",
    links: [
      { label: "Katalog", to: "/katalog" },
      { label: "Brand Partner", to: "/" },
      { label: "Trade-In", to: "/" },
      { label: "Pembiayaan", to: "/" },
    ],
  },
  {
    title: "Layanan",
    links: [
      { label: "Test Drive", to: "/" },
      { label: "Concierge", to: "/" },
      { label: "After Sales", to: "/" },
      { label: "Garansi", to: "/" },
    ],
  },
  {
    title: "Perusahaan",
    links: [
      { label: "Tentang Kami", to: "/" },
      { label: "Karier", to: "/" },
      { label: "Press", to: "/" },
      { label: "Kontak", to: "/" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-20 border-t border-white/5 bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,oklch(0.63_0.27_25/0.7),transparent)]" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Brand block */}
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-primary/30 bg-black shadow-[0_0_24px_-4px_oklch(0.63_0.27_25/0.6)]">
                <img src="/logo-abadi.jpeg" alt="Abadi Motor" className="h-full w-full object-cover" />
              </div>
              <span className="font-display text-xl font-bold uppercase tracking-[0.18em]">
                Abadi Motor
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Eksplorasi digital untuk kendaraan premium pilihan. Di mana ketepatan standar otomotif bertemu dengan kenyamanan layanan yang tulus.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                Jl. Abadi No 1B-2B, TanjungPinang
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                +62 12 6676 6698
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" /> abadimotortnj@gmail.com
              </li>
            </ul>

            <div className="mt-6 flex gap-2">
              {[Instagram, Youtube, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-4">
            {groups.map((g) => (
              <div key={g.title}>
                <h4 className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-foreground">
                  {g.title}
                </h4>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className="transition-colors hover:text-primary">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-foreground">
              Newsletter
            </h4>
            <p className="mb-4 text-sm text-muted-foreground">
              Dapatkan update koleksi terbaru dan event privat.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="email@anda.com"
                className="w-full rounded-sm border border-white/10 bg-white/5 px-4 py-3 pr-20 text-sm outline-none transition-colors focus:border-primary"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 rounded-sm bg-primary px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Join
              </button>
            </form>
          </div>
        </div>


        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Abadi Motors Digital. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
