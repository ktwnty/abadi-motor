import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: 100, suffix: "+", label: "Mobil Terjual", sub: "sejak 2019" },
  { value: 5, suffix: "+", label: "merk", sub: "jepang dan china" },
  { value: 99, suffix: "%", label: "Kepuasan Klien", sub: "Google 5.0" },
  { value: 7, suffix: "", label: "Tahun Pengalaman", sub: "showroom terpercaya" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => `${Math.round(v).toLocaleString("id-ID")}${suffix}`);

  useEffect(() => {
    if (inView) animate(mv, to, { duration: 2.2, ease: EASE });
  }, [inView, mv, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function Stats() {
  return (
    <section className="relative mx-auto w-full max-w-[1400px] px-6 py-32 md:px-10 md:py-44">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: EASE }}
        className="mb-16 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground/70 md:mb-24"
      >
        <span className="block h-px w-12 bg-foreground/30" />
        V · Berdasarkan Angka
      </motion.div>

      {/* Editorial spec sheet — large numerals, hairline dividers */}
      <div className="grid grid-cols-1 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: EASE, delay: i * 0.06 }}
            className={[
              "flex flex-col gap-5 border-t border-white/10 py-10 md:py-14",
              i !== 0 ? "md:border-l md:border-l-white/10 md:pl-10" : "",
            ].join(" ")}
          >
            <div className="font-display text-[clamp(3.5rem,7vw,6.5rem)] font-light leading-none tracking-[-0.04em] tabular-nums">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground">
                {s.label}
              </div>
              <div className="mt-1 text-xs text-muted-foreground/80">{s.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
