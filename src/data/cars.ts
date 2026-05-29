import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import heroCar from "@/assets/hero-car.jpg";

// 1. Tipe data statis bawaan template (tetap dipertahankan untuk kebutuhan komponen lain)
export type CarStatus = "available" | "reserved" | "sold";
export type CarTransmission = "Automatic" | "Manual" | "Dual Clutch" | string;

// 2. DIUBAH: Sesuaikan interface Car agar mencerminkan kolom tabel Supabase Anda
export interface Car {
  id: string; // UUID dari Supabase
  name: string;
  brand: string | null;
  price: number;
  year: number | null;
  cc: string | null;
  transmission: string | null;
  fuel_type: string | null; // Sesuai database Supabase
  color: string | null;
  description: string | null;
  thumbnail: string | null; // Sesuai database Supabase
  is_sold: boolean;
  created_at: string;
}

export const BRANDS = ["Honda", "Toyota", "Mitsubishi"] as const;
export const TRANSMISSIONS: CarTransmission[] = ["Automatic", "Manual", "Dual Clutch"];
export const STATUSES: CarStatus[] = ["available", "reserved", "sold"];

// 3. DIUBAH: Kosongkan array statis karena data sekarang diambil dari database Supabase
export const CARS: Car[] = [];

// 4. DIUBAH: Nilai default min/max harga agar fitur filter halaman tidak crash saat awal dimuat
export const PRICE_MIN = 0;
export const PRICE_MAX = 2_000_000_000; // Standar 2 Miliar, bisa disesuaikan

// 5. Fungsi utilitas format mata uang (tetap dipertahankan karena dipakai oleh CarCard)
export const formatIDR = (n: number) => {
  if (n >= 1_000_000_000) return `Rp ${(n / 1_000_000_000).toFixed(2)} M`;
  if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(0)} Jt`;
  return `Rp ${n.toLocaleString("id-ID")}`;
};

// Fungsi label status (tetap dipertahankan untuk kompatibilitas template)
export const statusLabel: Record<CarStatus, string> = {
  available: "Tersedia",
  reserved: "Dipesan",
  sold: "Terjual",
};