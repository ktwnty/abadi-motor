import { cn } from "@/lib/utils";

export interface AnimatedGradientProps {
  className?: string;
  variant?: "aurora" | "spotlight" | "mesh";
}

export function AnimatedGradient({ className, variant = "aurora" }: AnimatedGradientProps) {
  if (variant === "spotlight") {
    return (
      <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
        <div className="absolute left-1/2 top-0 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,oklch(0.72_0.19_240_/_0.35),transparent)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[700px] rounded-full bg-[radial-gradient(closest-side,oklch(0.82_0.14_75_/_0.18),transparent)] blur-3xl" />
      </div>
    );
  }
  if (variant === "mesh") {
    return (
      <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
        <div className="absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full bg-primary/25 blur-[120px] animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute -right-32 top-1/3 h-[420px] w-[420px] rounded-full bg-accent/20 blur-[120px] animate-[float_10s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-[oklch(0.62_0.22_260)]/25 blur-[120px] animate-[float_12s_ease-in-out_infinite]" />
      </div>
    );
  }
  // aurora
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "conic-gradient(from 220deg at 50% 50%, oklch(0.72 0.19 240 / 0.25), oklch(0.62 0.22 260 / 0.18), oklch(0.82 0.14 75 / 0.15), oklch(0.72 0.19 240 / 0.25))",
          filter: "blur(80px)",
          animation: "gradient-shift 14s ease infinite",
          backgroundSize: "200% 200%",
        }}
      />
    </div>
  );
}
