import { useCallback, useState, type DragEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UploadCloud, X, Loader2, ImageIcon } from "lucide-react";
import { uploadCarImage } from "@/lib/cars-api";

interface Props {
  slug: string;
  images: string[];
  onChange: (urls: string[]) => void;
}

interface UploadingItem {
  id: string;
  name: string;
  progress: number;
  preview: string;
}

export function ImageDropzone({ slug, images, onChange }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState<UploadingItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(
    async (fileList: FileList | File[]) => {
      setError(null);
      const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
      if (files.length === 0) return;

      const items: UploadingItem[] = files.map((f) => ({
        id: `${f.name}-${Date.now()}-${Math.random()}`,
        name: f.name,
        progress: 0,
        preview: URL.createObjectURL(f),
      }));
      setUploading((u) => [...u, ...items]);

      const results = await Promise.all(
        files.map(async (file, i) => {
          try {
            const url = await uploadCarImage(file, slug || "unsorted", (p) => {
              setUploading((u) => u.map((x) => (x.id === items[i].id ? { ...x, progress: p } : x)));
            });
            return url;
          } catch (e) {
            setError(e instanceof Error ? e.message : "Upload gagal");
            return null;
          }
        }),
      );

      const uploaded = results.filter((u): u is string => Boolean(u));
      onChange([...images, ...uploaded]);
      setUploading((u) => u.filter((x) => !items.some((it) => it.id === x.id)));
      items.forEach((it) => URL.revokeObjectURL(it.preview));
    },
    [slug, images, onChange],
  );

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };

  const removeImage = (url: string) => onChange(images.filter((u) => u !== url));

  return (
    <div className="space-y-4">
      <label
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
          dragOver ? "border-primary bg-primary/10" : "border-white/10 bg-white/[0.02] hover:border-primary/40 hover:bg-white/[0.04]"
        }`}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
          <UploadCloud className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium">Drag & drop foto, atau klik untuk pilih</p>
          <p className="mt-1 text-xs text-muted-foreground">PNG, JPG hingga 10 MB. Unggah beberapa sekaligus.</p>
        </div>
      </label>

      {error && (
        <p className="rounded-xl bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>
      )}

      {(uploading.length > 0 || images.length > 0) && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          <AnimatePresence>
            {images.map((url) => (
              <motion.div
                key={url}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative aspect-square overflow-hidden rounded-xl border border-white/10"
              >
                <img src={url} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur transition group-hover:opacity-100 hover:bg-destructive"
                  aria-label="Hapus"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            ))}

            {uploading.map((it) => (
              <motion.div
                key={it.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="relative aspect-square overflow-hidden rounded-xl border border-primary/40"
              >
                <img src={it.preview} alt="" className="h-full w-full object-cover opacity-50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40 backdrop-blur-sm">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <div className="h-1 w-3/4 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-accent"
                      animate={{ width: `${it.progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {images.length === 0 && uploading.length === 0 && (
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <ImageIcon className="h-3.5 w-3.5" /> Belum ada foto.
        </p>
      )}
    </div>
  );
}
