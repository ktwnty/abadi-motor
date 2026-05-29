import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { formatIDR } from "@/data/cars";
import Navbar from "@/components/ui-luxury/Navbar";

export const Route = createFileRoute("/katalog/$id")({
  component: CarDetailPage,
});

function CarDetailPage() {
  // PERBAIKAN: Tidak perlu menyertakan 'from' jika file sudah berada di rute yang tepat
  const { id } = useParams({ strict: false }); 
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("data")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setCar(null);
      } else {
        setCar(data);
      }
      setLoading(false);
    };

    fetchCar();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-t-transparent border-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-black text-white">
        <h1 className="text-xl font-mono tracking-wider uppercase mb-6">[ Unit Tidak Ditemukan ]</h1>
        <Link to="/katalog/" className="px-6 py-3 border border-white text-xs uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all">
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-16 px-6 selection:bg-white selection:text-black">
      <Navbar />
      
      <div className="max-w-4xl mx-auto">
        <div className="relative w-full aspect-[16/10] bg-[#050505] rounded-[2rem] overflow-hidden border border-white/10 p-2 mb-12 shadow-2xl">
          <img 
            src={car.thumbnail || "/placeholder.jpg"} 
            alt={car.name} 
            className="w-full h-full object-cover object-top rounded-[1.5rem] grayscale-[0.2]"
          />
        </div>
        
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-12">
          <div className="border-l border-white/20 pl-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-mono mb-2">{car.brand}</p>
            <h1 className="text-4xl font-medium tracking-tight uppercase">{car.name}</h1>
          </div>
          <div className="text-left md:text-right">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Nilai Investasi // Harga</p>
            <p className="text-3xl font-light mt-1 text-white">{formatIDR(car.price)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-white/10 py-8 font-mono text-sm">
          <div>
            <p className="text-[10px] uppercase text-gray-500 tracking-wider mb-1">// Tahun</p>
            <p className="font-medium text-white">{car.year}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-gray-500 tracking-wider mb-1">// Transmisi</p>
            <p className="font-medium text-white">{car.transmission}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-gray-500 tracking-wider mb-1">// Warna</p>
            <p className="font-medium text-white">{car.color}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-gray-500 tracking-wider mb-1">// Kapasitas Mesin</p>
            <p className="font-medium text-white">{car.cc ? `${car.cc} CC` : "-"}</p>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4">[ Deskripsi Unit ]</h3>
          <p className="text-gray-300 text-sm leading-relaxed max-w-3xl">{car.description || "Tidak ada rincian deskripsi tambahan yang tersedia untuk unit ini."}</p>
        </div>

        <div className="flex gap-4 mt-16 pt-8 border-t border-white/10">
          <button 
            onClick={() => window.history.back()} 
            className="px-6 py-4 border border-white/20 rounded-xl text-xs uppercase tracking-widest hover:bg-white/5 transition-colors font-mono"
          >
            ← Kembali
          </button>
          <a 
            href={`https://wa.me/6281266766698?text=Halo%20Abadi%20Motor,%20saya%20tertarik%20dengan%20unit%20${car.brand}%20${car.name}.%20Apakah%20bisa%20dibantu%20untuk%20informasi%20lebih%20lanjut?`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 md:flex-none text-center px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-all shadow-lg"
          >
            Hubungi Konsultan via WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}