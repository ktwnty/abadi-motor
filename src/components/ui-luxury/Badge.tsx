import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default: "border-border bg-surface-elevated text-foreground",
        electric: "border-primary/40 bg-primary/10 text-primary",
        gold: "border-accent/40 bg-accent/10 text-accent",
        silver: "border-white/15 bg-white/5 text-silver",
        outline: "border-border-strong bg-transparent text-foreground",
        dot: "border-border bg-surface-elevated text-foreground pl-2",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  dotColor?: string;
}

export function Badge({ className, variant, dot, dotColor = "var(--primary)", children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: dotColor, boxShadow: `0 0 8px ${dotColor}` }}
        />
      )}
      {children}
    </span>
  );
}
