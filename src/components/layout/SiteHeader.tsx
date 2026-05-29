import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="font-display text-xl tracking-wide text-foreground">
          Abadi Motor
        </Link>
        <nav className="flex items-center gap-8 text-sm">
          <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>
            Beranda
          </Link>
          <Link to="/katalog" className="text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>
            Katalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
