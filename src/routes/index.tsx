import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Hero } from "@/components/home/Hero";
import { BrandShowcase } from "@/components/home/BrandShowcase";
import { AutomotiveStatement } from "@/components/home/AutomotiveStatement";
import { LocationSection } from "@/components/home/LocationSection";
import { VehicleExploration } from "@/components/home/VehicleExploration";
import { ExperienceTrust } from "@/components/home/ExperienceTrust";
import { ServicesExperience } from "@/components/home/ServicesExperience";
import { Stats } from "@/components/home/Stats";
import { PurchaseTimeline } from "@/components/home/PurchaseTimeline";
import { FAQ } from "@/components/home/FAQ";
import { ContactExperience } from "@/components/home/ContactExperience";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abadi Motor" },
      {
        name: "description",
        content:
          "Showroom mobil bekas premium di Tanjungpinang, Indonesia. Temukan koleksi kendaraan terkurasi dengan standar kualitas tinggi, eksplorasi digital interaktif, dan layanan pembelian yang transparan serta sophisticated.",
      },
      { property: "og:title", content: "Abadi Motor" },
      {
        property: "og:description",
        content: "Showroom mobil bekas premium dengan pengalaman digital terdepan di Tanjungpinang.",
      },
      { 
        property: "og:image", 
        content: "/og-image.jpg" 
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
  return (
    <PublicLayout>
      {/* Hero dibiarkan memenuhi lebar layar (full-width) */}
      <Hero />

      {/* 
        Pembungkus konten:
        mx-auto: Memastikan konten selalu di tengah
        w-full: Mengisi lebar layar
        max-w-[1480px]: Sinkron dengan lebar max-width di Navbar
        px-4: Memberi ruang di sisi kiri/kanan agar tidak menempel pada HP
        overflow-x-hidden: Mencegah konten meluber keluar ke samping
      */}
      <main className="mx-auto w-full max-w-[1480px] overflow-x-hidden px-4 md:px-5">
        <div className="flex flex-col gap-16 py-12 md:py-20">
          <BrandShowcase />
          <AutomotiveStatement />
          <VehicleExploration />
          <ExperienceTrust />
          <ServicesExperience />
          <Stats />
          <PurchaseTimeline />
          <FAQ />
          <ContactExperience />
          <LocationSection />
        </div>
      </main>
    </PublicLayout>
  );
}