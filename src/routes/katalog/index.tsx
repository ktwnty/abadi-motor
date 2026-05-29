import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { FilterSidebar, initialFilters, type CatalogFilters } from "@/components/catalog/FilterSidebar";
import { CarCard } from "@/components/catalog/CarCard";
import { Fuel } from "lucide-react";
import Navbar from "@/components/ui-luxury/Navbar";

// Route definition untuk struktur folder
export const Route = createFileRoute("/katalog/")({
  component: CatalogPage,
});

interface Car {
  id: string;
  name: string;
  brand: string | null;
  price: number;
  year: number | null;
  cc: string | null;
  transmission: string | null;
  fuel_type: string | null;
  color: string | null;
  description: string | null;
  thumbnail: string | null;
  is_sold: boolean;
  created_at: string;
}

function CatalogPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<CatalogFilters>(initialFilters);

  useEffect(() => {
    document.title = "Abadi Motor | Katalog";

    const fetchCars = async () => {
      try {
        const { data, error } = await supabase
          .from("data")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) setCars(data as Car[]);
      } catch (error) {
        console.error("Gagal memuat data dari Supabase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) => {
    if (filters.search && !car.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.brands.length > 0 && car.brand) {
      if (!filters.brands.some((b) => b.toLowerCase() === car.brand?.toLowerCase())) {
        return false;
      }
    }
    if (filters.transmissions.length > 0 && car.transmission) {
      if (!filters.transmissions.some((t) => t.toLowerCase() === car.transmission?.toLowerCase())) {
        return false;
      }
    }
    if (filters.statuses.length > 0) {
      const currentStatusText = car.is_sold ? "sold" : "available";
      if (!filters.statuses.includes(currentStatusText)) {
        return false;
      }
    }
    if (car.price < filters.price[0] || car.price > filters.price[1]) {
      return false;
    }
    return true;
  });

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background pt-28 pb-16 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            Memuat katalog Abadi Motor...
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
              Katalog
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Koleksi Mobil Premium
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            <aside>
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                onReset={() => setFilters(initialFilters)}
              />
            </aside>

            <section>
              <p className="text-sm text-muted-foreground mb-4">
                Menampilkan {filteredCars.length} dari {cars.length} unit
              </p>

              {filteredCars.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="mb-4 text-muted-foreground">
                    <Fuel className="w-12 h-12" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Tidak ada mobil yang cocok</h3>
                  <button
                    onClick={() => setFilters(initialFilters)}
                    className="px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-xl"
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCars.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  );
}