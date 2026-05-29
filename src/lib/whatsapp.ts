import type { Car } from "@/data/cars";
import { formatIDR } from "@/data/cars";

// Default admin number — replace via env if needed
export const WHATSAPP_NUMBER = "6281266766698";

export function buildWhatsAppMessage(car: Pick<Car, "brand" | "name" | "year" | "price">) {
  return `Halo Admin Abadi Motors, saya tertarik dengan mobil ${car.brand} ${car.name} tahun ${car.year} seharga ${formatIDR(car.price)} yang saya lihat di website. Apakah unitnya masih tersedia?`;
}

export function buildWhatsAppUrl(car: Pick<Car, "brand" | "name" | "year" | "price">, phone = WHATSAPP_NUMBER) {
  const msg = encodeURIComponent(buildWhatsAppMessage(car));
  return `https://wa.me/${phone}?text=${msg}`;
}
