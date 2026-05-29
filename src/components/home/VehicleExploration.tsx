import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/ui-luxury/Navbar";

export function VehicleExploration() {
  const [collection, setCollection] = useState<any[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("data").select("*").limit(5);
      if (data && data.length > 0) { 
        setCollection(data); 
        setActiveId(data[0]?.id); 
      }
    };
    fetchData();
  }, []);

  const active = collection.find((c) => c.id === activeId) || collection[0];

  return (
    <section className="bg-black text-white min-h-screen pt-32 pb-20 px-8">
      <Navbar />
      
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 border-l border-white/20 pl-6">
          <h2 className="text-4xl font-medium tracking-tight">Koleksi Unit</h2>
          <p className="text-gray-500 text-xs uppercase tracking-[0.2em] mt-2 font-mono">Lumic Labs // Archive</p>
        </header>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Box Visual - Menggunakan aspect-[16/10] agar lebih rapat & tidak terlalu panjang */}
          <div className="lg:col-span-8 relative aspect-[16/10] bg-[#050505] rounded-[2rem] overflow-hidden border border-white/10 p-2">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.img
                  key={active.id}
                  src={active.thumbnail || "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200"} 
                  alt={active.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ borderRadius: "1.5rem" }} 
                  // object-top memaksa gambar memotong area bawah (tempat watermark berada)
                  className="w-full h-full object-cover object-top grayscale-[0.2]"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                  Data Tidak Ditemukan
                </div>
              )}
            </AnimatePresence>
            
            <div className="absolute bottom-8 left-8 text-[10px] tracking-widest uppercase font-mono bg-black/60 px-4 py-2 border border-white/10 rounded-full backdrop-blur-sm">
              [ {active?.brand || "TOYOTA"} // {active?.name || "UNIT"} ]
            </div>
          </div>

          {/* List Navigasi Samping */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {collection.map((c, i) => (
              <button
                key={c.id}
                onMouseEnter={() => setActiveId(c.id)}
                className={`group flex items-center justify-between p-4 border transition-all duration-300 rounded-2xl ${
                  activeId === c.id 
                    ? "border-white/50 bg-white/5" 
                    : "border-transparent hover:border-white/10"
                }`}
              >
                <span className="font-mono text-[10px] text-gray-500">0{i + 1}</span>
                <span className="uppercase text-sm tracking-wide">{c.name}</span>
                <span className={`w-1 h-1 rounded-full ${activeId === c.id ? "bg-white" : "bg-white/10"}`} />
              </button>
            ))}

            <Link
              to="/koleksi/$id"
              params={{ id: active?.id || "" }}
              className="mt-6 w-full border border-white py-4 text-[10px] text-center uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all rounded-2xl"
            >
              Lihat Spesifikasi
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}