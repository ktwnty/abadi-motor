import { motion } from "framer-motion";

const brands = [
  "TOYOTA", "HONDA", "MITSUBISHI", "DAIHATSU", "SUZUKI",
  "MAZDA", "NISSAN", "HYUNDAI", "WULING", "ISUZU",
];


const EASE = [0.22, 1, 0.36, 1] as const;

export function BrandShowcase() {
  const row = [...brands, ...brands];
  return (
    <section className="relative border-y border-white/8 py-20">
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-12 gap-x-6 px-6 md:gap-x-10 md:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="col-span-12 mb-12 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground/70 md:col-span-4 md:mb-0"
        >
          <span className="block h-px w-12 bg-foreground/30" />
          merk
        </motion.div>

        <div className="col-span-12 md:col-span-8">
          <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="flex w-max gap-16"
            >
              {row.map((b, i) => (
                <span
                  key={`${b}-${i}`}
                  className="font-display whitespace-nowrap text-2xl font-light tracking-[0.18em] text-foreground/35 transition-colors duration-700 hover:text-foreground md:text-3xl"
                >
                  {b}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
