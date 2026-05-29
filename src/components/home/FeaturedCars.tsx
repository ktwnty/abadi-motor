import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient'; // Sesuaikan path ke file client Anda
import CarCard from '../catalog/CarCard'; // Sesuaikan path komponen kartu mobil Anda

// 1. Sesuaikan interface ini dengan struktur tabel Supabase Anda yang baru
interface Car {
  id: string; // Menggunakan UUID (string)
  name: string;
  brand: string | null;
  price: number; // bigint di database aman dibaca sebagai number di JavaScript
  year: number | null;
  cc: string | null;
  transmission: string | null;
  fuel_type: string | null; // Sesuai kolom database
  color: string | null;
  description: string | null;
  thumbnail: string | null; // Sesuai kolom database (URL foto utama)
  is_sold: boolean;
  created_at: string;
}

const FeaturedCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        // 2. Ambil data dari tabel 'data' dan filter mobil yang belum terjual (is_sold = false)
        const { data, error } = await supabase
          .from('data') // Nama tabel Anda
          .select('*')
          .eq('is_sold', false) // Hanya tampilkan mobil yang belum laku
          .order('created_at', { ascending: false }); // Mobil terbaru muncul di atas

        if (error) throw error;
        if (data) setCars(data);
      } catch (error) {
        console.error('Gagal mengambil data dari Supabase:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <p className="text-center my-10">Sedang memuat koleksi mobil terbaik...</p>;
  if (cars.length === 0) return <p className="text-center my-10">Belum ada mobil yang tersedia.</p>;

  return (
    <div className="car-grid">
      {cars.map((car) => (
        // 3. Oper data 'car' yang sudah sesuai dengan kolom Supabase Anda ke komponen kartu
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

export default FeaturedCars;