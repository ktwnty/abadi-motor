
-- Cars table
CREATE TABLE public.cars (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  year INT NOT NULL,
  price BIGINT NOT NULL,
  transmission TEXT NOT NULL DEFAULT 'Automatic',
  status TEXT NOT NULL DEFAULT 'available',
  km INT NOT NULL DEFAULT 0,
  fuel TEXT NOT NULL DEFAULT 'Bensin',
  badge TEXT,
  description TEXT,
  images TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.cars TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cars TO authenticated;
GRANT ALL ON public.cars TO service_role;

ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cars are viewable by everyone"
  ON public.cars FOR SELECT
  USING (true);

CREATE POLICY "Authenticated can insert cars"
  ON public.cars FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update cars"
  ON public.cars FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Authenticated can delete cars"
  ON public.cars FOR DELETE TO authenticated
  USING (true);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_cars_updated_at
  BEFORE UPDATE ON public.cars
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('foto-mobil', 'foto-mobil', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Foto mobil publik dapat dilihat"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'foto-mobil');

CREATE POLICY "Admin upload foto mobil"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'foto-mobil');

CREATE POLICY "Admin update foto mobil"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'foto-mobil');

CREATE POLICY "Admin hapus foto mobil"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'foto-mobil');
