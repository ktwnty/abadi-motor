import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Interface untuk properti Navbar
export interface NavbarProps {
  brand?: ReactNode;
  links?: { to: string; label: string }[];
}

// Konfigurasi link default
const defaultLinks = [
  { to: "/", label: "Beranda" },
  { to: "/katalog", label: "Koleksi Mobil" },
];

function BrandMark() {
  return (
    <Link to="/" className="group flex items-center gap-3.5 flex-shrink-0">
      <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-md border border-white/10 bg-black transition duration-700 group-hover:border-primary/40">
        <img src="/logo-abadi.jpeg" alt="Abadi Motor" className="h-full w-full object-cover" />
      </div>
      <span className="font-display text-[15px] font-semibold uppercase tracking-[0.28em] leading-none">
        Abadi motor
      </span>
    </Link>
  );
}

export function Navbar({ brand, links = defaultLinks }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Deteksi scroll untuk efek glassmorphism
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  const waLink = "https://wa.me/6281266766698";

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5 md:pt-7"
      >
        <div
          className={cn(
            "flex w-full max-w-[1480px] items-center justify-between rounded-full border px-5 py-3 backdrop-blur-2xl transition-all duration-700",
            scrolled 
              ? "bg-black/70 border-white/10 py-2 shadow-2xl" 
              : "bg-black/20 border-white/[0.06] py-3"
          )}
        >
          {brand ?? <BrandMark />}

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-12 md:flex">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground/80 hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Menu Trigger */}
          <div className="flex items-center gap-2">
            <a 
              href={waLink} 
              target="_blank" 
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/90 bg-white px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-black hover:bg-primary transition-all"
            >
              Konsultasi →
            </a>
            <button 
              onClick={() => setOpen(true)} 
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] md:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-black/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex items-center justify-between px-6 pt-6">
              <BrandMark />
              <button 
                onClick={() => setOpen(false)} 
                className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <nav className="flex flex-1 flex-col justify-center gap-6 px-8">
              {links.map((l) => (
                <Link 
                  key={l.label} 
                  to={l.to} 
                  onClick={() => setOpen(false)} 
                  className="font-light text-[12vw] uppercase tracking-tighter"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="px-8 pb-12">
              <a 
                href={waLink} 
                className="flex w-full items-center justify-center rounded-full bg-white py-4 text-xs font-bold uppercase tracking-widest text-black"
              >
                Hubungi Konsultan
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;