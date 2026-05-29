import type { ReactNode } from "react";
import { Navbar } from "@/components/ui-luxury/Navbar";
import { SiteFooter } from "./SiteFooter";

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="relative min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Jarak padding atas disesuaikan untuk Fixed Navbar */}
      <main className="w-full pt-20 md:pt-28">
        {children}
      </main>
      
      <SiteFooter />
    </div>
  );
}