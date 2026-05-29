import { forwardRef, type HTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden",
  {
    variants: {
      variant: {
        solid: "bg-card border border-border shadow-[var(--shadow-md)]",
        glass: "glass",
        elevated: "bg-surface-elevated border border-border shadow-[var(--shadow-lg)]",
        outline: "border border-border-strong bg-transparent",
        gradient:
          "border border-white/10 bg-[linear-gradient(135deg,oklch(0.10_0.02_22_/_0.8),oklch(0.06_0.012_22_/_0.6))] backdrop-blur-xl shadow-[var(--shadow-lg)]",
      },
      hover: {
        none: "",
        lift: "hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] hover:border-white/15",
        glow: "hover:shadow-[var(--shadow-glow-electric)] hover:border-primary/40",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
    },
    defaultVariants: { variant: "glass", hover: "lift", padding: "md" },
  },
);

export interface CardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragEnd" | "onDragStart" | "onAnimationStart">,
    VariantProps<typeof cardVariants> {
  asMotion?: boolean;
  motionProps?: HTMLMotionProps<"div">;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, hover, padding, asMotion, motionProps, children, ...props }, ref) => {
    const classes = cn(cardVariants({ variant, hover, padding }), className);
    if (asMotion) {
      return (
        <motion.div ref={ref} className={classes} {...motionProps} {...(props as HTMLMotionProps<"div">)}>
          {children}
        </motion.div>
      );
    }
    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  },
);
Card.displayName = "Card";

export const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-4 space-y-1.5", className)} {...props} />
);
export const CardTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-2xl font-semibold tracking-tight text-foreground", className)} {...props} />
);
export const CardDescription = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
);
export const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("", className)} {...props} />
);
export const CardFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-6 flex items-center gap-3", className)} {...props} />
);
