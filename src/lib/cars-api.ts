import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type CarRow = Database["public"]["Tables"]["cars"]["Row"];
export type CarInsert = Database["public"]["Tables"]["cars"]["Insert"];
export type CarUpdate = Database["public"]["Tables"]["cars"]["Update"];

export const CAR_BUCKET = "foto-mobil";

export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export async function listCars(): Promise<CarRow[]> {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function createCar(input: CarInsert): Promise<CarRow> {
  const { data, error } = await supabase.from("cars").insert(input).select().single();
  if (error) throw error;
  return data;
}

export async function updateCar(id: string, patch: CarUpdate): Promise<CarRow> {
  const { data, error } = await supabase.from("cars").update(patch).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteCar(id: string, images: string[] = []): Promise<void> {
  // best-effort: remove stored images
  const paths = images
    .map((url) => url.split(`/${CAR_BUCKET}/`)[1])
    .filter(Boolean) as string[];
  if (paths.length > 0) {
    await supabase.storage.from(CAR_BUCKET).remove(paths);
  }
  const { error } = await supabase.from("cars").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadCarImage(file: File, slug: string, onProgress?: (p: number) => void): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${slug || "unsorted"}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  // Supabase JS doesn't expose progress for storage.upload; emulate fast progress.
  onProgress?.(15);
  const { error } = await supabase.storage.from(CAR_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });
  if (error) throw error;
  onProgress?.(100);
  const { data } = supabase.storage.from(CAR_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
